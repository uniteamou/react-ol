---
editUrl: false
next: true
prev: true
title: "OlUserLocationLayer"
---

> **OlUserLocationLayer**(`props`): `Element`

Defined in: [src/ol-user-location-layer.tsx:58](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/ol-user-location-layer.tsx#L58)

Layer component that displays the user's current location on the map using the Geolocation API.
Automatically tracks user position and updates a blue circle marker.
Must be used within an OlMap.

## Parameters

### props

`OlUserLocationLayerProps`

All OpenLayers Geolocation options plus custom props

## Returns

`Element`

## Example

```tsx
<OlMap>
  <OlUserLocationLayer
    visible={true}
    trackingOptions={{ enableHighAccuracy: true }}
  />
</OlMap>
```
