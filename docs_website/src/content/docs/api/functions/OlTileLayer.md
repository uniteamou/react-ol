---
editUrl: false
next: true
prev: true
title: "OlTileLayer"
---

> **OlTileLayer**(`__namedParameters`): `Element`

Defined in: [src/ol-tile-layer.tsx:41](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-tile-layer.tsx#L41)

OpenLayers tile layer component for displaying tiled map data.
Supports various tile sources like OSM, XYZ, ArcGIS, etc.
Must be used as a child of OlMap.

## Parameters

### \_\_namedParameters

`OlTileLayerProps`

## Returns

`Element`

## Example

```tsx
<OlMap>
  <OlTileLayer ref={layerRef} isVisible={true}>
    <OlSourceOSM />
  </OlTileLayer>
</OlMap>
```
