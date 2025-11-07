import { useCallback, useState, useRef, useEffect } from 'react';
import { OlMap, OlView, OlTileLayer, OlSourceOSM } from '@uniteamou/react-ol';
import type { Map, MapBrowserEvent } from 'ol';
import 'ol/ol.css';
import { Coordinate } from 'ol/coordinate';

function App() {
  const mapRef = useRef<Map | null>(null);
  const [clickedCoord, setClickedCoord] = useState<Coordinate | null>(null);

  const handleMapClick = useCallback(function handleMapClick(evt: MapBrowserEvent<UIEvent>) {
    const coordinates = evt.coordinate
    setClickedCoord(coordinates)
  }, [setClickedCoord])

  useEffect(() => {
    if (!mapRef.current) return
    mapRef.current.on('singleclick', handleMapClick)
    return () => {
      mapRef.current?.un('singleclick', handleMapClick)
    }
  }, [mapRef.current,])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1000,
        background: 'white',
        padding: '15px',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        minWidth: '200px'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Click on the Map!</h3>
        {clickedCoord ? (
          <>
            <p style={{ margin: '5px 0', fontSize: '14px' }}>
              <strong>Longitude:</strong> {clickedCoord[0].toFixed(4)}°
            </p>
            <p style={{ margin: '5px 0', fontSize: '14px' }}>
              <strong>Latitude:</strong> {clickedCoord[1].toFixed(4)}°
            </p>
            <button
              onClick={() => {
                setClickedCoord(null);
              }}
              style={{
                marginTop: '10px',
                padding: '5px 10px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
          </>
        ) : (
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            Click anywhere on the map to see coordinates
          </p>
        )}
      </div>

      <OlMap ref={mapRef}>
        <OlView center={[0, 0]} zoom={2} />
        <OlTileLayer>
          <OlSourceOSM />
        </OlTileLayer>
      </OlMap>
    </div>
  );
}

export default App;
