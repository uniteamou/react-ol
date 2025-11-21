---
editUrl: false
next: true
prev: true
title: "OlView"
---

> **OlView**(`props`): `Element`

Defined in: [src/ol-view.tsx:29](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-view.tsx#L29)

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
