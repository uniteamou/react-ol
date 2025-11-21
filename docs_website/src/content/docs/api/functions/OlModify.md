---
editUrl: false
next: true
prev: true
title: "OlModify"
---

> **OlModify**(`props`): `Element`

Defined in: [src/ol-modify.tsx:44](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-modify.tsx#L44)

OpenLayers Modify interaction component for editing feature geometries.
Allows users to click and drag feature vertices to modify their shape.
Must be used within an OlMap and requires a vector source context.

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
      <OlModify ref={modifyRef} initialOptions={{ pixelTolerance: 10 }}>
        {children}
      </OlModify>
    </OlVectorSource>
  </OlVectorLayer>
</OlMap>
```
