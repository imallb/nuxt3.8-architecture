/**
 * 复制，因为在之前vue3的vue-clipboard3插件在使用报错，找不到问题，因此自己封装了一下
 * @param text 
 */
export default function(text: string) {
    if (window.isSecureContext && navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            ElMessage({
                message: '复制成功！',
                type: 'success',
            })
        }).catch(() => {
            ElMessage({
                message: '复制失败！',
                type: 'error',
            })
        })
    } else {
        const input = document.createElement('input')
        input.value = text
        document.body.appendChild(input)
        input.select()
        input.setSelectionRange(0, input.value.length)
        document.execCommand('Copy')
        input.remove()
        ElMessage({
            message: '复制成功！',
            type: 'success',
        })
    }
}
