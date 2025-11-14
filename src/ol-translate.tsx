import React, {
  createContext,
  type PropsWithChildren,
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
  ref?: React.Ref<Translate>
}>

const OlTranslateComponentContext = createContext<Translate | null>(null)

/**
 * OpenLayers Translate interaction component for moving features by dragging.
 * Allows users to click and drag features to reposition them.
 * Must be used within an OlMap.
 *
 * @param props.initialOptions - Configuration options for the translate interaction
 * @param props.children - Child components to render within the translate context
 * @param props.ref - Ref to expose the Translate interaction instance
 *
 * @example
 * ```tsx
 * <OlMap>
 *   <OlTranslate ref={translateRef} initialOptions={{ hitTolerance: 5 }}>
 *     {children}
 *   </OlTranslate>
 * </OlMap>
 * ```
 */
export function OlTranslate({
  initialOptions,
  children,
  ref,
}: OlTranslateProps) {
  const map = useOlMap()
  const [translate] = useState(() => new Translate(initialOptions))

  useImperativeHandle(ref, () => translate, [translate])

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

/**
 * Translate interaction component scoped to a specific vector layer.
 * Automatically configures the translate interaction to only move features from the parent layer.
 * Must be used within an OlVectorLayer.
 *
 * @param props.initialOptions - Configuration options for the translate interaction
 * @param props.ref - Ref to expose the Translate interaction instance
 *
 * @example
 * ```tsx
 * <OlVectorLayer visible={true}>
 *   <OlLayerTranslate ref={translateRef}>
 *     {children}
 *   </OlLayerTranslate>
 * </OlVectorLayer>
 * ```
 */
export function OlLayerTranslate(props: OlTranslateProps) {
  const layer = useOlVectorLayer()
  const initialOptions = {
    layers: [layer as unknown as import('ol/layer/Layer').default],
    ...props.initialOptions,
  }

  return <OlTranslate ref={props.ref} initialOptions={initialOptions} />
}

/**
 * Hook to access the OpenLayers Translate interaction instance from the nearest parent OlTranslate component.
 * Must be used within a descendant of OlTranslate/OlLayerTranslate.
 *
 * @returns The OpenLayers Translate interaction instance
 * @throws {Error} If called outside of an OlTranslate/OlLayerTranslate component
 *
 * @example
 * ```tsx
 * function TranslateControl() {
 *   const translate = useOlTranslate()
 *   // Use translate instance
 *   return null
 * }
 * ```
 */
export function useOlTranslate() {
  const context = useContext(OlTranslateComponentContext)
  if (context === null) {
    throw new Error(
      'No context provided: useOlTranslate() can only be used in a descendant of <OlTransalte>'
    )
  }
  return context
}
