import React, {
  forwardRef,
  type Ref,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { Translate } from 'ol/interaction'

import { useOlLayerSelect } from './ol-select'
import { OlTranslate, type OlTranslateProps } from './ol-translate'

type OlTranslateSelectedProps = OlTranslateProps

/**
 * Translate interaction component that automatically translates currently selected features.
 * Integrates with OlSelect to provide translate capabilities for the active selection.
 * Must be used within an OlSelect context.
 *
 * @param props.initialOptions - Configuration options for the translate interaction
 * @param ref - Forwarded ref to expose the Translate interaction instance
 *
 * @example
 * ```tsx
 * <OlSelect>
 *   <OlTranslateSelected ref={translateRef}>
 *     {children}
 *   </OlTranslateSelected>
 * </OlSelect>
 * ```
 */
export const OlTranslateSelected = forwardRef<
  Translate | null,
  OlTranslateSelectedProps
>(OlTranslateSelectedComponent)

export function OlTranslateSelectedComponent(
  props: OlTranslateSelectedProps,
  forwardedRef: Ref<Translate | null>
) {
  const select = useOlLayerSelect()
  const [translate, setTranslate] = useState<Translate | null>(null)

  useImperativeHandle<Translate | null, Translate | null>(
    forwardedRef,
    () => translate,
    [translate]
  )

  const initialOptions: OlTranslateSelectedProps['initialOptions'] = useMemo(
    () => ({
      ...props.initialOptions,
      features: select.getFeatures(),
    }),
    [select, props.initialOptions]
  )

  return (
    <OlTranslate
      {...props}
      ref={setTranslate}
      initialOptions={initialOptions}
    />
  )
}
