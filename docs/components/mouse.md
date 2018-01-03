### `Mouse` component

An abstraction on top of JavaScript's [`MouseEvent`'s][mouse-events] and the [Pointer Lock API][pointer-lock-api].

---

#### `constructor({ canvas, doc })`

Creates a new `Mouse` instance.

* `canvas` specifies which element the pointer will be locked to when `lockPointer()` is called
* `doc` is **optional** and can be used to inject an alternative `document` object

---

#### `button(button)`

When `.query()`-ed returns whether the given mouse button is currently pressed.

* `button` is the number or name (`left`, `middle`, `right`) of the button

#### `pointer()`

When `.query()`-ed returns a `Vector2` of the movement of the pointer since the last [*fetch*](#terminology).

#### `wheel()`

When `.query()`-ed returns the distance that was scrolled since the last [*fetch*](#terminology).

---

#### `lockPointer()`

Requests a pointer lock to the `canvas` element that was passed to the constructor.

#### `unlockPointer()`

Exits the pointer lock.

#### `isPointerLocked()`

Returns whether the pointer is currently locked to the `canvas` element.

[mouse-events]: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
[pointer-lock-api]: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API
