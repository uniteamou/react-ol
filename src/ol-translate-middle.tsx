import React, {
  createContext,
  forwardRef,
  type PropsWithChildren,
  type Ref,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import type { Options as TranslateOptions } from 'ol/interaction/Translate'

import { useOlMap } from './ol-map'
import TranslateMiddle from './translate-middle'

export type OlTranslateMiddleProps = PropsWithChildren<{
  initialOptions?: TranslateOptions
}>

/**
 * Custom Translate interaction component that allows dragging line segment midpoints.
 * When a user clicks on the middle of a line segment, both endpoints move together.
 * Must be used within an OlMap.
 *
 * @param props.initialOptions - Configuration options for the translate interaction
 * @param props.children - Child components
 * @param ref - Forwarded ref to expose the TranslateMiddle interaction instance
 *
 * @example
 * ```tsx
 * <OlMap>
 *   <OlTranslateMiddle ref={translateRef} initialOptions={{ hitTolerance: 10 }}>
 *     {children}
 *   </OlTranslateMiddle>
 * </OlMap>
 * ```
 */
export const OlTranslateMiddle = forwardRef<
  TranslateMiddle | null,
  OlTranslateMiddleProps
>(OlTranslateMiddleComponent)

const OlTranslateMiddleComponentContext = createContext<TranslateMiddle | null>(
  null
)

function OlTranslateMiddleComponent(
  { initialOptions, children }: OlTranslateMiddleProps,
  forwardedRef: Ref<TranslateMiddle | null>
) {
  const map = useOlMap()
  const [translateMiddle] = useState(() => new TranslateMiddle(initialOptions))

  useImperativeHandle(forwardedRef, () => translateMiddle, [translateMiddle])

  useEffect(() => {
    map.addInteraction(translateMiddle)
    return () => {
      map.removeInteraction(translateMiddle)
    }
  }, [map, translateMiddle])

  return (
    <OlTranslateMiddleComponentContext.Provider value={translateMiddle}>
      {children}
    </OlTranslateMiddleComponentContext.Provider>
  )
}

/**
 * Hook to access the TranslateMiddle interaction instance from the nearest parent OlTranslateMiddle component.
 * Must be used within a descendant of OlTranslateMiddle.
 *
 * @returns The TranslateMiddle interaction instance
 * @throws {Error} If called outside of an OlTranslateMiddle component
 *
 * @example
 * ```tsx
 * function TranslateMiddleControl() {
 *   const translateMiddle = useOlTranslateMiddle()
 *   // Use translateMiddle instance
 *   return null
 * }
 * ```
 */
export function useOlTranslateMiddle() {
  const context = useContext(OlTranslateMiddleComponentContext)
  if (context === null) {
    throw new Error(
      'No context provided: useOlTranslateMiddle() can only be used in a descendant of <OlTransalteMiddle>'
    )
  }
  return context
}
