import axios from 'axios'

let http = axios.create({
  baseURL: '/api' //代理服务器
})

//请求拦截
http.interceptors.request.use(req => {
  let token = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).token : ''
  // 需求：在请求头中添加token令牌
  req.headers.authorization = token
  //设置请求拦截之后，要返回值这个配置
  return req
})

//响应拦截 一般用于全局拦截错误
http.interceptors.response.use(res => {
  if (res.data.code === 500) {
    alert(res.data.msg)
    // console.log(router,'路由配置项');
    router.push('/login')
  } else if (res.data.code === 403) {
    //token验证过期，重新登录
    alert(res.data.msg)
    router.push('/login')
  } else {
    return res.data
  }
})

export default http
