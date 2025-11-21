---
editUrl: false
next: true
prev: true
title: "OlDrawMesureTool"
---

> **OlDrawMesureTool**(): `Element`

Defined in: [src/ol-draw-mesure-tool.tsx:26](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-draw-mesure-tool.tsx#L26)

Component that displays real-time measurement tooltips during line drawing.
Shows the length of the line being drawn, formatted in meters or kilometers.
Must be used as a child of OlDraw configured with type="LineString".

## Returns

`Element`

## Example

```tsx
<OlDraw initialOptions={{ type: 'LineString' }}>
  <OlDrawMesureTool />
</OlDraw>
```
