---
editUrl: false
next: true
prev: true
title: "OlModify"
---

> **OlModify**(`props`): `Element`

Defined in: [src/ol-modify.tsx:44](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-modify.tsx#L44)

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
