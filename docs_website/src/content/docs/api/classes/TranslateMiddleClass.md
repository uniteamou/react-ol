---
editUrl: false
next: true
prev: true
title: "TranslateMiddleClass"
---

Defined in: [src/translate-middle.ts:46](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/translate-middle.ts#L46)

Custom OpenLayers Translate interaction that enables dragging line segment midpoints.
Extends the standard Translate interaction to detect clicks on segment midpoints
and move both endpoints of the segment together.

## Example

```tsx
const translateMiddle = new TranslateMiddle({
  features: selectedFeatures,
  hitTolerance: 10
})
map.addInteraction(translateMiddle)
```

## Extends

- `Translate`

## Constructors

### Constructor

> **new TranslateMiddleClass**(`options?`): `TranslateMiddle`

Defined in: [src/translate-middle.ts:54](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/translate-middle.ts#L54)

#### Parameters

##### options?

`Omit`\<`Options`, `"filter"` \| `"condition"` \| `"layers"`\>

#### Returns

`TranslateMiddle`

#### Overrides

`Translate.constructor`

## Properties

### on

> **on**: `TranslateOnSignature`\<`EventsKey`\>

Defined in: node\_modules/ol/interaction/Translate.d.ts:151

#### Inherited from

`Translate.on`

***

### once

> **once**: `TranslateOnSignature`\<`EventsKey`\>

Defined in: node\_modules/ol/interaction/Translate.d.ts:155

#### Inherited from

`Translate.once`

***

### un

> **un**: `TranslateOnSignature`\<`void`\>

Defined in: node\_modules/ol/interaction/Translate.d.ts:159

#### Inherited from

`Translate.un`

## Methods

### addChangeListener()

> **addChangeListener**(`key`, `listener`): `void`

Defined in: node\_modules/ol/Object.d.ts:146

#### Parameters

##### key

`string`

Key name.

##### listener

`Listener`

Listener.

#### Returns

`void`

#### Inherited from

`Translate.addChangeListener`

***

### addEventListener()

> **addEventListener**(`type`, `listener`): `void`

Defined in: node\_modules/ol/events/Target.d.ts:50

#### Parameters

##### type

`string`

Type.

##### listener

`Listener`

Listener.

#### Returns

`void`

#### Inherited from

`Translate.addEventListener`

***

### changed()

> **changed**(): `void`

Defined in: node\_modules/ol/Observable.d.ts:65

Increases the revision counter and dispatches a 'change' event.

#### Returns

`void`

#### Api

#### Inherited from

`Translate.changed`

***

### dispatchEvent()

> **dispatchEvent**(`event`): `boolean` \| `undefined`

Defined in: node\_modules/ol/events/Target.d.ts:61

Dispatches an event and calls all listeners listening for events
of this type. The event parameter can either be a string or an
Object with a `type` property.

#### Parameters

##### event

Event object.

`string` | `BaseEvent`

#### Returns

`boolean` \| `undefined`

`false` if anyone called preventDefault on the
    event object or if any of the listeners returned false.

#### Api

#### Inherited from

`Translate.dispatchEvent`

***

### dispose()

> **dispose**(): `void`

Defined in: node\_modules/ol/Disposable.d.ts:19

Clean up.

#### Returns

`void`

#### Inherited from

`Translate.dispose`

***

### featuresAtPixel()

> **featuresAtPixel**(`pixel`, `map`): `Feature`\<`Geometry`\> \| `null` \| `undefined`

Defined in: [src/translate-middle.ts:253](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/translate-middle.ts#L253)

Copy of translate private method featuresAtPixel_ *

#### Parameters

##### pixel

`Pixel`

##### map

`Map`

#### Returns

`Feature`\<`Geometry`\> \| `null` \| `undefined`

***

### get()

> **get**(`key`): `any`

Defined in: node\_modules/ol/Object.d.ts:111

Gets a value.

#### Parameters

##### key

`string`

Key name.

#### Returns

`any`

Value.

#### Api

#### Inherited from

`Translate.get`

***

### getActive()

> **getActive**(): `boolean`

Defined in: node\_modules/ol/interaction/Interaction.d.ts:98

Return whether the interaction is currently active.

#### Returns

`boolean`

`true` if the interaction is active, `false` otherwise.

#### Observable

#### Api

#### Inherited from

`Translate.getActive`

***

### getHitTolerance()

> **getHitTolerance**(): `number`

Defined in: node\_modules/ol/interaction/Translate.d.ts:217

Returns the Hit-detection tolerance.

#### Returns

`number`

Hit tolerance in pixels.

#### Api

#### Inherited from

`Translate.getHitTolerance`

***

### getKeys()

> **getKeys**(): `string`[]

Defined in: node\_modules/ol/Object.d.ts:117

Get a list of object property names.

#### Returns

`string`[]

List of property names.

#### Api

#### Inherited from

`Translate.getKeys`

***

### getListeners()

> **getListeners**(`type`): `Listener`[] \| `undefined`

Defined in: node\_modules/ol/events/Target.d.ts:69

Get the listeners for a specified event type. Listeners are returned in the
order that they will be called in.

#### Parameters

##### type

`string`

Type.

#### Returns

`Listener`[] \| `undefined`

Listeners.

#### Inherited from

`Translate.getListeners`

***

### getMap()

> **getMap**(): `Map` \| `null`

Defined in: node\_modules/ol/interaction/Interaction.d.ts:104

Get the map associated with this interaction.

#### Returns

`Map` \| `null`

Map.

#### Api

#### Inherited from

`Translate.getMap`

***

### getPointerCount()

> **getPointerCount**(): `number`

Defined in: node\_modules/ol/interaction/Pointer.d.ts:138

Returns the current number of pointers involved in the interaction,
e.g. `2` when two fingers are used.

#### Returns

`number`

The number of pointers.

#### Api

#### Inherited from

`Translate.getPointerCount`

***

### getProperties()

> **getProperties**(): `object`

Defined in: node\_modules/ol/Object.d.ts:123

Get an object of all property names and values.

#### Returns

`object`

Object.

#### Api

#### Inherited from

`Translate.getProperties`

***

### getPropertiesInternal()

> **getPropertiesInternal**(): \{\[`x`: `string`\]: `any`; \} \| `null`

Defined in: node\_modules/ol/Object.d.ts:130

Get an object of all property names and values.

#### Returns

\{\[`x`: `string`\]: `any`; \} \| `null`

Object.

#### Inherited from

`Translate.getPropertiesInternal`

***

### getRevision()

> **getRevision**(): `number`

Defined in: node\_modules/ol/Observable.d.ts:72

Get the version number for this object.  Each time the object is modified,
its version number will be incremented.

#### Returns

`number`

Revision.

#### Api

#### Inherited from

`Translate.getRevision`

***

### handleEvent()

> **handleEvent**(`mapBrowserEvent`): `boolean`

Defined in: node\_modules/ol/interaction/Interaction.d.ts:86

Handles the module:ol/MapBrowserEvent~MapBrowserEvent map browser event.

#### Parameters

##### mapBrowserEvent

`MapBrowserEvent`\<`PointerEvent` \| `KeyboardEvent` \| `WheelEvent`\>

Map browser event.

#### Returns

`boolean`

`false` to stop event propagation.

#### Api

#### Inherited from

`Translate.handleEvent`

***

### hasListener()

> **hasListener**(`type?`): `boolean`

Defined in: node\_modules/ol/events/Target.d.ts:75

#### Parameters

##### type?

`string`

Type. If not provided,
    `true` will be returned if this event target has any listeners.

#### Returns

`boolean`

Has listeners.

#### Inherited from

`Translate.hasListener`

***

### hasProperties()

> **hasProperties**(): `boolean`

Defined in: node\_modules/ol/Object.d.ts:136

#### Returns

`boolean`

The object has properties.

#### Inherited from

`Translate.hasProperties`

***

### notify()

> **notify**(`key`, `oldValue`): `void`

Defined in: node\_modules/ol/Object.d.ts:141

#### Parameters

##### key

`string`

Key name.

##### oldValue

`any`

Old value.

#### Returns

`void`

#### Inherited from

`Translate.notify`

***

### removeChangeListener()

> **removeChangeListener**(`key`, `listener`): `void`

Defined in: node\_modules/ol/Object.d.ts:151

#### Parameters

##### key

`string`

Key name.

##### listener

`Listener`

Listener.

#### Returns

`void`

#### Inherited from

`Translate.removeChangeListener`

***

### removeEventListener()

> **removeEventListener**(`type`, `listener`): `void`

Defined in: node\_modules/ol/events/Target.d.ts:80

#### Parameters

##### type

`string`

Type.

##### listener

`Listener`

Listener.

#### Returns

`void`

#### Inherited from

`Translate.removeEventListener`

***

### requireCoordinate()

> **requireCoordinate**(`coordinate?`): \[`number`, `number`\]

Defined in: [src/translate-middle.ts:274](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/translate-middle.ts#L274)

#### Parameters

##### coordinate?

`Coordinate`

#### Returns

\[`number`, `number`\]

***

### requirePixel()

> **requirePixel**(`pixel?`): \[`number`, `number`\]

Defined in: [src/translate-middle.ts:268](https://github.com/uniteamou/react-ol/blob/3f767694adb5937d1c7dc3bd153f41afe35b318a/src/translate-middle.ts#L268)

#### Parameters

##### pixel?

`Pixel`

#### Returns

\[`number`, `number`\]

***

### set()

> **set**(`key`, `value`, `silent?`): `void`

Defined in: node\_modules/ol/Object.d.ts:159

Sets a value.

#### Parameters

##### key

`string`

Key name.

##### value

`any`

Value.

##### silent?

`boolean`

Update without triggering an event.

#### Returns

`void`

#### Api

#### Inherited from

`Translate.set`

***

### setActive()

> **setActive**(`active`): `void`

Defined in: node\_modules/ol/interaction/Interaction.d.ts:111

Activate or deactivate the interaction.

#### Parameters

##### active

`boolean`

Active.

#### Returns

`void`

#### Observable

#### Api

#### Inherited from

`Translate.setActive`

***

### setHitTolerance()

> **setHitTolerance**(`hitTolerance`): `void`

Defined in: node\_modules/ol/interaction/Translate.d.ts:224

Hit-detection tolerance. Pixels inside the radius around the given position
will be checked for features.

#### Parameters

##### hitTolerance

`number`

Hit tolerance in pixels.

#### Returns

`void`

#### Api

#### Inherited from

`Translate.setHitTolerance`

***

### setMap()

> **setMap**(`map`): `void`

Defined in: node\_modules/ol/interaction/Translate.d.ts:232

Remove the interaction from its current map and attach it to the new map.
Subclasses may set up event handlers to get notified about changes to
the map here.

#### Parameters

##### map

`Map`

Map.

#### Returns

`void`

#### Inherited from

`Translate.setMap`

***

### setProperties()

> **setProperties**(`values`, `silent?`): `void`

Defined in: node\_modules/ol/Object.d.ts:167

Sets a collection of key-value pairs.  Note that this changes any existing
properties and adds new ones (it does not remove any existing properties).

#### Parameters

##### values

Values.

##### silent?

`boolean`

Update without triggering an event.

#### Returns

`void`

#### Api

#### Inherited from

`Translate.setProperties`

***

### stopDown()

> **stopDown**(`handled`): `boolean`

Defined in: node\_modules/ol/interaction/Pointer.d.ts:121

This function is used to determine if "down" events should be propagated
to other interactions or should be stopped.

#### Parameters

##### handled

`boolean`

Was the event handled by the interaction?

#### Returns

`boolean`

Should the `down` event be stopped?

#### Inherited from

`Translate.stopDown`

***

### unset()

> **unset**(`key`, `silent?`): `void`

Defined in: node\_modules/ol/Object.d.ts:182

Unsets a property.

#### Parameters

##### key

`string`

Key name.

##### silent?

`boolean`

Unset without triggering an event.

#### Returns

`void`

#### Api

#### Inherited from

`Translate.unset`
