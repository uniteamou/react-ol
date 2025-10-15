import { getCenter, getHeight, getWidth } from 'ol/extent'
import {
  forwardRef,
  type Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import type { Options as ModifyOptions } from 'ol/interaction/Modify'

import Feature, { type FeatureLike } from 'ol/Feature'
import { Geometry, LineString, MultiPoint, Point, Polygon } from 'ol/geom'
import Style from 'ol/style/Style'

import { Modify } from 'ol/interaction'
import CircleStyle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'

import { OlModify } from './ol-modify'
import {
  type ModifyListener,
  useOlModifyEventListener,
} from './use-ol-modify-event-listener'

type OlModifyProps = { initialOptions?: Partial<ModifyOptions> }

export const OlFeatureModifyScale = forwardRef<Modify | null, OlModifyProps>(
  OlFeatureModifyScaleComponent
)

function OlFeatureModifyScaleComponent(
  props: OlModifyProps,
  forwardedRef: Ref<Modify | null>
) {
  const [modify, setModify] = useState<Modify | null>(null)

  useImperativeHandle(forwardedRef, () => modify, [modify])

  useEffect(() => {
    if (!modify) return
    const styleFn = modify.getOverlay().getStyleFunction()!

    modify.getOverlay().setStyle((feature, resolution) => {
      feature.get('features').forEach(updateModifyGeometry.bind(null, feature))
      return styleFn(feature, resolution)
    })
  }, [modify])

  useOlModifyEventListener(modify, 'modifystart', addModifyGeometry)
  useOlModifyEventListener(modify, 'modifyend', removeModifyGeometry)

  return <OlModify ref={setModify} {...props} />
}

function updateModifyGeometry(
  feature: FeatureLike,
  modifyFeature: Feature<Geometry>
) {
  const modifyGeometry = modifyFeature.get('modifyGeometry')
  if (!modifyGeometry) return

  const point = (feature.getGeometry()! as Point).getCoordinates()
  let modifyPoint = modifyGeometry.point
  if (!modifyPoint) {
    modifyPoint = point
    modifyGeometry.point = modifyPoint
    modifyGeometry.geometryInitial = modifyGeometry.geometry
    const result = calculateCenter(modifyGeometry.geometryInitial)
    modifyGeometry.center = result.center
    modifyGeometry.minRadius = result.minRadius
  }

  const center = modifyGeometry.center
  const minRadius = modifyGeometry.minRadius
  let dx = modifyPoint[0] - center[0]
  let dy = modifyPoint[1] - center[1]
  const initialRadius = Math.sqrt(dx * dx + dy * dy)
  if (!point[0] || !point[1]) return
  if (initialRadius > minRadius) {
    dx = point[0] - center[0]
    dy = point[1] - center[1]
    const currentRadius = Math.sqrt(dx * dx + dy * dy)
    if (currentRadius > 0) {
      const geometry = modifyGeometry.geometryInitial.clone()
      geometry.scale(currentRadius / initialRadius, undefined, center)
      modifyGeometry.geometry = geometry
    }
  }
}

function removeModifyGeometry(event: Parameters<ModifyListener>[0]) {
  event.features.forEach(function (feature) {
    const modifyGeometry = feature.get('modifyGeometry')
    if (!modifyGeometry) return

    feature.setGeometry(modifyGeometry.geometry)
    feature.unset('modifyGeometry', true)
  })
}

function addModifyGeometry(event: Parameters<ModifyListener>[0]) {
  event.features.forEach(function (feature) {
    if (!feature || !feature.getGeometry()) return

    feature.set(
      'modifyGeometry',
      { geometry: feature.getGeometry()!.clone() },
      true
    )
  })
}

const modifyPointsStyle = new CircleStyle({
  radius: 4,
  fill: new Fill({ color: '#000000' }),
})

export function styleWithModifyGeometry(feature: FeatureLike) {
  const modifyGeometry = feature.get('modifyGeometry')
  const geometry = modifyGeometry
    ? modifyGeometry.geometry
    : feature.getGeometry()
  const result = calculateCenter(geometry)
  const coordinates = result.coordinates
  if (!coordinates) return null

  const { minRadius, sqDistances } = result
  if (!sqDistances) return
  const rsq = minRadius * minRadius
  const points = coordinates.filter(
    (_, index) => (sqDistances[index] || -Infinity) > rsq
  )

  return new Style({
    geometry: new MultiPoint(points),
    image: modifyPointsStyle,
  })
}

function calculateCenter(geometry: Geometry) {
  let center, coordinates, minRadius
  const type = geometry.getType()
  switch (type) {
    case 'Polygon':
      coordinates = (geometry as Polygon)?.getCoordinates()[0]?.slice(1)
      center = calculatePolygonCenter(geometry as Polygon)
      break
    case 'LineString':
      coordinates = (geometry as LineString).getCoordinates()
      center = (geometry as LineString).getCoordinateAt(0.5)
      break
    default:
      center = getCenter(geometry.getExtent())
  }

  let sqDistances: number[] = []
  if (coordinates) {
    sqDistances = coordinates
      .map(function (coordinate) {
        if (!coordinate[0] || !coordinate[1] || !center[0] || !center[1])
          return -1
        const dx = coordinate[0] - center[0]
        const dy = coordinate[1] - center[1]
        return dx * dx + dy * dy
      })
      .filter((v) => v !== -1)
    minRadius = Math.sqrt(Math.max(...sqDistances)) / 3
  } else {
    minRadius =
      Math.max(
        getWidth(geometry.getExtent()),
        getHeight(geometry.getExtent())
      ) / 3
  }
  return {
    center: center,
    coordinates: coordinates,
    minRadius: minRadius,
    sqDistances: sqDistances,
  }
}

function calculatePolygonCenter(polygon: Polygon) {
  const coordinates = polygon?.getCoordinates()[0]?.slice(1)
  let x = 0,
    y = 0,
    i = 0

  coordinates?.forEach((coordinate) => {
    if (!coordinate[0] || !coordinate[1]) return
    x += coordinate[0]
    y += coordinate[1]
    i++
  })

  return [x / i, y / i]
}
