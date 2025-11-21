---
editUrl: false
next: true
prev: true
title: "styleWithModifyAnchorsGeometry"
---

> **styleWithModifyAnchorsGeometry**(`feature`): `Style`[]

Defined in: [src/ol-feature-modify-anchors.tsx:161](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-feature-modify-anchors.tsx#L161)

Style function that generates anchor point styles at the start and end of line geometries.
Returns an array of styles with anchor point geometries for modify interaction.

## Parameters

### feature

`FeatureLike`

The OpenLayers feature to style

## Returns

`Style`[]

Array of Style objects with anchor point geometries at line endpoints

## Example

```tsx
const layer = new VectorLayer({
  style: styleWithModifyAnchorsGeometry
})
```
