import { uniqArray, differenceArray } from '../util'

describe('AutoCompleteCache/util', () => {
  describe('uniqArray(["a", "b","a",2, 3, 2, true, true, false])', () => {
    it('should equal ["a", "b", 2, 3,true,false]', () => {
      expect(uniqArray(['a', 'b', 'a', 2, 3, 2, true, true, false])).toEqual(['a', 'b', 2, 3, true, false])
    })
  })

  describe('uniqArray(null)', () => {
    it('should equal null', () => {
      expect(uniqArray(null)).toBeNull()
    })
  })

  describe('differenceArray(["a", " ", 2, true, false, null, undefined,],[" ", true, false, null, undefined])', () => {
    it('should equal ["a", 2]', () => {
      expect(differenceArray(['a', ' ', 2, true, false, null, undefined], [' ', true, false, null, undefined])).toEqual(
        ['a', 2]
      )
    })
  })

  describe('differenceArray(null)', () => {
    it('should equal null', () => {
      expect(differenceArray(null)).toBeNull()
    })
  })
})
