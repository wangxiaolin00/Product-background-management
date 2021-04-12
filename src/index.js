import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import './index.css';
import App from './App';
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'
//读取local中保存的user,保存到内存中
memoryUtils.user = storageUtils.getUser()



ReactDOM.render(
  <App />,
  document.getElementById('root')
);


