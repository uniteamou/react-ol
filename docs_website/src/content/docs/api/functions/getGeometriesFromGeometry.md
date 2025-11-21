---
editUrl: false
next: true
prev: true
title: "getGeometriesFromGeometry"
---

> **getGeometriesFromGeometry**(`g`): `Geometry`[]

Defined in: [src/geometry.ts:25](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/geometry.ts#L25)

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
