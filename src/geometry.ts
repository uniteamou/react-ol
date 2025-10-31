import type { Coordinate } from 'ol/coordinate'
import {
  Geometry,
  GeometryCollection,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  SimpleGeometry,
} from 'ol/geom'

/**
 * Extracts an array of individual geometries from a geometry object.
 * Handles multi-geometries and geometry collections by returning their constituent parts.
 * For simple geometries, returns an array containing the geometry itself.
 *
 * @param g - The OpenLayers geometry to decompose
 * @returns Array of individual geometry objects
 *
 * @example
 * ```tsx
 * const multiPoint = new MultiPoint([[0,0], [1,1]])
 * const points = getGeometriesFromGeometry(multiPoint) // Returns array of Point geometries
 * ```
 */
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

/**
 * Extracts all coordinates from a geometry object, flattening nested structures.
 * Handles geometry collections and all geometry types, returning a flat array of coordinates.
 *
 * @param g - The OpenLayers geometry to extract coordinates from
 * @returns Flat array of coordinate arrays
 *
 * @example
 * ```tsx
 * const line = new LineString([[0,0], [1,1], [2,2]])
 * const coords = getCoordinatesFromGeometry(line) // Returns [[0,0], [1,1], [2,2]]
 * ```
 */
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
