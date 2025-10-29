import React, { useEffect, useState } from 'react'
import { View } from 'ol'
import type { ViewOptions } from 'ol/View.js'

import { useOlMap } from './ol-map.jsx'

type OlViewProps = ViewOptions & {
  center?: number[]
  zoom?: number
  rotation?: number
}
export function OlView({
  center,
  zoom,
  rotation,
  ...otherOptions
}: OlViewProps) {
  const [view] = useState(() => new View(otherOptions))
  const map = useOlMap()

  useEffect(() => {
    map.setView(view)
  }, [map, view])

  useEffect(() => {
    if (center && view) view.setCenter(center)
  }, [center, view])

  useEffect(() => {
    if (zoom && view) view.setZoom(zoom)
  }, [zoom, view])

  useEffect(() => {
    if (rotation && view) view.setRotation(rotation)
  }, [rotation, view])

  return <div data-testid="ol-view" />
}
