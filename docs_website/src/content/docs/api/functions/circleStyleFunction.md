---
editUrl: false
next: true
prev: true
title: "circleStyleFunction"
---

> **circleStyleFunction**(`feature`): `Style`

Defined in: [src/feature-styles.ts:26](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/feature-styles.ts#L26)

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
