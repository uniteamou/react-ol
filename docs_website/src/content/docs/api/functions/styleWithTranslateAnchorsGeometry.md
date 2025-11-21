---
editUrl: false
next: true
prev: true
title: "styleWithTranslateAnchorsGeometry"
---

> **styleWithTranslateAnchorsGeometry**(`feature`): `Style`[]

Defined in: [src/ol-feature-translate-anchors.tsx:57](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-feature-translate-anchors.tsx#L57)

Style function that generates anchor point styles at the middle of each line segment.
Returns an array of styles, one for each segment midpoint.

## Parameters

### feature

`FeatureLike`

The OpenLayers feature to style

## Returns

`Style`[]

Array of Style objects with anchor point geometries, or empty array if not a LineString

## Example

```tsx
const layer = new VectorLayer({
  style: styleWithTranslateAnchorsGeometry
})
```
