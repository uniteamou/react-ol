---
editUrl: false
next: true
prev: true
title: "useOlMapEventListener"
---

> **useOlMapEventListener**(`map`, `type`, `listener`): `void`

Defined in: [src/use-ol-map-event-listener.ts:29](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/use-ol-map-event-listener.ts#L29)

Hook to attach an event listener to an OpenLayers Map instance.
Automatically handles cleanup when the component unmounts or dependencies change.

## Parameters

### map

The OpenLayers Map instance to attach the listener to (null-safe)

`Map` | `null`

### type

The type of map event to listen for

`"change"` | `"error"` | `"propertychange"` | `"change:layergroup"` | `"change:size"` | `"change:target"` | `"change:view"` | `"singleclick"` | `"click"` | `"dblclick"` | `"pointerdrag"` | `"pointermove"` | `"postrender"` | `"movestart"` | `"moveend"` | `"loadstart"` | `"loadend"` | `"precompose"` | `"postcompose"` | `"rendercomplete"`

### listener

`ListenerFunction`

The callback function to execute when the event fires

## Returns

`void`

## Example

```tsx
const map = useOlMap()
useOlMapEventListener(map, 'click', (evt) => {
  console.log('Map clicked', evt)
})
```
