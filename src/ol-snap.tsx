import React, {
  createContext,
  forwardRef,
  type Ref,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { Snap } from 'ol/interaction'
import type { Options as SnapOptions } from 'ol/interaction/Snap'

import { useOlMap } from './ol-map'
import { useOlVectorSource } from './ol-vector-source'

type OlSnapProps = React.PropsWithChildren<{
  initialOptions?: Partial<SnapOptions>
}>

/**
 * OpenLayers Snap interaction component for snapping drawn features to existing features.
 * Enables vertex and edge snapping during draw/modify operations.
 * Must be used within an OlVectorSource context.
 *
 * @param props.initialOptions - Configuration options for the snap interaction
 * @param props.children - Child components
 * @param ref - Forwarded ref to expose the Snap interaction instance
 *
 * @example
 * ```tsx
 * <OlVectorSource>
 *   <OlSnap ref={snapRef} initialOptions={{ pixelTolerance: 10 }}>
 *     {children}
 *   </OlSnap>
 * </OlVectorSource>
 * ```
 */
export const OlSnap = forwardRef<Snap | null, OlSnapProps>(OlSnapComponent)

const OlSnapComponentContext = createContext<Snap | null>(null)

function OlSnapComponent(props: OlSnapProps, forwardedRef: Ref<Snap | null>) {
  const map = useOlMap()
  const source = useOlVectorSource()
  const [snap] = useState(
    () =>
      new Snap({
        source,
        ...props.initialOptions,
      })
  )

  useImperativeHandle(forwardedRef, () => snap, [snap])

  useEffect(() => {
    map.addInteraction(snap)
    return () => {
      map.removeInteraction(snap)
    }
  }, [map, snap])

  return (
    <OlSnapComponentContext.Provider value={snap}>
      {props.children}
    </OlSnapComponentContext.Provider>
  )
}

/**
 * Hook to access the OpenLayers Snap interaction instance from the nearest parent OlSnap component.
 * Must be used within a descendant of OlSnap.
 *
 * @returns The OpenLayers Snap interaction instance
 * @throws {Error} If called outside of an OlSnap component
 *
 * @example
 * ```tsx
 * function SnapControl() {
 *   const snap = useOlSnapComponent()
 *   // Use snap instance
 *   return null
 * }
 * ```
 */
export function useOlSnapComponent() {
  const context = useContext(OlSnapComponentContext)
  if (context === null) {
    throw new Error(
      'No context provided: useOlSnapComponent() can only be used in a descendant of <OlSnapComponent>'
    )
  }
  return context
}
