const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
let url = "http://localhost:8084"
let cdnUrl = "https://image.jiayuan.ccbhome.cn/scss/srss";
// 打包后文件链接
const baseURL = process.env.VUE_APP_TITLE === 'production' ? `${cdnUrl}/pc/` : "/"
    // 是否使用gzip
const productionGzip = true
    // 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css']
    // 是否移除console
const closeConsole = false

const externals = {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'axios': 'axios',
    'vue-baidu-map': 'VueBaiduMap',
    'nprogress': 'NProgress',
    'ant-design-vue': 'antd',
    'vue-cropper': 'vue-cropper'
}
const cdn = {
    dev: {
        css: [
            'https://cdn.jsdelivr.net/npm/ant-design-vue@1.3.13/dist/antd.min.css',
            'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'
        ],
        js: [
            'https://cdn.jsdelivr.net/npm/vue-cropper@0.4.9/dist/index.min.js'
        ]
    },
    prod: {
        css: [
            'https://cdn.jsdelivr.net/npm/ant-design-vue@1.3.13/dist/antd.min.css',
            'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'
        ],
        js: [
            'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
            'https://cdn.jsdelivr.net/npm/vue-router@3.0.7/dist/vue-router.min.js',
            'https://cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
            'https://cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js',
            'https://cdn.jsdelivr.net/npm/vue-baidu-map',
            'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js',
            'https://cdn.jsdelivr.net/npm/ant-design-vue@1.3.13/dist/antd.min.js',
            'https://cdn.jsdelivr.net/npm/vue-cropper@0.4.9/dist/index.min.js'
        ]
    }
}
console.log(`环境变量：${process.env.VUE_APP_TITLE}, 
是否使用免费cdn：${process.env.VUE_APP_NETWORK}, 
打包后文件链接：${baseURL}, 
是否启用gzip压缩：${productionGzip},
是否移除console：${closeConsole}
`)
module.exports = {
    // publicPath: baseURL,
    // outputDir: 'pc',
    lintOnSave: true,
    productionSourceMap: false,
    chainWebpack: (config) => {
        config.module.rule('worker')
            .test(/\.worker\.js$/)
            .use('worker-loader')
            .loader('worker-loader').end();
        config.module.rule('js').exclude.add(/\.worker\.js$/)
        if (~['analyz', 'production'].indexOf(process.env.VUE_APP_TITLE)) {
            config.externals(externals)
            if (process.env.VUE_APP_TITLE === 'analyz') {
                config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
            }
        }
        config.plugin('html').tap(args => {
            if (~['analyz', 'production'].indexOf(process.env.VUE_APP_TITLE)) {
                args[0].cdn = cdn.prod
            } else {
                args[0].cdn = cdn.dev
            }
            return args
        })
    },
    configureWebpack: (config) => {
        if (process.env.VUE_APP_TITLE === 'production') {
            config.mode = 'production'
                // 移除console
            if (closeConsole) {
                let optimization = {
                    minimizer: [
                        new UglifyJsPlugin({
                            uglifyOptions: {
                                warnings: false,
                                compress: {
                                    drop_console: true,
                                    drop_debugger: false,
                                    pure_funcs: ['console.log']
                                }
                            }
                        })
                    ]
                }
                Object.assign(config, { optimization })
            }
            productionGzip && config.plugins.push(
                new CompressionWebpackPlugin({
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 8192,
                    minRatio: 0.8
                })
            )
        } else {
            config.mode = 'development'
        }
    },
    devServer: {
        open: true,
        proxy: {
            '/api': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
            // '/ws': {
            //     target: url,
            //     ws: true,
            //     pathRewrite: {
            //         '^/ws': '/'
            //     }
            // }
        }
    }
}