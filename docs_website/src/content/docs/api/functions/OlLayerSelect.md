---
editUrl: false
next: true
prev: true
title: "OlLayerSelect"
---

> **OlLayerSelect**(`props`): `Element`

Defined in: [src/ol-select.tsx:82](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-select.tsx#L82)

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
