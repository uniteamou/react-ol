import {
  forwardRef,
  type Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import ImageSourceImport, {
  type Options as ImageSourceOptions,
} from 'ol-ext/source/GeoImage.js'

import { useOlImageLayer } from './ol-layer-geo-image.jsx'

type OlImageSourceProps = Omit<ImageSourceOptions, 'imageMask'> & {
  imageMask?: ImageSourceOptions['imageMask']
  imageOpacity?: number
}

const ImageSource = ImageSourceImport.default
type ImageSource = InstanceType<typeof ImageSource>

export const OlImageSource = forwardRef(function OlImageSource(
  {
    url,
    imageCenter,
    imageScale,
    imageRotate,
    imageOpacity,
    ...otherProperties
  }: OlImageSourceProps,
  forwardedRef: Ref<ImageSource>
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
