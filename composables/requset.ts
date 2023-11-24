import { UseFetchOptions } from "nuxt/app"
/**
 * 路由配置 https://www.nuxt.com.cn/docs/api/composables/use-fetch
 * @param opt 修改/添加配置
 * @returns 
 */
export const useRequsetOption = (opt?: object): UseFetchOptions<any> => {
    const user = useStore.user()
    const lang = useStore.lang()
    const config = useRuntimeConfig()
    const optiton = opt || {}
    return {
        baseURL: config.public.apihost,
        method: 'GET',
        onRequest({ request, options }) {
            // Set the request headers
            const token = user.token
            options.headers = options.headers || {};
            if (token) (options.headers as any).authorization = token;
            if (lang.value) (options.headers as any).language = lang.value;
        },
        onRequestError({ request, options, error }) {
            // Handle the request errors
            // console.error(error)
        },
        onResponse({ request, response, options }) {
            const res = response._data
            if (res && res.code == 200) {
                response._data = res.data
            } else if (res && res.code == 401) {
                response._data = null
            } else {
                response._data = null
                ElMessage({
                    type: 'error',
                    message: res.msg || res.message || 'Api error.',
                })
            }
        },
        onResponseError({ request, response, options }) {
            // Handle the response errors
            // console.error(error)
        },
        ...optiton
    }
}
/**
 * 传统的响应式请求
 * @param url 路由
 * @param opt 配置
 * @returns 
 */
export const useHttpRequset = (url:string, opt?: object): Promise<any> => {
    const option: object = useRequsetOption(opt)
    const headers = useRequestHeaders(['cookie'])
    return $fetch(url, {
        ...option,
        headers,
        onResponse({ request, response, options }) {
            const res = response._data
            if (res.code && [200, 401].indexOf(res.code) < 0) {
                ElMessage({
                    type: 'error',
                    message: res.msg || res.message || 'Api error.',
                })
            }
            response._data = res
        }
    })
}

type FnType = () => string
export const useSeverRequset = (url:string|FnType, opt?: object): Promise<any> => {
    const option: object = useRequsetOption(opt)
    return useFetch(url, option)
}
