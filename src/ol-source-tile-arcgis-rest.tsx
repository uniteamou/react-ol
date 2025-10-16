import {
  forwardRef,
  type Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import TileArcGISRest, { type Options } from 'ol/source/TileArcGISRest.js'

import { useOlTileLayer } from './ol-tile-layer.js'

export const OlSourceTileArcGISRest = forwardRef(
  OlSourceTileArcGISRestComponent
)

type OlTileSouceProps = {
  initialOptions?: Options
}
function OlSourceTileArcGISRestComponent(
  { initialOptions }: OlTileSouceProps,
  forwardedRef: Ref<TileArcGISRest | null>
) {
  const [tileSource] = useState(() => new TileArcGISRest(initialOptions))
  useImperativeHandle(forwardedRef, () => tileSource, [tileSource])
  const layer = useOlTileLayer()

  useEffect(() => {
    layer.setSource(tileSource)
    return () => {
      layer.setSource(null)
    }
  }, [layer, tileSource])

  return <div data-testid="ol-source-tile-arcgis-rest" />
}
