import React, {
  forwardRef,
  type Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import XYZ, { type Options as XYZOptions } from 'ol/source/XYZ'

import { useOlTileLayer } from './ol-tile-layer'

/**
 * OpenLayers XYZ tile source component for custom tile servers using the XYZ URL pattern.
 * Supports any tile server that follows the {z}/{x}/{y} URL structure.
 * Must be used as a child of OlTileLayer.
 *
 * @param props.initialOptions - Configuration options for the XYZ source
 * @param ref - Forwarded ref to expose the XYZ source instance
 *
 * @example
 * ```tsx
 * <OlTileLayer>
 *   <OlSourceXYZ
 *     ref={sourceRef}
 *     initialOptions={{
 *       url: 'https://tile.server.com/{z}/{x}/{y}.png',
 *       maxZoom: 19
 *     }}
 *   />
 * </OlTileLayer>
 * ```
 */
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
