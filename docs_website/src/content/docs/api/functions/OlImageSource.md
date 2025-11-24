---
editUrl: false
next: true
prev: true
title: "OlImageSource"
---

> **OlImageSource**(`props`): `null`

Defined in: [src/ol-image-source.tsx:42](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-image-source.tsx#L42)

OpenLayers GeoImage source component for providing georeferenced image data to an image layer.
Must be used as a child of OlImageLayer.

## Parameters

### props

`OlImageSourceProps`

OpenLayers GeoImage source options

## Returns

`null`

## Example

```tsx
<OlImageLayer isVisible={true}>
  <OlImageSource
    url="image.jpg"
    imageCenter={[0, 0]}
    imageScale={[1, 1]}
    imageRotate={0}
    imageOpacity={0.8}
  />
</OlImageLayer>
```
