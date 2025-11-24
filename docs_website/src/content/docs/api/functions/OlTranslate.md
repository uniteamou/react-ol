---
editUrl: false
next: true
prev: true
title: "OlTranslate"
---

> **OlTranslate**(`__namedParameters`): `Element`

Defined in: [src/ol-translate.tsx:40](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-translate.tsx#L40)

OpenLayers Translate interaction component for moving features by dragging.
Allows users to click and drag features to reposition them.
Must be used within an OlMap.

## Parameters

### \_\_namedParameters

[`OlTranslateProps`](/api/type-aliases/oltranslateprops/)

## Returns

`Element`

## Example

```tsx
<OlMap>
  <OlTranslate ref={translateRef} initialOptions={{ hitTolerance: 5 }}>
    {children}
  </OlTranslate>
</OlMap>
```
