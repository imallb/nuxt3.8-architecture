import { defineStore } from 'pinia'

interface formConfig {
    value: string;
}

export const lang = defineStore('lang', {
    state: (): formConfig => {
        return {
            value: 'zh-cn',
        }
    },
    actions: {}
})