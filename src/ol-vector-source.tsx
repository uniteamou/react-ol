import {
  createContext,
  forwardRef,
  type PropsWithChildren,
  type Ref,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import Feature, { type FeatureLike } from 'ol/Feature.js'
import { Geometry } from 'ol/geom.js'
import VectorSource from 'ol/source/Vector.js'

import { useOlVectorLayer } from './ol-vector-layer.jsx'

type OlVectorSourceType = VectorSource<Feature<Geometry>>

export const OlVectorSource = forwardRef(OlVectorSourceComponent)
type OlVectorSourceProps = PropsWithChildren & {
  initialOptions?: ConstructorParameters<
    typeof VectorSource<Feature<Geometry>>
  >[number]
}

const OlVectorSourceContext = createContext<OlVectorSourceType | null>(null)

function OlVectorSourceComponent(
  { initialOptions, children }: OlVectorSourceProps,
  forwardedRef: Ref<OlVectorSourceType | null>
) {
  const [source] = useState(() => new VectorSource(initialOptions))
  useImperativeHandle(forwardedRef, () => source, [source])
  const layer = useOlVectorLayer()

  useEffect(() => {
    layer.setSource(source as VectorSource<FeatureLike>)
    return () => {
      layer.setSource(null)
    }
  }, [layer, source])

  return (
    <OlVectorSourceContext.Provider value={source}>
      {children}
    </OlVectorSourceContext.Provider>
  )
}

export function useOlVectorSource() {
  const context = useContext(OlVectorSourceContext)
  if (context === null) {
    throw new Error(
      'No context provided: useOlVectorSource() can only be used in a descendant of <OlVectorSource>'
    )
  }

  return context
}
