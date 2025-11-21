---
editUrl: false
next: true
prev: true
title: "OlSourceCustomArcGISXYZ"
---

> **OlSourceCustomArcGISXYZ**(`__namedParameters`): `Element`

Defined in: [src/ol-source-custom-arcgis-xyz.tsx:90](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-source-custom-arcgis-xyz.tsx#L90)

OpenLayers tile source component for ArcGIS Image Server using XYZ tile scheme with custom BBOX export.
Generates tile URLs with BBOX parameters for ArcGIS export endpoints.
Must be used as a child of OlTileLayer.

## Parameters

### \_\_namedParameters

`OlTileSourceProps`

## Returns

`Element`

## Example

```tsx
<OlTileLayer>
  <OlSourceCustomArcGISXYZ
    initialOptions={{
      url: 'https://server.arcgisonline.com/arcgis/rest/services/Layer/ImageServer',
      maxZoom: 18
    }}
  />
</OlTileLayer>
```
