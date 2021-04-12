import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import logonav from '../../assets/images/logo192.png'
import './index.css'
import { Menu } from 'antd';
import menuList from '../../config/menuCofig'

const { SubMenu } = Menu;


class LeftNav extends Component {
  /*
   根据menu数据数组 生成标签数组
     //使用map加递归调用
   */
  getMenuNodes_map = (menuList) => {
    /*
      {
        title:"首页",
        key :'/home/
        icon:'home',
        children:[]
      }
     */
    /*
     <Menu.Item key="/home" icon={<HomeOutlined />}>
              <Link to="/home">首页</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<AppstoreOutlined />} title="商品">
              <Menu.Item key="/category" icon={<AlignLeftOutlined />}><Link to="/category">品类管理</Link></Menu.Item>
              <Menu.Item key="/product" icon={<QrcodeOutlined />}><Link to="/product">商品管理</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="/user" icon={<PieChartOutlined />}>
              <Link to="/user">用户管理</Link>
            </Menu.Item>

            <Menu.Item key="/role" icon={<PieChartOutlined />}>
              <Link to="/role">角色管理</Link>
            </Menu.Item>

            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="图形图表">
              <Menu.Item key="/charts/bar"><Link to="/charts/bar">柱状图</Link></Menu.Item>
              <Menu.Item key="/charts/line"><Link to="/charts/line">折线图</Link></Menu.Item>
              <Menu.Item key="/charts/pie"><Link to="/charts/pie">饼图</Link></Menu.Item>
            </SubMenu>
     */
    return menuList.map((item) => {

      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes_map(item.children)}
          </SubMenu>
        );
      }
    });
  }

  /*
   根据menu数据数组 生成标签数组
     //使用map加递归调用
   */
  getMenuNodes = (menuList) => {
    //获取当前请求路由的路径
    const path = this.props.location.pathname
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        //添加Menu.Item标签
        pre.push((
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        ))
      } else {
        //查找一个与当前路由匹配的子item
        const cItem = item.children.find(cItem => cItem.key === path)
        //如果存在,说明当前的子列表打开
        if (cItem) {
          this.openkey = item.key
        }
        pre.push((
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        ))
      }
      //返回pre
      return pre
    }, [])
  }
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  /*
   componentWillMount 在第一次render 执行前执行
   为 第一次render 拿数据做准备(必须是同步的)
   */
  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
  }
  render() {
    //获取当前请求路由的路径
    let path = this.props.location.pathname
    // console.log(path);
    if (path.indexOf('/product') === 0) {
      path = '/product'
    }

    // console.log(path);
    //得到需要打开菜单项的key
    let openkey = this.openkey

    return (
      <div className='left-nav'>
        <Link to="/" className="left-nav-header">
          <img src={logonav} alt="" />
          <h1>电商后台</h1>
        </Link>
        <div>
          <Menu
            defaultSelectedKeys={['/home']}
            defaultOpenKeys={[openkey]}
            selectedKeys={[path]}
            mode="inline"
            theme="dark"
          >{
              this.menuNodes
            }

          </Menu>
        </div>

      </div>
    )
  }
}
/*
  WithRouter (LeftNav)  高阶组件
  包装非路由组件 返回一个新的组件
  新的 组件 向 非路由组件 传递 三个 参数 history/match/loaction
 */
export default withRouter(LeftNav)
