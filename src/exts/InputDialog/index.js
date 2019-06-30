import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Input, Form, Button, Row, Icon } from 'antd'

const DEFAULT_LABELS = {
  title: '确认输入内容',
  confirm: '确认',
  cancel: '取消'
}

const ICON_STYLE = {
  color: '#faad14',
  fontSize: '22px',
  marginRight: '16px'
}

class InputDialog extends Component {
  static propTypes = {
    maskClosable: PropTypes.bool,
    visible: PropTypes.bool,
    labels: PropTypes.shape({
      title: PropTypes.string.isRequired,
      subTitle: PropTypes.string,
      placeholder: PropTypes.string,
      confirm: PropTypes.string,
      cancel: PropTypes.string
    }),
    validator: PropTypes.func,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    form: PropTypes.object,
    value: PropTypes.string
  }

  static defaultProps = {
    labels: DEFAULT_LABELS
  }

  constructor(props) {
    super(props)

    this.state = {
      confirming: false
    }
  }

  _toggleBtnConfirming = confirming => {
    this.setState({ confirming })
  }

  _submit = e => {
    if (e) {
      e.preventDefault()
    }

    const _this = this

    function stopBtnConfirming() {
      return _this._toggleBtnConfirming(false)
    }

    this.props.form.validateFields(err => {
      if (err) {
        return
      }
      if (!this.props.onConfirm) {
        return
      }

      this._toggleBtnConfirming(true)

      const res = this.props.onConfirm(this.props.form.getFieldValue('text'))

      if (res && res.then) {
        res.then(stopBtnConfirming, stopBtnConfirming)
      } else {
        stopBtnConfirming()
      }
    })
  }

  _cancel = () => {
    this.props.form.resetFields()
    if (this.props.onCancel) {
      this.props.onCancel()
    }
  }

  getRules = () => {
    const { validator } = this.props

    if (!validator) {
      return []
    }

    return [
      {
        validator(rule, value, callback) {
          validator(value, callback)
        }
      }
    ]
  }

  _getSubtitle = () => {
    const { labels } = this.props
    if (!labels || !labels.subTitle) {
      return null
    }
    return (
      <Row style={{ marginBottom: '10px' }}>
        <span>{labels.subTitle}</span>
      </Row>
    )
  }

  render() {
    const { maskClosable, labels, visible, value, form } = this.props

    const { getFieldDecorator } = form

    const finalLabels = Object.assign({}, DEFAULT_LABELS, labels)

    return (
      <Modal
        visible={visible}
        maskClosable={!!maskClosable}
        footer={[
          <Button key="back" onClick={this._cancel}>
            {finalLabels.cancel}
          </Button>,
          <Button key="submit" type="primary" loading={this.state.confirming} onClick={this._submit}>
            {finalLabels.confirm}
          </Button>
        ]}
        onCancel={this._cancel}
      >
        <Row type="flex" justify="start" align="middle" style={{ marginBottom: '15px' }}>
          <Icon type="question-circle" style={ICON_STYLE} />
          <h3 style={{ margin: '0px' }}>{finalLabels.title}</h3>
        </Row>

        {this._getSubtitle()}

        <Row>
          <Form onSubmit={this._submit}>
            <Form.Item>
              {getFieldDecorator('text', {
                rules: this.getRules(),
                initialValue: value
              })(<Input placeholder={finalLabels.placeholder} />)}
            </Form.Item>
          </Form>
        </Row>
      </Modal>
    )
  }
}

export default Form.create()(InputDialog)
