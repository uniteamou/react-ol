import { useEffect, useState } from 'react'
import OSM, { type Options } from 'ol/source/OSM.js'

import { useOlTileLayer } from './ol-tile-layer.jsx'

type OlTileSouceProps = {
  initialOptions?: Options
}
export function OlSourceOSM({ initialOptions }: OlTileSouceProps) {
  const [tileSource] = useState(() => new OSM(initialOptions))
  const layer = useOlTileLayer()

  useEffect(() => {
    layer.setSource(tileSource)
    return () => {
      layer.setSource(null)
    }
  }, [layer, tileSource])

  return <div data-testid="ol-source-osm" />
}
