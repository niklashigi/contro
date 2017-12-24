import { expect } from 'chai'
import * as Mocha from 'mocha'
import { IGamepad, INavigator, IWindow  } from '../apis'
import { Vector2 } from '../utils/math'
import { MockEventTarget } from '../utils/mock'
import { Gamepad } from './gamepad'

class MockWindow extends MockEventTarget implements IWindow {}

class MockNavigator extends MockEventTarget implements INavigator {

  public gamepads: IGamepad[] = []

  public getGamepads() {
    return this.gamepads
  }

}

describe('The `Gamepad` class', () => {

  const win = new MockWindow()
  const nav = new MockNavigator()
  const gamepad = new Gamepad({ win, nav })

  it('should register the required listeners on the window', () => {
    expect(Object.keys(win.listeners).sort()).to.deep.equal([
      'gamepadconnected',
      'gamepaddisconnected',
    ].sort())
  })

  describe('should have an `isConnected()` method that', () => {

    it('returns `false` before any gamepad was connected', () => {
      expect(gamepad.isConnected()).to.equal(false)
    })

    it('returns `true` after a gamepad was connected', () => {
      nav.gamepads[0] = {
        index: 0,
        buttons: [
          {
            pressed: false,
          },
        ],
        axes: [],
        connected: true,
      }

      win.listeners.gamepadconnected({ gamepad: { index: 0 } })
    })

  })

  describe('should have an `isPressed()` method that', () => {

    it('returns `false` when the button is not pressed', () => {
      expect(gamepad.isPressed(0)).to.equal(false)
    })

    it('returns `true` when the button is pressed', () => {
      nav.gamepads[0].buttons[0].pressed = true
      expect(gamepad.isPressed(0)).to.equal(true)
    })

  })

  describe('should have a `wasPressed()` method that', () => {

    it('returns `false` when the key is not pressed', () => {
      nav.gamepads[0].buttons[0].pressed = false
      expect(gamepad.wasPressed(0)).to.equal(false)
    })

    it('returns `true` once after the key was not pressed', () => {
      nav.gamepads[0].buttons[0].pressed = true
      expect(gamepad.wasPressed(0)).to.equal(true)
    })

    it('returns `false` after the key state was queried', () => {
      expect(gamepad.wasPressed(0)).to.equal(false)
    })

  })

})
