import { useEffect } from 'react'
import { Map } from 'ol'
import type { ListenerFunction } from 'ol/events'
import type { MapEventHandler } from 'ol/Map'

type MapEvenHadlerParams = Parameters<MapEventHandler<void>>
export type MapEventType = MapEvenHadlerParams[0][0]

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
