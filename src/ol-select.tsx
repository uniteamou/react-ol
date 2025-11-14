import React, {
  createContext,
  type PropsWithChildren,
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
  ref?: React.RefObject<Select | null>
}>

const OlLayerSelectContext = createContext<Select | null>(null)

/**
 * OpenLayers Select interaction component for selecting features on the map.
 * Allows users to click features to select them.
 * Must be used within an OlMap.
 *
 * @param props.initialOptions - Configuration options for the select interaction
 * @param props.children - Child components to render within the select context
 * @param props.ref - Ref to expose the Select interaction instance
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
export function OlSelect({
  initialOptions,
  children,
  ref,
}: OlFeatureSelectProps) {
  const map = useOlMap()
  const [select] = useState(() => new Select(initialOptions))

  useImperativeHandle(ref, () => select, [select])

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
 * @param props.ref - Ref to expose the Select interaction instance
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
export function OlLayerSelect(props: OlFeatureSelectProps) {
  const layer = useOlVectorLayer()
  const initialOptions = { layers: [layer], ...props.initialOptions }

  return (
    <OlSelect ref={props.ref} initialOptions={initialOptions}>
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
