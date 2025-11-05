import { OlMap, OlView, OlTileLayer, OlSourceOSM, OlVectorLayer, OlVectorSource, OlFeature } from '@uniteamou/react-ol';
import Feature from 'ol/Feature';
import { Point, LineString, Polygon } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Style, Circle, Fill, Stroke, Text } from 'ol/style';
import type { FeatureLike } from 'ol/Feature';
import 'ol/ol.css';

// Custom style function that applies different styles based on feature type and properties
const customStyleFunction = (feature: FeatureLike) => {
  const type = feature.getGeometry()?.getType();
  const color = feature.get('color') || '#ff0000';
  const label = feature.get('label');

  // Style for point features
  if (type === 'Point') {
    return new Style({
      image: new Circle({
        radius: 12,
        fill: new Fill({ color }),
        stroke: new Stroke({ color: '#ffffff', width: 3 })
      }),
      text: label ? new Text({
        text: label,
        offsetY: -20,
        font: 'bold 14px sans-serif',
        fill: new Fill({ color: '#000000' }),
        stroke: new Stroke({ color: '#ffffff', width: 3 })
      }) : undefined
    });
  }

  // Style for line features
  if (type === 'LineString') {
    const dashed = feature.get('dashed');
    return new Style({
      stroke: new Stroke({
        color,
        width: 4,
        lineDash: dashed ? [10, 10] : undefined
      }),
      text: label ? new Text({
        text: label,
        font: 'bold 14px sans-serif',
        fill: new Fill({ color: '#000000' }),
        stroke: new Stroke({ color: '#ffffff', width: 3 }),
        placement: 'line',
        overflow: true
      }) : undefined
    });
  }

  // Style for polygon features
  if (type === 'Polygon') {
    return new Style({
      fill: new Fill({ color: color + '40' }), // Add transparency (40 = 25% opacity in hex)
      stroke: new Stroke({ color, width: 3 }),
      text: label ? new Text({
        text: label,
        font: 'bold 14px sans-serif',
        fill: new Fill({ color: '#000000' }),
        stroke: new Stroke({ color: '#ffffff', width: 3 })
      }) : undefined
    });
  }

  return new Style();
};

function App() {
  // Create different geometry features with custom properties

  // Point markers for cities
  const londonPoint = new Feature({
    geometry: new Point(fromLonLat([-0.1276, 51.5074])),
    color: '#e74c3c',
    label: 'London'
  });

  const parisPoint = new Feature({
    geometry: new Point(fromLonLat([2.3522, 48.8566])),
    color: '#3498db',
    label: 'Paris'
  });

  // Line feature connecting cities
  const connectionLine = new Feature({
    geometry: new LineString([
      fromLonLat([-0.1276, 51.5074]),
      fromLonLat([2.3522, 48.8566])
    ]),
    color: '#9b59b6',
    dashed: true,
    label: 'Connection'
  });

  // Solid line
  const routeLine = new Feature({
    geometry: new LineString([
      fromLonLat([2.3522, 48.8566]),
      fromLonLat([13.4050, 52.5200])
    ]),
    color: '#2ecc71',
    dashed: false,
    label: 'Route'
  });

  // Polygon area
  const regionPolygon = new Feature({
    geometry: new Polygon([[
      fromLonLat([-2, 47]),
      fromLonLat([5, 47]),
      fromLonLat([5, 53]),
      fromLonLat([-2, 53]),
      fromLonLat([-2, 47])
    ]]),
    color: '#f39c12',
    label: 'Region'
  });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Legend */}
      <div style={{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1000,
        background: 'white',
        padding: '15px',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        minWidth: '200px'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Custom Styling</h3>

        <div style={{ marginBottom: '10px' }}>
          <h4 style={{ margin: '0 0 5px 0', fontSize: '14px', fontWeight: 'bold' }}>Points</h4>
          <div style={{ fontSize: '12px', marginLeft: '10px' }}>
            <div>🔴 London (red circle)</div>
            <div>🔵 Paris (blue circle)</div>
          </div>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <h4 style={{ margin: '0 0 5px 0', fontSize: '14px', fontWeight: 'bold' }}>Lines</h4>
          <div style={{ fontSize: '12px', marginLeft: '10px' }}>
            <div>🟣 Dashed connection</div>
            <div>🟢 Solid route</div>
          </div>
        </div>

        <div>
          <h4 style={{ margin: '0 0 5px 0', fontSize: '14px', fontWeight: 'bold' }}>Polygons</h4>
          <div style={{ fontSize: '12px', marginLeft: '10px' }}>
            <div>🟡 Semi-transparent region</div>
          </div>
        </div>
      </div>

      <OlMap>
        <OlView center={fromLonLat([1.5, 50])} zoom={5} />
        <OlTileLayer>
          <OlSourceOSM />
        </OlTileLayer>

        {/* Vector layer with custom style function */}
        <OlVectorLayer visible={true}>
          <OlVectorSource>
            {/* Apply custom style function to each feature */}
            <OlFeature feature={regionPolygon} styleFunction={customStyleFunction} />
            <OlFeature feature={connectionLine} styleFunction={customStyleFunction} />
            <OlFeature feature={routeLine} styleFunction={customStyleFunction} />
            <OlFeature feature={londonPoint} styleFunction={customStyleFunction} />
            <OlFeature feature={parisPoint} styleFunction={customStyleFunction} />
          </OlVectorSource>
        </OlVectorLayer>
      </OlMap>
    </div>
  );
}

export default App;
