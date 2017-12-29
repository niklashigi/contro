import { IDocument } from '../apis'
import { Control } from '../core/control'
import { store } from '../index'
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
      store.preferGamepad = false
      const key = event.key.toLowerCase()
      this.pressedKeys.add(key)
      this.queuedKeys.add(key)
      return false
    })

    this.document.addEventListener('keyup', (event: any) => {
      store.preferGamepad = false
      const key = event.key.toLowerCase()
      this.pressedKeys.delete(key)
      this.queuedKeys.delete(key)
      return false
    })
  }

  public key(key: string, trigger = false): Control<boolean> {
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

  public directionalKeys(keys: [string, string, string, string] | string, label?: string): Control<Vector2> {
    let name
    if (typeof keys === 'string') {
      keys = keys.toLowerCase()
      if (keys in arrowKeyTemplates) {
        name = keys
        keys = arrowKeyTemplates[keys]
      } else {
        throw new Error(`Arrow key template "${keys}" not found!`)
      }
    } else {
      name = keys.join('').toLowerCase()
    }
    const defaultLabel = `[${name.toUpperCase()}]`
    return {
      label: label || defaultLabel,
      icons: ['keyboard-directional-keys-' + name],
      query: () => {
        const vector = new Vector2()
        if (this.key(keys[0]).query()) vector.y -= 1
        if (this.key(keys[1]).query()) vector.x -= 1
        if (this.key(keys[2]).query()) vector.y += 1
        if (this.key(keys[3]).query()) vector.x += 1
        return vector
      },
    }
  }

}
