/**
 * 本地数据加密保存
 * 进行加密处理，保证网站可观性，这样改有一个好处就是用户不能随便修改本地cookie
 * 注意服务端和客户端的区分
 * new Storage(key) 创建实例对象，key是创建当前实例对象的键值
 * @function setKeys(key)       加密某一个字符串, 为了兼容nuxt上的useCookies使用把字符串后面可能出现的=号清除
 * @function getKeys(key)       获取当前实例解密键值
 * @function setItem(key,value) 添加当前实例的属性，key属性键，value属性值
 * @function getItem(key)       获取当前实例的属性值，key属性键
 * @function removeItem(key)    删除当前实例的属性，key属性键
 */
export default class Storage {
    storageKeys!: string
    constructor(key = 'bytoken') {
        this.storageKeys = this.setKeys(key)
    }
    setKeys(key: string) {
        const value = btoa(encodeURIComponent(key)) || ''
        return value
    }
    cookieKeys() {
        const keys = this.storageKeys
        return keys.replace(/(=)+$/, '')
    }
    getKeys(key?: string) {
        const keys = key || this.storageKeys
        return decodeURIComponent(atob(keys))
    }
    setItem(key: string, value: any) {
        try {
            const keys = this.storageKeys
            const cookied: any = localStorage.getItem(keys)
            const data: any = typeof cookied == 'string' ? JSON.parse(decodeURIComponent(atob(cookied))) : {}
            if (key) data[key] = value
            localStorage.setItem(
                keys,
                typeof data == 'string' ? btoa(encodeURIComponent(data)) : btoa(encodeURIComponent(JSON.stringify(data)))
            )
        } catch(e) {
            console.error(e)
        }
    }
    getItem(key?: string) {
        try {
            const keys = this.storageKeys
            const cookied: any = localStorage.getItem(keys)
            const data: any = JSON.parse(decodeURIComponent(atob(cookied)))
            return !key ? data : data[key]
        } catch(e) {
            // console.error(e)
            return undefined
        }
    }
    removeItem(key?: string) {
        try {
            const keys = this.storageKeys
            const cookied: any = localStorage.getItem(keys)
            const data: any = typeof cookied == 'string' ? JSON.parse(decodeURIComponent(atob(cookied))) : {}
            if (!key) {
                localStorage.removeItem(keys)
            } else {
                Reflect.deleteProperty(data, key)
                localStorage.setItem(
                    keys, 
                    typeof data == 'string' ? btoa(encodeURIComponent(data)) : btoa(encodeURIComponent(JSON.stringify(data)))
                )
            }
        } catch(e) {
            console.error(e)
        }
    }
}
