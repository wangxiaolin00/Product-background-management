import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { reqUsers, reqDelUser, reqAddUser } from '../../network/index'
import { formateDate } from '../../utils/dateUtils'
import LinkButton from '../../components/link-button'
import AddUser from './add-user'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const { confirm } = Modal


export default class User extends Component {
  state = {
    isSetUsers: false,
    users: [],
    roles: []
  }
  constructor(props) {
    super(props)
    this.userform = React.createRef()
  }
  //初始化数据
  initUsers = async () => {
    //请求用户列表
    let result = await reqUsers()
    // console.log(result);
    if (result.status === 0) {
      let users = result.data.users
      let roles = result.data.roles
      this.initRoleNames(roles)
      this.setState({ users, roles })
    }

  }
  //映射 角色的_id 对应 名称或职位的 对象
  initRoleNames = (roles) => {
    let rolenames = roles.reduce((pre, role) => {
      pre[role._id] = role.name
      return pre
    }, {})
    //保存数据
    this.rolenames = rolenames
  }
  //删除指定 用户
  deleteUser = (user) => {
    confirm({
      title: `确定删除${user.username}吗?`,
      icon: <ExclamationCircleOutlined />,
      content: '删除无法复原',
      onOk: async () => {
        //发请求删除 更改服务器端数据
        let result = await reqDelUser(user)
        console.log(result);
        if (result.status === 0) {
          message.success('删除用户成功')
          //获取最新的数据
          this.initUsers()
        } else {
          message.error('删除用户失败')
        }

        //console.log('OK');
      },
      onCancel() {

        console.log('Cancel');
      },
    });
    // console.log(user);

  }
  //添加新用户
  addUser = async () => {
    //收集子组件的数据
    // console.log(this.userform.current);

    let user = this.userform.current.form.current.getFieldsValue()
    //console.log(user);
    let result = await reqAddUser(user)

    if (result.status === 0) {
      message.success('注册用户成功')
      //重新获取新的数据
      this.initUsers()

    } else {
      message.error('注册用户失败')
    }
    //关闭确认框
    this.setState({ isSetUsers: false })

  }
  handleCancel = () => {
    this.setState({ isSetUsers: false })
  }
  //在第一次render 之前调用
  UNSAFE_componentWillMount() {
    this.initUsers()

  }
  render() {
    const { isSetUsers, users, roles } = this.state
    const title = (
      <Button onClick={() => { this.setState({ isSetUsers: true }) }} type="primary">注册用户</Button>
    )
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',

      },
      {
        title: '电话',
        dataIndex: 'phone',

      }, {
        title: '注册时间',
        dataIndex: 'create_time',
        render: (create_time) => formateDate(create_time)

      }, {
        title: '所属职位',
        dataIndex: 'role_id',
        render: (role_id) => {
          return this.rolenames[role_id]
        }

      }, {
        title: '操作',
        render: (user) => {
          return (
            <span>
              {/* <LinkButton>修改</LinkButton> */}
              <LinkButton onClick={() => { this.deleteUser(user) }}>删除</LinkButton>
            </span>
          )
        }


      },
    ];



    return (
      <div>
        <Card title={title}>
          <Table
            bordered
            rowKey="_id"
            pagination={{ pageSize: 3, showQuickJumper: true }}
            dataSource={users}
            columns={columns}
          />
          <Modal title="用户注册" visible={isSetUsers} onOk={this.addUser} onCancel={this.handleCancel}>
            <AddUser ref={this.userform} roles={roles} />
          </Modal>
        </Card>
      </div>
    )
  }
}
