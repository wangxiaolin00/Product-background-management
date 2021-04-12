import React, { Component } from 'react'
import { Button, Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'


const { Item } = Form
const { Option } = Select

export default class AddUser extends Component {
  static propTypes = {
    roles: PropTypes.array.isRequired
  }
  static = {
    roles: {}
  }
  constructor(props) {
    super(props)
    this.form = React.createRef()



  }
  onFinish = (val) => {
    console.log('success', val);
    return val

  }

  UNSAFE_componentWillMount() {
    console.log(this.props);

    let roles = this.props.roles
    this.setState({ roles })
  }
  componentDidMount() {
    console.log(this.form.current.getFieldsValue());
  }
  render() {
    const { roles } = this.state
    const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 16,
      },
    };
    return (
      <div>
        <Form ref={this.form} onFinish={this.onFinish} >
          <Item label="用户名" name="username" rules={[
            {
              required: true,
              message: 'Please input your username!',
            }, {
              min: 4,
              message: '用户名至少4位'
            },
            {
              max: 12,
              message: '用户名之多12位'
            }
          ]} {...layout}>
            <Input type="text" placeholder="请输入你的用户名"></Input>
          </Item>
          <Item label="密码" name="password" rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]} {...layout}>
            <Input type="password" placeholder="请输入您的密码"></Input>
          </Item>
          <Item label="邮箱" name="email" rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]} {...layout}>
            <Input type="text" placeholder="请输入你的邮箱"></Input>
          </Item>
          <Item label="电话" name="phone" rules={[
            {
              required: true,
              message: 'Please input your phone!',
            },
          ]} {...layout}>
            <Input type="text" placeholder="请输入您的电话"></Input>
          </Item>
          <Item label="角色" {...layout}>
            <Select placeholder="请选择角色">
              {
                roles.map(role => (<Option key={role._id} value={role._id}>{role.name}</Option>))
              }
            </Select>

          </Item>
          {/* <Button type="primary" htmlType="submit">注册</Button> */}


        </Form>

      </div>
    )
  }
}
