---
editUrl: false
next: true
prev: true
title: "OlFeatureModify"
---

> **OlFeatureModify**(`props`): `Element`

Defined in: [src/ol-feature-modify.tsx:41](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-feature-modify.tsx#L41)

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
