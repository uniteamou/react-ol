import {
  createContext,
  forwardRef,
  type Ref,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { Snap } from 'ol/interaction.js'
import type { Options as SnapOptions } from 'ol/interaction/Snap.js'

import { useOlMap } from './ol-map.jsx'
import { useOlVectorSource } from './ol-vector-source.jsx'

type OlSnapProps = React.PropsWithChildren<{
  initialOptions?: Partial<SnapOptions>
}>

export const OlSnap = forwardRef<Snap | null, OlSnapProps>(OlSnapComponent)

const OlSnapComponentContext = createContext<Snap | null>(null)

function OlSnapComponent(props: OlSnapProps, forwardedRef: Ref<Snap | null>) {
  const map = useOlMap()
  const source = useOlVectorSource()
  const [snap] = useState(
    () =>
      new Snap({
        source,
        ...props.initialOptions,
      })
  )

  useImperativeHandle(forwardedRef, () => snap, [snap])

  useEffect(() => {
    map.addInteraction(snap)
    return () => {
      map.removeInteraction(snap)
    }
  }, [map, snap])

  return (
    <OlSnapComponentContext.Provider value={snap}>
      {props.children}
    </OlSnapComponentContext.Provider>
  )
}

export function useOlSnapComponent() {
  const context = useContext(OlSnapComponentContext)
  if (context === null) {
    throw new Error(
      'No context provided: useOlSnapComponent() can only be used in a descendant of <OlSnapComponent>'
    )
  }
  return context
}
