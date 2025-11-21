---
editUrl: false
next: true
prev: true
title: "useOlDrawEventListener"
---

> **useOlDrawEventListener**(`draw`, `type`, `listener`): `void`

Defined in: [src/use-ol-draw-event-listener.ts:33](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/use-ol-draw-event-listener.ts#L33)

Hook to attach an event listener to an OpenLayers Draw interaction.
Automatically handles cleanup when the component unmounts or dependencies change.

## Parameters

### draw

The OpenLayers Draw interaction instance (null-safe)

`Draw` | `null`

### type

[`DrawEventType`](/api/type-aliases/draweventtype/)

The type of draw event to listen for (e.g., 'drawstart', 'drawend', 'drawabort')

### listener

[`DrawListener`](/api/type-aliases/drawlistener/)

The callback function to execute when the event fires

## Returns

`void`

## Example

```tsx
const draw = useOlDraw()
useOlDrawEventListener(draw, 'drawend', (evt) => {
  console.log('Feature drawn', evt.feature)
})
```
