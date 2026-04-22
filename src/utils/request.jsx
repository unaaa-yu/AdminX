import axios from 'axios'

const baseUrl = '/api'

class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    getConfig() {
        const config = {
            baseUrl: this.baseUrl,
            header: {}
        }
        return config
    }

    interception(instance) {
        instance.interceptors.request.use((config) => { 
            return config
        }, 
        (error) => {
            return Promise.reject(error)
        })

        instance.interceptors.response.use((response) => { 
            return response
        }, 
        (error) => {
            return Promise.reject(error)
        })
    }

    request(options) {
        options = { ...this.getConfig(), ...options }
        const instance = axios.create()
        this.interception(instance)
        return instance(options)
    }
}

export default new HttpRequest(baseUrl)