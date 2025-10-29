import React from 'react'

import { OlModify } from './ol-modify.jsx'
import { useOlLayerSelect } from './ol-select.jsx'

export function OlModifySelected(props: React.PropsWithChildren) {
  const select = useOlLayerSelect()

  return (
    <OlModify initialOptions={{ features: select.getFeatures() }}>
      {props.children}
    </OlModify>
  )
}
