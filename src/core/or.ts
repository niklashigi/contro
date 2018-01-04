import { store } from '../index'
import { Vector2 } from '../utils/math'
import { Control } from './control'

export function or(...controls: Array<Control<any>>): Control<any> {
  if (controls.length < 2) throw new Error('Less than two controls specified!')

  return {
    get label() {
      return (controls.filter(control => control.fromGamepad).length === 0 ?
          controls[0]
          : store.preferGamepad ?
            controls.filter(control => control.fromGamepad === true)[0]
            : controls.filter(control => control.fromGamepad !== true)[0]).label
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
