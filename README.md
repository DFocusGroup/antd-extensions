# antd-extensions

[![NPM version][npm-image]][npm-url]
![][david-url]
![][dt-url]
![][license-url]

## Install

```bash
npm install --save antd-extensions
```

[ant-design](https://ant.design/)的 DFocus 扩展组件库，帮助开发者选择需要的组件，并迅速进入角色。

完整 API 使用文档，请[这边走](https://dfocusfe.github.io/antd-extensions)

## Usage

```jsx
// 日期区间选择器
import React, { Component } from 'react'
import { TimeRangePicker } from 'antd-extensions'

class Example extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: {
        type: 'CUSTOMIZE',
        ranges: [1533081600000, 1534377600000]
      }
    }
  }

  _handleChange = value => {
    console.log(`You're selection is ${JSON.stringify(value)}`)
    this.setState({
      value
    })
  }

  render() {
    return (
      <TimeRangePicker
        value={this.state.value}
        onChange={this._handleChange}
        labels={{
          BTN_ALL: 'All',
          BTN_LAST_WEEK: 'Last week',
          BTN_LAST_MONTH: 'Last month',
          BTN_CUSTOMIZE: 'Customize',
          PLACEHOLDER_START: 'Start',
          PLACEHOLDER_END: 'End'
        }}
        disabledDate={current =>
          current &&
          current >
            moment()
              .endOf('day')
              .subtract(1, 'days')
        }
      />
    )
  }
}
```

## LICENSE

[MIT License](https://raw.githubusercontent.com/DFocusFE/antd-extensions/master/LICENSE)

[npm-url]: https://npmjs.org/package/antd-extensions
[npm-image]: https://badge.fury.io/js/antd-extensions.png
[david-url]: https://david-dm.org/DFocusFE/antd-extensions.png
[dt-url]: https://img.shields.io/npm/dt/antd-extensions.svg
[license-url]: https://img.shields.io/npm/l/antd-extensions.svg
