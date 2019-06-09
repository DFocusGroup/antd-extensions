import { isNil, isArray, isNumber, isString, omit } from '../object'

const OMIT_OBJECT = { a: 1, b: 2, c: 3 }
const OMIT_KEYS = ['a']
const OMIT_RESULT = { b: 2, c: 3 }

describe('Object Util Test Suite', () => {
  describe('isNil(obj)', () => {
    it('should return true when obj is null', () => {
      expect(isNil(null)).toBe(true)
    })

    it('should return true when obj is undefined', () => {
      expect(isNil(undefined)).toBe(true)
    })
  })

  describe('isArray(obj)', () => {
    it('should return true when obj is array', () => {
      expect(isArray([])).toBe(true)
    })
  })

  describe('isNumber(obj)', () => {
    it('should return true when obj is number', () => {
      expect(isNumber(123)).toBe(true)
    })
  })

  describe('isString(obj)', () => {
    it('should return true when obj is string', () => {
      expect(isString('')).toBe(true)
    })
  })

  describe('omit(obj, keys)', () => {
    it('should omit keys containing in the passed keys', () => {
      expect(omit(OMIT_OBJECT, OMIT_KEYS)).toEqual(OMIT_RESULT)
    })
  })
})
