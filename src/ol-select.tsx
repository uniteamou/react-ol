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
import { Select } from 'ol/interaction'
import type { Options as SelectOptions } from 'ol/interaction/Select'

import { useOlMap } from './ol-map'
import { useOlVectorLayer } from './ol-vector-layer'

type OlFeatureSelectProps = PropsWithChildren<{
  initialOptions?: SelectOptions
}>

/**
 * OpenLayers Select interaction component for selecting features on the map.
 * Allows users to click features to select them.
 * Must be used within an OlMap.
 *
 * @param props.initialOptions - Configuration options for the select interaction
 * @param props.children - Child components to render within the select context
 * @param ref - Forwarded ref to expose the Select interaction instance
 *
 * @example
 * ```tsx
 * <OlMap>
 *   <OlSelect ref={selectRef} initialOptions={{ multi: true }}>
 *     {children}
 *   </OlSelect>
 * </OlMap>
 * ```
 */
export const OlSelect = forwardRef<Select | null, OlFeatureSelectProps>(
  OlSelectComponent
)

const OlLayerSelectContext = createContext<Select | null>(null)
function OlSelectComponent(
  { initialOptions, children }: OlFeatureSelectProps,
  forwardedRef: Ref<Select | null>
) {
  const map = useOlMap()
  const [select] = useState(() => new Select(initialOptions))

  useImperativeHandle(forwardedRef, () => select, [select])

  useEffect(() => {
    map.addInteraction(select)
    return () => {
      map.removeInteraction(select)
    }
  }, [map, select])

  return (
    <OlLayerSelectContext.Provider value={select}>
      {children}
    </OlLayerSelectContext.Provider>
  )
}

/**
 * Select interaction component scoped to a specific vector layer.
 * Automatically configures the select interaction to only select features from the parent layer.
 * Must be used within an OlVectorLayer.
 *
 * @param props.initialOptions - Configuration options for the select interaction
 * @param props.children - Child components
 * @param ref - Forwarded ref to expose the Select interaction instance
 *
 * @example
 * ```tsx
 * <OlVectorLayer visible={true}>
 *   <OlLayerSelect ref={selectRef}>
 *     {children}
 *   </OlLayerSelect>
 * </OlVectorLayer>
 * ```
 */
export const OlLayerSelect = forwardRef(LayerSelectComponent)

function LayerSelectComponent(
  props: OlFeatureSelectProps,
  forwardedRef: Ref<Select | null>
) {
  const layer = useOlVectorLayer()
  const initialOptions = { layers: [layer], ...props.initialOptions }

  return (
    <OlSelect ref={forwardedRef} initialOptions={initialOptions}>
      {props.children}
    </OlSelect>
  )
}

/**
 * Hook to access the OpenLayers Select interaction instance from the nearest parent OlSelect or OlLayerSelect component.
 * Must be used within a descendant of OlSelect/OlLayerSelect.
 *
 * @returns The OpenLayers Select interaction instance
 * @throws {Error} If called outside of an OlSelect/OlLayerSelect component
 *
 * @example
 * ```tsx
 * function SelectControl() {
 *   const select = useOlLayerSelect()
 *   // Use select instance
 *   return null
 * }
 * ```
 */
export function useOlLayerSelect() {
  const context = useContext(OlLayerSelectContext)
  if (context === null) {
    throw new Error(
      'No context provided: useOlLayerSelect() can only be used in a descendant of <OlLayerSelect>'
    )
  }
  return context
}
