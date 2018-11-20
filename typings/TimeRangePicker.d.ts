import * as React from 'react'
import * as Moment from 'moment'

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
    ranges: Array<Date>
  }
  onChange: (
    value: {
      type: 'ALL' | 'LAST_WEEK' | 'LAST_MONTH' | 'CUSTOMIZE'
      ranges: Array<Date>
    }
  ) => void
  disabledDate: (currentDate: Moment.Moment) => boolean
  multipleLines: boolean
}

export interface TimeRangePickerState {}

export default class TimeRangePicker extends React.Component<TimeRangePickerProps, TimeRangePickerState> {
  render(): JSX.Element | null
}
