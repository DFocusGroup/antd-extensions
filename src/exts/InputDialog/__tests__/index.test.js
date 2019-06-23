import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import { Button } from 'antd'
import InputDialog from '..'
import { STYLE_PREFIX } from '../../../helpers/constants'
import { wrap } from 'module'

const DEFAULT_LABELS = {
  OPEN_MODAL: '打开确认输入对话框',
  CONFIRM: '确 认',
  CANCEL: '取 消',
  TITLE: '确认删除吧',
  SUBTITLE: '请键入 “你好”'
}

const DEFAULT_INPUT = {
  VALUE: '你好',
  ERROR: '您输入的内容不正确'
}

export default class DemoTest extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      value: ''
    }
  }

  static propTypes = {
    confirm: PropTypes.func
  }

  toggleDialog = bool => {
    this.setState({
      visible: bool
    })
  }

  confirm = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
        this.toggleDialog(false)
      }, 2000)
    })
  }

  render() {
    return (
      <div>
        <InputDialog
          visible={this.state.visible}
          value={this.state.value}
          labels={{ title: DEFAULT_LABELS.TITLE, subTitle: DEFAULT_LABELS.SUBTITLE }}
          onCancel={() => this.toggleDialog(false)}
          onConfirm={this.props.confirm || this.confirm}
          validator={(val, cb) => {
            if (val === DEFAULT_INPUT.VALUE) {
              return cb()
            }
            return cb(DEFAULT_INPUT.ERROR)
          }}
        />
        <Button onClick={() => this.toggleDialog(true)}>{DEFAULT_LABELS.OPEN_MODAL}</Button>
      </div>
    )
  }
}

describe('<InputDialog />', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    document.body.innerHTML = ''
    jest.runAllTimers()
  })

  it('should render correctly', () => {
    const component = mount(<InputDialog visible />)
    expect(component.render()).toMatchSnapshot()
  })

  it('should open modal correctly', () => {
    const wrapper = mount(<DemoTest />)
    expect(
      wrapper
        .find(InputDialog)
        .childAt(0)
        .props().visible
    ).toBe(false)

    wrapper
      .find('button')
      .filterWhere(n => n.text() === DEFAULT_LABELS.OPEN_MODAL)
      .simulate('click')

    expect(
      wrapper
        .find(InputDialog)
        .childAt(0)
        .props().visible
    ).toBe(true)
    // modal mask correctly
    expect($(`.${STYLE_PREFIX}-modal-mask`)).toHaveLength(1)
  })

  it('should close modal correctly', () => {
    const wrapper = mount(<DemoTest />)

    wrapper
      .find('button')
      .filterWhere(n => n.text() === DEFAULT_LABELS.OPEN_MODAL)
      .simulate('click')

    wrapper
      .find('button')
      .filterWhere(n => n.text() === DEFAULT_LABELS.CANCEL)
      .simulate('click')

    expect(wrapper.find(InputDialog).props().visible).toBe(false)
  })

  it('should confirm loading correctly when input value is correct', () => {
    const wrapper = mount(<DemoTest />)

    wrapper
      .find('button')
      .filterWhere(n => n.text() === DEFAULT_LABELS.OPEN_MODAL)
      .simulate('click')

    wrapper.find('input').simulate('change', {
      target: {
        value: DEFAULT_INPUT.VALUE
      }
    })

    wrapper
      .find('button')
      .filterWhere(n => n.text() === DEFAULT_LABELS.CONFIRM)
      .simulate('click')
    jest.runAllTimers()
    wrapper.update()
    expect(
      wrapper
        .find(InputDialog)
        .childAt(0)
        .props().visible
    ).toBe(false)
  })

  it('should tip visible when input value is incorrect', () => {
    const wrapper = mount(<DemoTest />)

    wrapper
      .find('button')
      .filterWhere(n => n.text() === DEFAULT_LABELS.OPEN_MODAL)
      .simulate('click')

    wrapper
      .find('button')
      .filterWhere(n => n.text() === DEFAULT_LABELS.CONFIRM)
      .simulate('click')
    jest.runAllTimers()
    expect($(`.${STYLE_PREFIX}-form-explain`)[0].textContent).toBe(DEFAULT_INPUT.ERROR)
  })

  it('should not call onConfirm when onConfirm prop is not passed', () => {
    const validatorFn = jest.fn()
    const wrapper = mount(
      <InputDialog
        visible
        labels={{ title: DEFAULT_LABELS.TITLE, subTitle: DEFAULT_LABELS.SUBTITLE }}
        validator={validatorFn}
      />
    )

    wrapper
      .find('button')
      .filterWhere(n => n.text() === DEFAULT_LABELS.CONFIRM)
      .simulate('click')

    expect(wrapper.props().visible).toBe(true)
  })

  it('should button not loading when onConfirm does not return Promise', () => {
    const confirmFn = jest.fn()
    const wrapper = mount(<DemoTest confirm={confirmFn} />)

    wrapper
      .find('button')
      .filterWhere(n => n.text() === DEFAULT_LABELS.OPEN_MODAL)
      .simulate('click')

    wrapper.find('input').simulate('change', {
      target: {
        value: DEFAULT_INPUT.VALUE
      }
    })

    wrapper
      .find('button')
      .filterWhere(n => n.text() === DEFAULT_LABELS.CONFIRM)
      .simulate('click')
    jest.runAllTimers()
    expect(
      wrapper
        .find(InputDialog)
        .childAt(0)
        .state().confirming
    ).toBe(false)
  })
})
