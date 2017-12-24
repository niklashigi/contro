import { IGamepad, INavigator, IWindow  } from '../apis'

export class Gamepad {

  private window: IWindow
  private navigator: INavigator

  private pressedButtons: Set<number> = new Set()
  private gamepadIndex: number

  constructor({ win = window, nav = navigator }: { win?: IWindow, nav?: INavigator } = {}) {
    this.window = win
    this.navigator = nav

    this.window.addEventListener('gamepadconnected', ({ gamepad }) => {
      if (!this.isConnected()) this.gamepadIndex = gamepad.index
    })

    this.window.addEventListener('gamepaddisconnected', ({ gamepad }) => {
      this.gamepadIndex = undefined
    })
  }

  /** Returns whether a gamepad is currently connected. */
  public isConnected() {
    return this.gamepadIndex !== undefined && this.gamepad.connected
  }

  /** The current gamepad instance. */
  private get gamepad(): IGamepad {
    return this.navigator.getGamepads()[this.gamepadIndex]
  }

  /** Returns whether the button is pressed. */
  public isPressed(button: number) {
    return this.isConnected() && this.gamepad.buttons[button].pressed
  }

  /** Returns whether the button was pressed. */
  public wasPressed(button: number) {
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
  }

}
