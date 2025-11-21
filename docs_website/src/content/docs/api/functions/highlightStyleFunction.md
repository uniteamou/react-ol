---
editUrl: false
next: true
prev: true
title: "highlightStyleFunction"
---

> **highlightStyleFunction**(`styleFn`): `StyleFunction`

Defined in: [src/feature-styles.ts:72](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/feature-styles.ts#L72)

Higher-order style function that wraps another style function to add highlight capability.
Applies a blue highlight stroke when the feature has `shouldHighlight` property set to true.

## Parameters

### styleFn

`StyleFunction`

The base style function to wrap

## Returns

`StyleFunction`

A new style function that conditionally applies highlighting

## Example

```tsx
const baseStyle = (feature) => new Style({ ... })
const highlightedStyle = highlightStyleFunction(baseStyle)

const layer = new VectorLayer({
  style: highlightedStyle
})

// Trigger highlight
feature.set('shouldHighlight', true)
```
