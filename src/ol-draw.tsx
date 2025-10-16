import {
  createContext,
  forwardRef,
  type Ref,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { Draw } from 'ol/interaction.js'
import type { Options as DrawOptions } from 'ol/interaction/Draw.js'

import { useOlMap } from './ol-map.js'
import { useOlVectorSource } from './ol-vector-source.js'

type OlDrawProps = {
  initialOptions?: Partial<DrawOptions>
} & {
  type: DrawOptions['type']
} & React.PropsWithChildren

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

export function useOlDraw() {
  const context = useContext(OlDrawComponentContext)
  if (context === null) {
    throw new Error(
      'No context provided: useOlDraw() can only be used in a descendant of <OlDrawComponent>'
    )
  }
  return context
}
