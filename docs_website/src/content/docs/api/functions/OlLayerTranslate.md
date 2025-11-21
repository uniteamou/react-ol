---
editUrl: false
next: true
prev: true
title: "OlLayerTranslate"
---

> **OlLayerTranslate**(`props`): `Element`

Defined in: [src/ol-translate.tsx:81](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-translate.tsx#L81)

Translate interaction component scoped to a specific vector layer.
Automatically configures the translate interaction to only move features from the parent layer.
Must be used within an OlVectorLayer.

## Parameters

### props

[`OlTranslateProps`](/api/type-aliases/oltranslateprops/)

## Returns

`Element`

## Example

```tsx
<OlVectorLayer visible={true}>
  <OlLayerTranslate ref={translateRef}>
    {children}
  </OlLayerTranslate>
</OlVectorLayer>
```
