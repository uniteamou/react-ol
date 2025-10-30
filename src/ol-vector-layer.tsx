import React, {
  createContext,
  forwardRef,
  memo,
  type ReactNode,
  type Ref,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import type { FeatureLike } from 'ol/Feature'
import VectorLayer, {
  type Options as VectorLayerOptions,
} from 'ol/layer/Vector'

import { useOlMap } from './ol-map'
import shallowEqual from './shallow-equal'

type OlVectorLayerProps = {
  children?: ReactNode
  properties?: Record<string, unknown>
  visible: boolean
  style?: VectorLayerOptions<FeatureLike>['style']
  maxZoom?: VectorLayerOptions<FeatureLike>['maxZoom']
  minZoom?: VectorLayerOptions<FeatureLike>['minZoom']
  zIndex?: VectorLayerOptions<FeatureLike>['zIndex']
}

export function OlVectorLayerComponent(
  {
    children,
    visible,
    properties,
    style,
    minZoom,
    maxZoom,
    zIndex,
  }: OlVectorLayerProps,
  forwardedRef: Ref<VectorLayer<FeatureLike>>
) {
  const [vectorLayer] = useState(() => new VectorLayer())
  useImperativeHandle(forwardedRef, () => vectorLayer, [vectorLayer])
  const layerGroup = useOlMap() // TODO: useOlLayerGroup

  useEffect(() => {
    layerGroup.addLayer(vectorLayer)
    return () => {
      layerGroup.removeLayer(vectorLayer)
    }
  }, [layerGroup, vectorLayer])

  useEffect(() => {
    const prevProperties = vectorLayer.getProperties()
    vectorLayer.setProperties({ ...prevProperties, ...properties })
  }, [properties, vectorLayer])

  useEffect(() => {
    vectorLayer.setVisible(visible)
  }, [vectorLayer, visible])

  useEffect(() => {
    vectorLayer.setStyle(style)
  }, [vectorLayer, style])

  useEffect(() => {
    if (!minZoom) return
    vectorLayer.setMinZoom(minZoom)
  }, [vectorLayer, minZoom])

  useEffect(() => {
    if (!maxZoom) return
    vectorLayer.setMaxZoom(maxZoom)
  }, [vectorLayer, maxZoom])

  useEffect(() => {
    if (!zIndex) return
    vectorLayer.setZIndex(zIndex)
  }, [vectorLayer, zIndex])

  return (
    <div data-testid="ol-layer">
      <OlVectorLayerContext.Provider value={vectorLayer}>
        {children}
      </OlVectorLayerContext.Provider>
    </div>
  )
}

export const OlVectorLayer = memo(
  forwardRef(OlVectorLayerComponent),
  (prevProps, nextProps) => {
    const { properties: prevProperties, ...prevOtherProps } = prevProps
    const { properties: nextProperties, ...nextOtherProps } = nextProps

    return (
      shallowEqual(prevOtherProps, nextOtherProps) &&
      shallowEqual(prevProperties, nextProperties)
    )
  }
)

const OlVectorLayerContext = createContext<VectorLayer<FeatureLike> | null>(
  null
)
export function useOlVectorLayer() {
  const context = useContext(OlVectorLayerContext)
  if (context === null) {
    throw new Error(
      'No context provided: useOlVectorLayer() can only be used in a descendant of <OlVectorLayer>'
    )
  }
  return context
}
