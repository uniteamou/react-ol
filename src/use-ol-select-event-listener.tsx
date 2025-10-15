import { Select } from 'ol/interaction.js'
import { useEffect } from 'react'
import { SelectEvent } from 'ol/interaction/Select'

type SelectEventParams = Parameters<Select['on']>
export type SelectEventType =
  | SelectEventParams[0]
  | SelectEventParams[0][number]
export type SelectListener = (event: SelectEvent) => unknown

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
