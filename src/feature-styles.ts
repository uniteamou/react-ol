import type { FeatureLike } from 'ol/Feature.js'
import Circle from 'ol/style/Circle.js'
import Fill from 'ol/style/Fill.js'
import Stroke from 'ol/style/Stroke.js'
import Style, { type StyleFunction } from 'ol/style/Style.js'

export function circleStyleFunction(feature: FeatureLike) {
  const size = feature.get('size') || 10
  const fillColor = feature.get('fillColor') || '#ff0000'
  const strokeColor = feature.get('strokeColor') || '#000000'
  const strokeWidth = feature.get('strokeWidth') || 2
  const circleStyle = new Style({
    stroke: new Stroke({
      color: strokeColor,
      width: strokeWidth,
    }),
    image: new Circle({
      radius: size,
      fill: new Fill({
        color: fillColor,
      }),
      stroke: new Stroke({
        color: strokeColor,
        width: strokeWidth,
      }),
    }),
  })
  return circleStyle
}

const highlightStroke = new Stroke({ color: 'rgba(0, 150, 255, 1)', width: 5 })

export function highlightStyleFunction(styleFn: StyleFunction): StyleFunction {
  return (feature, resolution) => {
    const baseStyle = styleFn(feature, resolution)
    const shouldHighlight = feature.get('shouldHighlight')
    if (!baseStyle || !shouldHighlight) return baseStyle

    if (Array.isArray(baseStyle)) {
      if (!baseStyle[0]) return baseStyle

      baseStyle[0].setStroke(highlightStroke)
    } else {
      baseStyle.setStroke(highlightStroke)
    }
    return baseStyle
  }
}
