---
editUrl: false
next: true
prev: true
title: "OlSourceXYZ"
---

> **OlSourceXYZ**(`__namedParameters`): `Element`

Defined in: [src/ol-source-xyz.tsx:32](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-source-xyz.tsx#L32)

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
