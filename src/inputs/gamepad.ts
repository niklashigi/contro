import { IGamepad, INavigator, IWindow  } from '../apis'
import { Control, TriggerControl  } from '../core/control'
import { findButtonNumber, getButtonLabel } from '../maps/gamepad'
import store from '../store'
import { Vector2 } from '../utils/math'

export interface GamepadStick {
  label: string
  xAxis: number
  yAxis: number
}

const gamepadSticks: { [id: string]: GamepadStick } = {
  left: { label: 'Left stick', xAxis: 0, yAxis: 1 },
  right: { label: 'Right stick', xAxis: 2, yAxis: 3 },
}

export class Gamepad {

  private window: IWindow
  private navigator: INavigator

  private pressedButtons: Set<number> = new Set()
  private gamepadIndex: number | undefined
  private gamepadTimestamp = 0

  constructor(
    /* istanbul ignore next */
    { win = window, nav = navigator as any }: { win?: IWindow, nav?: INavigator } = {},
  ) {
    this.window = win
    this.navigator = nav

    this.window.addEventListener('gamepadconnected', ({ gamepad }) => {
      if (this.isConnected()) return

      if (gamepad.mapping === 'standard') {
        this.gamepadIndex = gamepad.index
        store.preferGamepad = true
      }
    })

    this.window.addEventListener('gamepaddisconnected', ({ gamepad }) => {
      if (this.gamepadIndex !== gamepad.index) return

      this.gamepadIndex = undefined
      store.preferGamepad = false
    })
  }

  public isConnected(): boolean {
    return this.gamepadIndex !== undefined && this.gamepad.connected
  }

  private get gamepad(): IGamepad {
    const gamepad = this.navigator.getGamepads()[this.gamepadIndex!]

    if (gamepad.timestamp > this.gamepadTimestamp) {
      store.preferGamepad = true
      this.gamepadTimestamp = gamepad.timestamp
    }

    return gamepad
  }

  public button(button: number | string): TriggerControl<boolean> {
    const buttonNumber = findButtonNumber(button)
    const label = getButtonLabel(buttonNumber)

    return {
      label,
      query: () => {
        if (!this.isConnected()) return false

        return this.gamepad.buttons[buttonNumber].pressed
      },
      fromGamepad: true,
      trigger: {
        label,
        query: () => {
          if (!this.isConnected()) return false

          if (this.gamepad.buttons[buttonNumber].pressed) {
            if (this.pressedButtons.has(buttonNumber)) return false

            this.pressedButtons.add(buttonNumber)
            return true
          }

          this.pressedButtons.delete(buttonNumber)
          return false
        },
        fromGamepad: true,
      },
    }
  }

  public stick(stick: string | GamepadStick): Control<Vector2> {
    let gpStick: GamepadStick
    if (typeof stick === 'string') {
      if (stick in gamepadSticks) {
        gpStick = gamepadSticks[stick]
      } else {
        throw new Error(`Gamepad stick "${stick}" not found!`)
      }
    } else {
      gpStick = stick
    }

    return {
      label: gpStick.label,
      query: () => {
        if (!this.isConnected()) return new Vector2(0, 0)

        return new Vector2(
          this.gamepad.axes[gpStick.xAxis],
          this.gamepad.axes[gpStick.yAxis],
        )
      },
    }
  }

}
