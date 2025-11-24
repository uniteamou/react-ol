---
editUrl: false
next: true
prev: true
title: "OlVectorSource"
---

> **OlVectorSource**(`__namedParameters`): `Element`

Defined in: [src/ol-vector-source.tsx:43](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-vector-source.tsx#L43)

OpenLayers vector source component for providing vector feature data to a vector layer.
Must be used as a child of OlVectorLayer.

## Parameters

### \_\_namedParameters

`OlVectorSourceProps`

## Returns

`Element`

## Example

```tsx
<OlVectorLayer visible={true}>
  <OlVectorSource ref={sourceRef} initialOptions={{ features: [] }}>
    <OlFeature />
  </OlVectorSource>
</OlVectorLayer>
```
