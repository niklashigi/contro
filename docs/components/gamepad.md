### `Gamepad` component

An abstraction on top of the [Gamepad API][gamepad-api].

---

#### `constructor({ win, nav })`

Creates a new `Gamepad` instance.

* `win` is **optional** and can be used to inject an alternative `window` object
* `nav` is **optional** and can be used to inject an alternative `navigator` object

---

#### `button(button)`

When `.query()`-ed returns whether the button is currently pressed.

* `button` is the index of the gamepad button

---

#### `stick(stick)`

When `.query()`-ed returns a `Vector2` of the current position of the stick.

* `stick` is the name of the stick (`left`, `right`) or an object
  * the custom object looks like this: `{ label: 'Example stick', xAxis: 0, yAxis: 1 }`

---

#### `vibrate(duration, options)`

Makes the gamepad vibrate with the specified magnitude for the specified duration.

* `duration` is the duration in milliseconds
* `options` is an object with the following properties:
  * `weakMagnitude` is the magnitude with which the weak motor will vibrate (defaults to `0`)
  * `strongMagnitude` is the magnitude with which the strong motor will vibrate (defaults to `0`)

Note that this feature:

* **only works** with so-called "Dual Rumble" gamepads that have two vibrations motors
* **will not work** in all browsers since it's based on a [proposal][vibration-proposal] that, as of April 2020, isn't part of the official specification yet

---

#### `isConnected()`

Returns whether a gamepad is currently connected.

[gamepad-api]: https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API
[vibration-proposal]: https://github.com/w3c/gamepad/pull/68

