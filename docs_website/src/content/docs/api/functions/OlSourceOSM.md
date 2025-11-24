---
editUrl: false
next: true
prev: true
title: "OlSourceOSM"
---

> **OlSourceOSM**(`__namedParameters`): `Element`

Defined in: [src/ol-source-osm.tsx:24](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-source-osm.tsx#L24)

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
