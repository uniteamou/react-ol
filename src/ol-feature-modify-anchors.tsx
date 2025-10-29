import React, {
  forwardRef,
  type PropsWithChildren,
  type Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { never } from 'ol/events/condition.js'
import Feature, { type FeatureLike } from 'ol/Feature.js'
import { Geometry, LineString, MultiPoint } from 'ol/geom.js'
import { Modify } from 'ol/interaction.js'
import type { Options as ModifyOptions } from 'ol/interaction/Modify.js'
import Circle from 'ol/style/Circle.js'
import Fill from 'ol/style/Fill.js'
import Style from 'ol/style/Style.js'

import { OlModify } from './ol-modify.jsx'
import { useOlLayerSelect } from './ol-select.jsx'
import {
  type ModifyListener,
  useOlModifyEventListener,
} from './use-ol-modify-event-listener.js'
import type { Coordinate } from 'ol/coordinate.js'

type OlModifyProps = PropsWithChildren<{
  initialOptions?: Partial<ModifyOptions>
}>

export const OlFeatureModifyAnchors = forwardRef<Modify | null, OlModifyProps>(
  OlFeatureModifyAnchorsComponent
)

function OlFeatureModifyAnchorsComponent(
  props: OlModifyProps,
  forwardedRef: Ref<Modify | null>
) {
  const [modify, setModify] = useState<Modify | null>(null)
  const select = useOlLayerSelect()

  useImperativeHandle(forwardedRef, () => modify, [modify])

  useEffect(() => {
    if (!modify) return
    const styleFn = modify.getOverlay().getStyleFunction()!

    modify.getOverlay().setStyle((feature, resolution) => {
      feature.get('features').forEach(updateModifyGeometry.bind(null, feature))
      return styleFn(feature, resolution)
    })
  }, [modify])

  useOlModifyEventListener(modify, 'modifystart', addModifyGeometry)
  useOlModifyEventListener(modify, 'modifyend', removeModifyGeometry)

  return (
    <OlModify
      ref={setModify}
      initialOptions={{
        ...props.initialOptions,
        features: select.getFeatures(),
        insertVertexCondition: never,
        deleteCondition: never,
      }}
    >
      {props.children}
    </OlModify>
  )
}

function updateModifyGeometry(
  feature: FeatureLike,
  modifyFeature: Feature<Geometry>
) {
  const modifyGeometry = modifyFeature.get('modifyGeometry')?.geometry
  const pointsGeometry = feature.getGeometry()
  if (
    !(modifyGeometry instanceof LineString) ||
    !(pointsGeometry instanceof MultiPoint)
  )
    return

  const [movedStart, movedEnd] = pointsGeometry.getCoordinates()
  if (!movedStart || !movedEnd) throw new Error('Anchor has incorrect state')

  const modifyCoordinates = modifyGeometry.getCoordinates()
  const start = modifyCoordinates[0]
  const end = modifyCoordinates[modifyCoordinates.length - 1]
  if (!start || !end) throw new Error('Modified geometry has incorrect state')

  if (
    !isCoordinateEqual(movedStart, start) ||
    !isCoordinateEqual(movedEnd, end)
  ) {
    modifyCoordinates[0] = movedStart
    modifyCoordinates[modifyCoordinates.length - 1] = end
    modifyGeometry.setCoordinates(modifyCoordinates)
    return modifyGeometry
  }
}

function removeModifyGeometry(event: Parameters<ModifyListener>[0]) {
  event.features.forEach(function (feature) {
    const modifyGeometry = feature.get('modifyGeometry')
    if (!modifyGeometry) return

    feature.setGeometry(modifyGeometry.geometry)
    feature.unset('modifyGeometry', true)
    feature.changed()
  })
}

function addModifyGeometry(event: Parameters<ModifyListener>[0]) {
  event.features.forEach(function (feature) {
    const originalGeometry = feature.getGeometry()
    if (!originalGeometry) return

    feature.set(
      'modifyGeometry',
      { geometry: originalGeometry.clone() as LineString },
      true
    )
  })
}

const modifyLinesStyle = new Circle({
  radius: 6,
  fill: new Fill({ color: 'blue' }),
})

const anchors = new MultiPoint([0, 0])

export function styleWithModifyAnchorsGeometry(feature: FeatureLike) {
  const modifyGeometry = feature.get('modifyGeometry')
  const geometry = modifyGeometry
    ? modifyGeometry.geometry
    : feature.getGeometry()

  const start = geometry.getCoordinateAt(0)
  const end = geometry.getCoordinateAt(1)
  anchors.setCoordinates([start, end])

  return [
    new Style({
      geometry: anchors,
      image: modifyLinesStyle,
    }),
  ]
}

function isCoordinateEqual(coord: Coordinate, coord2: Coordinate) {
  if (coord.length !== coord2.length) return false
  for (let index = 0; index < coord.length; index++) {
    const item = coord[index]
    const item2 = coord2[index]
    if (!item2 || item) return false
    if (item !== item2) return false
  }

  return true
}
