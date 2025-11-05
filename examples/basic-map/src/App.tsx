import { OlMap, OlView } from '@uniteamou/react-ol';
import 'ol/ol.css';

function App() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <h1 style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000, background: 'white', padding: '10px', borderRadius: '4px' }}>
        React OpenLayers Example
      </h1>
      <OlMap>
        <OlView
          center={[0, 0]}
          zoom={2}
        />
      </OlMap>
    </div>
  );
}

export default App;
