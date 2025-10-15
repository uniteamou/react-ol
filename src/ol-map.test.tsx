import { render } from '@testing-library/react'
import { Map } from 'ol'
import { StrictMode, useEffect, useRef } from 'react'
import { OlMap, useOlMap } from './ol-map'

describe('OlMap', () => {
  test('renders DOM element', () => {
    const { getByTestId } = render(
      <StrictMode>
        <OlMap />
      </StrictMode>
    )
    expect(getByTestId('ol-map')).toBeInTheDocument()
  })

  describe('provides the Map instance', () => {
    test('with the useMap() hook', (done) => {
      function TestChild() {
        const map = useOlMap()
        expect(map).toBeInstanceOf(Map)
        done()
        return null
      }

      function TestContainer() {
        return (
          <OlMap>
            <TestChild />
          </OlMap>
        )
      }

      render(<TestContainer />)
    })

    test('in the ref function', (done) => {
      function TestContainer() {
        const ref = (map: Map) => {
          if (map !== null) {
            expect(map).toBeInstanceOf(Map)
            done()
          }
        }
        return <OlMap ref={ref} />
      }

      render(<TestContainer />)
    })

    test('in the ref object', (done) => {
      function TestContainer() {
        const ref = useRef<Map | null>(null)

        useEffect(() => {
          if (ref.current !== null) {
            expect(ref.current).toBeInstanceOf(Map)
            done()
          }
        }, [])

        return <OlMap ref={ref} />
      }

      render(<TestContainer />)
    })
  })
})
