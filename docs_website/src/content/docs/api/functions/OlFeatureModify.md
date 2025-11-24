---
editUrl: false
next: true
prev: true
title: "OlFeatureModify"
---

> **OlFeatureModify**(`props`): `Element`

Defined in: [src/ol-feature-modify.tsx:41](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-feature-modify.tsx#L41)

Modify interaction component that preserves the original feature geometry during editing.
Clones and tracks geometry modifications, allowing for controlled geometry updates.

## Parameters

### props

`OlModifyProps`

## Returns

`Element`

## Example

```tsx
<OlVectorSource>
  <OlFeatureModify ref={modifyRef} initialOptions={{ pixelTolerance: 10 }}>
    {children}
  </OlFeatureModify>
</OlVectorSource>
```
