---
editUrl: false
next: true
prev: true
title: "OlDrawSnap"
---

> **OlDrawSnap**(): `Element` \| `null`

Defined in: [src/ol-draw-snap.tsx:26](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-draw-snap.tsx#L26)

Component that enables snapping during drawing by temporarily displaying the feature being drawn.
Creates a temporary vector layer with snap interaction for the feature under construction.
Must be used as a child of OlDraw.

## Returns

`Element` \| `null`

## Example

```tsx
<OlDraw initialOptions={{ type: 'LineString' }}>
  <OlDrawSnap />
</OlDraw>
```
