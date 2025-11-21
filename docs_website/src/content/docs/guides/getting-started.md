---
title: Getting Started with React OL
description: Install React OL and create your first interactive map with OpenLayers in minutes
sidebar:
  order: 1
---

React OL is a lightweight React wrapper for [OpenLayers](https://openlayers.org/) — build interactive maps declaratively using components and hooks.

## Installation

Install React OL along with its peer dependencies:

```bash
npm install @uniteamou/react-ol ol ol-ext
```

Or using yarn:

```bash
yarn add @uniteamou/react-ol ol ol-ext
```

## Quick Start

### 1. Import Required Styles

OpenLayers requires CSS to be imported in your application. Add this to your main entry file:

```tsx
import 'ol/ol.css';
```

### 2. Create Your First Map

Here's a minimal example to render an interactive map:

```tsx
import { OlMap, OlView } from '@uniteamou/react-ol';
import 'ol/ol.css';

function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
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
```

### 3. Add a Base Map Layer

To display actual map tiles, add a tile layer with a source:

```tsx
import { OlMap, OlView, OlTileLayer, OlSourceOSM } from '@uniteamou/react-ol';
import 'ol/ol.css';

function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <OlMap>
        <OlView
          center={[0, 0]}
          zoom={2}
        />
        <OlTileLayer>
          <OlSourceOSM />
        </OlTileLayer>
      </OlMap>
    </div>
  );
}

export default App;
```

## Core Concepts

### Component Hierarchy

React OL uses a declarative component hierarchy that mirrors OpenLayers structure:

- `<OlMap>` - The root map container
  - `<OlView>` - Controls the map viewport (center, zoom, rotation)
  - `<OlTileLayer>` / `<OlVectorLayer>` - Visual layers
    - `<OlSourceOSM>` / `<OlSourceXYZ>` / `<OlVectorSource>` - Data sources
      - `<OlFeature>` - Individual map features (points, lines, polygons)

### Using Refs

Access the underlying OpenLayers objects using React refs:

```tsx
import { useRef, useEffect } from 'react';
import { OlMap } from '@uniteamou/react-ol';
import type { Map } from 'ol';

function MapComponent() {
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      console.log('Map instance:', mapRef.current);
      // Access OpenLayers Map API directly
    }
  }, []);

  return (
    <OlMap ref={mapRef}>
      {/* ... */}
    </OlMap>
  );
}
```

### Event Listeners

React OL provides hooks for handling map events:

```tsx
import { OlMap, useOlMapEventListener } from '@uniteamou/react-ol';

function MapWithEvents() {
  const mapRef = useRef<Map | null>(null);
  useOlMapEventListener(mapRef.current, 'click', (event) => {
    console.log('Map clicked at:', event.coordinate);
  });

  return (
    <OlMap ref={mapRef}>
      {/* ... */}
    </OlMap>
  );
}
```

## Common Patterns

### Centered Map with Custom Zoom

```tsx
<OlMap>
  <OlView
    center={[13.404954, 52.520008]}
    zoom={10}
    minZoom={5}
    maxZoom={18}
  />
  <OlTileLayer>
    <OlSourceOSM />
  </OlTileLayer>
</OlMap>
```

### Multiple Layers

Stack multiple layers by adding them as children:

```tsx
<OlMap>
  <OlView center={[0, 0]} zoom={2} />

  {/* Base map layer */}
  <OlTileLayer>
    <OlSourceOSM />
  </OlTileLayer>

  {/* Vector layer for custom features */}
  <OlVectorLayer>
    <OlVectorSource>
      <OlFeature geometry={/* ... */} />
    </OlVectorSource>
  </OlVectorLayer>
</OlMap>
```
