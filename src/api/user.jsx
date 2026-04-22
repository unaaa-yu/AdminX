import http from '../utils/request'

export const getData = () => {
    return http.request({
        url: '/home/getData',
        method: 'get'
    })
}