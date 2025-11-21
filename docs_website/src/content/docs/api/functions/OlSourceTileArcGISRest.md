---
editUrl: false
next: true
prev: true
title: "OlSourceTileArcGISRest"
---

> **OlSourceTileArcGISRest**(`__namedParameters`): `Element`

Defined in: [src/ol-source-tile-arcgis-rest.tsx:31](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-source-tile-arcgis-rest.tsx#L31)

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
