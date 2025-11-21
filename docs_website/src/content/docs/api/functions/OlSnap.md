---
editUrl: false
next: true
prev: true
title: "OlSnap"
---

> **OlSnap**(`props`): `Element`

Defined in: [src/ol-snap.tsx:39](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-snap.tsx#L39)

OpenLayers Snap interaction component for snapping drawn features to existing features.
Enables vertex and edge snapping during draw/modify operations.
Must be used within an OlVectorSource context.

## Parameters

### props

`OlSnapProps`

## Returns

`Element`

## Example

```tsx
<OlVectorSource>
  <OlSnap ref={snapRef} initialOptions={{ pixelTolerance: 10 }}>
    {children}
  </OlSnap>
</OlVectorSource>
```
