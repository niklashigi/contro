export interface IEventTarget {
  addEventListener(type: string, listener: (event: any) => void): void
}

export interface ICanvas extends IEventTarget {
  requestPointerLock?(): void
}

export interface IDocument extends IEventTarget {
  pointerLockElement?: any
  exitPointerLock?(): void
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
}
