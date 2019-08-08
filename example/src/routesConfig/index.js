export const componentRoutes = [
  {
    url: '/api/timerangepicker',
    displayTitle: '<TimeRangePicker />',
    description: '日期区间选择器，受控组件'
  },
  {
    url: '/api/inputdialog',
    displayTitle: '<InputDialog />',
    description: '输入确认模态框'
  },
  {
    url: '/api/regionpicker',
    displayTitle: '<RegionPicker />',
    description: '地址选择器，受控组件。通常用来选择国家、省、市、行政区'
  },
  {
    url: '/api/regionpicker2',
    displayTitle: '<RegionPicker2 />',
    description: '另一种形态的地址选择器，受控组件。通常用来选择国家、省、市、行政区、楼房、楼层'
  },
  {
    url: '/api/authwrapper',
    displayTitle: '<AuthWrapper />',
    description: '权限匹配组件，帮助你通过权限匹配来控制组件的展示、状态。。。'
  },
  {
    url: '/api/autoCompleteCache',
    displayTitle: '<AutoCompleteCache />',
    description: '缓存搜索输入框，自动提示最新搜索记录'
  }
]

export function getRouteDefinition(pathname) {
  const found = componentRoutes.find(r => r.url === pathname)

  if (!found) {
    return null
  }
  return found
}
