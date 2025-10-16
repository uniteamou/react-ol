import { useCallback, useEffect, useRef, useState } from 'react'
import type { Overlay } from 'ol'
import { LineString, type Geometry } from 'ol/geom.js'
import { getLength } from 'ol/sphere.js'

import { useOlDraw } from './ol-draw.js'
import { OlOverlay } from './ol-overlay-component.js'
import { useOlDrawEventListener } from './use-ol-draw-event-listener.js'
import type BaseEvent from 'ol/events/Event.js'

type GeometryEvent = (event: Event | BaseEvent) => unknown
type DrawEventListener = Parameters<typeof useOlDrawEventListener>[2]

export function OlDrawMesureTool() {
  const draw = useOlDraw()
  const overlayRef = useRef<Overlay | null>(null)
  const [setCurrentGeom] = useGeometryChangeHandler(draw, overlayRef)

  const handleDrawStart: DrawEventListener = useCallback(
    function handleDrawStart(evt) {
      const geometry = evt.feature.getGeometry()
      if (!geometry) return
      setCurrentGeom(geometry)
    },
    []
  )
  useOlDrawEventListener(draw, 'drawstart', handleDrawStart)

  const handleDrawEnd: DrawEventListener = useCallback(
    function handleDrawEnd() {
      const element = overlayRef.current?.getElement()
      if (element) element.innerHTML = ''
      setCurrentGeom(null)
    },
    []
  )
  useOlDrawEventListener(draw, 'drawend', handleDrawEnd)
  useOlDrawEventListener(draw, 'drawabort', handleDrawEnd)

  return (
    <div>
      <OlOverlay
        ref={overlayRef}
        positioning="bottom-center"
        className="ol-tooltip ol-tooltip-measure"
        offset={[0, -15]}
        insertFirst={false}
        stopEvent={false}
      />
    </div>
  )
}

function useGeometryChangeHandler(
  draw: ReturnType<typeof useOlDraw>,
  overlayRef: ReturnType<typeof useRef<Overlay | null>>
) {
  const [currentGeom, setCurrentGeom] = useState<Geometry | null>(null)

  const handleGeometryChange: GeometryEvent = useCallback(
    (event) => {
      const overlay = overlayRef.current
      const geom = event.target
      if (!overlay || !(geom instanceof LineString)) return

      const div = overlay.getElement()
      if (!div) return

      const lengthOutput = formatLength(geom)
      const tooltipCoord = geom.getLastCoordinate()
      div.innerHTML = lengthOutput
      overlay.setPosition(tooltipCoord)
    },
    [overlayRef.current]
  )

  useEffect(() => {
    if (!draw.getActive() || !currentGeom) return
    currentGeom.on('change', handleGeometryChange)

    return () => {
      currentGeom.un('change', handleGeometryChange)
    }
  }, [draw, currentGeom])

  return [setCurrentGeom] as const
}

function formatLength(line: LineString) {
  const length = getLength(line)
  if (length > 100) {
    return `${m2km(length)} km`
  }

  return `${length.toFixed(2)} m`
}

function m2km(v: number) {
  return Math.round((v / 1000) * 100) / 100
}
