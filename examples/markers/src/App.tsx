import { OlMap, OlView, OlTileLayer, OlSourceOSM, OlVectorLayer, OlVectorSource, OlFeature } from '@uniteamou/react-ol';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';

function App() {
  // Create marker features for different cities
  const londonMarker = new Feature({
    geometry: new Point(fromLonLat([-0.1276, 51.5074])),
    name: 'London',
  });

  const parisMarker = new Feature({
    geometry: new Point(fromLonLat([2.3522, 48.8566])),
    name: 'Paris',
  });

  const berlinMarker = new Feature({
    geometry: new Point(fromLonLat([13.4050, 52.5200])),
    name: 'Berlin',
  });

  const madridMarker = new Feature({
    geometry: new Point(fromLonLat([-3.7038, 40.4168])),
    name: 'Madrid',
  });

  const romeMarker = new Feature({
    geometry: new Point(fromLonLat([12.4964, 41.9028])),
    name: 'Rome',
  });

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1000,
        background: 'white',
        padding: '10px',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        maxWidth: '250px'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>European Capital Cities</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
          <li>🔴 London</li>
          <li>🔵 Paris</li>
          <li>🟢 Berlin</li>
          <li>🟡 Madrid</li>
          <li>🟣 Rome</li>
        </ul>
      </div>

      <OlMap>
        <OlView center={fromLonLat([6.0, 50.0])} zoom={5} />
        <OlTileLayer>
          <OlSourceOSM />
        </OlTileLayer>
        <OlVectorLayer visible={true}>
          <OlVectorSource>
            {/* Each OlFeature creates a marker on the map */}
            {/* The fillColor and size properties control the marker appearance */}
            <OlFeature
              feature={londonMarker}
              properties={{ fillColor: '#ff0000', size: 10 }}
            />
            <OlFeature
              feature={parisMarker}
              properties={{ fillColor: '#0000ff', size: 10 }}
            />
            <OlFeature
              feature={berlinMarker}
              properties={{ fillColor: '#00ff00', size: 10 }}
            />
            <OlFeature
              feature={madridMarker}
              properties={{ fillColor: '#ffff00', size: 10 }}
            />
            <OlFeature
              feature={romeMarker}
              properties={{ fillColor: '#9900ff', size: 10 }}
            />
          </OlVectorSource>
        </OlVectorLayer>
      </OlMap>
    </div>
  );
}

export default App;
