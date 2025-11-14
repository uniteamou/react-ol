import React, { useEffect, useImperativeHandle, useState } from 'react'
import TileArcGISRest, { type Options } from 'ol/source/TileArcGISRest'

import { useOlTileLayer } from './ol-tile-layer'

type OlTileSouceProps = {
  initialOptions?: Options
  ref?: React.RefObject<TileArcGISRest | null>
}

/**
 * OpenLayers tile source component for ArcGIS REST services.
 * Provides standard tile access to ArcGIS Map/Image services.
 * Must be used as a child of OlTileLayer.
 *
 * @param props.initialOptions - Configuration options for the ArcGIS REST source
 * @param props.ref - Ref to expose the TileArcGISRest instance
 *
 * @example
 * ```tsx
 * <OlTileLayer>
 *   <OlSourceTileArcGISRest
 *     ref={sourceRef}
 *     initialOptions={{
 *       url: 'https://server.arcgisonline.com/arcgis/rest/services/Layer/MapServer'
 *     }}
 *   />
 * </OlTileLayer>
 * ```
 */
export function OlSourceTileArcGISRest({
  initialOptions,
  ref,
}: OlTileSouceProps) {
  const [tileSource] = useState(() => new TileArcGISRest(initialOptions))
  useImperativeHandle(ref, () => tileSource, [tileSource])
  const layer = useOlTileLayer()

  useEffect(() => {
    layer.setSource(tileSource)
    return () => {
      layer.setSource(null)
    }
  }, [layer, tileSource])

  return <div data-testid="ol-source-tile-arcgis-rest" />
}
