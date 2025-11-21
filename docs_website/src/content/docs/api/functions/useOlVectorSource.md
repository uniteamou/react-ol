---
editUrl: false
next: true
prev: true
title: "useOlVectorSource"
---

> **useOlVectorSource**(): `OlVectorSourceType`

Defined in: [src/ol-vector-source.tsx:82](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-vector-source.tsx#L82)

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
