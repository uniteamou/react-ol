import React, {
  forwardRef,
  type Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { getTopLeft } from 'ol/extent'
import { get as getProjection } from 'ol/proj'
import XYZ, { type Options as XYZOptions } from 'ol/source/XYZ'

import { useOlTileLayer } from './ol-tile-layer'

class ArcGISImageServerXYZ extends XYZ {
  private baseBBOXUrl: string | undefined

  constructor(options: XYZOptions) {
    super({ ...options, url: '' })
    this.baseBBOXUrl = options.url
    this.setTileUrlFunction(this.getTileUrlFunction())
  }

  override getTileUrlFunction() {
    return (tileCoord: number[] | null) => {
      if (!tileCoord) return undefined

      const [z, x, y] = tileCoord as [number, number, number]
      const tileSize = 256
      const proj = getProjection('EPSG:3857')!
      const projectionExtent = proj.getExtent() as [
        number,
        number,
        number,
        number,
      ]
      const origin = getTopLeft(projectionExtent) as [number, number]
      const resolution =
        (projectionExtent[2] - projectionExtent[0]) /
        (tileSize * Math.pow(2, z))

      const minX = origin[0] + x * tileSize * resolution
      const maxX = origin[0] + (x + 1) * tileSize * resolution
      const maxY = origin[1] - y * tileSize * resolution
      const minY = origin[1] - (y + 1) * tileSize * resolution

      const bbox = `${minX},${minY},${maxX},${maxY}`

      const params = new URLSearchParams({
        F: 'image',
        FORMAT: 'PNG24',
        TRANSPARENT: 'true',
        SIZE: '256,256',
        BBOX: bbox,
        BBOXSR: '3857',
        IMAGESR: '3857',
        DPI: '90',
      })

      return `${this.baseBBOXUrl}/export?${params.toString()}`
    }
  }
}

/**
 * OpenLayers tile source component for ArcGIS Image Server using XYZ tile scheme with custom BBOX export.
 * Generates tile URLs with BBOX parameters for ArcGIS export endpoints.
 * Must be used as a child of OlTileLayer.
 *
 * @param props.initialOptions - Configuration options for the ArcGIS XYZ source
 * @param props.initialOptions.url - Base URL of the ArcGIS Image Server
 * @param props.initialOptions.maxZoom - Maximum zoom level
 * @param props.initialOptions.attributions - Attribution text for the source
 * @param ref - Forwarded ref to expose the ArcGISImageServerXYZ instance
 *
 * @example
 * ```tsx
 * <OlTileLayer>
 *   <OlSourceCustomArcGISXYZ
 *     initialOptions={{
 *       url: 'https://server.arcgisonline.com/arcgis/rest/services/Layer/ImageServer',
 *       maxZoom: 18
 *     }}
 *   />
 * </OlTileLayer>
 * ```
 */
export const OlSourceCustomArcGISXYZ = forwardRef(
  OlSourceCustomArcGISXYZComponent
)

type OlTileSourceProps = {
  initialOptions: {
    url: string
    maxZoom?: number
    attributions?: string
  }
}

function OlSourceCustomArcGISXYZComponent(
  { initialOptions }: OlTileSourceProps,
  forwardedRef: Ref<ArcGISImageServerXYZ | null>
) {
  const layer = useOlTileLayer()
  const [tileSource] = useState(() => {
    return new ArcGISImageServerXYZ(initialOptions)
  })

  useImperativeHandle(forwardedRef, () => tileSource, [tileSource])

  useEffect(() => {
    layer.setSource(tileSource)
    return () => {
      layer.setSource(null)
    }
  }, [layer, tileSource])

  return <div data-testid="ol-source-custom-arcgis-xyz" />
}
