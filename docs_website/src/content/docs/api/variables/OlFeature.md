---
editUrl: false
next: true
prev: true
title: "OlFeature"
---

> `const` **OlFeature**: `MemoExoticComponent`\<(`__namedParameters`) => `null`\>

Defined in: [src/ol-feature.tsx:74](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/ol-feature.tsx#L74)

Memoized OpenLayers feature component for displaying individual geographic features.
Uses shallow comparison for props optimization.
Must be used as a child of OlVectorSource.

## Param

OpenLayers Feature instance to display

## Param

Style properties to apply to the feature (reactive)

## Param

Custom style function for the feature (reactive)

## Param

Custom properties to attach to the feature (reactive)

## Param

Projection configuration for coordinate transformation

## Example

```tsx
<OlVectorSource>
  <OlFeature
    feature={myFeature}
    styleFunction={customStyle}
    properties={{ id: 'feature1' }}
  />
</OlVectorSource>
```
