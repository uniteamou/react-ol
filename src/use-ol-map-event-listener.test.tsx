import { useCallback, useEffect, useState } from 'react'
import { render, renderHook } from '@testing-library/react'
import { Map } from 'ol'
import OlEvent from 'ol/events/Event.js'

import { OlMap } from './ol-map.js'
import {
  type MapEventType,
  useOlMapEventListener,
} from './use-ol-map-event-listener.js'

describe.each(['moveend' as const] as MapEventType[])(
  'useOlMapEventListener',
  (mapEventType) => {
    test('subscribes to event', (done) => {
      function TestContainer() {
        const [map, setMap] = useState<Map | null>(null)
        const onMoveend = (event: Event | OlEvent) => {
          expect(event.type).toBe(mapEventType)
          expect(map?.getListeners(mapEventType)?.length).toBe(1)
          done()
        }
        useOlMapEventListener(map, mapEventType, onMoveend)
        useEffect(() => {
          map?.dispatchEvent(mapEventType)
        }, [map])
        return <OlMap ref={setMap} />
      }

      render(<TestContainer />)
    })

    test('unsubscribes on unmount', () => {
      function callback() {}
      const map = new Map({})
      const { unmount } = renderHook(
        (props: Parameters<typeof useOlMapEventListener>) =>
          useOlMapEventListener(...props),
        { initialProps: [map, mapEventType, callback] }
      )

      expect(map.getListeners(mapEventType)).toHaveLength(1)
      unmount()
      expect(map.getListeners(mapEventType)).toBeUndefined()
    })

    test('subscribes to event only once when listener is wrapper in useCallback', (done) => {
      function TestContainer() {
        const [map, setMap] = useState<Map | null>(null)
        useEffect(() => {
          if (map) {
            const spy = jest.spyOn(map, 'addEventListener')
            return () => {
              expect(spy).toHaveBeenCalledTimes(1)
              done()
            }
          }
        }, [map])
        const onMoveEnd = useCallback(() => {}, [])
        useOlMapEventListener(map, mapEventType, onMoveEnd)
        return <OlMap ref={setMap} />
      }

      const { rerender, unmount } = render(<TestContainer />)
      rerender(<TestContainer />)
      unmount()
    })
  }
)
