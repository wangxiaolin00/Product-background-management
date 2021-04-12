import axios from 'axios'
import { message } from 'antd'


// export default function ajax(url, data, type) {
//   if (type === 'GET') {
//     return axios.get(url, {
//       params: data
//     })
//   } else {
//     return axios.post(url, data)
//   }
// }

//优化请求 处理错误
//在外面包一层promise
export default function ajax(url, data = {}, type = "GET") {
  //请求成功
  let promise
  return new Promise((resolve, reject) => {
    if (type === 'GET') {
      promise = axios.get(url, {
        params: data
      })
    } else {
      promise = axios.post(url, data)
    }
    promise.then(val => {
      resolve(val.data)
    }).catch(err => {
      message.error(err.message)
    })
  })
}