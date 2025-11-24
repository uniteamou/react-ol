---
editUrl: false
next: true
prev: true
title: "useOlMap"
---

> **useOlMap**(): `Map`

Defined in: [src/ol-map.tsx:81](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-map.tsx#L81)

Hook to access the OpenLayers Map instance from the nearest parent OlMap component.
Must be used within a descendant of OlMap.

## Returns

`Map`

The OpenLayers Map instance

## Throws

If called outside of an OlMap component

## Example

```tsx
function MapControl() {
  const map = useOlMap()
  // Use map instance
  return <div>Map ready</div>
}
```
