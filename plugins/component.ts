/**
 * 接入组件到vue根component对象下，避免页面找不到组件
 * 接入阿里icon库iconfont.js，使用@ant-design/icons-vue组件让svg能够像font一样添加修改颜色和字体大小
 * 阿里图标库.js文件，在生成时需要把图标去色，不然会修改不了颜色
 * 按需引入获取不到ElUpload组件，在这里全局引入
 */
import { createFromIconfontCN } from '@ant-design/icons-vue'
import { ElUpload } from 'element-plus'

export default defineNuxtPlugin({
    name: 'component',
    parallel: true,
    async setup (nuxtApp) {
        const Icon = createFromIconfontCN({
            scriptUrl: '/fonts/iconfont.js'
        })
        nuxtApp.vueApp.component('IconFont', Icon)
        nuxtApp.vueApp.component('upload', ElUpload)
    }
})