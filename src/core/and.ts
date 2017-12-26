import { Control } from './control'

export function and(...controls: Array<Control<boolean>>): Control<boolean> {
  if (controls.length < 2) throw new Error('Less than two controls specified!')

  return {
    label: controls.map(control => control.label).join(' + '),
    icons: [].concat(...controls.map(control => control.icons)).join('?plus?').split('?'),
    query: () => {
      for (const control of controls) {
        /* istanbul ignore else */
        if (!control.query()) return false
      }
        /* istanbul ignore next */
      return true
    },
  }
}
