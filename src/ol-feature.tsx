import React, { memo, useEffect } from 'react'
import Feature from 'ol/Feature'
import type { StyleFunction } from 'ol/style/Style'

import { circleStyleFunction } from './feature-styles'
import { useOlVectorSource } from './ol-vector-source'
import shallowEqual from './shallow-equal'

type OlFeatureProps = {
  feature: Feature
  style?: Record<string, unknown>
  styleFunction?: StyleFunction
  properties?: Record<string, unknown>
  projection?: {
    dataProjection: string
    featureProjection: string
  }
}

function OlFeatureComponent({
  feature,
  style,
  styleFunction,
  properties,
}: OlFeatureProps) {
  const source = useOlVectorSource()

  useEffect(() => {
    source.addFeature(feature)
    return () => {
      source.removeFeature(feature)
    }
  }, [feature, source])

  useEffect(() => {
    feature.setStyle(styleFunction || circleStyleFunction)
  }, [feature, styleFunction])

  useEffect(() => {
    const otherProperties = feature.getProperties()
    feature.setProperties({ ...otherProperties, ...style })
  }, [style, feature])

  useEffect(() => {
    const prevProperties = feature.getProperties()
    feature.setProperties({ ...prevProperties, ...properties })
  }, [properties, feature])

  return null
}

/**
 * Memoized OpenLayers feature component for displaying individual geographic features.
 * Uses shallow comparison for props optimization.
 * Must be used as a child of OlVectorSource.
 *
 * @param props.feature - OpenLayers Feature instance to display
 * @param props.style - Style properties to apply to the feature (reactive)
 * @param props.styleFunction - Custom style function for the feature (reactive)
 * @param props.properties - Custom properties to attach to the feature (reactive)
 * @param props.projection - Projection configuration for coordinate transformation
 *
 * @example
 * ```tsx
 * <OlVectorSource>
 *   <OlFeature
 *     feature={myFeature}
 *     styleFunction={customStyle}
 *     properties={{ id: 'feature1' }}
 *   />
 * </OlVectorSource>
 * ```
 */
export const OlFeature = memo(OlFeatureComponent, (prevProps, nextProps) => {
  const { properties: prevProperties, ...prevOtherProps } = prevProps
  const { properties: nextProperties, ...nextOtherProps } = nextProps

  return (
    shallowEqual(prevOtherProps, nextOtherProps) &&
    shallowEqual(prevProperties, nextProperties)
  )
})
