---
editUrl: false
next: true
prev: true
title: "OlDraw"
---

> **OlDraw**(`props`): `Element`

Defined in: [src/ol-draw.tsx:42](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-draw.tsx#L42)

OpenLayers Draw interaction component for drawing new vector features.
Allows users to draw points, lines, polygons, and other geometries.
Must be used within an OlVectorSource context.

## Parameters

### props

`OlDrawProps`

## Returns

`Element`

## Example

```tsx
<OlVectorSource>
  <OlDraw ref={drawRef} type="LineString" initialOptions={{ freehand: false }}>
    <OlDrawMesureTool />
  </OlDraw>
</OlVectorSource>
```
