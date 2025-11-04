import React, { useEffect } from 'react'
import { Translate } from 'ol/interaction'
import { TranslateEvent } from 'ol/interaction/Translate'

import type TranslateMiddle from './translate-middle'

type TranslateEventParams = Parameters<Translate['on']>

/**
 * Type representing valid event types for OpenLayers Translate interaction events.
 */
export type TranslateEventType =
  | TranslateEventParams[0]
  | TranslateEventParams[0][number]

/**
 * Type for translate event listener callback functions.
 */
export type TranslateListener = (event: TranslateEvent) => unknown

/**
 * Hook to attach an event listener to an OpenLayers Translate or TranslateMiddle interaction.
 * Automatically handles cleanup when the component unmounts or dependencies change.
 *
 * @param translate - The OpenLayers Translate or TranslateMiddle interaction instance (null-safe)
 * @param type - The type of translate event to listen for (e.g., 'translatestart', 'translateend')
 * @param listener - The callback function to execute when the event fires
 * @returns The translate interaction instance
 *
 * @example
 * ```tsx
 * const translate = useOlTranslate()
 * useOlTranslateEventListener(translate, 'translateend', (evt) => {
 *   console.log('Translation complete', evt.features)
 * })
 * ```
 */
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
