import * as React from 'react'

export interface RegionPickerProps {
  placeholders: {
    country: string
    state: string
    city: string
    district: string
  }
  cache: {
    getItem: Function
    setItem: Function
    clear: Function
    removeItem: Function
  }
  showLines: number
  showDistrict: boolean
  disabled: boolean
  value: {
    country: { value: string }
    state: { value: string }
    city: { value: string }
    district: { value: string }
  }
  getPopupContainer: (node: HTMLElement) => HTMLElement
  onChange: (
    value: {
      country: { value: string }
      state?: { value: string }
      city?: { value: string }
      district?: { value: string }
    }
  ) => void
}

export interface RegionPickerState {}

export default class RegionPicker extends React.Component<RegionPickerProps, RegionPickerState> {
  render(): JSX.Element | null
}
