import React, { useEffect, useState } from 'react'
import { View } from 'ol'
import type { ViewOptions } from 'ol/View'

import { useOlMap } from './ol-map'

type OlViewProps = ViewOptions & {
  center?: number[]
  zoom?: number
  rotation?: number
}

/**
 * OpenLayers View component that manages the map's viewport (center, zoom, rotation).
 * Must be used as a child of OlMap.
 *
 * @param props - All standard OpenLayers ViewOptions plus reactive properties
 * @param props.center - Map center coordinates [x, y] (reactive)
 * @param props.zoom - Map zoom level (reactive)
 * @param props.rotation - Map rotation in radians (reactive)
 *
 * @example
 * ```tsx
 * <OlMap>
 *   <OlView center={[0, 0]} zoom={5} rotation={0} />
 * </OlMap>
 * ```
 */
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
