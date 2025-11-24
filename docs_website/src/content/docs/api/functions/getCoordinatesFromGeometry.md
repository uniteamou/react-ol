---
editUrl: false
next: true
prev: true
title: "getCoordinatesFromGeometry"
---

> **getCoordinatesFromGeometry**(`g`): `Coordinate`[]

Defined in: [src/geometry.ts:58](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/geometry.ts#L58)

Extracts all coordinates from a geometry object, flattening nested structures.
Handles geometry collections and all geometry types, returning a flat array of coordinates.

## Parameters

### g

`Geometry`

The OpenLayers geometry to extract coordinates from

## Returns

`Coordinate`[]

Flat array of coordinate arrays

## Example

```tsx
const line = new LineString([[0,0], [1,1], [2,2]])
const coords = getCoordinatesFromGeometry(line) // Returns [[0,0], [1,1], [2,2]]
```
