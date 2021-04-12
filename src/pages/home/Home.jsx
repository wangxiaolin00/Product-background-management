import React, { Component } from 'react'
import { Card } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import ReactECharts from 'echarts-for-react';

export default class Home extends Component {
  state = { option: {} }
  getOption = () => {
    return {
      title: {
        text: '近期销量'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['数码家电', '品牌服饰', '母婴产品', '钟表箱包', '电脑办公']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '数码家电',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '品牌服饰',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '母婴产品',
          type: 'line',
          stack: '总量',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '钟表箱包',
          type: 'line',
          stack: '总量',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '电脑办公',
          type: 'line',
          stack: '总量',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };
  }
  UNSAFE_componentWillMount() {
    let option = this.getOption()
    this.setState({ option })
  }
  render() {
    const { option } = this.state
    return (
      <div>
        <Card title="销售状况" >
          <h2>1128163</h2>
          <p>周同比15%<ArrowUpOutlined style={{ color: 'green' }} /></p>
          <p>日同比10%<ArrowDownOutlined style={{ color: 'red' }} /> </p>
        </Card>
        <Card>
          <ReactECharts option={option} />
        </Card>
      </div>
    )
  }
}
