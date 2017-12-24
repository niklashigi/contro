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
[![monhtly downloads][npm-downloads-badge]][npm-link]

## Introducation

### What is Contro?

Contro is a **library** that offers **simple abstractions** on top of existing **Web input APIs** and allows game developers to easily implements controls for **keyboard**, **mouse** and **gamepad**.

### Getting started

The easiest way to include Contro in your application is using a CDN:

```html
<script src="https://unpkg.com/contro"></script>
```

If you're using `npm`, you can also `npm install contro`.

### Creating your first control

Imagine your game looked something like this ...

```js
/** Gameloop */
const canvas = document.querySelector('#game')
const renderer = new MyGameLibrary.Renderer(canvas)
const catWorld = new CatWorld()

function loop() {
  renderer.render(catWorld)
  requestAnimationFrame(loop)
}

loop()
```

... and you wanted to spawn a new cat whenever the user clicked.

To accomplish this we need Contro's `Mouse` class. It's an abstraction on top of JavaScript's [`MouseEvent`'s](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) and the [Pointer Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API) optimized for being used within [game loop](https://en.wikipedia.org/wiki/Game_programming#Game_structure) functions.

Let's create a new `Mouse` instance and pass in our `canvas`, so Contro can register the required event listeners for us.

```js
const mouse = new Contro.Mouse({ canvas })
```

Now we can use our new `Mouse` instance to check whether the left mouse button is pressed.

```js
if (mouse.isPressed(Contro.MouseButton.Left)) {
  catWorld.spawnCat()
}
```

If this was real code and you ran it game you'd notice something weird: Whenever you held down your left mouse button cats would keep spawning and spawning until you released the button again.

This is because `Mouse.isPressed()` always returns the current state of the mouse button and that for every single frame (iteration of your game loop). We only want one cat to spawn when we click, so we have to use `Mouse.wasPressed()`.

Our final code looks like this:

```js
/** Gameloop */
const canvas = document.querySelector('#game')
const renderer = new MyGameLibrary.Renderer(canvas)
const catWorld = new CatWorld()
const mouse = new Contro.Mouse()

function loop() {
  if (mouse.wasPressed(Contro.MouseButton.Left)) {
    catWorld.spawnCat()
  }
  renderer.render(catWorld)
  requestAnimationFrame(loop)
}

loop()
```

> Learn more on the [API Documentation](/docs/API.md).

[build-link]: https://travis-ci.org/shroudedcode/contro
[build-badge]: https://img.shields.io/travis/shroudedcode/contro.svg?style=flat-square

[coverage-link]: https://codecov.io/gh/shroudedcode/contro
[coverage-badge]: https://img.shields.io/codecov/c/github/shroudedcode/contro.svg?style=flat-square

[npm-link]: https://www.npmjs.com/package/contro
[npm-version-badge]: https://img.shields.io/npm/v/contro.svg?style=flat-square
[npm-downloads-badge]: https://img.shields.io/npm/dm/contro.svg?style=flat-square
