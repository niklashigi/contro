import { ICanvas, IDocument } from '../apis'
import { Vector2 } from '../utils/math'

const mouseButtons = ['left', 'middle', 'right']

export class Mouse {

  private canvas: ICanvas
  private document: IDocument

  private pointerLocked: boolean = false
  private pointerMovement: Vector2 = new Vector2()
  private pressedButtons: Set<number> = new Set()
  private queuedButtons: Set<number> = new Set()
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

  public parseButton(button: string | number): number {
    if (typeof button === 'string') {
      if (mouseButtons.includes(button)) {
        return mouseButtons.indexOf(button)
      } else {
        throw new Error(`There is no mouse button called "${button}"!`)
      }
    } else {
      if (button < mouseButtons.length) {
        return button
      } else {
        throw new Error(`There is no mouse button with the index ${button}!`)
      }
    }
  }

  public isPressed(button: string | number) {
    button = this.parseButton(button)
    return this.pressedButtons.has(button)
  }

  public wasPressed(button: string | number) {
    button = this.parseButton(button)
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
