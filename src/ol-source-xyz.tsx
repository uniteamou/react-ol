import {
  forwardRef,
  type Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { useOlTileLayer } from './ol-tile-layer'
import XYZ, { type Options as XYZOptions } from 'ol/source/XYZ'

export const OlSourceXYZ = forwardRef(OlSourceXYZComponent)

type OlSourceXYZProps = {
  initialOptions?: XYZOptions
}

function OlSourceXYZComponent(
  { initialOptions }: OlSourceXYZProps,
  forwardedRef: Ref<XYZ | null>
) {
  const [tileSource] = useState(() => new XYZ(initialOptions))
  useImperativeHandle(forwardedRef, () => tileSource, [tileSource])

  const layer = useOlTileLayer()

  useEffect(() => {
    layer.setSource(tileSource)
    return () => {
      layer.setSource(null)
    }
  }, [layer, tileSource])

  return <div data-testid="ol-source-xyz" />
}
