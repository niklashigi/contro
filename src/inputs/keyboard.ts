import { IDocument } from '../apis'
import { Control, TriggerControl } from '../core/control'
import { findKeyValue, getKeyLabel } from '../maps/keyboard'
import store from '../store'
import { Vector2 } from '../utils/math'

const arrowKeyTemplates: { [name: string]: [string, string[]] } = {
  arrows: ['Arrow keys', ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight']],
  wasd: ['WASD', ['W', 'A', 'S', 'D']],
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
      let key = event.key
      if (key === key.toUpperCase()) key = key.toLowerCase()
      this.pressedKeys.add(key)
      this.queuedKeys.add(key)
      return false
    })

    this.document.addEventListener('keyup', (event: any) => {
      store.preferGamepad = false
      let key = event.key
      if (key === key.toUpperCase()) key = key.toLowerCase()
      this.pressedKeys.delete(key)
      this.queuedKeys.delete(key)
      return false
    })
  }

  public key(key: string): TriggerControl<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const keyboard = this

    key = findKeyValue(key)
    return {
      label: getKeyLabel(key),
      query() {
        // eslint-disable-next-line no-prototype-builtins
        return this.hasOwnProperty('trigger')
          ? keyboard.pressedKeys.has(key)
          : keyboard.queuedKeys.delete(key)
      },
      get trigger() {
        delete this.trigger
        return this
      },
    }
  }

  public directionalKeys(keys: string[] | string, label?: string): Control<Vector2> {
    let defaultLabel
    if (typeof keys === 'string') {
      keys = keys.toLowerCase()
      if (keys in arrowKeyTemplates) {
        const template = arrowKeyTemplates[keys.toLowerCase()]
        defaultLabel = template[0]
        keys = template[1]
      } else {
        throw new Error(`Directional key template "${keys}" not found!`)
      }
    } else {
      if (keys.length === 4) {
        keys = keys.map(key => findKeyValue(key))
        defaultLabel = keys.map(key => getKeyLabel(key)).join('')
      } else {
        throw new Error('Directional key templates have to consist of four keys!')
      }
    }
    return {
      label: label || defaultLabel,
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
