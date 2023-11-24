/**
 * pinia 页面状态管理入口
 */
import { user, oss } from './user/index'
import { lang } from './lang/index'
const stores = {
    user: user,
    lang: lang,
    oss: oss
}

export default stores