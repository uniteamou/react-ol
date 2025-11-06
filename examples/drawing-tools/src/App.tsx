import { useState } from 'react';
import { OlMap, OlView, OlTileLayer, OlSourceOSM, OlVectorLayer, OlVectorSource, OlDraw } from '@uniteamou/react-ol';
import type { Options } from 'ol/interaction/Draw';
import 'ol/ol.css';

type DrawType = Options['type'] | null;

function App() {
  const [drawType, setDrawType] = useState<DrawType>('Point');

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Control panel */}
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1000,
        background: 'white',
        padding: '15px',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        minWidth: '180px'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Drawing Tools</h3>
        <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>
          Select a tool to start drawing:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <button
            onClick={() => setDrawType('Point')}
            style={{
              padding: '8px 12px',
              background: drawType === 'Point' ? '#007bff' : '#f8f9fa',
              color: drawType === 'Point' ? 'white' : '#212529',
              border: '1px solid #dee2e6',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            📍 Point
          </button>

          <button
            onClick={() => setDrawType('LineString')}
            style={{
              padding: '8px 12px',
              background: drawType === 'LineString' ? '#007bff' : '#f8f9fa',
              color: drawType === 'LineString' ? 'white' : '#212529',
              border: '1px solid #dee2e6',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            📏 Line
          </button>

          <button
            onClick={() => setDrawType('Polygon')}
            style={{
              padding: '8px 12px',
              background: drawType === 'Polygon' ? '#007bff' : '#f8f9fa',
              color: drawType === 'Polygon' ? 'white' : '#212529',
              border: '1px solid #dee2e6',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ⬟ Polygon
          </button>

          <button
            onClick={() => setDrawType('Circle')}
            style={{
              padding: '8px 12px',
              background: drawType === 'Circle' ? '#007bff' : '#f8f9fa',
              color: drawType === 'Circle' ? 'white' : '#212529',
              border: '1px solid #dee2e6',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ⭕ Circle
          </button>

          <button
            onClick={() => setDrawType(null)}
            style={{
              padding: '8px 12px',
              background: drawType === null ? '#dc3545' : '#f8f9fa',
              color: drawType === null ? 'white' : '#212529',
              border: '1px solid #dee2e6',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🚫 Stop Drawing
          </button>
        </div>
      </div>

      <OlMap>
        <OlView center={[0, 0]} zoom={2} />
        <OlTileLayer>
          <OlSourceOSM />
        </OlTileLayer>

        {/* Vector layer to hold drawn features */}
        <OlVectorLayer visible={true}>
          <OlVectorSource>
            {/* Only render OlDraw when a draw type is selected */}
            {drawType && (
              <OlDraw key={drawType} type={drawType} />
            )}
          </OlVectorSource>
        </OlVectorLayer>
      </OlMap>
    </div>
  );
}

export default App;
