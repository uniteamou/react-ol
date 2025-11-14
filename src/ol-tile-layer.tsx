import React, {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import type { Options } from 'ol/layer/BaseTile'
import TileLayer from 'ol/layer/Tile'
import TileSource from 'ol/source/Tile'

import { useOlMap } from './ol-map'

type OlTileLayerProps = {
  children?: ReactNode
  initialOptions?: Options<TileSource>
  isVisible?: boolean
  ref?: React.RefObject<TileLayer<TileSource> | null>
}

/**
 * OpenLayers tile layer component for displaying tiled map data.
 * Supports various tile sources like OSM, XYZ, ArcGIS, etc.
 * Must be used as a child of OlMap.
 *
 * @param props.children - Child components to render within the layer context (typically tile sources)
 * @param props.initialOptions - Initial configuration options for the tile layer
 * @param props.isVisible - Controls layer visibility (default: true, reactive)
 * @param props.ref - Ref to expose the TileLayer instance
 *
 * @example
 * ```tsx
 * <OlMap>
 *   <OlTileLayer ref={layerRef} isVisible={true}>
 *     <OlSourceOSM />
 *   </OlTileLayer>
 * </OlMap>
 * ```
 */
export function OlTileLayer({
  children,
  initialOptions,
  isVisible = true,
  ref,
}: OlTileLayerProps) {
  const [tileLayer] = useState(() => new TileLayer(initialOptions))
  useImperativeHandle(ref, () => tileLayer, [tileLayer])
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

/**
 * Hook to access the OpenLayers TileLayer instance from the nearest parent OlTileLayer component.
 * Must be used within a descendant of OlTileLayer.
 *
 * @returns The OpenLayers TileLayer instance
 * @throws {Error} If called outside of an OlTileLayer component
 *
 * @example
 * ```tsx
 * function TileControl() {
 *   const layer = useOlTileLayer()
 *   // Use layer instance
 *   return null
 * }
 * ```
 */
export function useOlTileLayer() {
  const context = useContext(OlTileLayerContext)
  if (context === null) {
    throw new Error(
      'No context provided: useOlTileLayer() can only be used in a descendant of <OlTileLayer>'
    )
  }
  return context
}
