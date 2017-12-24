export interface IEventTarget {
  addEventListener(type: string, listener: (event: any) => void): void
}

export interface ICanvas extends IEventTarget {
  requestPointerLock(): void
}

export interface IDocument extends IEventTarget {
  pointerLockElement: any,
  exitPointerLock(): void,
}
