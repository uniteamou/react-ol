---
editUrl: false
next: true
prev: true
title: "OlImageLayer"
---

> `const` **OlImageLayer**: `MemoExoticComponent`\<(`__namedParameters`) => `Element`\>

Defined in: [src/ol-layer-geo-image.tsx:81](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-layer-geo-image.tsx#L81)

Memoized OpenLayers GeoImage layer component for displaying georeferenced images.
Uses shallow comparison for props optimization.

## Param

All OpenLayers BaseImage layer options plus custom props

## Param

Child components to render within the layer context (typically image sources)

## Param

Controls layer visibility

## Param

Custom properties to attach to the layer

## Param

Ref to expose the LayerGeoImage instance

## Example

```tsx
<OlMap>
  <OlImageLayer isVisible={true} properties={{ id: 'layer1' }}>
    <OlImageSource url="image.jpg" />
  </OlImageLayer>
</OlMap>
```
