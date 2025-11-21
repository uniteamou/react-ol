---
editUrl: false
next: true
prev: true
title: "OlModifySelected"
---

> **OlModifySelected**(`props`): `Element`

Defined in: [src/ol-modify-selected.tsx:22](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-modify-selected.tsx#L22)

Modify interaction component that automatically modifies currently selected features.
Integrates with OlSelect to provide modify capabilities for the active selection.
Must be used within an OlSelect context.

## Parameters

### props

#### children?

`ReactNode`

Child components

## Returns

`Element`

## Example

```tsx
<OlSelect>
  <OlModifySelected>
    {children}
  </OlModifySelected>
</OlSelect>
```
