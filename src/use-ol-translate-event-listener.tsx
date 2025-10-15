import { Translate } from 'ol/interaction.js'
import { useEffect } from 'react'
import { TranslateEvent } from 'ol/interaction/Translate'
import type TranslateMiddle from './translate-middle'

type TranslateEventParams = Parameters<Translate['on']>
export type TranslateEventType =
  | TranslateEventParams[0]
  | TranslateEventParams[0][number]
export type TranslateListener = (event: TranslateEvent) => unknown

export function useOlTranslateEventListener(
  translate: Translate | TranslateMiddle | null,
  type: TranslateEventType,
  listener: TranslateListener
) {
  useEffect(() => {
    if (!translate) return

    const isTypeArray = Array.isArray(type)
    const _type = isTypeArray ? type : [type]
    translate.on(_type, listener as TranslateEventParams[1])

    return () => {
      translate.un(_type, listener as TranslateEventParams[1])
    }
  }, [translate, type, listener])

  return translate
}
