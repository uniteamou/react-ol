---
editUrl: false
next: true
prev: true
title: "OlSourceOSM"
---

> **OlSourceOSM**(`__namedParameters`): `Element`

Defined in: [src/ol-source-osm.tsx:24](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-source-osm.tsx#L24)

OpenLayers OpenStreetMap tile source component.
Provides tiles from OpenStreetMap servers.
Must be used as a child of OlTileLayer.

## Parameters

### \_\_namedParameters

`OlTileSouceProps`

## Returns

`Element`

## Example

```tsx
<OlTileLayer>
  <OlSourceOSM initialOptions={{ attributions: 'OpenStreetMap' }} />
</OlTileLayer>
```
