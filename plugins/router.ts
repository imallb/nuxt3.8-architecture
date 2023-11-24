/**
 * 切换路由时页面渲染进度条显示
 */
import NProgress from "nprogress"
import "nprogress/nprogress.css"

export default defineNuxtPlugin({
    name: 'router',
    parallel: true,
    async setup (nuxtApp) {
        nuxtApp.hook('page:start', () => {
            NProgress.start()
        })
        nuxtApp.hook('page:finish', () => {
            NProgress.done()
        })
    }
})