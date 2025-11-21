---
editUrl: false
next: true
prev: true
title: "OlTranslate"
---

> **OlTranslate**(`__namedParameters`): `Element`

Defined in: [src/ol-translate.tsx:40](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-translate.tsx#L40)

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
