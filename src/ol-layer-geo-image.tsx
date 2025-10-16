import {
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
import LayerGeoImageImport from 'ol-ext/layer/GeoImage.js'
import type { Options } from 'ol/layer/BaseImage.js'
import ImageSource from 'ol/source/Image.js'

import { useOlMap } from './ol-map.js'
import shallowEqual from './shallow-equal.js'

const LayerGeoImage = LayerGeoImageImport.default
type LayerGeoImage = InstanceType<typeof LayerGeoImage>

type OlLayerGeoImageProps = Options<ImageSource> & {
  children?: ReactNode
  properties?: Record<string, unknown>
  isVisible: boolean
}

export function OlLayerGeoImage(
  { children, isVisible, properties, ...otherProperties }: OlLayerGeoImageProps,
  forwardedRef: Ref<LayerGeoImage>
) {
  const [imageLayer] = useState(() => new LayerGeoImage(otherProperties))
  useImperativeHandle(forwardedRef, () => imageLayer, [imageLayer])
  const layerGroup = useOlMap()

  useEffect(() => {
    layerGroup.addLayer(imageLayer)
    return () => {
      layerGroup.removeLayer(imageLayer)
    }
  }, [layerGroup, imageLayer])

  useEffect(() => {
    const prevProperties = imageLayer.getProperties()
    imageLayer.setProperties({ ...prevProperties, ...properties })
  }, [properties, imageLayer])

  useEffect(() => {
    imageLayer.setVisible(isVisible)
  }, [imageLayer, isVisible])

  return (
    <div data-testid="ol-layer">
      <OlImageLayerContext.Provider value={imageLayer}>
        {children}
      </OlImageLayerContext.Provider>
    </div>
  )
}

export const OlImageLayer = memo(
  forwardRef(OlLayerGeoImage),
  (prevProps, nextProps) => {
    const { properties: prevProperties, ...prevOtherProps } = prevProps
    const { properties: nextProperties, ...nextOtherProps } = nextProps

    return (
      shallowEqual(prevOtherProps, nextOtherProps) &&
      shallowEqual(prevProperties, nextProperties)
    )
  }
)

const OlImageLayerContext = createContext<LayerGeoImage | null>(null)
export function useOlImageLayer() {
  const context = useContext(OlImageLayerContext)
  if (context === null) {
    throw new Error(
      'No context provided: useOlImageLayer() can only be used in a descendant of <OlImageLayer>'
    )
  }
  return context
}
