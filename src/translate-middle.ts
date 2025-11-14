import { Collection, Feature } from 'ol'
import type { Coordinate } from 'ol/coordinate'
import type { Geometry } from 'ol/geom'
import { LineString } from 'ol/geom'
import { Translate } from 'ol/interaction'
import { TranslateEvent, type Options } from 'ol/interaction/Translate'
import type { Map, MapBrowserEvent } from 'ol'
import type { Pixel } from 'ol/pixel'

/** Copied from Translate interaction **/
const TranslateEventType = {
  /**
   * Triggered upon feature translation start.
   * @event TranslateEvent#translatestart
   * @api
   */
  TRANSLATESTART: 'translatestart',
  /**
   * Triggered upon feature translation.
   * @event TranslateEvent#translating
   * @api
   */
  TRANSLATING: 'translating',
  /**
   * Triggered upon feature translation end.
   * @event TranslateEvent#translateend
   * @api
   */
  TRANSLATEEND: 'translateend',
}

/**
 * Custom OpenLayers Translate interaction that enables dragging line segment midpoints.
 * Extends the standard Translate interaction to detect clicks on segment midpoints
 * and move both endpoints of the segment together.
 *
 * @example
 * ```tsx
 * const translateMiddle = new TranslateMiddle({
 *   features: selectedFeatures,
 *   hitTolerance: 10
 * })
 * map.addInteraction(translateMiddle)
 * ```
 */
export class TranslateMiddle extends Translate {
  private hitTolerance: number
  private features: Collection<Feature<Geometry>> | null = null

  private lastFeature: Feature<Geometry> | undefined | null = null
  private lastCoordinate: Coordinate | null = null
  private startCoordinate: Coordinate | null = null

  constructor(options?: Omit<Options, 'condition' | 'layers' | 'filter'>) {
    super(options)
    this.hitTolerance = options?.hitTolerance ?? 10
    this.features = options?.features ?? null
  }

  protected override handleDownEvent(event: MapBrowserEvent): boolean {
    if (!event.originalEvent) return false
    this.lastFeature = this.featuresAtPixel(event.pixel, event.map)
    const isInitialDownEvent = this.lastFeature && !this.lastCoordinate
    if (!isInitialDownEvent) return false
    if (this.features && this.features.getLength() === 0) return false

    if (
      !this.isClickAtLineMiddle(
        this.requirePixel(event.pixel),
        event.map,
        this.lastFeature
      )
    ) {
      this.lastFeature = null
      return false
    }

    this.lastCoordinate = event.coordinate
    this.startCoordinate = event.coordinate
    this.handleMoveEvent(event)

    const features =
      this.features || (this.lastFeature && new Collection([this.lastFeature]))

    if (features) {
      this.dispatchEvent(
        new TranslateEvent(
          TranslateEventType.TRANSLATESTART,
          features,
          event.coordinate,
          this.startCoordinate,
          event
        )
      )
    }

    return true
  }

  protected override handleUpEvent(event: MapBrowserEvent): boolean {
    if (!this.lastCoordinate) return false
    this.lastCoordinate = null
    this.handleMoveEvent(event)

    const features =
      this.features || (this.lastFeature && new Collection([this.lastFeature]))
    if (features && this.startCoordinate) {
      this.dispatchEvent(
        new TranslateEvent(
          TranslateEventType.TRANSLATEEND,
          features,
          event.coordinate,
          this.startCoordinate,
          event
        )
      )
    }
    this.startCoordinate = null

    return true
  }

  protected override handleDragEvent(event: MapBrowserEvent): void {
    if (!this.lastCoordinate) return

    const newCoordinate = event.coordinate

    if (this.lastFeature) {
      this.transformLineAtMiddle(
        this.lastFeature,
        this.requireCoordinate(this.lastCoordinate),
        this.requireCoordinate(newCoordinate)
      )
    }

    this.lastCoordinate = newCoordinate
    if (this.features && this.startCoordinate) {
      this.dispatchEvent(
        new TranslateEvent(
          TranslateEventType.TRANSLATING,
          this.features,
          newCoordinate,
          this.startCoordinate,
          event
        )
      )
    }
  }

  private transformLineAtMiddle(
    feature: Feature<Geometry>,
    oldCoordinate: [number, number],
    newCoordinate: [number, number]
  ): void {
    const geometry = feature.getGeometry()
    if (!(geometry instanceof LineString)) return

    const coordinates = geometry.getCoordinates().map(this.requireCoordinate)
    const closestSegment = this.findClosestSegmentToPoint(
      coordinates,
      oldCoordinate
    )

    if (closestSegment === -1) return

    const deltaX = newCoordinate[0] - oldCoordinate[0]
    const deltaY = newCoordinate[1] - oldCoordinate[1]

    const newCoordinates = [...coordinates]
    const closeSegmentCoordinate = coordinates[closestSegment]
    const nextSegmentCoordinate = coordinates[closestSegment + 1]
    if (!closeSegmentCoordinate || !nextSegmentCoordinate)
      throw new Error('Unexpected close segment or next segment')

    newCoordinates[closestSegment] = [
      closeSegmentCoordinate[0] + deltaX,
      closeSegmentCoordinate[1] + deltaY,
    ]
    newCoordinates[closestSegment + 1] = [
      nextSegmentCoordinate[0] + deltaX,
      nextSegmentCoordinate[1] + deltaY,
    ]

    geometry.setCoordinates(newCoordinates)
  }

  private findClosestSegmentToPoint(
    coordinates: Coordinate[],
    point: [number, number]
  ): number {
    let closestSegment = -1
    let minDistance = Infinity

    for (let i = 0; i < coordinates.length - 1; i++) {
      const segmentStart = this.requireCoordinate(coordinates[i])
      const segmentEnd = this.requireCoordinate(coordinates[i + 1])
      const midpoint: [number, number] = [
        (segmentStart[0] + segmentEnd[0]) / 2,
        (segmentStart[1] + segmentEnd[1]) / 2,
      ]

      const distance = Math.sqrt(
        Math.pow(point[0] - midpoint[0], 2) +
          Math.pow(point[1] - midpoint[1], 2)
      )

      if (distance < minDistance) {
        minDistance = distance
        closestSegment = i
      }
    }

    return closestSegment
  }

  private isClickAtLineMiddle(
    pixel: [number, number],
    map: Map,
    feature: Feature<Geometry> | null | undefined
  ): boolean {
    if (!feature) return false
    const geometry = feature.getGeometry()
    if (!(geometry instanceof LineString)) return false

    const coordinates = geometry.getCoordinates()

    for (let i = 0; i < coordinates.length - 1; i++) {
      const segmentStart = this.requireCoordinate(coordinates[i])
      const segmentEnd = this.requireCoordinate(coordinates[i + 1])
      const midpoint: [number, number] = [
        (segmentStart[0] + segmentEnd[0]) / 2,
        (segmentStart[1] + segmentEnd[1]) / 2,
      ]

      const midpointPixel = this.requirePixel(
        map.getPixelFromCoordinate(midpoint)
      )
      if (!midpointPixel) continue

      const dx = pixel[0] - midpointPixel[0]
      const dy = pixel[1] - midpointPixel[1]
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance <= this.hitTolerance) {
        return true
      }
    }

    return false
  }

  /** Copy of translate private method featuresAtPixel_ **/
  featuresAtPixel(pixel: Pixel, map: Map) {
    return map.forEachFeatureAtPixel(
      pixel,
      (feature) => {
        if (!(feature instanceof Feature)) {
          return null
        }
        return feature
      },
      {
        hitTolerance: this.hitTolerance,
      }
    )
  }

  requirePixel(pixel?: Pixel) {
    if (!pixel) throw new Error('No pixel')
    if (!pixel[0] || !pixel[1]) throw new Error('wrong pixel type')
    return pixel as [number, number]
  }

  requireCoordinate(coordinate?: Coordinate) {
    if (!coordinate) throw new Error('No coordinate')
    if (!coordinate[0] || !coordinate[1])
      throw new Error('wrong coordinate type')
    return coordinate as [number, number]
  }
}

export default TranslateMiddle
