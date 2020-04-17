import { Control } from './control'

export function and(...controls: Control<boolean>[]): Control<boolean> {
  if (controls.length < 2) throw new Error('Less than two controls specified!')

  return {
    label: controls.map(control => control.label).join(' + '),
    query: () => {
      for (const control of controls) {
        if (!control.query()) return false
      }

      return true
    },
  }
}
