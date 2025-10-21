import {
  forwardRef,
  type Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { getTopLeft } from 'ol/extent.js'
import { get as getProjection } from 'ol/proj.js'
import XYZ, { type Options as XYZOptions } from 'ol/source/XYZ.js'

import { useOlTileLayer } from './ol-tile-layer.js'

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
