import * as React from 'react'

export interface AutoCompleteCacheProps {
  localStorageKey?: string
  cacheLength: number
  placeholder: string
  size: 'small' | 'middle' | 'large'
  style: object
  allowClear: boolean
  defaultActiveFirstOption: boolean
  onSearch: (value: string | null | undefined) => void
}

export interface AutoCompleteCacheState {}

export default class AutoCompleteCache extends React.Component<AutoCompleteCacheProps, AutoCompleteCacheState> {
  render(): JSX.Element | null
}
