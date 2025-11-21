---
editUrl: false
next: true
prev: true
title: "styleWithModifyGeometry"
---

> **styleWithModifyGeometry**(`feature`): `Style`

Defined in: [src/ol-feature-modify.tsx:113](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-feature-modify.tsx#L113)

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
