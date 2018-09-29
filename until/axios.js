import axios from 'axios'



const instance = axios.create({
  baseURL: '/user',
  timeout: 10000,
})

const userxh = {
  get(url, data, methods = 'get', config) {
    return new Promise((resolve, rejects) => {
      instance[methods](url, {
        params: data
      }, config).then(res => {
        resolve(res)
      }).catch(err => {
        rejects(err)
      })
    })
  },
  post(url, data, methods = 'post', config) {
    return new Promise((resolve, rejects) => {
      instance[methods](url, data, config).then(res => {
        resolve(res)
      }).catch(err => {
        rejects(err)
      })
    })
  },
  delete(url, data, config) {
    return this.get(url, data, 'delete', config)
  },
  put(url, data, config) {
    return this.post(url, data, 'put', config)
  }
}

export const $axios = userxh
