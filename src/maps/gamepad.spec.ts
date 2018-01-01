import { expect } from 'chai'
import * as Mocha from 'mocha'
import { findButtonNumber, getButtonLabel } from './gamepad'

describe('The `Gamepad` mapping helper function', () => {

  describe('`findButtonNumber()`', () => {

    it('should return numbers unchanged', () => {
      expect(findButtonNumber(0)).to.equal(0)
    })

    it('should return the correct key value for a given alias', () => {
      expect(findButtonNumber('B')).to.equal(1)
    })

    it('should return `undefined` for nonexistent aliases', () => {
      expect(findButtonNumber('NonExistentButton')).to.equal(undefined)
    })

  })

})
