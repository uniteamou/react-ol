import React, {
  createContext,
  memo,
  type ReactNode,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import LayerGeoImage from 'ol-ext/layer/GeoImage'
import type { Options } from 'ol/layer/BaseImage'
import ImageSource from 'ol/source/Image'

import { useOlMap } from './ol-map'
import shallowEqual from './shallow-equal'

type LayerGeoImageType = InstanceType<typeof LayerGeoImage>

type OlLayerGeoImageProps = Options<ImageSource> & {
  children?: ReactNode
  properties?: Record<string, unknown>
  isVisible: boolean
  ref?: React.RefObject<LayerGeoImageType>
}

export function OlLayerGeoImage({
  children,
  isVisible,
  properties,
  ref,
  ...otherProperties
}: OlLayerGeoImageProps) {
  const [imageLayer] = useState(() => new LayerGeoImage(otherProperties))
  useImperativeHandle(ref, () => imageLayer, [imageLayer])
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

/**
 * Memoized OpenLayers GeoImage layer component for displaying georeferenced images.
 * Uses shallow comparison for props optimization.
 *
 * @param props - All OpenLayers BaseImage layer options plus custom props
 * @param props.children - Child components to render within the layer context (typically image sources)
 * @param props.isVisible - Controls layer visibility
 * @param props.properties - Custom properties to attach to the layer
 * @param props.ref - Ref to expose the LayerGeoImage instance
 *
 * @example
 * ```tsx
 * <OlMap>
 *   <OlImageLayer isVisible={true} properties={{ id: 'layer1' }}>
 *     <OlImageSource url="image.jpg" />
 *   </OlImageLayer>
 * </OlMap>
 * ```
 */
export const OlImageLayer = memo(OlLayerGeoImage, (prevProps, nextProps) => {
  const { properties: prevProperties, ...prevOtherProps } = prevProps
  const { properties: nextProperties, ...nextOtherProps } = nextProps

  return (
    shallowEqual(prevOtherProps, nextOtherProps) &&
    shallowEqual(prevProperties, nextProperties)
  )
})

const OlImageLayerContext = createContext<LayerGeoImage | null>(null)

/**
 * Hook to access the OpenLayers GeoImage layer instance from the nearest parent OlImageLayer component.
 * Must be used within a descendant of OlImageLayer.
 *
 * @returns The OpenLayers LayerGeoImage instance
 * @throws {Error} If called outside of an OlImageLayer component
 *
 * @example
 * ```tsx
 * function ImageControl() {
 *   const layer = useOlImageLayer()
 *   // Use layer instance
 *   return null
 * }
 * ```
 */
export function useOlImageLayer() {
  const context = useContext(OlImageLayerContext)
  if (context === null) {
    throw new Error(
      'No context provided: useOlImageLayer() can only be used in a descendant of <OlImageLayer>'
    )
  }
  return context
}
