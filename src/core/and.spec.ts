import { expect } from 'chai'
import { describe, it } from 'mocha'

import { and } from './and'
import { Control } from './control'

describe('The `and()` operator function', () => {

  const controlA: Control<boolean> = { label: '[A]', query: () => true }
  const controlB: Control<boolean> = { label: '[B]', query: () => false }

  it('correctly combines labels', () => {
    expect(and(controlA, controlB).label).to.equal('[A] + [B]')
  })

  it('returns `true` when all controls return `true`', () => {
    expect(and(controlA, controlA).query()).to.equal(true)
  })

  it('returns `false` when at least one control returns `false`', () => {
    expect(and(controlA, controlB).query()).to.equal(false)
  })

  it('throws an error when less than two controls are specified', () => {
    expect(() => and(controlA)).to.throw(Error, 'Less than two controls specified!')
  })

})
