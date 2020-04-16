import { expect } from 'chai'
import { describe, it } from 'mocha'

import { findKeyValue, getKeyLabel } from './keyboard'

describe('The ´Keyboard´ mapping helper function', () => {

  describe('`findKeyValue()`', () => {

    it('should returns single-letter keys unchanged', () => {
      expect(findKeyValue('#')).to.equal('#')
    })

    it('should return the correct key value for a given alias', () => {
      expect(findKeyValue('Del')).to.equal('Delete')
    })

    it('should return unknown key values unchanged', () => {
      expect(findKeyValue('UnknownKeyValue')).to.equal('UnknownKeyValue')
    })

  })

  describe('`getKeyLabel()`', () => {

    it('should return the correct label for a key in the `keyMap`', () => {
      expect(getKeyLabel(' ')).to.equal('Space')
    })

    it('should return the correct label single letter keys', () => {
      expect(getKeyLabel('a')).to.equal('A')
    })

    it('should return unknown key values unchanged', () => {
      expect(getKeyLabel('UnknownKeyValue')).to.equal('UnknownKeyValue')
    })

  })

})
