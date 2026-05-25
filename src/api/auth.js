import http from '../utils/request'

export const login = (data) => {
    return http.request({
        url: '/permission/getMenu',
        method: 'post',
        data
    })
}
