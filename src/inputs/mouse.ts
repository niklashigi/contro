import { ICanvas, IDocument } from '../apis'
import { Control, TriggerControl } from '../core/control'
import store from '../store'
import { Vector2 } from '../utils/math'

const mouseButtons = ['left', 'middle', 'right']

export class Mouse {

  private canvas: ICanvas
  private document: IDocument

  private pointerMovement: Vector2 = new Vector2()
  private pressedButtons: Set<number> = new Set()
  private queuedButtons: Set<number> = new Set()
  private scrollDistance = 0

  constructor(
    { canvas, doc }: { canvas: ICanvas, doc?: IDocument },
  ) {
    this.canvas = canvas
    /* istanbul ignore next */
    this.document = doc ?? this.document

    const on: (type: string, listener: (event: any) => void) => void =
    this.canvas.addEventListener.bind(this.canvas)

    on('mousedown', (event: MouseEvent) => {
      store.preferGamepad = false
      this.pressedButtons.add(event.button)
      this.queuedButtons.add(event.button)
    })

    on('mouseup', (event: MouseEvent) => {
      store.preferGamepad = false
      this.pressedButtons.delete(event.button)
      this.queuedButtons.delete(event.button)
    })

    on('mousemove', (event: MouseEvent) => {
      store.preferGamepad = false
      this.pointerMovement.x += event.movementX
      this.pointerMovement.y += event.movementY
    })

    on('wheel', (event: WheelEvent) => {
      store.preferGamepad = false
      const distance = event.deltaY
      this.scrollDistance += distance
    })
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

  public button(button: string | number): TriggerControl<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const mouse = this

    button = this.parseButton(button)
    return {
      label: ['Left', 'Middle', 'Right'][button] + ' Mouse Button',
      query() {
        button = mouse.parseButton(button)

        // eslint-disable-next-line no-prototype-builtins
        if (!this.hasOwnProperty('trigger')) {
          if (mouse.queuedButtons.has(button)) {
            mouse.queuedButtons.delete(button)
            return true
          }
          return false
        } else {
          return mouse.pressedButtons.has(button)
        }
      },
      get trigger() {
        delete this.trigger
        return this
      },
    }
  }

  public pointer(): Control<Vector2> {
    return {
      label: 'Cursor',
      query: () => {
        const movement = this.pointerMovement
        this.pointerMovement = new Vector2(0, 0)
        return movement
      },
    }
  }

  public wheel(): Control<number> {
    return {
      label: 'Mouse wheel',
      query: () => {
        const distance = this.scrollDistance
        this.scrollDistance = 0
        return distance
      },
    }
  }

  public lockPointer(): void {
    this.canvas.requestPointerLock()
  }

  public unlockPointer(): void {
    this.document.exitPointerLock()
  }

  public isPointerLocked(): boolean {
    return this.document.pointerLockElement === this.canvas
  }

}
