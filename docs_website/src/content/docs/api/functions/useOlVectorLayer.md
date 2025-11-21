---
editUrl: false
next: true
prev: true
title: "useOlVectorLayer"
---

> **useOlVectorLayer**(): `VectorLayer`\<`VectorSource`\<`FeatureLike`\>, `FeatureLike`\>

Defined in: [src/ol-vector-layer.tsx:149](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-vector-layer.tsx#L149)

Hook to access the OpenLayers VectorLayer instance from the nearest parent OlVectorLayer component.
Must be used within a descendant of OlVectorLayer.

## Returns

`VectorLayer`\<`VectorSource`\<`FeatureLike`\>, `FeatureLike`\>

The OpenLayers VectorLayer instance

## Throws

If called outside of an OlVectorLayer component

## Example

```tsx
function VectorControl() {
  const layer = useOlVectorLayer()
  // Use layer instance
  return null
}
```
