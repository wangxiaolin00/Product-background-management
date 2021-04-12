import React, { Component } from 'react'
import { Form, Input, message, Tree } from 'antd'
import menuList from '../../config/menuCofig'
import PropTypes from 'prop-types'



const { Item } = Form

export default class AuthForm extends Component {
  static propTypes = {//限定传入的值 是对象 且必须传
    role: PropTypes.object
  }
  constructor(props) {
    // console.log(props);
    super(props)
    let { menus } = this.props.role
    this.state = { checkedKeys: menus }

  }
  //为父组件提供 选择的最新权限的数组
  getMenus = () => this.state.checkedKeys
  onSelect = (selectedKeys, info) => {
    // console.log('selected', selectedKeys, info);
  };

  onCheck = (checkedKeys) => {
    // console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys })
  };
  //获取树的所有节点
  // getNodes = () => {
  //   return menuList.reduce((pre, item) => {
  //     pre.push(
  //       <TreeNode title={item.title} key={item.key}>
  //         {item.children ? this.getNodes(item.children) : null}
  //       </TreeNode>
  //     )


  //     return pre
  //   }, [])

  // }
  //根据新传进来的role 值 更新 权限的默认选中

  UNSAFE_componentWillReceiveProps(newProps) {
    console.log('receiveProps', newProps);
    let menus = newProps.role.menus
    this.setState({ checkedKeys: menus })
    //this.state.checkedKeys=menus

  }
  UNSAFE_componentWillMount() {
    console.log('11');

  }
  render() {
    console.log('render');
    const { role } = this.props
    const tailLayout = {
      wrapperCol: { offset: 0, span: 16 },
    };
    const treeData = menuList
    let { checkedKeys } = this.state
    return (
      <Form>
        <Item label="角色名称" {...tailLayout}>
          <Input value={role.name} disabled></Input>
        </Item>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={checkedKeys}
          onSelect={this.onSelect}
          onCheck={this.onCheck}
          treeData={treeData}
        >
        </Tree>
      </Form>
    )
  }
}
