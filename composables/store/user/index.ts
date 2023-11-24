import { defineStore } from 'pinia'
/**
 * 保存用户信息
 */
interface userConfig {
    token: string;
}

export const user = defineStore('user', {
    state: (): userConfig => {
        return {
            token: ''
        }
    },
    actions: {
        async getUserToken(payload: string) {
            this.token = payload
            return this.token
        }
    }
})

/**
 * 获取oss用户权限密钥生成的字段和数据结合ali-oss模块在客户端上运行
 */
interface stsConfig {
    token: any;
}

export const oss = defineStore('stsToken', {
    state: (): stsConfig => {
        return {
            token: null
        }
    },
    actions: {
        async getStsToken() {
            const oss = this.token
            return oss
            // if (oss && new Date(oss.expiration).getTime() > Date.now()) {
            //     return oss
            // } else {
            //     return getStsToken().then((res: any) => {
            //         this.token = res
            //         return res
            //     }).catch(() => {
            //         this.token = null
            //     })
            // }
        }
    }
})