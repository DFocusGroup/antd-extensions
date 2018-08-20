import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Radio, DatePicker } from 'antd'

const DEFAULT_TEXTS = {
  BTN_ALL: '全部',
  BTN_LAST_WEEK: '上周',
  BTN_LAST_MONTH: '上月',
  BTN_CUSTOMIZE: '自定义',
  PLACEHOLDER_START: '起始日期',
  PLACEHOLDER_END: '截止日期'
}

const DEFAULT_LAYOUT = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  height: '100%'
}

const STYLE_BTN_GROUP = {
  marginRight: '10px'
}

const STYLE_DATEPICKER = {
  marginLeft: '5px'
}

class TimeRangePicker extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    labels: PropTypes.shape({
      BTN_ALL: PropTypes.string,
      BTN_LAST_WEEK: PropTypes.string,
      BTN_LAST_MONTH: PropTypes.string,
      BTN_CUSTOMIZE: PropTypes.string,
      PLACEHOLDER_START: PropTypes.string,
      PLACEHOLDER_END: PropTypes.string
    }),
    value: PropTypes.shape({
      type: PropTypes.oneOf(['ALL', 'LAST_WEEK', 'LAST_MONTH', 'CUSTOMIZE']),
      ranges: PropTypes.arrayOf(Date)
    }),
    onChange: PropTypes.func,
    disabledDate: PropTypes.func
  }

  static defaultProps = {
    labels: DEFAULT_TEXTS,
    value: {
      type: 'ALL',
      ranges: []
    }
  }

  changeType = e => {
    const { onChange } = this.props
    const type = e.target.value
    const nextState = {
      type
    }
    if (type === 'ALL') {
      nextState.ranges = []
    }
    if (type === 'LAST_WEEK') {
      nextState.ranges = [getLastWeekStart(), getLastWeekEnd()]
    }
    if (type === 'LAST_MONTH') {
      nextState.ranges = [getLastMonthStart(), getLastMonthEnd()]
    }

    if (!onChange) {
      return
    }

    if (type !== 'CUSTOMIZE') {
      const ranges = getExposedRanges(nextState.ranges)
      return onChange({
        type,
        ranges
      })
    }

    return onChange({
      type,
      ranges: []
    })
  }

  changeCustomization = ranges => {
    const { onChange, value } = this.props

    const { type } = value

    if (!onChange || type !== 'CUSTOMIZE') {
      return
    }

    onChange({
      type,
      ranges: getExposedRanges(ranges)
    })
  }

  render() {
    const { value, className, style, labels, disabledDate } = this.props
    const { type, ranges } = value
    const inputRanges = convertInputRanges(type, ranges)

    const finalLabels = Object.assign({}, DEFAULT_TEXTS, labels)
    return (
      <div className={className} style={style}>
        <div style={DEFAULT_LAYOUT}>
          <Radio.Group value={type} onChange={this.changeType}>
            <Radio.Button value="ALL" style={STYLE_BTN_GROUP}>
              {finalLabels.BTN_ALL}
            </Radio.Button>
            <Radio.Button value="LAST_WEEK" style={STYLE_BTN_GROUP}>
              {finalLabels.BTN_LAST_WEEK}
            </Radio.Button>
            <Radio.Button value="LAST_MONTH" style={STYLE_BTN_GROUP}>
              {finalLabels.BTN_LAST_MONTH}
            </Radio.Button>
            <Radio.Button value="CUSTOMIZE" style={STYLE_BTN_GROUP}>
              {finalLabels.BTN_CUSTOMIZE}
            </Radio.Button>
          </Radio.Group>
          <DatePicker.RangePicker
            style={STYLE_DATEPICKER}
            size="default"
            value={inputRanges}
            onChange={this.changeCustomization}
            placeholder={[finalLabels.PLACEHOLDER_START, finalLabels.PLACEHOLDER_END]}
            disabled={type !== 'CUSTOMIZE'}
            disabledDate={disabledDate}
          />
        </div>
      </div>
    )
  }
}

export default TimeRangePicker

function convertInputRanges(type, ranges) {
  if (type === 'ALL') {
    return []
  }
  if (type === 'LAST_WEEK') {
    return [getLastWeekStart(), getLastWeekEnd()]
  }

  if (type === 'LAST_MONTH') {
    return [getLastMonthStart(), getLastMonthEnd()]
  }

  if (!ranges || !ranges.length) {
    return []
  }

  return [
    moment(ranges[0]),
    moment(ranges[1])
      .hour(0)
      .minute(0)
      .second(0)
      .subtract(1, 'days')
  ]
}

function getLastWeekStart() {
  const today = moment()
  const daystoLastMonday = 0 - (1 - today.isoWeekday()) + 7

  return today.subtract(daystoLastMonday, 'days')
}

function getLastWeekEnd() {
  return getLastWeekStart().add(6, 'days')
}

function getLastMonthStart() {
  return moment()
    .subtract(1, 'months')
    .startOf('month')
}

function getLastMonthEnd() {
  return moment()
    .subtract(1, 'months')
    .endOf('month')
}

function getExposedRanges(ranges) {
  if (!ranges || !ranges.length) {
    return ranges
  }

  const start = moment(ranges[0])
    .hour(0)
    .minute(0)
    .second(0)
  const end = moment(ranges[1])
    .hour(0)
    .minute(0)
    .second(0)
    .add(1, 'days')
  const newDates = [start.toDate().getTime(), end.toDate().getTime()]
  return newDates
}
