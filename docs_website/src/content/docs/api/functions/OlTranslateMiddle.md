---
editUrl: false
next: true
prev: true
title: "OlTranslateMiddle"
---

> **OlTranslateMiddle**(`__namedParameters`): `Element`

Defined in: [src/ol-translate-middle.tsx:41](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-translate-middle.tsx#L41)

Custom Translate interaction component that allows dragging line segment midpoints.
When a user clicks on the middle of a line segment, both endpoints move together.
Must be used within an OlMap.

## Parameters

### \_\_namedParameters

[`OlTranslateMiddleProps`](/api/type-aliases/oltranslatemiddleprops/)

## Returns

`Element`

## Example

```tsx
<OlMap>
  <OlTranslateMiddle ref={translateRef} initialOptions={{ hitTolerance: 10 }}>
    {children}
  </OlTranslateMiddle>
</OlMap>
```
