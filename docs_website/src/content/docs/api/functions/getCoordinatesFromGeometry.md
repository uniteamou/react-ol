---
editUrl: false
next: true
prev: true
title: "getCoordinatesFromGeometry"
---

> **getCoordinatesFromGeometry**(`g`): `Coordinate`[]

Defined in: [src/geometry.ts:58](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/geometry.ts#L58)

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
