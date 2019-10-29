import axios from 'axios'
import NProgress from "nprogress"
import Message from "ant-design-vue/lib/message"
import cfg from '@/config'

axios.defaults.baseURL = `${cfg.host}${cfg.port}${cfg.baseUrl}`
axios.defaults.timeout = 100000
axios.defaults.withCredentials = true
NProgress.configure({
    showSpinner: false
})

axios.interceptors.request.use(
    config => {
        NProgress.start()
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

axios.interceptors.response.use(res => {
    // 响应拦截
    NProgress.done()
    return res
}, err => {
    NProgress.done()
    if (err.response) {
        let message = ''
        switch (err.response.status) {
            case 404:
                message = err.response.data;
                break;
            case 500:
                message = err.response.data.message;
                break;
        }
        Message.error(message);
    }
    return Promise.reject(err)
})

export default function(options) {
    let params = {
        method: options.method,
        url: options.url,
        params: options.params,
        data: options.params
    }
    if (options.method.toLowerCase() === 'get') {
        delete params.data
    } else if (options.method.toLowerCase() === 'post') {
        delete params.params
    }
    return axios(params)
}