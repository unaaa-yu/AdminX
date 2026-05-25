import axios from 'axios'

const baseUrl = '/api'

class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    interception(instance) {
        instance.interceptors.request.use((config) => {
            const token = localStorage.getItem('token')
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`
            }
            return config
        }, (error) => Promise.reject(error))

        instance.interceptors.response.use(
            (response) => response,
            (error) => Promise.reject(error)
        )
    }

    request(options) {
        const instance = axios.create({ baseURL: this.baseUrl })
        this.interception(instance)
        return instance(options)
    }
}

export default new HttpRequest(baseUrl)
