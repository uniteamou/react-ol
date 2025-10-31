import React from 'react'

import { OlModify } from './ol-modify'
import { useOlLayerSelect } from './ol-select'

/**
 * Modify interaction component that automatically modifies currently selected features.
 * Integrates with OlSelect to provide modify capabilities for the active selection.
 * Must be used within an OlSelect context.
 *
 * @param props.children - Child components
 *
 * @example
 * ```tsx
 * <OlSelect>
 *   <OlModifySelected>
 *     {children}
 *   </OlModifySelected>
 * </OlSelect>
 * ```
 */
export function OlModifySelected(props: React.PropsWithChildren) {
  const select = useOlLayerSelect()

  return (
    <OlModify initialOptions={{ features: select.getFeatures() }}>
      {props.children}
    </OlModify>
  )
}
