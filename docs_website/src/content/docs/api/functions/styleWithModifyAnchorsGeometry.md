---
editUrl: false
next: true
prev: true
title: "styleWithModifyAnchorsGeometry"
---

> **styleWithModifyAnchorsGeometry**(`feature`): `Style`[]

Defined in: [src/ol-feature-modify-anchors.tsx:161](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-feature-modify-anchors.tsx#L161)

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
