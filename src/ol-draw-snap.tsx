import React, { useCallback, useState } from 'react'
import type { Feature } from 'ol'
import type { Geometry } from 'ol/geom'

import { OlFeature } from './ol-feature'
import { OlSnap } from './ol-snap'
import { useOlDraw } from './ol-draw'
import { OlVectorLayer } from './ol-vector-layer'
import { OlVectorSource } from './ol-vector-source'
import { useOlDrawEventListener } from './use-ol-draw-event-listener'

type DrawEventListener = Parameters<typeof useOlDrawEventListener>[2]

export function OlDrawSnap() {
  const draw = useOlDraw()

  const [feature, setFeature] = useState<Feature<Geometry> | null>(null)

  const handleDrawStart: DrawEventListener = useCallback(
    function handleDrawStart(e) {
      setFeature(e.feature)
    },
    [setFeature]
  )

  useOlDrawEventListener(draw, 'drawstart', handleDrawStart)

  const handleDrawEnd: DrawEventListener = useCallback(
    function handleDrawEnd() {
      setFeature(null)
    },
    [setFeature]
  )
  useOlDrawEventListener(draw, 'drawend', handleDrawEnd)
  useOlDrawEventListener(draw, 'drawabort', handleDrawEnd)

  if (!feature) return null

  return (
    <OlVectorLayer visible>
      <OlVectorSource>
        <OlFeature feature={feature} />
        <OlSnap initialOptions={{ pixelTolerance: 4 }} />
      </OlVectorSource>
    </OlVectorLayer>
  )
}
