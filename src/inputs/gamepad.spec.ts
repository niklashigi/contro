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

function mockPack() {
  const win = new MockWindow()
  const nav = new MockNavigator()
  const gamepad = new Gamepad({ win, nav })
  return { win, nav, gamepad }
}

describe('The `Gamepad` class', () => {

  it('should register the required listeners on the window', () => {
    const { win, nav, gamepad } = mockPack()

    expect(Object.keys(win.listeners).sort()).to.deep.equal([
      'gamepadconnected',
      'gamepaddisconnected',
    ].sort())
  })

  describe('should have an `isConnected()` method that', () => {
    const { win, nav, gamepad } = mockPack()

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
      expect(gamepad.isConnected()).to.equal(true)
    })

    it('returns `false` after gamepad was disconnected', () => {
      const disconnectedGamepad = nav.gamepads.pop()
      disconnectedGamepad.connected = false
      win.listeners.gamepaddisconnected({ gamepad: { index: 0 } })
      expect(gamepad.isConnected()).to.equal(false)
    })

    it('returns `true` again after another gamepad was connected', () => {
      nav.gamepads[0] = {
        index: 0,
        buttons: [],
        axes: [],
        connected: true,
      }

      win.listeners.gamepadconnected({ gamepad: { index: 0 } })
      expect(gamepad.isConnected()).to.equal(true)
    })

    it('returns `true` after one of two gamepads disconnected', () => {
      nav.gamepads[1] = {
        index: 1,
        buttons: [],
        axes: [],
        connected: true,
      }
      win.listeners.gamepadconnected({ gamepad: { index: 1 } })
      win.listeners.gamepaddisconnected({ gamepad: { index: 0 } })
      expect(gamepad.isConnected()).to.equal(true)
    })

  })

  describe('in its disconnected state', () => {

    const { win, nav, gamepad } = mockPack()

    it('should have an `isPressed()` method that returns `false`', () => {
      expect(gamepad.isPressed(0)).to.equal(false)
    })

    it('should have a `wasPressed()` method that returns `false`', () => {
      expect(gamepad.isPressed(0)).to.equal(false)
    })

  })

  describe('in its connected state', () => {

    const { win, nav, gamepad } = mockPack()

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

})
