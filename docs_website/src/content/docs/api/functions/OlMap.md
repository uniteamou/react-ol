---
editUrl: false
next: true
prev: true
title: "OlMap"
---

> **OlMap**(`__namedParameters`): `Element`

Defined in: [src/ol-map.tsx:35](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-map.tsx#L35)

OpenLayers Map component that provides a React wrapper around the OpenLayers Map class.
Creates a map container and provides the map instance to child components via context.

## Parameters

### \_\_namedParameters

`MapProps`

## Returns

`Element`

## Example

```tsx
<OlMap>
  <OlView />
  <OlTileLayer />
</OlMap>
```
