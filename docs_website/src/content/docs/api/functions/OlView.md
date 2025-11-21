---
editUrl: false
next: true
prev: true
title: "OlView"
---

> **OlView**(`props`): `Element`

Defined in: [src/ol-view.tsx:29](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-view.tsx#L29)

OpenLayers View component that manages the map's viewport (center, zoom, rotation).
Must be used as a child of OlMap.

## Parameters

### props

`OlViewProps`

All standard OpenLayers ViewOptions plus reactive properties

## Returns

`Element`

## Example

```tsx
<OlMap>
  <OlView center={[0, 0]} zoom={5} rotation={0} />
</OlMap>
```
