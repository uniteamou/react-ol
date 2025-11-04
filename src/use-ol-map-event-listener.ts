import { useEffect } from 'react'
import { Map } from 'ol'
import type { ListenerFunction } from 'ol/events'
import type { MapEventHandler } from 'ol/Map'

type MapEvenHadlerParams = Parameters<MapEventHandler<void>>

/**
 * Type representing valid event types for OpenLayers Map events.
 */
export type MapEventType = MapEvenHadlerParams[0][0]

/**
 * Hook to attach an event listener to an OpenLayers Map instance.
 * Automatically handles cleanup when the component unmounts or dependencies change.
 *
 * @param map - The OpenLayers Map instance to attach the listener to (null-safe)
 * @param type - The type of map event to listen for
 * @param listener - The callback function to execute when the event fires
 *
 * @example
 * ```tsx
 * const map = useOlMap()
 * useOlMapEventListener(map, 'click', (evt) => {
 *   console.log('Map clicked', evt)
 * })
 * ```
 */
export function useOlMapEventListener(
  map: Map | null,
  type: MapEventType,
  listener: ListenerFunction
) {
  useEffect(() => {
    map?.addEventListener(type, listener)
    return () => {
      map?.removeEventListener(type, listener)
    }
  }, [map, type, listener])
}
