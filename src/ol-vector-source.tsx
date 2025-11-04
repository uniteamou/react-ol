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
import Feature, { type FeatureLike } from 'ol/Feature'
import { Geometry } from 'ol/geom'
import VectorSource from 'ol/source/Vector'

import { useOlVectorLayer } from './ol-vector-layer'

type OlVectorSourceType = VectorSource<Feature<Geometry>>

/**
 * OpenLayers vector source component for providing vector feature data to a vector layer.
 * Must be used as a child of OlVectorLayer.
 *
 * @param props.initialOptions - Configuration options for the vector source
 * @param props.children - Child components to render within the source context (typically features)
 * @param ref - Forwarded ref to expose the VectorSource instance
 *
 * @example
 * ```tsx
 * <OlVectorLayer visible={true}>
 *   <OlVectorSource ref={sourceRef} initialOptions={{ features: [] }}>
 *     <OlFeature />
 *   </OlVectorSource>
 * </OlVectorLayer>
 * ```
 */
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

/**
 * Hook to access the OpenLayers VectorSource instance from the nearest parent OlVectorSource component.
 * Must be used within a descendant of OlVectorSource.
 *
 * @returns The OpenLayers VectorSource instance
 * @throws {Error} If called outside of an OlVectorSource component
 *
 * @example
 * ```tsx
 * function FeatureControl() {
 *   const source = useOlVectorSource()
 *   // Use source instance
 *   return null
 * }
 * ```
 */
export function useOlVectorSource() {
  const context = useContext(OlVectorSourceContext)
  if (context === null) {
    throw new Error(
      'No context provided: useOlVectorSource() can only be used in a descendant of <OlVectorSource>'
    )
  }

  return context
}
