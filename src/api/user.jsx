import http from '../utils/request'

export const getData = () => {
    return http.request({ url: '/home/getData', method: 'get' })
}

export const getUserList = (params) => {
    return http.request({ url: '/user/getUser', method: 'get', params })
}

export const createUser = (data) => {
    return http.request({ url: '/user/addUser', method: 'post', data })
}

export const updateUser = (data) => {
    return http.request({ url: '/user/editUser', method: 'put', data })
}

export const deleteUser = (data) => {
    return http.request({ url: '/user/deleteUser', method: 'post', data })
}
