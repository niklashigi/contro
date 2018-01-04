<h1 align="center">
  <br>
	<br>
  <img width="320" src="/images/header.png">
	<br>
	<br>
	<br>
</h1>

> Game controls done right.

[![build status][build-badge]][build-link]
[![coverage][coverage-badge]][coverage-link]
[![npm version][npm-version-badge]][npm-link]
[![monthly downloads][npm-downloads-badge]][npm-link]

### What is Contro?

Contro is a **library** that offers **simple abstractions** on top of existing **Web input APIs** and allows game developers to easily implement controls for **keyboard**, **mouse** and **gamepad**.

## Installation

The easiest way to include Contro in your application is using the `unpkg` CDN:

```html
<script src="https://unpkg.com/contro@2"></script>
```

If you're using `npm`, you can also install it using `npm i contro`.

## Usage

1. Import the Contro classes and functions using [Object destructuring][object-destructuring].

```js
const { Mouse, Keyboard, Gamepad, or, and } = Contro
// OR
import { Mouse, Keyboard, Gamepad, or, and } from 'contro'
```

2. Create instances of the components you want to use.

```js
const keyboard = new Keyboard()
const gamepad = new Gamepad()
```

3. Prepare the controls using the control methods and the operator functions `and` and `or`.

```js
const controls = {
  jump: or(gamepad.button('A').trigger, keyboard.key('Space').trigger),
  menu: or(gamepad.button('Back').trigger, keyboard.key('Esc').trigger),
  inventory: or(gamepad.button('LB').trigger, keyboard.key('E').trigger),
  map: or(gamepad.button('RB').trigger, keyboard.key('M').trigger),
  statusOverlay: or(gamepad.button('RB'), keyboard.key('Tab')),
}
```

4. In your game loop, display the relevant `.label`'s and '`.query()` the controls.

```js
function gameLoop() {
  // Update the UI to reflect the player's input device(s)
  game.jumpButton.text = controls.jump.label
  game.menuButton.text = controls.menu.label
  // ...

  // Query the controls and do something
  if (controls.jump.query()) game.player.jump()
  if (controls.menu.query()) game.openMenu()
  game.statusOverlay.visible = controls.statusOverlay.query()
  // ...

  requestAnimationFrame(gameLoop)
}
```

Note that all of the code starting with `game.` is fictional and just serves as an example.

---

#### Not convinced yet? Check out [this demo][demo]!
> Wanna learn more? Check out [the docs][docs]!

[demo]: https://codepen.io/shroudedcode/pen/qpPqmB
[docs]: /docs/README.md
[object-destructuring]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring

[build-link]: https://travis-ci.org/shroudedcode/contro
[build-badge]: https://img.shields.io/travis/shroudedcode/contro.svg?style=flat-square

[coverage-link]: https://codecov.io/gh/shroudedcode/contro
[coverage-badge]: https://img.shields.io/codecov/c/github/shroudedcode/contro.svg?style=flat-square

[npm-link]: https://www.npmjs.com/package/contro
[npm-version-badge]: https://img.shields.io/npm/v/contro.svg?style=flat-square
[npm-downloads-badge]: https://img.shields.io/npm/dm/contro.svg?style=flat-square
