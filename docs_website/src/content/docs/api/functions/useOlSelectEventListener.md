---
editUrl: false
next: true
prev: true
title: "useOlSelectEventListener"
---

> **useOlSelectEventListener**(`select`, `type`, `listener`): `Select` \| `null`

Defined in: [src/use-ol-select-event-listener.tsx:36](https://github.com/uniteamou/react-ol/blob/2b026b1e812953582bf7e9abe5a1a6f3952cb2ce/src/use-ol-select-event-listener.tsx#L36)

Hook to attach an event listener to an OpenLayers Select interaction.
Automatically handles cleanup when the component unmounts or dependencies change.

## Parameters

### select

The OpenLayers Select interaction instance (null-safe)

`Select` | `null`

### type

[`SelectEventType`](/api/type-aliases/selecteventtype/)

The type of select event to listen for (e.g., 'select')

### listener

[`SelectListener`](/api/type-aliases/selectlistener/)

The callback function to execute when the event fires

## Returns

`Select` \| `null`

The Select interaction instance

## Example

```tsx
const select = useOlLayerSelect()
useOlSelectEventListener(select, 'select', (evt) => {
  console.log('Selected features', evt.selected)
})
```
