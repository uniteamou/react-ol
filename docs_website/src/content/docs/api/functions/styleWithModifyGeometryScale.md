---
editUrl: false
next: true
prev: true
title: "styleWithModifyGeometryScale"
---

> **styleWithModifyGeometryScale**(`feature`): `Style` \| `null` \| `undefined`

Defined in: [src/ol-feature-modify-scale.tsx:142](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-feature-modify-scale.tsx#L142)

Style function that generates scale handle styles around feature geometries.
Displays draggable points positioned outside a minimum radius from the feature's center,
allowing users to scale the geometry proportionally.

## Parameters

### feature

`FeatureLike`

The OpenLayers feature to style

## Returns

`Style` \| `null` \| `undefined`

Style object with scale handle geometries, or null if no valid geometry

## Example

```tsx
const layer = new VectorLayer({
  style: styleWithModifyGeometry
})
```
