import React from 'react'
import type { FeatureLike } from 'ol/Feature.js'
import { LineString, Point } from 'ol/geom.js'
import Circle from 'ol/style/Circle.js'
import Fill from 'ol/style/Fill.js'
import Style from 'ol/style/Style.js'

import { type OlTranslateProps } from './ol-translate.jsx'
import { OlTranslateMiddle } from './ol-translate-middle.jsx'

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
