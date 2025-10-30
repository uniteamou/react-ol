import React, { useEffect, useState } from 'react'
import { Feature } from 'ol'
import Geolocation, { type Options } from 'ol/Geolocation'
import { Point } from 'ol/geom'
import Circle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Style from 'ol/style/Style'

import { OlFeature } from './ol-feature'
import { useOlMap } from './ol-map'
import { OlVectorLayer } from './ol-vector-layer'
import { OlVectorSource } from './ol-vector-source'

const userLocationStyleFn = () =>
  new Style({
    image: new Circle({
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
