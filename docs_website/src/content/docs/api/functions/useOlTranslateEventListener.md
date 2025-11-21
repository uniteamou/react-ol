---
editUrl: false
next: true
prev: true
title: "useOlTranslateEventListener"
---

> **useOlTranslateEventListener**(`translate`, `type`, `listener`): `Translate` \| [`TranslateMiddleClass`](/api/classes/translatemiddleclass/) \| `null`

Defined in: [src/use-ol-translate-event-listener.tsx:38](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/use-ol-translate-event-listener.tsx#L38)

Hook to attach an event listener to an OpenLayers Translate or TranslateMiddle interaction.
Automatically handles cleanup when the component unmounts or dependencies change.

## Parameters

### translate

The OpenLayers Translate or TranslateMiddle interaction instance (null-safe)

`Translate` | [`TranslateMiddleClass`](/api/classes/translatemiddleclass/) | `null`

### type

[`TranslateEventType`](/api/type-aliases/translateeventtype/)

The type of translate event to listen for (e.g., 'translatestart', 'translateend')

### listener

[`TranslateListener`](/api/type-aliases/translatelistener/)

The callback function to execute when the event fires

## Returns

`Translate` \| [`TranslateMiddleClass`](/api/classes/translatemiddleclass/) \| `null`

The translate interaction instance

## Example

```tsx
const translate = useOlTranslate()
useOlTranslateEventListener(translate, 'translateend', (evt) => {
  console.log('Translation complete', evt.features)
})
```
