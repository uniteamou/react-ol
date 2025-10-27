import {
  createContext,
  forwardRef,
  type ReactNode,
  type Ref,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import type { Options } from 'ol/layer/BaseTile.js'
import TileLayer from 'ol/layer/Tile.js'
import TileSource from 'ol/source/Tile.js'

import { useOlMap } from './ol-map.jsx'

export const OlTileLayer = forwardRef(OlTileLayerComponent)

type OlTileLayerProps = {
  children?: ReactNode
  initialOptions?: Options<TileSource>
  isVisible?: boolean
}
export function OlTileLayerComponent(
  { children, initialOptions, isVisible = true }: OlTileLayerProps,
  forwardedRef: Ref<TileLayer<TileSource> | null>
) {
  const [tileLayer] = useState(() => new TileLayer(initialOptions))
  useImperativeHandle(forwardedRef, () => tileLayer, [tileLayer])
  const layerGroup = useOlMap() // TODO: useOlLayerGroup

  useEffect(() => {
    layerGroup.addLayer(tileLayer)
    return () => {
      layerGroup.removeLayer(tileLayer)
    }
  }, [layerGroup, tileLayer])

  useEffect(() => {
    if (!tileLayer) return
    tileLayer.setVisible(isVisible)
  }, [tileLayer, isVisible])

  return (
    <div data-testid="ol-layer">
      <OlTileLayerContext.Provider value={tileLayer}>
        {children}
      </OlTileLayerContext.Provider>
    </div>
  )
}

const OlTileLayerContext = createContext<TileLayer<TileSource> | null>(null)
export function useOlTileLayer() {
  const context = useContext(OlTileLayerContext)
  if (context === null) {
    throw new Error(
      'No context provided: useOlTileLayer() can only be used in a descendant of <OlTileLayer>'
    )
  }
  return context
}
