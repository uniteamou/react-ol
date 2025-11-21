---
editUrl: false
next: true
prev: true
title: "OlFeatureModifyScale"
---

> **OlFeatureModifyScale**(`props`): `Element`

Defined in: [src/ol-feature-modify-scale.tsx:41](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-feature-modify-scale.tsx#L41)

Modify interaction component specialized for scaling feature geometries.
Displays draggable scale handles around features that allow proportional scaling
from the center point.

## Parameters

### props

`OlModifyProps`

## Returns

`Element`

## Example

```tsx
<OlMap>
  <OlVectorLayer visible={true}>
    <OlVectorSource>
      <OlFeatureModifyScale ref={modifyRef} initialOptions={{ pixelTolerance: 10 }} />
    </OlVectorSource>
  </OlVectorLayer>
</OlMap>
```
