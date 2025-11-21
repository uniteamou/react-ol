---
editUrl: false
next: true
prev: true
title: "OlLayerSelect"
---

> **OlLayerSelect**(`props`): `Element`

Defined in: [src/ol-select.tsx:82](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-select.tsx#L82)

Select interaction component scoped to a specific vector layer.
Automatically configures the select interaction to only select features from the parent layer.
Must be used within an OlVectorLayer.

## Parameters

### props

`OlFeatureSelectProps`

## Returns

`Element`

## Example

```tsx
<OlVectorLayer visible={true}>
  <OlLayerSelect ref={selectRef}>
    {children}
  </OlLayerSelect>
</OlVectorLayer>
```
