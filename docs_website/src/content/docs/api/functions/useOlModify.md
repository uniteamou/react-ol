---
editUrl: false
next: true
prev: true
title: "useOlModify"
---

> **useOlModify**(): `Modify`

Defined in: [src/ol-modify.tsx:83](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-modify.tsx#L83)

Hook to access the OpenLayers Modify interaction instance from the nearest parent OlModify component.
Must be used within a descendant of OlModify.

## Returns

`Modify`

The OpenLayers Modify interaction instance

## Throws

If called outside of an OlModify component

## Example

```tsx
function ModifyControl() {
  const modify = useOlModify()
  // Use modify instance
  return null
}
```
