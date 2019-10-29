export default {
    // 登录
    login: {
        method: 'post',
        url: '/login'
    },
    // 注册
    register: {
        method: 'post',
        url: '/register'
    },
    // 退出登录
    logout: {
        method: 'post',
        url: '/logout'
    },
    // 获取个人信息
    getUserInfo: {
        method: 'post',
        url: '/getUserInfo'
    },
    Hello: {
        method: 'get',
        url: '/ping'
    }
}