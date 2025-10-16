import type React from 'react'

import { OlModify } from './ol-modify.js'
import { useOlLayerSelect } from './ol-select.js'

export function OlModifySelected(props: React.PropsWithChildren) {
  const select = useOlLayerSelect()

  return (
    <OlModify initialOptions={{ features: select.getFeatures() }}>
      {props.children}
    </OlModify>
  )
}
