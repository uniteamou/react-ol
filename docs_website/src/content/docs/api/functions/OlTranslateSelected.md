---
editUrl: false
next: true
prev: true
title: "OlTranslateSelected"
---

> **OlTranslateSelected**(`props`): `Element`

Defined in: [src/ol-translate-selected.tsx:28](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-translate-selected.tsx#L28)

Translate interaction component that automatically translates currently selected features.
Integrates with OlSelect to provide translate capabilities for the active selection.
Must be used within an OlSelect context.

## Parameters

### props

`OlTranslateSelectedProps`

## Returns

`Element`

## Example

```tsx
<OlSelect>
  <OlTranslateSelected ref={translateRef}>
    {children}
  </OlTranslateSelected>
</OlSelect>
```
