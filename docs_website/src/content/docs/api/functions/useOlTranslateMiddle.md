---
editUrl: false
next: true
prev: true
title: "useOlTranslateMiddle"
---

> **useOlTranslateMiddle**(): [`TranslateMiddleClass`](/api/classes/translatemiddleclass/)

Defined in: [src/ol-translate-middle.tsx:81](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-translate-middle.tsx#L81)

Hook to access the TranslateMiddle interaction instance from the nearest parent OlTranslateMiddle component.
Must be used within a descendant of OlTranslateMiddle.

## Returns

[`TranslateMiddleClass`](/api/classes/translatemiddleclass/)

The TranslateMiddle interaction instance

## Throws

If called outside of an OlTranslateMiddle component

## Example

```tsx
function TranslateMiddleControl() {
  const translateMiddle = useOlTranslateMiddle()
  // Use translateMiddle instance
  return null
}
```
