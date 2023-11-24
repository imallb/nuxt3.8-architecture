/**
 * api接口默认为get
 * 接口文件名加.post为post方式请求
 * 同理文件名加.get为get方式请求
 * 获取接口传参，readBody(event)可以获取body传参，getQuery(event)可以获取query传参
 * 详情查看：https://www.nuxt.com.cn/docs/guide/directory-structure/server
 */

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const repo = body.name || 'user'
    // 保存数据缓存，ttl是redis缓存的过期时间
    await useStorage('redis').setItem('name', repo, {
        ttl: 4 * 60
    })
    return { repo }
})