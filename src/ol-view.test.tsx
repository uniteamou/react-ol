import { render } from '@testing-library/react'
import { Map } from 'ol'
import { OlMap } from './ol-map'
import { OlView } from './ol-view'
import { fromLonLat } from 'ol/proj'

describe('OlView', () => {
  test('sets center and zoom', (done) => {
    const center = fromLonLat([1.2, 3.4])
    const zoom = 10

    const ref = (map: Map) => {
      setTimeout(() => {
        if (map !== null) {
          expect(map.getView().getCenter()).toEqual(center)
          expect(map.getView().getZoom()).toBe(zoom)
          done()
        }
      }, 0)
    }

    render(
      <OlMap ref={ref}>
        <OlView center={center} zoom={zoom} />
      </OlMap>
    )
  })
})
