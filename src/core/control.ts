export interface Control<T> {

  label: string

  fromGamepad?: boolean

  query(): T

  /* Required for utility function in `or.spec.ts` to work. */
  [ key: string ]: any;

}

export interface TriggerControl<T> extends Control<T> {

  trigger: Control<T>

}
