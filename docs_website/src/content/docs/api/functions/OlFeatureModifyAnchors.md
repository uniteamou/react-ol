---
editUrl: false
next: true
prev: true
title: "OlFeatureModifyAnchors"
---

> **OlFeatureModifyAnchors**(`props`): `Element`

Defined in: [src/ol-feature-modify-anchors.tsx:49](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-feature-modify-anchors.tsx#L49)

Modify interaction component specialized for anchor-based line editing.
Adds draggable anchor points at line endpoints for controlled geometry modification.
Prevents vertex insertion/deletion during modification.

## Parameters

### props

`OlModifyProps`

## Returns

`Element`

## Example

```tsx
<OlMap>
  <OlVectorLayer visible={true}>
    <OlFeatureModifyAnchors ref={modifyRef}>
      {children}
    </OlFeatureModifyAnchors>
  </OlVectorLayer>
</OlMap>
```
