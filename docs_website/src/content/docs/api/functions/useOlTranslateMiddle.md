---
editUrl: false
next: true
prev: true
title: "useOlTranslateMiddle"
---

> **useOlTranslateMiddle**(): [`TranslateMiddleClass`](/api/classes/translatemiddleclass/)

Defined in: [src/ol-translate-middle.tsx:81](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-translate-middle.tsx#L81)

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
