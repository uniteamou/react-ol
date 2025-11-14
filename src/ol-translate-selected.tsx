import React, { useImperativeHandle, useMemo, useState } from 'react'
import { Translate } from 'ol/interaction'

import { useOlLayerSelect } from './ol-select'
import { OlTranslate, type OlTranslateProps } from './ol-translate'

type OlTranslateSelectedProps = Omit<OlTranslateProps, 'ref'> & {
  ref?: React.Ref<Translate | null>
}

/**
 * Translate interaction component that automatically translates currently selected features.
 * Integrates with OlSelect to provide translate capabilities for the active selection.
 * Must be used within an OlSelect context.
 *
 * @param props.initialOptions - Configuration options for the translate interaction
 * @param props.ref - Ref to expose the Translate interaction instance
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
export function OlTranslateSelected(props: OlTranslateSelectedProps) {
  const select = useOlLayerSelect()
  const [translate, setTranslate] = useState<Translate | null>(null)

  useImperativeHandle<Translate | null, Translate | null>(
    props.ref,
    () => translate!,
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
