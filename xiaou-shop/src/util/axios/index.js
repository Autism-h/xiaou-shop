import http from './axios'

// 前台模块接口集合
export function getBanner(){
    return http.get('/api/getbanner')
}

// 获取商品信息(首页)
export function getIndexGoods(){
    return http.get('/api/getindexgoods')
}

// 获取分类树形结构
export function getCateTree(){
    return http.get('/api/getcatetree')
}

// 获取分类商品
export function getGoods(params){
    return http.get('/api/getgoods',{
        params
    })
}

// 获取一个商品信息
export function getGoodsInfo(params){
    return http.get('/api/getgoodsinfo',{
        params
    })
}

//封装一个注册接口
export function register(data){
    return http.post('/api/register',data)
}

//封装一个登录接口
export function getLogin(data){
    return http.post('/api/login',data)
}

// 获取购物车列表
export function cartList(params){
    return http.get('/api/cartlist',{
        params
    })
}

//封装一个购物车添加接口
export function addCart(data){
    return http.post('/api/cartadd',data)
}

// 获取购物车列表
export function cartDelete(data){
    return http.post('/api/cartdelete',data)
}