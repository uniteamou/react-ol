import { Modify } from 'ol/interaction.js'
import { useEffect } from 'react'
import { ModifyEvent } from 'ol/interaction/Modify.js'

type ModifyEventParams = Parameters<Modify['on']>
export type ModifyEventType =
  | ModifyEventParams[0]
  | ModifyEventParams[0][number]
export type ModifyListener = (event: ModifyEvent) => unknown

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

  return modify
}
