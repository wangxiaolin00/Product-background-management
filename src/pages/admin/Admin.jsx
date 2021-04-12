import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import Xheader from '../../components/xheader'
import LeftNav from '../../components/left-nav'
import { Layout } from 'antd';
import Home from '../home/Home'
import Category from '../category/Category'
import Product from '../product/Product'
import Role from '../role/Role'
import User from '../user/User'
import Bar from '../charts/Bar'
import Line from '../charts/Line'
import Pie from '../charts/Pie'

const { Footer, Sider, Content } = Layout;

//用户管理组件
export default class Admin extends Component {

  render() {
    const user = memoryUtils.user
    if (!user || !user._id) {
      return <Redirect to="/login"></Redirect>
    }
    return (
      <Layout style={{ height: '100%', width: "100%" }}>
        <Sider style={{

          height: '100%',
        }}><LeftNav></LeftNav></Sider>
        <Layout>
          <Xheader></Xheader>
          <Content style={{ height: '100%', margin: 20, backgroundColor: '#fff' }}>
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/category" component={Category}></Route>
              <Route path="/product" component={Product}></Route>
              <Route path="/role" component={Role}></Route>
              <Route path="/user" component={User}></Route>
              <Route path="/charts/bar" component={Bar}></Route>
              <Route path="/charts/line" component={Line}></Route>
              <Route path="/charts/pie" component={Pie}></Route>
              <Redirect to='/home'></Redirect>
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#ccc' }}>推荐使用谷歌浏览器,获得更佳操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}
