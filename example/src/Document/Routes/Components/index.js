import TimeRangePickerDoc from './TimeRangePickerDoc'
import InputDialogDoc from './InputDialogDoc'
import RegionPickerDoc from './RegionPickerDoc'

export default [
  {
    url: '/api/timerangepicker',
    displayTitle: '<TimeRangePicker />',
    description: '日期区间选择器，受控组件',
    component: TimeRangePickerDoc
  },
  {
    url: '/api/inputdialog',
    displayTitle: '<InputDialog />',
    description: '输入确认模态框',
    component: InputDialogDoc
  },
  {
    url: '/api/regionpicker',
    displayTitle: '<RegionPicker />',
    description: '输入确认模态框',
    component: RegionPickerDoc
  }
]
