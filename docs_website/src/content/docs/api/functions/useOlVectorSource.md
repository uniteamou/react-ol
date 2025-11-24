---
editUrl: false
next: true
prev: true
title: "useOlVectorSource"
---

> **useOlVectorSource**(): `OlVectorSourceType`

Defined in: [src/ol-vector-source.tsx:82](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-vector-source.tsx#L82)

Hook to access the OpenLayers VectorSource instance from the nearest parent OlVectorSource component.
Must be used within a descendant of OlVectorSource.

## Returns

`OlVectorSourceType`

The OpenLayers VectorSource instance

## Throws

If called outside of an OlVectorSource component

## Example

```tsx
function FeatureControl() {
  const source = useOlVectorSource()
  // Use source instance
  return null
}
```
