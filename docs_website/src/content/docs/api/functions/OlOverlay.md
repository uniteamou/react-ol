---
editUrl: false
next: true
prev: true
title: "OlOverlay"
---

> **OlOverlay**(`props`): `Element`

Defined in: [src/ol-overlay-component.tsx:44](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-overlay-component.tsx#L44)

OpenLayers Overlay component for displaying HTML elements anchored to map coordinates.
Useful for popups, tooltips, and custom markers.

## Parameters

### props

`OlOverlayProps`

All OpenLayers OverlayOptions plus React-specific props

## Returns

`Element`

## Example

```tsx
<OlMap>
  <OlOverlay position={[0, 0]} className="popup">
    <div>Popup content</div>
  </OlOverlay>
</OlMap>
```
