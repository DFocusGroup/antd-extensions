import * as React from 'react'

export interface RegionPicker2Props {
  placeholders: {
    country: string
    state: string
    city: string
    district: string
  }
  defaultConstructLevel: number
  disabled: boolean
  value: {
    country: { value: string }
    state: { value: string }
    city: { value: string }
    district: { value: string }
  }
  dataRetriever(type: String, prevObj): Promise<Array<{ label: String; value: String }>>
  getPopupContainer(params: HTMLElement): HTMLElement
  onChange(): {
    country: { value: string }
    state?: { value: string }
    city?: { value: string }
    district?: { value: string }
  }
}

export interface RegionPicker2State {}

export default class RegionPicker2 extends React.Component<RegionPicker2Props, RegionPicker2State> {
  render(): JSX.Element | null
}
