import { IGamepad, INavigator, IWindow  } from '../apis'
import { Control, TriggerControl  } from '../core/control'
import { store } from '../index'
import { findButtonNumber, getButtonLabel } from '../maps/gamepad'
import { Vector2 } from '../utils/math'

export interface GamepadStick {

  xAxis: number
  yAxis: number

}

const gamepadSticks: { [id: string]: GamepadStick } = {
  left: { xAxis: 0, yAxis: 1 },
  right: { xAxis: 2, yAxis: 3 },
}

export class Gamepad {

  private window: IWindow
  private navigator: INavigator

  private pressedButtons: Set<number> = new Set()
  private gamepadIndex: number
  private gamepadTimestamp = 0

  constructor(
    /* istanbul ignore next */
    { win = window, nav = navigator }: { win?: IWindow, nav?: INavigator } = {},
  ) {
    this.window = win
    this.navigator = nav

    this.window.addEventListener('gamepadconnected', ({ gamepad }) => {
      /* istanbul ignore else */
      if (!this.isConnected()) {
        if (gamepad.mapping === 'standard') {
          this.gamepadIndex = gamepad.index
          store.preferGamepad = true
        }
      }
    })

    this.window.addEventListener('gamepaddisconnected', ({ gamepad }) => {
      /* istanbul ignore else */
      if (this.gamepadIndex === gamepad.index) {
        this.gamepadIndex = undefined
        store.preferGamepad = false
      }
    })
  }

  public isConnected() {
    return this.gamepadIndex !== undefined && this.gamepad.connected
  }

  private get gamepad(): IGamepad {
    const gamepad = this.navigator.getGamepads()[this.gamepadIndex]
    /* istanbul ignore next */
    if (gamepad.timestamp > this.gamepadTimestamp) store.preferGamepad = true
    this.gamepadTimestamp = gamepad.timestamp
    return gamepad
  }

  public button(button: number | string): TriggerControl<boolean> {
    const that = this
    const buttonNumber = findButtonNumber(button)
    return {
      label: getButtonLabel(buttonNumber),
      fromGamepad: true,
      query() {
        if (!that.isConnected()) return false
        if (!this.hasOwnProperty('trigger')) {
          /* istanbul ignore else */
          if (that.gamepad.buttons[buttonNumber].pressed) {
            if (!that.pressedButtons.has(buttonNumber)) {
              that.pressedButtons.add(buttonNumber)
              return true
            }
          } else {
            that.pressedButtons.delete(buttonNumber)
          }
          return false
        } else {
          return that.gamepad.buttons[buttonNumber].pressed
        }
      },
      get trigger() {
        delete this.trigger
        return this
      },
    }
  }

  public stick(stick: string | GamepadStick): Vector2 {
    if (typeof stick === 'string') {
      if (stick in gamepadSticks) {
        stick = gamepadSticks[stick]
      } else {
        throw new Error(`Gamepad stick "${stick}" not found!`)
      }
    }
    return new Vector2(this.gamepad.axes[stick.xAxis], this.gamepad.axes[stick.yAxis])
  }

}
