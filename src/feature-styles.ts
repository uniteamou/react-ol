import type { FeatureLike } from 'ol/Feature'
import Circle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Style, { type StyleFunction } from 'ol/style/Style'

/**
 * Style function that creates circle styles based on feature properties.
 * Reads size, fillColor, strokeColor, and strokeWidth from feature properties.
 *
 * @param feature - The OpenLayers feature to style
 * @returns Style Style object with configured circle appearance
 *
 * @example
 * ```tsx
 * const feature = new Feature({
 *   geometry: new Point([0, 0]),
 *   size: 15,
 *   fillColor: '#00ff00',
 *   strokeColor: '#000000',
 *   strokeWidth: 2
 * })
 * feature.setStyle(circleStyleFunction)
 * ```
 */
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

/**
 * Higher-order style function that wraps another style function to add highlight capability.
 * Applies a blue highlight stroke when the feature has `shouldHighlight` property set to true.
 *
 * @param {StyleFunction} styleFn - The base style function to wrap
 * @returns {StyleFunction} A new style function that conditionally applies highlighting
 *
 * @example
 * ```tsx
 * const baseStyle = (feature) => new Style({ ... })
 * const highlightedStyle = highlightStyleFunction(baseStyle)
 *
 * const layer = new VectorLayer({
 *   style: highlightedStyle
 * })
 *
 * // Trigger highlight
 * feature.set('shouldHighlight', true)
 * ```
 */
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
