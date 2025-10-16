import { useEffect, useState } from 'react'
import { Feature } from 'ol'
import Geolocation, { type Options } from 'ol/Geolocation.js'
import { Point } from 'ol/geom.js'
import { Fill, Stroke, Style } from 'ol/style.js'
import CircleStyle from 'ol/style/Circle.js'

import { OlFeature } from './ol-feature.js'
import { useOlMap } from './ol-map.js'
import { OlVectorLayer } from './ol-vector-layer.js'
import { OlVectorSource } from './ol-vector-source.js'

const userLocationStyleFn = () =>
  new Style({
    image: new CircleStyle({
      radius: 10,
      fill: new Fill({
        color: '#0ecced',
      }),
      stroke: new Stroke({
        color: '#ffffff',
        width: 1,
      }),
    }),
  })

const DEFAULT_GEOLOCATION: Options = {
  trackingOptions: {
    enableHighAccuracy: true,
  },
}

type OlUserLocationLayerProps = Options & {
  visible?: boolean
}

export function OlUserLocationLayer({
  visible = true,
  ...geolocationProps
}: OlUserLocationLayerProps) {
  const [geolocation] = useState(
    () =>
      new Geolocation({
        ...DEFAULT_GEOLOCATION,
        ...geolocationProps,
      })
  )
  const [userLocationFeature] = useState<Feature>(() => new Feature())
  const map = useOlMap()

  useEffect(() => {
    const view = map.getView()
    geolocation.setProjection(view.getProjection())
    geolocation.setTracking(true)
  }, [map, geolocation])

  useEffect(() => {
    const handlePosition = () => {
      const coordinates = geolocation.getPosition()
      if (!coordinates) return
      userLocationFeature.setGeometry(new Point(coordinates))
    }
    handlePosition()

    geolocation.on('change:position', handlePosition)
    return () => {
      geolocation.un('change:position', handlePosition)
      geolocation.setTracking(false)
    }
  }, [map, geolocation, userLocationFeature])

  return (
    <OlVectorLayer visible={visible}>
      <OlVectorSource>
        <OlFeature
          feature={userLocationFeature}
          styleFunction={userLocationStyleFn}
        />
      </OlVectorSource>
    </OlVectorLayer>
  )
}
