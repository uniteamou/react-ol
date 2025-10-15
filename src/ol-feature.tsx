import Feature from 'ol/Feature'
import { memo, useEffect } from 'react'
import { useOlVectorSource } from './ol-vector-source'
import shallowEqual from './shallow-equal'
import { circleStyleFunction } from './feature-styles'
import type { StyleFunction } from 'ol/style/Style'

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

export const OlFeature = memo(OlFeatureComponent, (prevProps, nextProps) => {
  const { properties: prevProperties, ...prevOtherProps } = prevProps
  const { properties: nextProperties, ...nextOtherProps } = nextProps

  return (
    shallowEqual(prevOtherProps, nextOtherProps) &&
    shallowEqual(prevProperties, nextProperties)
  )
})
