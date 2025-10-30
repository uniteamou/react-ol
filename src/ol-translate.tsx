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
import { Translate } from 'ol/interaction'
import type { Options as TranslateOptions } from 'ol/interaction/Translate'

import { useOlMap } from './ol-map'
import { useOlVectorLayer } from './ol-vector-layer'

export type OlTranslateProps = PropsWithChildren<{
  initialOptions?: TranslateOptions
}>

export const OlTranslate = forwardRef<Translate | null, OlTranslateProps>(
  OlTranslateComponent
)

const OlTranslateComponentContext = createContext<Translate | null>(null)

function OlTranslateComponent(
  { initialOptions, children }: OlTranslateProps,
  forwardedRef: Ref<Translate | null>
) {
  const map = useOlMap()
  const [translate] = useState(() => new Translate(initialOptions))

  useImperativeHandle(forwardedRef, () => translate, [translate])

  useEffect(() => {
    map.addInteraction(translate)
    return () => {
      map.removeInteraction(translate)
    }
  }, [map, translate])

  return (
    <OlTranslateComponentContext.Provider value={translate}>
      {children}
    </OlTranslateComponentContext.Provider>
  )
}

export const OlLayerTranslate = forwardRef(LayerTranslateComponent)

function LayerTranslateComponent(
  props: OlTranslateProps,
  forwardedRef: Ref<Translate | null>
) {
  const layer = useOlVectorLayer()
  const initialOptions = { layers: [layer], ...props.initialOptions }

  return <OlTranslate ref={forwardedRef} initialOptions={initialOptions} />
}

export function useOlTranslate() {
  const context = useContext(OlTranslateComponentContext)
  if (context === null) {
    throw new Error(
      'No context provided: useOlTranslate() can only be used in a descendant of <OlTransalte>'
    )
  }
  return context
}
