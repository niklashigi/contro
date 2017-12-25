import { ICanvas, IDocument } from '../apis'
import { Vector2 } from '../utils/math'

export enum MouseButton {
  Left,
  Middle,
  Right,
}

export class Mouse {

  private canvas: ICanvas
  private document: IDocument

  private pointerLocked: boolean = false
  private pointerMovement: Vector2 = new Vector2()
  private pressedButtons: Set<MouseButton> = new Set()
  private queuedButtons: Set<MouseButton> = new Set()
  private scrollDistance = 0

  constructor({ canvas, doc = document }: { canvas: ICanvas, doc?: IDocument }) {
    this.canvas = canvas
    this.document = doc

    let on: (type: string, listener: (event: any) => void) => void =
    this.canvas.addEventListener.bind(this.canvas)

    on('mousedown', (event: MouseEvent) => {
      this.pressedButtons.add(event.button)
      this.queuedButtons.add(event.button)
    })

    on('mouseup', (event: MouseEvent) => {
      this.pressedButtons.delete(event.button)
      this.queuedButtons.delete(event.button)
    })

    on('mousemove', (event: MouseEvent) => {
      this.pointerMovement.x += event.movementX
      this.pointerMovement.y += event.movementY
    })

    on('wheel', (event: WheelEvent) => {
      const distance = event.deltaY
      this.scrollDistance += distance
    })

    on = this.document.addEventListener.bind(this.document)
  }

  public isPressed(/* istanbul ignore next */ button: MouseButton = MouseButton.Left) {
    return this.pressedButtons.has(button)
  }

  public wasPressed(/* istanbul ignore next */ button: MouseButton = MouseButton.Left) {
    if (this.queuedButtons.has(button)) {
      this.queuedButtons.delete(button)
      return true
    }
    return false
  }

  public getPointerMovement() {
    const movement = this.pointerMovement
    this.pointerMovement = new Vector2(0, 0)
    return movement
  }

  public getScrollDistance() {
    const distance = this.scrollDistance
    this.scrollDistance = 0
    return distance
  }

  public lockPointer() {
    this.canvas.requestPointerLock()
  }

  public unlockPointer() {
    this.document.exitPointerLock()
  }

  public isPointerLocked() {
    return this.document.pointerLockElement === this.canvas
  }

}
