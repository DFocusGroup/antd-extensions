import * as React from 'react'

export interface InputDialogProps {
  labels: {
    title: string
    subTitle?: string
    placeholder?: string
    confirm?: string
    cancel?: string
  }
  value: string
  maskClosable: boolean
  visible: boolean
  validator: (value: string, callback: Function) => void
  onConfirm: () => void | Promise
  onCancel: Function
}

export interface InputDialogState {}

export default class InputDialog extends React.Component<InputDialogProps, InputDialogState> {
  render(): JSX.Element | null
}
