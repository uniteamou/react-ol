import React, {
  createContext,
  forwardRef,
  type Ref,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { Draw } from 'ol/interaction'
import type { Options as DrawOptions } from 'ol/interaction/Draw'

import { useOlMap } from './ol-map'
import { useOlVectorSource } from './ol-vector-source'

type OlDrawProps = {
  initialOptions?: Partial<DrawOptions>
} & {
  type: DrawOptions['type']
} & React.PropsWithChildren

/**
 * OpenLayers Draw interaction component for drawing new vector features.
 * Allows users to draw points, lines, polygons, and other geometries.
 * Must be used within an OlVectorSource context.
 *
 * @param props.type - The geometry type to draw (e.g., 'Point', 'LineString', 'Polygon')
 * @param props.initialOptions - Configuration options for the draw interaction
 * @param props.children - Child components to render within the draw context
 * @param ref - Forwarded ref to expose the Draw interaction instance
 *
 * @example
 * ```tsx
 * <OlVectorSource>
 *   <OlDraw ref={drawRef} type="LineString" initialOptions={{ freehand: false }}>
 *     <OlDrawMesureTool />
 *   </OlDraw>
 * </OlVectorSource>
 * ```
 */
export const OlDraw = forwardRef<Draw | null, OlDrawProps>(OlDrawComponent)

const OlDrawComponentContext = createContext<Draw | null>(null)

function OlDrawComponent(props: OlDrawProps, forwardedRef: Ref<Draw | null>) {
  const map = useOlMap()
  const source = useOlVectorSource()
  const [draw] = useState(
    () =>
      new Draw({
        source,
        type: props.type,
        ...props.initialOptions,
      })
  )

  useImperativeHandle(forwardedRef, () => draw, [draw])

  useEffect(() => {
    map.addInteraction(draw)
    return () => {
      map.removeInteraction(draw)
    }
  }, [map, draw])

  return (
    <OlDrawComponentContext.Provider value={draw}>
      {props.children}
    </OlDrawComponentContext.Provider>
  )
}

/**
 * Hook to access the OpenLayers Draw interaction instance from the nearest parent OlDraw component.
 * Must be used within a descendant of OlDraw.
 *
 * @returns The OpenLayers Draw interaction instance
 * @throws {Error} If called outside of an OlDraw component
 *
 * @example
 * ```tsx
 * function DrawControl() {
 *   const draw = useOlDraw()
 *   // Use draw instance
 *   return null
 * }
 * ```
 */
export function useOlDraw() {
  const context = useContext(OlDrawComponentContext)
  if (context === null) {
    throw new Error(
      'No context provided: useOlDraw() can only be used in a descendant of <OlDrawComponent>'
    )
  }
  return context
}
