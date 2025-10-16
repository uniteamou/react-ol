import {
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
import type { MapOptions } from 'ol/Map.js'

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
export function useOlMap() {
  const context = useContext(OlMapContext)
  if (context === null) {
    throw new Error(
      'No context provided: useOlMap() can only be used in a descendant of <OlMap>'
    )
  }
  return context
}
