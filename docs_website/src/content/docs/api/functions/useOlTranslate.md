---
editUrl: false
next: true
prev: true
title: "useOlTranslate"
---

> **useOlTranslate**(): `Translate`

Defined in: [src/ol-translate.tsx:107](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-translate.tsx#L107)

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
