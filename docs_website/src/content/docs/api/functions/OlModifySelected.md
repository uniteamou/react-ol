---
editUrl: false
next: true
prev: true
title: "OlModifySelected"
---

> **OlModifySelected**(`props`): `Element`

Defined in: [src/ol-modify-selected.tsx:22](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-modify-selected.tsx#L22)

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
