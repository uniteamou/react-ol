---
editUrl: false
next: true
prev: true
title: "styleWithModifyGeometry"
---

> **styleWithModifyGeometry**(`feature`): `Style`

Defined in: [src/ol-feature-modify.tsx:113](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-feature-modify.tsx#L113)

Style function that returns the cloned modify geometry or current geometry.
Used during feature modification to display the geometry being edited.

## Parameters

### feature

`FeatureLike`

The OpenLayers feature to style

## Returns

`Style`

Style object with the modify geometry or current geometry

## Example

```tsx
const layer = new VectorLayer({
  style: styleWithModifyGeometry
})
```
