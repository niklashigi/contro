<p align="center">
  <img src="/images/header.png" align="center">
</p>

<h2 align="center">
  Unified Game Controls
</h2>

<p align="center">
  <em>
  Keyboard
  · Mouse
  · Gamepad
  –
  All under one simple API
  </em>
</p>

<p align="center">
  <a href="https://travis-ci.org/shroudedcode/contro">
    <img alt="Travis CI" src="https://img.shields.io/travis/shroudedcode/contro.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/contro">
    <img alt="npm version" src="https://img.shields.io/npm/v/contro.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/contro">
    <img alt="monthly downloads" src="https://img.shields.io/npm/dm/contro.svg?style=flat-square">
  </a>
</p>

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

> *More documentation coming soon.*
