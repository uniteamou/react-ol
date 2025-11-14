import React, {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { Modify } from 'ol/interaction'
import type { Options as ModifyOptions } from 'ol/interaction/Modify'

import { useOlMap } from './ol-map'
import { useOlVectorSource } from './ol-vector-source'

type OlModifyProps = PropsWithChildren<{
  initialOptions?: Partial<ModifyOptions>
  ref?: React.Ref<Modify>
}>

const OlModifyComponentContext = createContext<Modify | null>(null)

/**
 * OpenLayers Modify interaction component for editing feature geometries.
 * Allows users to click and drag feature vertices to modify their shape.
 * Must be used within an OlMap and requires a vector source context.
 *
 * @param props.initialOptions - Configuration options for the modify interaction
 * @param props.children - Child components to render within the modify context
 * @param props.ref - Ref to expose the Modify interaction instance
 *
 * @example
 * ```tsx
 * <OlMap>
 *   <OlVectorLayer visible={true}>
 *     <OlVectorSource>
 *       <OlModify ref={modifyRef} initialOptions={{ pixelTolerance: 10 }}>
 *         {children}
 *       </OlModify>
 *     </OlVectorSource>
 *   </OlVectorLayer>
 * </OlMap>
 * ```
 */
export function OlModify(props: OlModifyProps) {
  const map = useOlMap()
  const source = useOlVectorSource()
  const [modify] = useState(
    () => new Modify({ source, ...props.initialOptions })
  )

  useImperativeHandle(props.ref, () => modify, [modify])

  useEffect(() => {
    map.addInteraction(modify)
    return () => {
      map.removeInteraction(modify)
    }
  }, [map, modify])

  return (
    <OlModifyComponentContext.Provider value={modify}>
      {props.children}
    </OlModifyComponentContext.Provider>
  )
}

/**
 * Hook to access the OpenLayers Modify interaction instance from the nearest parent OlModify component.
 * Must be used within a descendant of OlModify.
 *
 * @returns The OpenLayers Modify interaction instance
 * @throws {Error} If called outside of an OlModify component
 *
 * @example
 * ```tsx
 * function ModifyControl() {
 *   const modify = useOlModify()
 *   // Use modify instance
 *   return null
 * }
 * ```
 */
export function useOlModify() {
  const context = useContext(OlModifyComponentContext)
  if (context === null) {
    throw new Error(
      'No context provided: useOlModify() can only be used in a descendant of <OlModifyComponent>'
    )
  }
  return context
}
