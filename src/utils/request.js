import axios from 'axios'

const request = axios.create({
  baseURL: 'https://m.maizuo.com/gateway'
})

export default request
