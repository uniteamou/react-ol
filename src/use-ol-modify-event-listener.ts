import { useEffect } from 'react'
import { Modify } from 'ol/interaction'
import { ModifyEvent } from 'ol/interaction/Modify'

type ModifyEventParams = Parameters<Modify['on']>

/**
 * Type representing valid event types for OpenLayers Modify interaction events.
 */
export type ModifyEventType =
  | ModifyEventParams[0]
  | ModifyEventParams[0][number]

/**
 * Type for modify event listener callback functions.
 */
export type ModifyListener = (event: ModifyEvent) => unknown

/**
 * Hook to attach an event listener to an OpenLayers Modify interaction.
 * Automatically handles cleanup when the component unmounts or dependencies change.
 *
 * @param modify - The OpenLayers Modify interaction instance (null-safe)
 * @param type - The type of modify event to listen for (e.g., 'modifystart', 'modifyend')
 * @param listener - The callback function to execute when the event fires
 *
 * @example
 * ```tsx
 * const modify = useOlModify()
 * useOlModifyEventListener(modify, 'modifyend', (evt) => {
 *   console.log('Modification complete', evt.features)
 * })
 * ```
 */
export function useOlModifyEventListener(
  modify: Modify | null,
  type: ModifyEventType,
  listener: ModifyListener
) {
  useEffect(() => {
    if (!modify) return
    const isTypeArray = Array.isArray(type)
    const _type = isTypeArray ? type : [type]
    modify.on(_type, listener as ModifyEventParams[1])

    return () => {
      modify.un(_type, listener as ModifyEventParams[1])
    }
  }, [modify, type, listener])
}
