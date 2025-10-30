import React, {
  forwardRef,
  type PropsWithChildren,
  type Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import Feature, { type FeatureLike } from 'ol/Feature'
import { Geometry } from 'ol/geom'
import { Modify } from 'ol/interaction'
import type { Options as ModifyOptions } from 'ol/interaction/Modify'
import Style from 'ol/style/Style'

import { OlModify } from './ol-modify'
import {
  type ModifyListener,
  useOlModifyEventListener,
} from './use-ol-modify-event-listener'

type OlModifyProps = PropsWithChildren<{
  initialOptions?: Partial<ModifyOptions>
}>

export const OlFeatureModify = forwardRef<Modify | null, OlModifyProps>(
  OlFeatureModifyComponent
)

function OlFeatureModifyComponent(
  props: OlModifyProps,
  forwardedRef: Ref<Modify | null>
) {
  const [modify, setModify] = useState<Modify | null>(null)

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
    <OlModify ref={setModify} {...props}>
      {props.children}
    </OlModify>
  )
}

function updateModifyGeometry(
  _: FeatureLike,
  modifyFeature: Feature<Geometry>
) {
  const modifyGeometry = modifyFeature.get('modifyGeometry')
  if (!modifyGeometry || !modifyGeometry.geometryInitial) return
  modifyGeometry.geometry = modifyGeometry.geometryInitial.clone()
}

function removeModifyGeometry(event: Parameters<ModifyListener>[0]) {
  event.features.forEach(function (feature) {
    const modifyGeometry = feature.get('modifyGeometry')
    if (!modifyGeometry) return

    feature.setGeometry(modifyGeometry.geometry)
    feature.unset('modifyGeometry', true)
  })
}

function addModifyGeometry(event: Parameters<ModifyListener>[0]) {
  event.features.forEach(function (feature) {
    if (!feature || !feature.getGeometry()) return

    feature.set(
      'modifyGeometry',
      { geometry: feature.getGeometry()!.clone() },
      true
    )
  })
}

export function styleWithModifyGeometry(feature: FeatureLike) {
  const modifyGeometry = feature.get('modifyGeometry')
  const geometry = modifyGeometry
    ? modifyGeometry.geometry
    : feature.getGeometry()

  return new Style({ geometry })
}
