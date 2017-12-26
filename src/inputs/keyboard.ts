import { IDocument } from '../apis'
import { Control } from '../models/control'
import { Vector2 } from '../utils/math'

const arrowKeyTemplates: { [name: string]: [string, string, string, string] } = {
  arrows: ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
  wasd: ['W', 'A', 'S', 'D'],
}

export class Keyboard {

  private document: IDocument

  private pressedKeys: Set<string> = new Set()
  private queuedKeys: Set<string> = new Set()

  constructor(
    /* istanbul ignore next */
    { doc = document }: { doc?: IDocument } = {},
  ) {
    this.document = doc

    this.document.addEventListener('keydown', (event: any) => {
      const key = event.key.toLowerCase()
      this.pressedKeys.add(key)
      this.queuedKeys.add(key)
    })

    this.document.addEventListener('keyup', (event: any) => {
      const key = event.key.toLowerCase()
      this.pressedKeys.delete(key)
      this.queuedKeys.delete(key)
    })
  }

  public key(key: string, trigger = false): Control {
    key = key.toLowerCase()
    return {
      label: key.toUpperCase(),
      icons: ['keyboard-key-' + key],
      query: () => {
        if (trigger) {
          if (this.queuedKeys.has(key)) {
            this.queuedKeys.delete(key)
            return true
          }
          return false
        } else {
          return this.pressedKeys.has(key)
        }
      },
    }
  }

  public getMovementVector(arrowKeys: [string, string, string, string] | string): Vector2 {
    if (typeof arrowKeys === 'string') {
      arrowKeys = arrowKeys.toLowerCase()
      if (arrowKeys in arrowKeyTemplates) {
        arrowKeys = arrowKeyTemplates[arrowKeys]
      } else {
        throw new Error(`Arrow key template "${arrowKeys}" not found!`)
      }
    }
    const vector = new Vector2()
    if (this.key(arrowKeys[0]).query()) vector.y -= 1
    if (this.key(arrowKeys[1]).query()) vector.x -= 1
    if (this.key(arrowKeys[2]).query()) vector.y += 1
    if (this.key(arrowKeys[3]).query()) vector.x += 1
    return vector
  }

}
