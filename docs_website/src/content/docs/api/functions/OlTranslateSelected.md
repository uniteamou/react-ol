---
editUrl: false
next: true
prev: true
title: "OlTranslateSelected"
---

> **OlTranslateSelected**(`props`): `Element`

Defined in: [src/ol-translate-selected.tsx:28](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-translate-selected.tsx#L28)

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
