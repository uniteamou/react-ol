---
editUrl: false
next: true
prev: true
title: "useOlModifyEventListener"
---

> **useOlModifyEventListener**(`modify`, `type`, `listener`): `void`

Defined in: [src/use-ol-modify-event-listener.ts:35](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/use-ol-modify-event-listener.ts#L35)

Hook to attach an event listener to an OpenLayers Modify interaction.
Automatically handles cleanup when the component unmounts or dependencies change.

## Parameters

### modify

The OpenLayers Modify interaction instance (null-safe)

`Modify` | `null`

### type

[`ModifyEventType`](/api/type-aliases/modifyeventtype/)

The type of modify event to listen for (e.g., 'modifystart', 'modifyend')

### listener

[`ModifyListener`](/api/type-aliases/modifylistener/)

The callback function to execute when the event fires

## Returns

`void`

## Example

```tsx
const modify = useOlModify()
useOlModifyEventListener(modify, 'modifyend', (evt) => {
  console.log('Modification complete', evt.features)
})
```
