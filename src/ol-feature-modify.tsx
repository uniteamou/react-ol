import React, {
  type PropsWithChildren,
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
  ref?: React.Ref<Modify | null>
}>

/**
 * Modify interaction component that preserves the original feature geometry during editing.
 * Clones and tracks geometry modifications, allowing for controlled geometry updates.
 *
 * @param props.initialOptions - Configuration options for the modify interaction
 * @param props.children - Child components
 * @param props.ref - Ref to expose the Modify interaction instance
 *
 * @example
 * ```tsx
 * <OlVectorSource>
 *   <OlFeatureModify ref={modifyRef} initialOptions={{ pixelTolerance: 10 }}>
 *     {children}
 *   </OlFeatureModify>
 * </OlVectorSource>
 * ```
 */
export function OlFeatureModify(props: OlModifyProps) {
  const [modify, setModify] = useState<Modify | null>(null)

  useImperativeHandle<Modify | null, Modify | null>(props.ref, () => modify!, [
    modify,
  ])

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

/**
 * Style function that returns the cloned modify geometry or current geometry.
 * Used during feature modification to display the geometry being edited.
 *
 * @param feature - The OpenLayers feature to style
 * @returns Style object with the modify geometry or current geometry
 *
 * @example
 * ```tsx
 * const layer = new VectorLayer({
 *   style: styleWithModifyGeometry
 * })
 * ```
 */
export function styleWithModifyGeometry(feature: FeatureLike) {
  const modifyGeometry = feature.get('modifyGeometry')
  const geometry = modifyGeometry
    ? modifyGeometry.geometry
    : feature.getGeometry()

  return new Style({ geometry })
}
