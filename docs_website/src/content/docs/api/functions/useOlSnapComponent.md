---
editUrl: false
next: true
prev: true
title: "useOlSnapComponent"
---

> **useOlSnapComponent**(): `Snap`

Defined in: [src/ol-snap.tsx:82](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-snap.tsx#L82)

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
