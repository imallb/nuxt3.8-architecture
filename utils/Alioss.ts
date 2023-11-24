/**
 * 阿里oss图片提交和删除方法
 */
import OSS from 'ali-oss'
import { ElMessage } from 'element-plus'

interface CallbackOption {
    url: string;
    base64: string|ArrayBuffer|null |undefined;
}

export default {
    // 生成密钥
    client(data: any) {
        const post = {
            region: data.bucketUrl.replace(/^(https:)[^.]+./, '').replace('.aliyuncs.com', ''),  // oss-cn-shenzhen
            accessKeyId: data.accessKeyId,
            accessKeySecret: data.accessKeySecret,
            stsToken: data.stsToken,
            bucket: data.bucket
        }
        return new OSS(post)
    },
    // 提交
    putUpload(file: File, fileLink: string, callback?: (res: CallbackOption) => void, catched?: (err: any) => void) {
        const oss = useStore.oss()
        oss.getStsToken().then(() => {
            this.client(oss.token).put(fileLink, file).then((result: any) => {
                // 回调函数方法 $IMG_OSS
                if (callback) {
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onloadend = (e) => {
                        callback({
                            url: result.name,
                            base64: e.target?.result
                        })
                    }
                }
            }).catch((err?: any) => {
                // 输出错误
                if (catched) catched(err)
            })
        })
    },
    // 删除
    deleteMulti(fileLink: string, callback?: () => void, catched?: (err: any) => void) {
        if (!fileLink) {
            ElMessage.error('删除的文件名称出错！')
            return
        }
        const oss = useStore.oss()
        const name = fileLink.replace(/^((https|http):\/\/)[^/]+\//, '')
        oss.getStsToken().then(() => {
            this.client(oss.token).deleteMulti([name]).then(() => {
                if (callback) callback()
            }).catch((err?: any) => {
                // 输出错误
                if (catched) catched(err)
            })
        })
    }
}
