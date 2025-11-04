import React, { useEffect } from 'react'
import { Select } from 'ol/interaction'
import { SelectEvent } from 'ol/interaction/Select'

type SelectEventParams = Parameters<Select['on']>

/**
 * Type representing valid event types for OpenLayers Select interaction events.
 */
export type SelectEventType =
  | SelectEventParams[0]
  | SelectEventParams[0][number]

/**
 * Type for select event listener callback functions.
 */
export type SelectListener = (event: SelectEvent) => unknown

/**
 * Hook to attach an event listener to an OpenLayers Select interaction.
 * Automatically handles cleanup when the component unmounts or dependencies change.
 *
 * @param select - The OpenLayers Select interaction instance (null-safe)
 * @param type - The type of select event to listen for (e.g., 'select')
 * @param listener - The callback function to execute when the event fires
 * @returns The Select interaction instance
 *
 * @example
 * ```tsx
 * const select = useOlLayerSelect()
 * useOlSelectEventListener(select, 'select', (evt) => {
 *   console.log('Selected features', evt.selected)
 * })
 * ```
 */
export function useOlSelectEventListener(
  select: Select | null,
  type: SelectEventType,
  listener: SelectListener
) {
  useEffect(() => {
    if (!select) return

    const isTypeArray = Array.isArray(type)
    const _type = isTypeArray ? type : [type]
    select.on(_type, listener as SelectEventParams[1])

    return () => {
      select.un(_type, listener as SelectEventParams[1])
    }
  }, [select, type, listener])

  return select
}
