import React from 'react'
import type { FeatureLike } from 'ol/Feature'
import { LineString, Point } from 'ol/geom'
import Circle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Style from 'ol/style/Style'

import { type OlTranslateProps } from './ol-translate'
import { OlTranslateMiddle } from './ol-translate-middle'

/**
 * Translate interaction component that adds anchor points at the middle of line segments.
 * Allows users to drag segment midpoints to modify line geometry.
 *
 * @param props - Same props as OlTranslate component
 * @param props.initialOptions - Configuration options for the translate interaction
 * @param props.children - Child components
 *
 * @example
 * ```tsx
 * <OlMap>
 *   <OlVectorLayer visible={true}>
 *     <OlFeatureTranslateAnchors initialOptions={{ hitTolerance: 5 }}>
 *       {children}
 *     </OlFeatureTranslateAnchors>
 *   </OlVectorLayer>
 * </OlMap>
 * ```
 */
export function OlFeatureTranslateAnchors(props: OlTranslateProps) {
  return (
    <OlTranslateMiddle initialOptions={props.initialOptions}>
      {props.children}
    </OlTranslateMiddle>
  )
}

const translateLinesStyle = new Circle({
  radius: 6,
  fill: new Fill({ color: 'red' }),
})

/**
 * Style function that generates anchor point styles at the middle of each line segment.
 * Returns an array of styles, one for each segment midpoint.
 *
 * @param feature - The OpenLayers feature to style
 * @returns Array of Style objects with anchor point geometries, or empty array if not a LineString
 *
 * @example
 * ```tsx
 * const layer = new VectorLayer({
 *   style: styleWithTranslateAnchorsGeometry
 * })
 * ```
 */
export function styleWithTranslateAnchorsGeometry(feature: FeatureLike) {
  const geometry = feature.getGeometry()
  if (!geometry || !(geometry instanceof LineString)) return []

  const coordinates = geometry.getCoordinates()
  const styles = []

  for (let i = 0; i < coordinates.length - 1; i++) {
    const segmentStart = requireCoordinates(coordinates[i])
    const segmentEnd = requireCoordinates(coordinates[i + 1])
    const centerX = (segmentStart[0] + segmentEnd[0]) / 2
    const centerY = (segmentStart[1] + segmentEnd[1]) / 2

    const anchorGeometry = new Point([centerX, centerY])
    styles.push(
      new Style({ geometry: anchorGeometry, image: translateLinesStyle })
    )
  }

  return styles
}

function requireCoordinates(coordinates?: number[]): [number, number] {
  if (!coordinates || !coordinates[0] || !coordinates[1])
    throw new Error('Wrong coordinate types')
  return coordinates as [number, number]
}
