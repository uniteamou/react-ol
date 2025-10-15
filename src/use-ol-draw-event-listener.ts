import { Draw } from 'ol/interaction.js'
import { useEffect } from 'react'
import { DrawEvent } from 'ol/interaction/Draw'

type DrawEventParams = Parameters<Draw['on']>
export type DrawEventType = DrawEventParams[0] | DrawEventParams[0][number]
export type DrawListener = (event: DrawEvent) => unknown

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
