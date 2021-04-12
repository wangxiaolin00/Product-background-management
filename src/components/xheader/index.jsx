import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { CloudOutlined } from "@ant-design/icons";
import './index.css'
import { reqWeather } from '../../network/index'
import { formateDate } from '../../utils/dateUtils'
import menuList from '../../config/menuCofig'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import LinkButton from '../link-button/index'

const { confirm } = Modal;

class Xheader extends Component {
  state = {
    currentTime: formateDate(Date.now()),//当前时间字符串
    weather: ''//天气文本
  }
  getWeather = async () => {
    // console.log(reqWeather('杭州'))
    const { weather } = await reqWeather("杭州");
    // console.log(weather)
    this.setState({ weather });
  };
  getTime = () => {
    //每隔一秒或获取当前时间
    this.timer = setInterval(() => {
      let currentTime = formateDate(Date.now())
      this.setState({ currentTime })
    }, 1000)
  }
  getTitle = () => {
    //获取当前的路由路径
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        let cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title

  }
  //退出登录
  logout = () => {
    confirm({
      title: '你 确 定 要 退 出 吗?',
      icon: <ExclamationCircleOutlined />,
      content: '退出将返回登录界面',
      onOk: () => {
        // console.log('确定');
        //删除保存的user数据
        storageUtils.deleteUser()
        memoryUtils.user = {}
        //跳转到登录界面
        this.props.history.replace('/login')
      },
      onCancel: () => {
        // console.log('取消');
      },
    });

  }
  /*
    在第一次render 函数执行后执行
    一般执行异步操作 发送请求 或者启动定时器
   */
  componentDidMount() {
    //获取当前时间
    this.getTime()
    //获取当前的天气
    this.getWeather()
    this.username = memoryUtils.user.username

  }
  //组件将要卸载
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  render() {
    const { currentTime, weather } = this.state
    let title = this.getTitle()
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎,{this.username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>
              {currentTime}
            </span>
            <CloudOutlined
              style={{ width: "30px", height: "20px", margin: "15 15 15 15" }}
            />
            <span>{weather}</span>
          </div>
        </div>


      </div>
    )
  }
}
export default withRouter(Xheader)

