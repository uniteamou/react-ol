---
editUrl: false
next: true
prev: true
title: "useOlImageLayer"
---

> **useOlImageLayer**(): `GeolImageLayer`

Defined in: [src/ol-layer-geo-image.tsx:109](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-layer-geo-image.tsx#L109)

Hook to access the OpenLayers GeoImage layer instance from the nearest parent OlImageLayer component.
Must be used within a descendant of OlImageLayer.

## Returns

`GeolImageLayer`

The OpenLayers LayerGeoImage instance

## Throws

If called outside of an OlImageLayer component

## Example

```tsx
function ImageControl() {
  const layer = useOlImageLayer()
  // Use layer instance
  return null
}
```
