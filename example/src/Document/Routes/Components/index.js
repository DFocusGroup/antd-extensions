import TimeRangePickerDoc from './TimeRangePickerDoc'
import InputDialogDoc from './InputDialogDoc'
import RegionPickerDoc from './RegionPickerDoc'
import AuthWrapperDoc from './AuthWrapperDoc'

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
    description: '地址选择器，受控组件。通常用来选择国家、省、市、行政区',
    component: RegionPickerDoc
  },
  {
    url: '/api/authwrapper',
    displayTitle: '<AuthWrapper />',
    description: '权限匹配组件，帮助你通过权限匹配来控制组件的展示、状态。。。',
    component: AuthWrapperDoc
  }
]
