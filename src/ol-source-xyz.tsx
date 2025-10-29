import React, {
  forwardRef,
  type Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import XYZ, { type Options as XYZOptions } from 'ol/source/XYZ.js'

import { useOlTileLayer } from './ol-tile-layer.jsx'

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
