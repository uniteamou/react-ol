import type { Coordinate } from 'ol/coordinate.js'
import {
  Geometry,
  GeometryCollection,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  SimpleGeometry,
} from 'ol/geom.js'

export function getGeometriesFromGeometry(g: Geometry) {
  if (g instanceof GeometryCollection) {
    return g.getGeometries()
  }

  if (g instanceof MultiPoint) {
    return g.getPoints()
  }

  if (g instanceof MultiPolygon) {
    return g.getPolygons()
  }

  if (g instanceof MultiLineString) {
    return g.getLineStrings()
  }

  return [g]
}

export function getCoordinatesFromGeometry(g: Geometry): Coordinate[] {
  if (g instanceof GeometryCollection) {
    return g.getGeometries().map(getCoordinatesFromGeometry).flat()
  }

  if (g instanceof SimpleGeometry) {
    const coordinates = g.getCoordinates()
    if (!coordinates) return []
    if (Array.isArray(coordinates)) return coordinates
    return [coordinates]
  }

  return []
}
