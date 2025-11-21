---
editUrl: false
next: true
prev: true
title: "useOlSnapComponent"
---

> **useOlSnapComponent**(): `Snap`

Defined in: [src/ol-snap.tsx:82](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-snap.tsx#L82)

Hook to access the OpenLayers Snap interaction instance from the nearest parent OlSnap component.
Must be used within a descendant of OlSnap.

## Returns

`Snap`

The OpenLayers Snap interaction instance

## Throws

If called outside of an OlSnap component

## Example

```tsx
function SnapControl() {
  const snap = useOlSnapComponent()
  // Use snap instance
  return null
}
```
