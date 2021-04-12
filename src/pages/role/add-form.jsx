import React, { Component } from 'react'
import { Form, Input } from 'antd'


const Item = Form.Item


export default class AddForm extends Component {
  onFinish = () => {
    // console.log('成功');
  }
  render() {
    const tailLayout = {
      wrapperCol: {

        span: 16,
      },
    };

    return (

      <Form onValuesChange={this.onFinish}>
        <Item initialValues='创建角色' label="角色名称" {...tailLayout} name='input' rules={[{ required: true, message: "角色必须输入!" }]}>
          <Input placeholder="请输入要创建的角色名称" ref={input => this.props.setInput(input)}></Input>
        </Item>
      </Form>
    )
  }
}