import React, { Component } from 'react'
import ReactECharts from 'echarts-for-react';
import { Card } from 'antd'



export default class Pie extends Component {
  getOption = () => {
    return {
      legend: {
        top: 'bottom'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: '面积模式',
          type: 'pie',
          radius: [30, 100],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: 40, name: '数码' },
            { value: 38, name: '家电' },
            { value: 32, name: '生鲜' },
            { value: 30, name: '母婴' },
            { value: 28, name: '运动户外' },
            { value: 26, name: '生活旅行' },
            { value: 22, name: '图文娱乐' },
            { value: 18, name: '品牌服装' }
          ]
        }
      ]
    };
  }
  render() {
    return (
      <div>
        <Card title="分类商品数据">
          <ReactECharts option={this.getOption()} />
        </Card>
      </div>
    )
  }
}
