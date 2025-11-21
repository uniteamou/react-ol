---
editUrl: false
next: true
prev: true
title: "useOlTranslate"
---

> **useOlTranslate**(): `Translate`

Defined in: [src/ol-translate.tsx:107](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-translate.tsx#L107)

Hook to access the OpenLayers Translate interaction instance from the nearest parent OlTranslate component.
Must be used within a descendant of OlTranslate/OlLayerTranslate.

## Returns

`Translate`

The OpenLayers Translate interaction instance

## Throws

If called outside of an OlTranslate/OlLayerTranslate component

## Example

```tsx
function TranslateControl() {
  const translate = useOlTranslate()
  // Use translate instance
  return null
}
```
