import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from './images/logo512.png'
import './login.css'
import { reqLogin } from '../../network/index'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
//用户登录组件
export default class Login extends Component {

  onFinish = async (values) => {
    // console.log('Received values of form: ', values);
    // reqLogin(values.username, values.password).then(res => {
    //   console.log(res);
    // })
    const { username, password } = values

    let res = await reqLogin(username, password)
    console.log(res)
    let user = res.data
    memoryUtils.user = user
    if (res.status === 0) {
      message.success('登录成功')
      storageUtils.saveUser(user)

    }
    this.props.history.replace('/')
  };
  render() {
    const user = memoryUtils.user
    if (user && user._id) {
      return <Redirect to="/admin"></Redirect>
    }

    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="logo" />
          <h1>React:后台管理系统</h1></div>
        <div className="login-conect">
          <h2>用户登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!'

                }, {
                  min: 4,
                  message: '用户名至少4位'
                }, {
                  max: 12,
                  message: '用户名最多12位',
                }, {
                  whitespace: true,
                  message: '输入内容不能为空'
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: '用户名必须数字,字母或下划线'
                }
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
