import * as React from 'react'

export interface TimeRangePickerProps {
  labels: {
    BTN_ALL: string
    BTN_LAST_WEEK: string
    BTN_LAST_MONTH: string
    BTN_CUSTOMIZE: string
    PLACEHOLDER_START: string
    PLACEHOLDER_END: string
  }
  value: {
    type: 'ALL' | 'LAST_WEEK' | 'LAST_MONTH' | 'CUSTOMIZE'
    ranges: [Date, Date]
  }
  onChange(): void
  disabledDate(): void
  multipleLines: boolean
}

export interface TimeRangePickerState {}

export default class TimeRangePicker extends React.Component<TimeRangePickerProps, TimeRangePickerState> {
  render(): JSX.Element | null
}
