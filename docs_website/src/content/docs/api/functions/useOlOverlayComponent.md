---
editUrl: false
next: true
prev: true
title: "useOlOverlayComponent"
---

> **useOlOverlayComponent**(): `Overlay`

Defined in: [src/ol-overlay-component.tsx:105](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-overlay-component.tsx#L105)

Hook to access the OpenLayers Overlay instance from the nearest parent OlOverlay component.
Must be used within a descendant of OlOverlay.

## Returns

`Overlay`

The OpenLayers Overlay instance

## Throws

If called outside of an OlOverlay component

## Example

```tsx
function OverlayContent() {
  const overlay = useOlOverlayComponent()
  // Use overlay instance
  return <div>Content</div>
}
```
