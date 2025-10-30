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

export function useOlLayerSelect() {
  const context = useContext(OlLayerSelectContext)
  if (context === null) {
    throw new Error(
      'No context provided: useOlMap() can only be used in a descendant of <OlMap>'
    )
  }
  return context
}
