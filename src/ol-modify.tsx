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
import { Modify } from 'ol/interaction'
import type { Options as ModifyOptions } from 'ol/interaction/Modify'

import { useOlMap } from './ol-map'
import { useOlVectorSource } from './ol-vector-source'

type OlModifyProps = PropsWithChildren<{
  initialOptions?: Partial<ModifyOptions>
}>

export const OlModify = forwardRef<Modify | null, OlModifyProps>(
  OlModifyComponent
)

const OlModifyComponentContext = createContext<Modify | null>(null)

function OlModifyComponent(
  props: OlModifyProps,
  forwardedRef: Ref<Modify | null>
) {
  const map = useOlMap()
  const source = useOlVectorSource()
  const [modify] = useState(
    () => new Modify({ source, ...props.initialOptions })
  )

  useImperativeHandle(forwardedRef, () => modify, [modify])

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

export function useOlModify() {
  const context = useContext(OlModifyComponentContext)
  if (context === null) {
    throw new Error(
      'No context provided: useOlModify() can only be used in a descendant of <OlModifyComponent>'
    )
  }
  return context
}
