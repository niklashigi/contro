import { IDocument } from '../utils/dom'

export class Keyboard {

  private document: IDocument

  private pressedKeys: Set<string> = new Set()
  private queuedKeys: Set<string> = new Set()

  constructor({ doc = document }: { doc: IDocument }) {
    this.document = doc

    this.document.addEventListener('keydown', event => {
      const key = event.key.toLowerCase()
      this.pressedKeys.add(key)
      this.queuedKeys.add(key)
    })

    this.document.addEventListener('keyup', event => {
      const key = event.key.toLowerCase()
      this.pressedKeys.delete(key)
      this.queuedKeys.delete(key)
    })
  }

  public isPressed(key: string) {
    key = key.toLowerCase()
    return this.pressedKeys.has(key)
  }

  public wasPressed(key: string) {
    key = key.toLowerCase()
    if (this.queuedKeys.has(key)) {
      this.queuedKeys.delete(key)
      return true
    }
    return false
  }

}
