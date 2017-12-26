import { Vector2 } from '../utils/math'

export interface Control {

  label: string

  icons: string[]

  query(): boolean | Vector2 | number

}
