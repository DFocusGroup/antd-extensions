import AuthWrapper from '../index'
import React from 'react'
import { Tooltip } from 'antd'

const NO_MATCH = 'No Authority'
const AUTHORITIES = [{ id: 1, auth: 'EDIT' }, { id: 2, auth: 'VIEW' }]
const CHILDREN = 'Hi, I am children'
const MATCH_KEY = 'auth'
const MATCH_VALUE = 'EDIT'
const NO_MATCH_VALUE = 'UPDATE'
const NO_MATCH_CONTENT = 'Sorry, nothing match'
const NO_MATCH_FEEDBACK = 'Sorry, nothing feedback'

const NO_MATCH_RENDER = <Tooltip title={NO_MATCH_FEEDBACK}>{NO_MATCH_CONTENT}</Tooltip>

describe('<AuthWrapper />', () => {
  describe('props.authorities is not passed', () => {
    it('should return noMatch when noMeatch exists', () => {
      expect(AuthWrapper({ noMatch: NO_MATCH })).toEqual(NO_MATCH)
    })

    it('should return null when noMeatch does not exist', () => {
      expect(AuthWrapper({})).toBeNull()
    })
  })

  describe('props.authorities is passed', () => {
    it('should return props.children when auth is matched success', () => {
      expect(
        AuthWrapper({
          value: MATCH_VALUE,
          authorities: AUTHORITIES,
          matchKey: MATCH_KEY,
          children: CHILDREN
        })
      ).toEqual(CHILDREN)
    })
  })

  describe('props.noMatch is not passed', () => {
    it('should return null when auth is not matched success', () => {
      expect(
        AuthWrapper({
          authorities: AUTHORITIES,
          matchKey: MATCH_KEY,
          value: NO_MATCH_VALUE
        })
      ).toBeNull()
    })
  })

  describe('props.noMatchFeedback is not passed', () => {
    it('should return props.noMatch when props.noMatch exists and auth is not matched success', () => {
      expect(
        AuthWrapper({
          authorities: AUTHORITIES,
          matchKey: MATCH_KEY,
          value: NO_MATCH_VALUE,
          noMatch: NO_MATCH_CONTENT
        })
      ).toEqual(NO_MATCH_CONTENT)
    })
  })

  describe('props.noMatchFeedback is passed and props.noMatch is passed', () => {
    it('should return Tooltip component', () => {
      expect(
        AuthWrapper({
          authorities: AUTHORITIES,
          matchKey: MATCH_KEY,
          value: NO_MATCH_VALUE,
          noMatch: NO_MATCH_CONTENT,
          noMatchFeedback: NO_MATCH_FEEDBACK
        })
      ).toEqual(NO_MATCH_RENDER)
    })
  })
})
