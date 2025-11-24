---
editUrl: false
next: true
prev: true
title: "OlFeatureModifyAnchors"
---

> **OlFeatureModifyAnchors**(`props`): `Element`

Defined in: [src/ol-feature-modify-anchors.tsx:49](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-feature-modify-anchors.tsx#L49)

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
