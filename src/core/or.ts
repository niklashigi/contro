import { store } from '../index'
import { Vector2 } from '../utils/math'
import { Control } from './control'

const findPreferred = (controls: Array<Control<any>>, thing: string): any =>
  (controls.filter(control => control.fromGamepad).length === 0 ?
    controls[0]
    : store.preferGamepad ?
      controls.filter(control => control.fromGamepad === true)[0]
      : controls.filter(control => control.fromGamepad !== true)[0])[thing]

export function or(...controls: Array<Control<any>>): Control<any> {
  if (controls.length < 2) throw new Error('Less than two controls specified!')

  return {
    get label() {
      return findPreferred(controls, 'label')
    },
    get icons() {
      return findPreferred(controls, 'icons')
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
