import { expect } from 'chai'
import * as Mocha from 'mocha'
import { ICanvas, IDocument } from '../utils/dom'
import { Vector2 } from '../utils/math'
import { MockEventTarget } from '../utils/mock'
import { Keyboard } from './keyboard'

class MockDocument extends MockEventTarget implements IDocument {}

describe('The `Keyboard` class', () => {

  const doc = new MockDocument()
  const keyboard = new Keyboard({ doc })

  it('should register the required listener on the document', () => {
    expect(Object.keys(doc.listeners).sort()).to.deep.equal([
      'keydown',
      'keyup',
    ].sort())
  })

  describe('should have an `isPressed()` method that', () => {

    it('returns `true` when the key is pressed', () => {
      doc.listeners.keydown({ key: 'g' })
      expect(keyboard.isPressed('g')).to.equal(true)
    })

    it('returns `false` when the key is not pressed', () => {
      doc.listeners.keyup({ key: 'g' })
      expect(keyboard.isPressed('g')).to.equal(false)
    })

  })

  describe('should have a `wasPressed()` method that', () => {

      it('returns `false` when the key is not pressed', () => {
        doc.listeners.keyup({ key: 'z' })
        expect(keyboard.wasPressed('z')).to.equal(false)
      })

      it('returns `true` once after the button was pressed', () => {
        doc.listeners.keydown({ key: 'z' })
        expect(keyboard.wasPressed('z')).to.equal(true)
      })

      it('returns `false` after button state was queried', () => {
        expect(keyboard.wasPressed('z')).to.equal(false)
      })

  })

})
