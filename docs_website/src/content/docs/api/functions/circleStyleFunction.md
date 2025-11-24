---
editUrl: false
next: true
prev: true
title: "circleStyleFunction"
---

> **circleStyleFunction**(`feature`): `Style`

Defined in: [src/feature-styles.ts:26](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/feature-styles.ts#L26)

Style function that creates circle styles based on feature properties.
Reads size, fillColor, strokeColor, and strokeWidth from feature properties.

## Parameters

### feature

`FeatureLike`

The OpenLayers feature to style

## Returns

`Style`

Style Style object with configured circle appearance

## Example

```tsx
const feature = new Feature({
  geometry: new Point([0, 0]),
  size: 15,
  fillColor: '#00ff00',
  strokeColor: '#000000',
  strokeWidth: 2
})
feature.setStyle(circleStyleFunction)
```
