import React, {
  forwardRef,
  type Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import ImageSource, {
  type Options as ImageSourceOptions,
} from 'ol-ext/source/GeoImage'

import { useOlImageLayer } from './ol-layer-geo-image'

type OlImageSourceProps = Omit<ImageSourceOptions, 'imageMask'> & {
  imageMask?: ImageSourceOptions['imageMask']
  imageOpacity?: number
}

type ImageSourceType = InstanceType<typeof ImageSource>

/**
 * OpenLayers GeoImage source component for providing georeferenced image data to an image layer.
 * Must be used as a child of OlImageLayer.
 *
 * @param props - OpenLayers GeoImage source options
 * @param props.url - URL of the image to display
 * @param props.imageCenter - Center coordinates [x, y] of the image (reactive)
 * @param props.imageScale - Scale factor for the image (reactive)
 * @param props.imageRotate - Rotation angle in radians (reactive)
 * @param props.imageOpacity - Opacity value between 0 and 1
 * @param props.imageMask - Optional mask for the image
 * @param ref - Forwarded ref to expose the GeoImage source instance
 *
 * @example
 * ```tsx
 * <OlImageLayer isVisible={true}>
 *   <OlImageSource
 *     url="image.jpg"
 *     imageCenter={[0, 0]}
 *     imageScale={[1, 1]}
 *     imageRotate={0}
 *     imageOpacity={0.8}
 *   />
 * </OlImageLayer>
 * ```
 */
export const OlImageSource = forwardRef(function OlImageSource(
  {
    url,
    imageCenter,
    imageScale,
    imageRotate,
    imageOpacity,
    ...otherProperties
  }: OlImageSourceProps,
  forwardedRef: Ref<ImageSourceType>
) {
  const [source] = useState(
    () =>
      new ImageSource({
        url,
        imageCenter,
        imageScale,
        imageRotate,
        ...otherProperties,
      } as ImageSourceOptions)
  )
  useImperativeHandle(forwardedRef, () => source, [source])

  const imageLayer = useOlImageLayer()

  useEffect(() => {
    if (!imageCenter) return
    source.setCenter(imageCenter)
  }, [source, imageCenter])

  useEffect(() => {
    if (!imageScale) return
    source.setScale(imageScale)
  }, [source, imageScale])

  useEffect(() => {
    if (!imageRotate) return
    source.setRotation(imageRotate)
  }, [source, imageRotate])

  useEffect(() => {
    imageLayer.setSource(source)
    return () => {
      imageLayer.setSource(null)
    }
  }, [imageLayer, source])

  useEffect(() => {
    if (imageOpacity !== undefined) {
      imageLayer.setOpacity(imageOpacity)
    }
  }, [imageLayer, imageOpacity])

  return null
})
