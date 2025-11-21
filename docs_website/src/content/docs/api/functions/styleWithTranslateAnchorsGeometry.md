---
editUrl: false
next: true
prev: true
title: "styleWithTranslateAnchorsGeometry"
---

> **styleWithTranslateAnchorsGeometry**(`feature`): `Style`[]

Defined in: [src/ol-feature-translate-anchors.tsx:57](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-feature-translate-anchors.tsx#L57)

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
