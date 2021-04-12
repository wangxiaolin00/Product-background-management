import React, { Component } from 'react'
import { Card, Button, Table, message, Space, Modal } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'
import LinkButton from '../../components/link-button'
import { reqCategorys, reqUpdateCategory, reqAddCategory } from '../../network/index'
import AddForm from './AddForm'
import UpdateForm from './UpdateForm'
import { withRouter } from 'react-router-dom'


class Category extends Component {
  state = {
    categorys: [],//一级分类列表
    subCategorys: [],//二级分类列表
    loading: false,//是否正在获取数据
    parentId: '0',//当前需要显示的分类列表
    parentName: "",
    showStatus: 0//表示确认框 添加/更新 是否显示, 默认0不显示

  }
  //点击取消关闭确认框
  handleCancel = () => {
    this.setState({ showStatus: 0 })
  }
  //添加分类
  addCategory = async () => {
    this.setState({ showStatus: 0 });
    //发请求更新分类
    // console.log(this.classes);
    // console.log(this.input);
    const parentId = this.classes.props.value;
    // console.log(categoryId)
    const categoryName = this.input.props.value;
    if (!categoryName) {
      message.error('名称不能为空!')
      return
    }
    //  console.log(categoryName)
    const result = await reqAddCategory(categoryName, parentId);
    // console.log(result);
    if (result.status === 0) {
      //重新显示列表
      // console.log('parentid', parentId)

      this.getCategorys();//重新获取当前分类列表
      message.success('添加成功')

    } else {
      message.error('添加失败')
    }
  }



  //跟新分类
  updateCategory = async () => {
    //
    this.setState({ showStatus: 0 });
    //发请求更新分类
    const categoryId = this.category._id;
    // console.log(categoryId)
    const categoryName = this.form.state.value;
    if (!categoryName) {
      message.error('名称不能为空!')
      return
    }
    // console.log(categoryName);
    const result = await reqUpdateCategory(categoryId, categoryName);
    // console.log(result)
    if (result.status === 0) {
      //重新显示列表
      this.getCategorys();
      message.success('修改成功')
    } else {
      message.error('修改失败')
    }
  }
  //点击显示确认框
  showAdd = () => {
    this.setState({
      showStatus: 1
    })

  }
  //点击显示修改框
  showUpdate = (category) => {
    //保存分类对象
    this.category = category
    //更新状态
    this.setState({
      showStatus: 2
    })
  }
  //初始化 所有列的数据数组
  initColumns = () => {
    this.columns = [
      {
        title: "分类名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "操作",
        width: 300,
        key: "action",
        dataIndex: "",
        render: (category) => {//返回需要显示的界面标签
          return (<span>
            <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
            {this.state.parentId === '0' ? <LinkButton onClick={() => { this.showSubCategorys(category) }}>查看子分类</LinkButton> : null}
          </span>)
        }
      }
    ];

  }
  //异步获取一级分类列表/二级分类列表
  getCategorys = async () => {
    //在发送请求前显示loading
    this.setState({ loading: true })
    const { parentId } = this.state
    const result = await reqCategorys(parentId)
    //在发送请求后隐藏loading
    this.setState({ loading: false })

    // console.log(result);
    if (result.status === 0) {
      //获取分类列表数据 (可能是一级分类列表也可能是二级分类列表)
      const categorys = result.data
      // console.log(categorys);
      if (parentId === '0') {//说明是一级分类列表
        //更新状态
        this.setState({ categorys })
      } else {
        this.setState({ subCategorys: categorys })
      }


    } else {
      message.error('获取分类列表失败')
    }

  }
  //展现指定一级分类的二级分类
  showSubCategorys = (category) => {
    // console.log(category);
    //更新状态
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => {//在状态更新完成后,且 render函数执行完调用
      // console.log('parentId', this.state.parentId)
      this.getCategorys()
    })
    // console.log('parentId', this.state.parentId);//'0'
    //setState 不能立即获取更新之后的状态 是setState是异步更新状态的

  }
  //更新为显示一级列表的状态
  showCategorys = () => {
    this.setState(
      {
        parentId: "0",
        parentName: "",
        subCategorys: [],
      },
      () => {
        //在状态更新后重新render后执行
        this.getCategorys();
      }
    );

  }
  /*
   为第一次 render做数组准备
   */
  UNSAFE_componentWillMount() {
    this.initColumns()

  }
  //元素挂载完成
  componentDidMount() {
    //发送异步请求 获取数据
    this.getCategorys()

  }
  render() {

    //读取状态数据
    const { categorys, loading, subCategorys, parentId, parentName, showStatus } = this.state
    //读取指定的列表
    const category = this.category || {}
    const title =
      parentId === "0" ? (
        "一级分类列表"
      ) : (
        <Space>
          <LinkButton
            onClick={() => {
              this.showCategorys()
            }}
          >
            一级分类列表
          </LinkButton>{" "}
          <ArrowRightOutlined /> {parentName}
        </Space>
      );
    let extra = (
      <Button onClick={this.showAdd} type="primary" icon={<PlusOutlined />}>添加</Button>
    )



    return (
      <div>
        <Card title={title} extra={extra} >
          <Table
            bordered
            rowKey="_id"
            loading={loading}
            dataSource={parentId === '0' ? categorys : subCategorys}
            columns={this.columns}
            pagination={{ pageSize: 5, showQuickJumper: true }} />;
             <Modal title="添加分类" destroyOnClose={true} visible={showStatus === 1} onOk={this.addCategory} onCancel={this.handleCancel}>
            <AddForm categorys={categorys}
              categoryName
              setClasses={(classes) => {
                this.classes = classes;
              }}
              setInput={(input) => {
                this.input = input;
              }} />

          </Modal>
          <Modal title="更新分类" destroyOnClose={true} visible={showStatus === 2} onOk={this.updateCategory} onCancel={this.handleCancel}>
            <UpdateForm category={category.name}
              setForm={(form) => {
                this.form = form;
              }} />

          </Modal>
        </Card>
      </div>
    )
  }
}
export default withRouter(Category)
