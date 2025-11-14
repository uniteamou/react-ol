import React, {
  createContext,
  type PropsWithChildren,
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

type OlVectorSourceProps = PropsWithChildren & {
  initialOptions?: ConstructorParameters<
    typeof VectorSource<Feature<Geometry>>
  >[number]
  ref?: React.RefObject<OlVectorSourceType | null>
}

const OlVectorSourceContext = createContext<OlVectorSourceType | null>(null)

/**
 * OpenLayers vector source component for providing vector feature data to a vector layer.
 * Must be used as a child of OlVectorLayer.
 *
 * @param props.initialOptions - Configuration options for the vector source
 * @param props.children - Child components to render within the source context (typically features)
 * @param props.ref - Ref to expose the VectorSource instance
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
export function OlVectorSource({
  initialOptions,
  children,
  ref,
}: OlVectorSourceProps) {
  const [source] = useState(() => new VectorSource(initialOptions))
  useImperativeHandle(ref, () => source, [source])
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
