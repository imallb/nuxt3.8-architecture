// https://nuxt.com/docs/api/configuration/nuxt-config
const API_HOST = process.env.NUXT_API_HOST || '/by.api/'

export default defineNuxtConfig({
  // devtools: { enabled: true },
  // typescript: {
  //   shim: false
  // },
  runtimeConfig: {
    // 客户端可以获取的变量
    public: {
      // api host
      apihost: API_HOST
    }
  },
  modules: ['@pinia/nuxt', '@element-plus/nuxt', 'nuxt-icons', "@nuxt/image"],
  // 全局页面head配置
  app: {
    head: {
      title: 'nuxt3.8-architecture',
      meta: [
        { name: "referrer", content:"no-referrer" },
        { name: 'description', content: 'nuxt3.8-architecture 学习和快速搭建的一个小框架，个人使用过的坑希望以后可以避免。' },
        { name: 'keywords', content: 'nuxt,nuxt3.8' }
      ],
    },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  nitro: {
    // https://nitro.unjs.io/config
    devProxy: {
      [`${ API_HOST }`]: {
        target: process.env.NUXT_HOST_URL,
        changeOrigin: true
      }
    },
    // https://nitro.unjs.io/guide/routing
    routeRules: {
      [`${ API_HOST }**`]: {
        proxy: `${ process.env.NUXT_HOST_URL }**`
      },
      '/api/**': { cors: true }
    },
    // https://nitro.unjs.io/guide/storage
    storage: {
      // 配置redis数据库链接，
      // redis: {
      //   driver: "redis",
      //   host: '127.0.0.1',
      //   port: '6379',
      //   username: '',
      //   password: '',
      //   db: 0
      // }
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/variables.scss" as *;'
        }
      }
    }
  },
  css: ['@/assets/styles/index.scss', 'element-plus/dist/index.css'],
})