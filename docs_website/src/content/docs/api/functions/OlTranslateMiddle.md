---
editUrl: false
next: true
prev: true
title: "OlTranslateMiddle"
---

> **OlTranslateMiddle**(`__namedParameters`): `Element`

Defined in: [src/ol-translate-middle.tsx:41](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-translate-middle.tsx#L41)

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
