import React, { Component } from 'react'
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';


export default class Bar extends Component {
  getOption = () => {
    return {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }]
    };

  }
  render() {
    return (
      <div>
        <Card title="周销量数据">
          <ReactECharts
            option={this.getOption()}
            lazyUpdate={true} />
        </Card>

      </div>
    )
  }
}
