import React, { Component } from 'react'
import { Card, Table, Button, Modal, message } from 'antd'
import { formateDate } from '../../utils/dateUtils'
import { reqRoleList, reqAddRole, reqUpdateRole } from '../../network/index'
import AddForm from './add-form'
import AuthForm from './auth-form'
import memoryUtils from '../../utils/memoryUtils'

export default class Role extends Component {
  state = {
    roles: [],//角色列表数据
    role: {},//代表选中的role
    isShowAdd: false,//确认框实现还是隐藏
    isShowSet: false,//设置权限的框显示还是隐藏
  }
  constructor(props) {
    super(props)
    this.auth = React.createRef()
  }
  ///初始化数据
  initColumns = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        dataIndex: "create_time",
        render: (create_time) => formateDate(create_time)
      },
      {
        title: '授权时间',
        dataIndex: "auth_time",
        render: (auth_time) => formateDate(auth_time)
      },
      {
        title: '授权人',
        dataIndex: "auth_name"
      }
    ]
  }
  //获取角色列表
  getRoles = async () => {
    let result = await reqRoleList()
    // console.log(result);
    if (result.status === 0) {
      this.setState({ roles: result.data })
    }
  }
  //表格点击行
  onRow = (role) => {
    return {
      onClick: (event) => {
        // console.log('hello', role)
        this.setState({ role })
      }
    }
  }
  //添加角色
  addRole = async () => {
    //收集表单数据 有了才往下进行
    const result = await reqAddRole(this.input.props.value);
    //发送请求 
    if (result.status === 0) {
      message.success("添加角色成功");
      // this.getRoles()
      // 可以不请求直接添加到roles列表
      const role = result.data;
      // const roles =[...this.state.roles]
      // roles.push(role)
      // this.setState({roles:roles})
      //更新修改页面
      this.setState((state) => ({
        roles: [...state.roles, role],
      }));
    } else {
      message.error("添加角色失败");
    }
    this.setState({ isShowAdd: false });

  }
  //设置角色的权限this.auth = React.createRef()
  //this.auth.current.getMenus 拿到子组件设置权限的方法

  setRole = async () => {
    //拿到旧的选中的
    const { role } = this.state
    //拿到新的 选中的权限
    let menus = this.auth.current.getMenus()
    // console.log('111', role, menus);
    //设置授权时间
    role.auth_time = formateDate(Date.now())
    role.menus = menus
    //设置授权人
    role.auth_name = memoryUtils.user.username
    //发送请求更新
    let result = await reqUpdateRole(role)
    // console.log('请求状态', result);
    if (result.status === 0) {
      message.success('设置权限成功')
      //更改状态
      this.setState({ roles: [...this.state.roles] })
    } else {
      message.error('设置权限失败')
    }
    //隐藏设置权限框
    //取消设置权限
    this.setState({ isShowSet: false })

  }

  //点击Cancel 取消确认框
  handleCancel = () => {
    //取消创建角色框
    this.setState({ isShowAdd: false })
    //取消设置权限
    this.setState({ isShowSet: false })

  }
  UNSAFE_componentWillMount() {
    //初始化数据
    this.initColumns()
    //获取角色列表
    this.getRoles()

  }
  render() {
    const { roles, role, isShowAdd, isShowSet } = this.state


    const title = (
      <span>
        <Button type="primary" onClick={() => this.setState({ isShowAdd: true })}>创建角色</Button>&nbsp;&nbsp;&nbsp;
        <Button type="primary" onClick={() => this.setState({ isShowSet: true })} disabled={!role._id}>设置角色权限</Button>
      </span >
    )


    return (
      <Card title={title} style={{ width: '100%' }}>
        <Table
          bordered
          rowKey="_id"
          pagination={{ pageSize: 5 }}
          rowSelection={{ type: 'radio', selectedRowKeys: [role._id] }}
          onRow={this.onRow}
          dataSource={roles}
          columns={this.columns} />
        <Modal title="创建角色" destroyOnClose={true} visible={isShowAdd} onOk={this.addRole} onCancel={this.handleCancel}>
          <AddForm
            setInput={(input) => {
              this.input = input;
            }} />

        </Modal>
        <Modal title="设置权限" destroyOnClose={true} visible={isShowSet} onOk={this.setRole} onCancel={this.handleCancel}>
          <AuthForm ref={this.auth} role={role} />

        </Modal>
      </Card>
    )
  }
}
