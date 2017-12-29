import { expect } from 'chai'
import * as Mocha from 'mocha'
import { store } from '../index'
import { Control } from './control'
import { or } from './or'

describe('the `or()` operator function', () => {

  const controlUndefined: Control<number> = {
    label: '',
    icons: [],
    query: () => undefined,
  }

  it('should throw an error when less than two controls are specified', () => {
    expect(() => or()).to.throw(Error, 'Less than two controls specified!')
  })

  describe('should, when the common type is `boolean`', () => {

    const controlTrue: Control<boolean> = {
      label: '',
      icons: [],
      query: () => true,
    }

    const controlFalse: Control<boolean> = {
      label: '',
      icons: [],
      query: () => false,
    }

    it('return `true` when one of the controls returns `true` when queried', () => {
      expect(or(controlTrue, controlFalse).query()).to.equal(true)
    })

    it('return `true` when both controls return `true` when queried', () => {
      expect(or(controlTrue, controlTrue).query()).to.equal(true)
    })

    it('return `false` when none of the controls returns `true` when queried', () => {
      expect(or(controlFalse, controlFalse).query()).to.equal(false)
    })

  })

  describe('should, when the common type is `number`', () => {

    const controlThree: Control<number> = {
      label: '',
      icons: [],
      query: () => 3,
    }

    const controlFour: Control<number> = {
      label: '',
      icons: [],
      query: () => 4,
    }

    it('return the first defined query value', () => {
      expect(or(controlThree, controlFour).query()).to.equal(3)
      expect(or(controlFour, controlThree).query()).to.equal(4)
    })

  })

  it('should return `undefined` when all controls return `undefined` when queried', () => {
    expect(or(controlUndefined, controlUndefined).query()).to.equal(undefined)
  })

  describe('should, when `store.preferGamepad`', () => {

    const controlGamepad: Control<number> = {
      label: 'gamepad',
      icons: ['gamepad'],
      query: null,
      fromGamepad: true,
    }

    const controlNonGamepad: Control<number> = {
      label: 'non-gamepad',
      icons: ['non-gamepad'],
      query: null,
    }

    describe('is `false`', () => {

      before(() =>  store.preferGamepad = false)

      it('return the label of the first non-gamepad control', () => {
        expect(or(controlGamepad, controlNonGamepad).label).to.equal('non-gamepad')
      })

      it('return the icons of the first non-gamepad control', () => {
        expect(or(controlGamepad, controlNonGamepad).icons[0]).to.equal('non-gamepad')
      })

    })

    describe('is `true`', () => {

      before(() =>  store.preferGamepad = true)

      it('return the label of the first gamepad control', () => {
        expect(or(controlGamepad, controlNonGamepad).label).to.equal('gamepad')
      })

      it('return the icons of the first gamepad control', () => {
        expect(or(controlGamepad, controlNonGamepad).icons[0]).to.equal('gamepad')
      })

    })

    describe('is `true` or `false` and no gamepad control is passed in', () => {

      const controlFirst: Control<number> = {
        label: 'first',
        icons: ['first'],
        query: null,
      }

      it('return the label of the first control', () => {
        expect(or(controlFirst, controlNonGamepad).label).to.equal('first')
      })

      it('return the icons of the first control', () => {
        expect(or(controlFirst, controlNonGamepad).label).to.equal('first')
      })

    })

  })

})
