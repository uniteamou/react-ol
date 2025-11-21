---
editUrl: false
next: true
prev: true
title: "OlSourceTileArcGISRest"
---

> **OlSourceTileArcGISRest**(`__namedParameters`): `Element`

Defined in: [src/ol-source-tile-arcgis-rest.tsx:31](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-source-tile-arcgis-rest.tsx#L31)

OpenLayers tile source component for ArcGIS REST services.
Provides standard tile access to ArcGIS Map/Image services.
Must be used as a child of OlTileLayer.

## Parameters

### \_\_namedParameters

`OlTileSouceProps`

## Returns

`Element`

## Example

```tsx
<OlTileLayer>
  <OlSourceTileArcGISRest
    ref={sourceRef}
    initialOptions={{
      url: 'https://server.arcgisonline.com/arcgis/rest/services/Layer/MapServer'
    }}
  />
</OlTileLayer>
```
