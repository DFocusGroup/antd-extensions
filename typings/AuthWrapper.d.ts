import * as React from 'react'

export interface AuthWrapperProps {
  authorities: Array<any>
  value: string
  matchKey: string
  noMatch: JSX.Element | null
  noMatchFeedback: string
}

export interface AuthWrapperState {}

export default class AuthWrapper extends React.Component<AuthWrapperProps, AuthWrapperState> {
  render(): JSX.Element | null
}
