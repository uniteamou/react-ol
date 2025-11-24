---
editUrl: false
next: true
prev: true
title: "OlVectorLayer"
---

> `const` **OlVectorLayer**: `MemoExoticComponent`\<(`__namedParameters`) => `Element`\>

Defined in: [src/ol-vector-layer.tsx:116](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-vector-layer.tsx#L116)

Memoized OpenLayers vector layer component for displaying vector features (points, lines, polygons).
Uses shallow comparison for props optimization.

## Param

Child components to render within the layer context (typically vector sources)

## Param

Controls layer visibility (reactive)

## Param

Custom properties to attach to the layer (reactive)

## Param

Style or style function for features (reactive)

## Param

Minimum zoom level for layer visibility (reactive)

## Param

Maximum zoom level for layer visibility (reactive)

## Param

Layer z-index for rendering order (reactive)

## Param

Ref to expose the VectorLayer instance

## Example

```tsx
<OlMap>
  <OlVectorLayer
    ref={layerRef}
    visible={true}
    style={myStyleFunction}
    zIndex={10}
  >
    <OlVectorSource />
  </OlVectorLayer>
</OlMap>
```
