import { useEffect } from 'react'
import { Draw } from 'ol/interaction'
import { DrawEvent } from 'ol/interaction/Draw'

type DrawEventParams = Parameters<Draw['on']>

/**
 * Type representing valid event types for OpenLayers Draw interaction events.
 */
export type DrawEventType = DrawEventParams[0] | DrawEventParams[0][number]

/**
 * Type for draw event listener callback functions.
 */
export type DrawListener = (event: DrawEvent) => unknown

/**
 * Hook to attach an event listener to an OpenLayers Draw interaction.
 * Automatically handles cleanup when the component unmounts or dependencies change.
 *
 * @param draw - The OpenLayers Draw interaction instance (null-safe)
 * @param type - The type of draw event to listen for (e.g., 'drawstart', 'drawend', 'drawabort')
 * @param listener - The callback function to execute when the event fires
 *
 * @example
 * ```tsx
 * const draw = useOlDraw()
 * useOlDrawEventListener(draw, 'drawend', (evt) => {
 *   console.log('Feature drawn', evt.feature)
 * })
 * ```
 */
export function useOlDrawEventListener(
  draw: Draw | null,
  type: DrawEventType,
  listener: DrawListener
) {
  useEffect(() => {
    if (!draw) return
    const isTypeArray = Array.isArray(type)
    const _type = isTypeArray ? type : [type]
    draw.on(_type, listener as DrawEventParams[1])

    return () => {
      draw.un(_type, listener as DrawEventParams[1])
    }
  }, [draw, type, listener])
}
