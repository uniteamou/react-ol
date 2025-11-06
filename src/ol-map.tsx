import React, {
  createContext,
  forwardRef,
  type ReactNode,
  type Ref,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Map } from 'ol'
import type { MapOptions } from 'ol/Map'

/**
 * OpenLayers Map component that provides a React wrapper around the OpenLayers Map class.
 * Creates a map container and provides the map instance to child components via context.
 *
 * @param props.children - Child components to render within the map context
 * @param props.initialOptions - Initial configuration options for the OpenLayers Map instance
 * @param ref - Forwarded ref to expose the Map instance
 *
 * @example
 * ```tsx
 * <OlMap>
 *   <OlView />
 *   <OlTileLayer />
 * </OlMap>
 * ```
 */
export const OlMap = forwardRef(OlMapComponent)

type MapProps = {
  children?: ReactNode
  initialOptions?: MapOptions
}
function OlMapComponent(
  { children, initialOptions }: MapProps,
  forwardedRef: Ref<Map | null>
) {
  const [map] = useState<Map>(() => new Map(initialOptions))
  useImperativeHandle(forwardedRef, () => map, [map])

  const mapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (mapRef.current) {
      map.setTarget(mapRef.current)
    }
    return () => {
      map.setTarget()
    }
  }, [map])

  return (
    <>
      <div
        style={{ width: '100%', height: '100%' }}
        ref={mapRef}
        data-testid="ol-map"
      >
        <OlMapContext.Provider value={map}>{children}</OlMapContext.Provider>
      </div>
    </>
  )
}

const OlMapContext = createContext<Map | null>(null)

/**
 * Hook to access the OpenLayers Map instance from the nearest parent OlMap component.
 * Must be used within a descendant of OlMap.
 *
 * @returns The OpenLayers Map instance
 * @throws {Error} If called outside of an OlMap component
 *
 * @example
 * ```tsx
 * function MapControl() {
 *   const map = useOlMap()
 *   // Use map instance
 *   return <div>Map ready</div>
 * }
 * ```
 */
export function useOlMap() {
  const context = useContext(OlMapContext)
  if (context === null) {
    throw new Error(
      'No context provided: useOlMap() can only be used in a descendant of <OlMap>'
    )
  }
  return context
}
