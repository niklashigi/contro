import { expect } from 'chai'
import * as Mocha from 'mocha'
import { ICanvas, IDocument } from '../apis'
import { Vector2 } from '../utils/math'
import { MockEventTarget } from '../utils/mock'
import { Mouse } from './mouse'

class MockCanvas extends MockEventTarget implements ICanvas {

  public pointerLockRequested = false

  public requestPointerLock() {
    this.pointerLockRequested = true
  }

}

class MockDocument extends MockEventTarget implements IDocument {

  public pointerLockElement: any

  public pointerLockExited = false

  public exitPointerLock() {
    this.pointerLockExited = true
  }

}

describe('The `Mouse` class', () => {

  const canvas = new MockCanvas()
  const doc = new MockDocument()
  const mouse = new Mouse({ canvas, doc })

  it('should register the required listeners on the canvas', () => {
    expect(Object.keys(canvas.listeners).sort()).to.deep.equal([
      'mousemove',
      'mousedown',
      'mouseup',
      'wheel',
    ].sort())
  })

  describe('should have a `parseButton()` method that', () => {

    it('correctly parses button names', () => {
      expect(mouse.parseButton('left')).to.equal(0)
      expect(mouse.parseButton('middle')).to.equal(1)
      expect(mouse.parseButton('right')).to.equal(2)
    })

    it('returns button numbers unchanged', () => {
      expect(mouse.parseButton(0)).to.equal(0)
      expect(mouse.parseButton(1)).to.equal(1)
      expect(mouse.parseButton(2)).to.equal(2)
    })

    it("throws an error when the named button doesn't exist", () => {
      expect(() => mouse.parseButton('lul')).to.throw(Error, 'There is no mouse button called "lul"!')
    })

    it('throws an error when the button number is out of range', () => {
      expect(() => mouse.parseButton(42)).to.throw(Error, 'There is no mouse button with the index 42!')
    })

  })

  describe('should have an `button()` method that returns a component that', () => {

    it('returns the correct label for all three buttons', () => {
      expect(mouse.button('left').label).to.equal('[LMB]')
      expect(mouse.button('middle').label).to.equal('[MMB]')
      expect(mouse.button('right').label).to.equal('[RMB]')
    })

    it('when queried returns `true` the mouse button is pressed', () => {
      canvas.listeners.mousedown({ button: 0 })
      expect(mouse.button('left').query()).to.equal(true)
    })

    it('when queried returns `false` when the mouse button is not pressed', () => {
      canvas.listeners.mouseup({ button: 0 })
      expect(mouse.button('left').query()).to.equal(false)
    })

    describe('when queried in `trigger` mode', () => {

      it('returns `false` when the button is not pressed', () => {
        canvas.listeners.mouseup({ button: 0 })
        expect(mouse.button('left').trigger.query()).to.equal(false)
      })

      it('returns `true` once after the button was pressed', () => {
        canvas.listeners.mousedown({ button: 0 })
        expect(mouse.button('left').trigger.query()).to.equal(true)
      })

      it('returns `false` after button state was queried', () => {
        expect(mouse.button('left').trigger.query()).to.equal(false)
      })

    })

  })

  describe('should have a `pointer()` method that returns a component that', () => {

    it('returns the correct label', () => {
      expect(mouse.pointer().label).to.equal('Cursor')
    })

    describe('when queried', () => {

      it('returns a (0, 0) vector if no movement occurred', () => {
        expect(mouse.pointer().query()).to.deep.equal(new Vector2())
      })

      it('returns the correct movement vector after a single movement occurred', () => {
        canvas.listeners.mousemove({ movementX: 1, movementY: 2 })
        expect(mouse.pointer().query()).to.deep.equal(new Vector2(1, 2))
      })

      it('after movement returns a (0, 0) vector', () => {
        expect(mouse.pointer().query()).to.deep.equal(new Vector2())
      })

      it('after multiple movements occurred, returns the total movement vector', () => {
        canvas.listeners.mousemove({ movementX: 1, movementY: 2 })
        canvas.listeners.mousemove({ movementX: 3, movementY: 5 })
        expect(mouse.pointer().query()).to.deep.equal(new Vector2(4, 7))
      })

    })

  })

  describe('should have a `wheel()` method that returns a component that', () => {

    it('returns the correct label', () => {
      expect(mouse.wheel().label).to.equal('Mouse wheel')
    })

    describe('when queried', () => {

      it('returns `0` if no scrolling occurred', () => {
        expect(mouse.wheel().query()).to.equal(0)
      })

      it('after scrolling occurred, returns the correct distance', () => {
        canvas.listeners.wheel({ deltaY: 4 })
        expect(mouse.wheel().query()).to.equal(4)
      })

      it('after last movement was queried, returns `0`', () => {
        expect(mouse.wheel().query()).to.equal(0)
      })

      it('after scrolling occurred multiple times, returns the total distance', () => {
        canvas.listeners.wheel({ deltaY: 8 })
        canvas.listeners.wheel({ deltaY: 3 })
        expect(mouse.wheel().query()).to.equal(11)
      })

    })

  })

  describe('should have a `lockPointer()` method that', () => {

    it('calls the `requestPointerLock()` method of the canvas', () => {
      mouse.lockPointer()
      expect(canvas.pointerLockRequested).to.equal(true)
    })

  })

  describe('should have an `unlockPointer()` method that', () => {

    it('calls the `exitPointerLock()` method of the document', () => {
      mouse.unlockPointer()
      expect(doc.pointerLockExited).to.equal(true)
    })

  })

  describe('should have an `isPointerLocked()` method that', () => {

    it('returns `true` when the pointer is locked to the canvas', () => {
      doc.pointerLockElement = canvas
      expect(mouse.isPointerLocked()).to.equal(true)
    })

    it('returns `false` when the pointer is not locked to the canvas', () => {
      doc.pointerLockElement = 'something different'
      expect(mouse.isPointerLocked()).to.equal(false)
    })

  })

})
