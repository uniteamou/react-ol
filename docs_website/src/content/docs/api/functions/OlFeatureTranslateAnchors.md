---
editUrl: false
next: true
prev: true
title: "OlFeatureTranslateAnchors"
---

> **OlFeatureTranslateAnchors**(`props`): `Element`

Defined in: [src/ol-feature-translate-anchors.tsx:30](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-feature-translate-anchors.tsx#L30)

Translate interaction component that adds anchor points at the middle of line segments.
Allows users to drag segment midpoints to modify line geometry.

## Parameters

### props

[`OlTranslateProps`](/api/type-aliases/oltranslateprops/)

Same props as OlTranslate component

## Returns

`Element`

## Example

```tsx
<OlMap>
  <OlVectorLayer visible={true}>
    <OlFeatureTranslateAnchors initialOptions={{ hitTolerance: 5 }}>
      {children}
    </OlFeatureTranslateAnchors>
  </OlVectorLayer>
</OlMap>
```
