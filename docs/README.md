# Contro Documentation

Welcome to Contro's documentation!

## Basic concepts

### Component

A *component* is a class that exposes *controls*. Currently the following component classes are available:

* [`Keyboard`][keyboard-component]
* [`Mouse`][mouse-component]
* [`Gamepad`][gamepad-component]

### Control

A *control* belongs to a certain feature of a *component*, like a button. It is an object that has has three properties:

* `query` — a method that returns the current value of the control
  * the value is always of the same data type
* `label` — a label `string` that can be displayed to the player
* `trigger` — a getter that returns a trigger control
  * only exists on controls with the data type `boolean`

#### Trigger control

A boolean control that only returns `true` once after the control value changed to `true`. It then returns `false` until the value has changed back to `false` and then became `true` again.

#### Compound control

A compound control can be created by one of the operator functions and groups multiple controls into one that dynamically returns a relevant labels (for keyboard and mouse or gamepad) and control values.

> Still have questions? Feel free to [open an issue][issues].

[keyboard-component]: /components/keyboard.md
[mouse-component]: /components/mouse.md
[gamepad-component]: /components/gamepad.md
[issues]: https://github.com/shroudedcode/contro/issues
