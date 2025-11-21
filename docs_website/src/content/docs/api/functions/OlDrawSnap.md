---
editUrl: false
next: true
prev: true
title: "OlDrawSnap"
---

> **OlDrawSnap**(): `Element` \| `null`

Defined in: [src/ol-draw-snap.tsx:26](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-draw-snap.tsx#L26)

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
