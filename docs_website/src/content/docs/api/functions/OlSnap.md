---
editUrl: false
next: true
prev: true
title: "OlSnap"
---

> **OlSnap**(`props`): `Element`

Defined in: [src/ol-snap.tsx:39](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-snap.tsx#L39)

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
