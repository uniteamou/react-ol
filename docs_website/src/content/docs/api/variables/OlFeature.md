---
editUrl: false
next: true
prev: true
title: "OlFeature"
---

> `const` **OlFeature**: `MemoExoticComponent`\<(`__namedParameters`) => `null`\>

Defined in: [src/ol-feature.tsx:74](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-feature.tsx#L74)

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
