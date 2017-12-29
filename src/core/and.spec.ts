import { expect } from 'chai'
import * as Mocha from 'mocha'
import { and } from './and'
import { Control } from './control'

describe('The `and()` operator function', () => {

  const controlA: Control<boolean> = {
    label: '[A]',
    icons: ['a'],
    query: () => false,
  }

  const controlB: Control<boolean> = {
    label: '[B]',
    icons: ['b'],
    query: () => true,
  }

  const control = and(controlA, controlB)

  it('correctly combines labels', () => {
    expect(control.label).to.equal('[A] + [B]')
  })

  it('correctly combines icons', () => {
    expect(control.icons).to.deep.equal(['a', 'plus', 'b'])
  })

  it('makes the combined query work as expected', () => {
    expect(control.query()).to.equal(false)
  })

  it('throws an error when less than two controls are specified', () => {
    expect(() => and(controlA)).to.throw(Error, 'Less than two controls specified!')
  })

})
