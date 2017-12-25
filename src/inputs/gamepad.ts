import { IGamepad, INavigator, IWindow  } from '../apis'

export class Gamepad {

  private window: IWindow
  private navigator: INavigator

  private pressedButtons: Set<number> = new Set()
  private gamepadIndex: number

  constructor(
    /* istanbul ignore next */
    { win = window, nav = navigator }: { win?: IWindow, nav?: INavigator } = {},
  ) {
    this.window = win
    this.navigator = nav

    this.window.addEventListener('gamepadconnected', ({ gamepad }) => {
      /* istanbul ignore else */
      if (!this.isConnected()) this.gamepadIndex = gamepad.index
    })

    this.window.addEventListener('gamepaddisconnected', ({ gamepad }) => {
      /* istanbul ignore else */
      if (this.gamepadIndex === gamepad.index) {
        const gamepads = this.navigator.getGamepads()
        if (gamepads.length) {
          this.gamepadIndex = this.navigator.getGamepads()[0].index
        } else {
          this.gamepadIndex = undefined
        }
      }
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
  }

}
