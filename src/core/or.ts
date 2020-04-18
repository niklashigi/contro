import store from '../store'
import { Control } from './control'

export function or(...controls: Control<any>[]): Control<any> {
  if (controls.length < 2) throw new Error('Less than two controls specified!')

  return {
    get label() {
      const hasGamepadControls = controls.some(control => control.fromGamepad)
      if (!hasGamepadControls) return controls[0].label

      return (store.preferGamepad
        ? controls.find(control => control.fromGamepad)!
        : controls.find(control => !control.fromGamepad)!).label
    },
    query: () => {
      let sampleQueryValue

      for (const control of controls) {
        const queryValue = control.query()
        sampleQueryValue = queryValue
        if (queryValue) return queryValue
      }

      if (typeof sampleQueryValue === 'boolean') return false
    },
  }
}
