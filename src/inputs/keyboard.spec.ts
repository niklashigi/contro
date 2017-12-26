import { expect } from 'chai'
import * as Mocha from 'mocha'
import { ICanvas, IDocument } from '../apis'
import { Vector2 } from '../utils/math'
import { MockEventTarget } from '../utils/mock'
import { Keyboard } from './keyboard'

class MockDocument extends MockEventTarget implements IDocument {

  public keyDown(key: string) {
    this.listeners.keydown({ key })
  }

  public keyUp(key: string) {
    this.listeners.keyup({ key })
  }

}

describe('The `Keyboard` class', () => {

  const doc = new MockDocument()
  const keyboard = new Keyboard({ doc })

  it('should register the required listeners on the document', () => {
    expect(Object.keys(doc.listeners).sort()).to.deep.equal([
      'keydown',
      'keyup',
    ].sort())
  })

  describe('should have a `key()` method that returns a control that', () => {

    it('returns the correct label', () => {
      expect(keyboard.key('G').label).to.equal('G')
    })

    it('returns the correct icon', () => {
      expect(keyboard.key('G').icons[0]).to.equal('keyboard-key-g')
    })

    describe('when queried', () => {

      it('returns `true` when the key is pressed', () => {
        doc.keyDown('G')
        expect(keyboard.key('G').query()).to.equal(true)
      })

      it('returns `false` when the key is not pressed', () => {
        doc.keyUp('G')
        expect(keyboard.key('G').query()).to.equal(false)
      })

    })

    describe('when initialized with `trigger = true` and queried', () => {

      it('returns `false` when the key is not pressed', () => {
        doc.keyUp('Z')
        expect(keyboard.key('Z', true).query()).to.equal(false)
      })

      it('returns `true` once after the button was pressed', () => {
        doc.keyDown('Z')
        expect(keyboard.key('Z', true).query()).to.equal(true)
      })

      it('returns `false` after button state was queried', () => {
        expect(keyboard.key('Z', true).query()).to.equal(false)
      })

      doc.keyUp('Z')

    })

  })

  describe('should have a `getMovementVector()` method that', () => {

    it("throws an error when the passed in arrow key template doesn't exist", () => {
      expect(() => keyboard.getMovementVector('wsad')).to.throw(Error, 'Arrow key template "wsad" not found!')
    })

    it('accepts custom sets of arrow keys', () => {
      doc.keyDown('H')
      expect(keyboard.getMovementVector(['T', 'H', 'U', 'G'])).to.deep.equal(new Vector2(-1, 0))
      doc.keyUp('H')
    })

    describe('with a valid set of arrow keys', () => {

      const getVector = () => keyboard.getMovementVector('wasd')

      it('returns a (0, 0) vector when none of the keys is pressed', () => {
        expect(getVector()).to.deep.equal(new Vector2(0, 0))
      })

      it('returns a (-1, 0) vector when only [left] is pressed', () => {
        doc.keyDown('A')
        expect(getVector()).to.deep.equal(new Vector2(-1, 0))
      })

      it('returns a (0, 0) vector when both [left] and [right] is pressed', () => {
        doc.keyDown('D')
        expect(getVector()).to.deep.equal(new Vector2(0, 0))
      })

      it('returns a (1, 0) vector when only [right] is pressed', () => {
        doc.keyUp('A')
        expect(getVector()).to.deep.equal(new Vector2(1, 0))
        doc.keyUp('D')
      })

      it('returns a (0, -1) vector when only [up] is pressed', () => {
        doc.keyDown('W')
        expect(getVector()).to.deep.equal(new Vector2(0, -1))
      })

      it('returns a (0, 0) vector when both [up] and [down] are pressed', () => {
        doc.keyDown('S')
        expect(getVector()).to.deep.equal(new Vector2(0, 0))
      })

      it('returns a (0, 1) vector when only [down] is pressed', () => {
        doc.keyUp('W')
        expect(getVector()).to.deep.equal(new Vector2(0, 1))
        doc.keyUp('S')
      })

    })

  })

})
