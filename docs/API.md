# Contro API Documentation

> Jump to [`Keyboard`](#keyboard) · [`Mouse`](#mouse) · [`MouseButton`](#mousebutton) · [`Gamepad`](#gamepad)

---

### `Keyboard`

An abstraction on top of JavaScript's [`KeyboardEvent`'s][keyboard-events].

#### `constructor({ doc })`

Creates a new `Keyboard` instance.

* `doc` is **optional** and can be used to inject an alternative `document` object

#### `isPressed(key)`

Returns whether the given key is currently pressed.

* `key` is the [key value][key-values] of the key

#### `wasPressed(key)`

Similar to `isPressed()`, but only returns `true` at the first [*fetch*](#terminology) during a press.

* `key` is the [key value][key-values] of the key

---

### `Mouse`

An abstraction on top of JavaScript's [`MouseEvent`'s][mouse-events] and the [Pointer Lock API][pointer-lock-api].

#### `constructor({ canvas, doc })`

Creates a new `Mouse` instance.

* `canvas` specifies which element the pointer will be locked to when `lockPointer()` is called
* `doc` is **optional** and can be used to inject an alternative `document` object

#### `isPressed(button)`

Returns whether the given mouse button is currently pressed.

* `button` is the number of the button (see [`MouseButton`](#mousebutton))

#### `wasPressed(button)`

Similar to `isPressed()`, but only returns `true` at the first [*fetch*](#terminology) during a press.

* `button` is the number of the button (see [`MouseButton`](#mousebutton))

#### `getPointerMovement()`

Returns a `Vector2` of the movement of the pointer since the last [*fetch*](#terminology).

#### `getScrollDistance()`

Returns the distance that was scrolled since the last [*fetch*](#terminology).

#### `lockPointer()`

Requests a pointer lock to the `canvas` element that was passed to the constructor.

#### `unlockPointer()`

Exits the pointer lock.

#### `isPointerLocked()`

Returns whether the pointer is currently locked to the `canvas` element.

---

### `MouseButton`

A helper object that maps the three mouse button types to their numbers:

```js
{
  Left: 0,
  Middle: 1,
  Right: 2
}
```

Note that you can also directly use the number (e.g. `1` instead of `MouseButton.Middle`).

---

### `Gamepad`

An abstraction on top of the [Gamepad API][gamepad-api].

#### `constructor({ win, nav })`

Creates a new `Gamepad` instance.

* `win` is **optional** and can be used to inject an alternative `window` object
* `nav` is **optional** and can be used to inject an alternative `navigator` object

#### `isConnected()`

Returns whether a gamepad is currently connected.

#### `isPressed(button)`

Returns whether the button is currently pressed.

* `button` is the index of the gamepad button

#### `wasPressed(button)`

Similar to `isPressed()`, but only returns `true` at the first [*fetch*](#terminology) during a press.

* `button` is the index of the gamepad button

---

## Terminology

* **fetch**: the last time a certain input class method (like `wasPressed()`) was called

[keyboard-events]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
[key-values]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
[mouse-events]: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
[pointer-lock-api]: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API
[gamepad-api]: https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API
