---
editUrl: false
next: true
prev: true
title: "OlVectorSource"
---

> **OlVectorSource**(`__namedParameters`): `Element`

Defined in: [src/ol-vector-source.tsx:43](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-vector-source.tsx#L43)

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
