---
editUrl: false
next: true
prev: true
title: "useOlTileLayer"
---

> **useOlTileLayer**(): `TileLayer`\<`TileSource`\<`Tile`\>\>

Defined in: [src/ol-tile-layer.tsx:90](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-tile-layer.tsx#L90)

Hook to access the OpenLayers TileLayer instance from the nearest parent OlTileLayer component.
Must be used within a descendant of OlTileLayer.

## Returns

`TileLayer`\<`TileSource`\<`Tile`\>\>

The OpenLayers TileLayer instance

## Throws

If called outside of an OlTileLayer component

## Example

```tsx
function TileControl() {
  const layer = useOlTileLayer()
  // Use layer instance
  return null
}
```
