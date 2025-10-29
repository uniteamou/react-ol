import React, {
  forwardRef,
  type Ref,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { Translate } from 'ol/interaction.js'

import { useOlLayerSelect } from './ol-select.jsx'
import { OlTranslate, type OlTranslateProps } from './ol-translate.jsx'

type OlTranslateSelectedProps = OlTranslateProps

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

  useImperativeHandle(forwardedRef, () => translate, [translate])

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
