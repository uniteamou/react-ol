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
import type { Options as TranslateOptions } from 'ol/interaction/Translate.js'

import { useOlMap } from './ol-map.jsx'
import TranslateMiddle from './translate-middle.js'

export type OlTranslateMiddleProps = PropsWithChildren<{
  initialOptions?: TranslateOptions
}>

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

export function useOlTranslateMiddle() {
  const context = useContext(OlTranslateMiddleComponentContext)
  if (context === null) {
    throw new Error(
      'No context provided: useOlTranslateMiddle() can only be used in a descendant of <OlTransalteMiddle>'
    )
  }
  return context
}
