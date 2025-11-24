---
editUrl: false
next: true
prev: true
title: "useOlTileLayer"
---

> **useOlTileLayer**(): `TileLayer`\<`TileSource`\<`Tile`\>\>

Defined in: [src/ol-tile-layer.tsx:90](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-tile-layer.tsx#L90)

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
