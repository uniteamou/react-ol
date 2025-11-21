---
editUrl: false
next: true
prev: true
title: "useOlModify"
---

> **useOlModify**(): `Modify`

Defined in: [src/ol-modify.tsx:83](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-modify.tsx#L83)

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
