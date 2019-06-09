import { matchAuth } from '../util'

// SIMPLE_AUTHS : Array<String>
const SIMPLE_AUTHS = ['EDIT', 'VIEW']
// COMPLEX_AUTHS : Array<{ id: number, auth: string }>
const COMPLEX_AUTHS = [{ id: 1, auth: 'EDIT' }, { id: 2, auth: 'VIEW' }]
const COMPLEX_AUTHS_CHILDREN = [{ id: 1, auth: 'VIEW', children: [{ id: 2, auth: 'EDIT' }] }]
const MATCH_KEY = 'auth'
const MATCH_VALUE = 'EDIT'

describe('AuthWrapper/util', () => {
  describe('matchAuth(authorities, matchKey, value)', () => {
    it('should match success when authorities props with children', () => {
      const authorities = COMPLEX_AUTHS_CHILDREN
      const matchKey = MATCH_KEY
      const value = MATCH_VALUE

      expect(matchAuth(authorities, matchKey, value)).toBe(true)
    })

    it('should match success when authorities props without children', () => {
      const stringAuthorities = SIMPLE_AUTHS
      const objAuthorities = COMPLEX_AUTHS
      const matchKey = MATCH_KEY
      const value = MATCH_VALUE

      expect(matchAuth(stringAuthorities, matchKey, value)).toBe(true)
      expect(matchAuth(objAuthorities, matchKey, value)).toBe(true)
    })

    it('should throw error whenever matchKey is not passed', () => {
      const authorities = COMPLEX_AUTHS
      const value = MATCH_VALUE
      const fn = () => {
        matchAuth(authorities, null, value)
      }

      expect(fn).toThrow()
    })
  })
})
