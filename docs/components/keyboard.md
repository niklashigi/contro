### `Keyboard` component

An abstraction on top of JavaScript's [`KeyboardEvent`'s][keyboard-events].

---

#### `constructor({ doc })`

Creates a new `Keyboard` instance.

* `doc` is **optional** and can be used to inject an alternative `document` object

---

#### `key(key)`

When `.query()`-ed returns whether the given key is currently pressed.

* `key` is the [key][keyboard-keys]

#### `directionalKeys(keys)`

When `.query()`-ed returns a `Vector2` of the movement that would occur inside the game with regular arrow key controls.

* `keys` is the name of an arrow key template (`arrows` or `wasd`) or an array consisting of four [keys][keyboard-keys] (e.g. `['w', 'a', 's', 'd']`)

[keyboard-keys]: /keyboard-keys.md
[keyboard-events]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
