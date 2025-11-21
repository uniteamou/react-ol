---
editUrl: false
next: true
prev: true
title: "useOlLayerSelect"
---

> **useOlLayerSelect**(): `Select`

Defined in: [src/ol-select.tsx:109](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-select.tsx#L109)

Hook to access the OpenLayers Select interaction instance from the nearest parent OlSelect or OlLayerSelect component.
Must be used within a descendant of OlSelect/OlLayerSelect.

## Returns

`Select`

The OpenLayers Select interaction instance

## Throws

If called outside of an OlSelect/OlLayerSelect component

## Example

```tsx
function SelectControl() {
  const select = useOlLayerSelect()
  // Use select instance
  return null
}
```
