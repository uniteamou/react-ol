---
editUrl: false
next: true
prev: true
title: "useOlImageLayer"
---

> **useOlImageLayer**(): `GeolImageLayer`

Defined in: [src/ol-layer-geo-image.tsx:109](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-layer-geo-image.tsx#L109)

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
