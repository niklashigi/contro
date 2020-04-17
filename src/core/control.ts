export interface Control<T> {
  label: string
  query(): T
  fromGamepad?: boolean
}

export interface TriggerControl<T> extends Control<T> {
  trigger: Control<T>
}
