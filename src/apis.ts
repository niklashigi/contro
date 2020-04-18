export interface IEventTarget {
  addEventListener(type: string, listener: (event: any) => void): void
}

export interface ICanvas extends IEventTarget {
  requestPointerLock(): void
}

export interface IDocument extends IEventTarget {
  pointerLockElement?: any
  exitPointerLock(): void
}

export interface IWindow extends IEventTarget {}

export interface IGamepadButton {
  pressed: boolean
}

export interface INavigator {
  getGamepads(): IGamepad[]
}

export interface IGamepad {
  index: number
  buttons: IGamepadButton[]
  axes: number[]
  connected: boolean
  timestamp: number
  mapping: string
  vibrationActuator?: IGamepadHapticActuator
}

// Based on https://github.com/w3c/gamepad/pull/68
// (just a proposal to the specification, but implemented in Chrome)
export interface IGamepadHapticActuator {
  type: string
  playEffect(
    type: 'dual-rumble',
    params: IGamepadEffectParameters,
  ): Promise<any>
}

export interface IGamepadEffectParameters {
  duration?: number
  startDelay?: number
  strongMagnitude?: number
  weakMagnitude?: number
}
