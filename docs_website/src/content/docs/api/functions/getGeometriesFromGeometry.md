---
editUrl: false
next: true
prev: true
title: "getGeometriesFromGeometry"
---

> **getGeometriesFromGeometry**(`g`): `Geometry`[]

Defined in: [src/geometry.ts:25](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/geometry.ts#L25)

Extracts an array of individual geometries from a geometry object.
Handles multi-geometries and geometry collections by returning their constituent parts.
For simple geometries, returns an array containing the geometry itself.

## Parameters

### g

`Geometry`

The OpenLayers geometry to decompose

## Returns

`Geometry`[]

Array of individual geometry objects

## Example

```tsx
const multiPoint = new MultiPoint([[0,0], [1,1]])
const points = getGeometriesFromGeometry(multiPoint) // Returns array of Point geometries
```
