---
editUrl: false
next: true
prev: true
title: "OlDraw"
---

> **OlDraw**(`props`): `Element`

Defined in: [src/ol-draw.tsx:42](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-draw.tsx#L42)

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
