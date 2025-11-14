import React, { useEffect, useImperativeHandle, useState } from 'react'
import XYZ, { type Options as XYZOptions } from 'ol/source/XYZ'

import { useOlTileLayer } from './ol-tile-layer'

type OlSourceXYZProps = {
  initialOptions?: XYZOptions
  ref?: React.RefObject<XYZ | null>
}

/**
 * OpenLayers XYZ tile source component for custom tile servers using the XYZ URL pattern.
 * Supports any tile server that follows the {z}/{x}/{y} URL structure.
 * Must be used as a child of OlTileLayer.
 *
 * @param props.initialOptions - Configuration options for the XYZ source
 * @param props.ref - Ref to expose the XYZ source instance
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
export function OlSourceXYZ({ initialOptions, ref }: OlSourceXYZProps) {
  const [tileSource] = useState(() => new XYZ(initialOptions))
  useImperativeHandle(ref, () => tileSource, [tileSource])

  const layer = useOlTileLayer()

  useEffect(() => {
    layer.setSource(tileSource)
    return () => {
      layer.setSource(null)
    }
  }, [layer, tileSource])

  return <div data-testid="ol-source-xyz" />
}
