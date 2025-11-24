---
editUrl: false
next: true
prev: true
title: "OlSelect"
---

> **OlSelect**(`__namedParameters`): `Element`

Defined in: [src/ol-select.tsx:40](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-select.tsx#L40)

OpenLayers Select interaction component for selecting features on the map.
Allows users to click features to select them.
Must be used within an OlMap.

## Parameters

### \_\_namedParameters

`OlFeatureSelectProps`

## Returns

`Element`

## Example

```tsx
<OlMap>
  <OlSelect ref={selectRef} initialOptions={{ multi: true }}>
    {children}
  </OlSelect>
</OlMap>
```
