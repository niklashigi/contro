import { IGamepad, INavigator, IWindow  } from '../apis'
import { Control  } from '../core/control'
import { store } from '../index'

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
        this.gamepadIndex = gamepad.index
        store.preferGamepad = true
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
    if (gamepad.timestamp > this.gamepadTimestamp) store.preferGamepad = true
    this.gamepadTimestamp = gamepad.timestamp
    return gamepad
  }

  public button(button: number, trigger = false): Control<boolean> {
    return {
      label: `(${button})`,
      fromGamepad: true,
      query: trigger ? () => {
        /* istanbul ignore else */
        if (this.isConnected()) {
          if (this.gamepad.buttons[button].pressed) {
            if (!this.pressedButtons.has(button)) {
              this.pressedButtons.add(button)
              return true
            }
          } else {
            this.pressedButtons.delete(button)
          }
        }
        return false
      } : () => {
        return this.isConnected() && this.gamepad.buttons[button].pressed
      },
    }
  }

}
