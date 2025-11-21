---
editUrl: false
next: true
prev: true
title: "OlSourceXYZ"
---

> **OlSourceXYZ**(`__namedParameters`): `Element`

Defined in: [src/ol-source-xyz.tsx:32](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-source-xyz.tsx#L32)

OpenLayers XYZ tile source component for custom tile servers using the XYZ URL pattern.
Supports any tile server that follows the {z}/{x}/{y} URL structure.
Must be used as a child of OlTileLayer.

## Parameters

### \_\_namedParameters

`OlSourceXYZProps`

## Returns

`Element`

## Example

```tsx
<OlTileLayer>
  <OlSourceXYZ
    ref={sourceRef}
    initialOptions={{
      url: 'https://tile.server.com/{z}/{x}/{y}.png',
      maxZoom: 19
    }}
  />
</OlTileLayer>
```
