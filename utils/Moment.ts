/**
 * dayjs时间日期格式化
 * https://dayjs.uihtm.com/install/
 */
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
import calenderPlugin from "dayjs/plugin/calendar";
// dayjs国际化
import 'dayjs/locale/zh-cn'
export default {
    /**
     * dayjs
     * @param date 
     * @returns 
     */
    day(date?: number|string): dayjs.Dayjs {
        const lang = useStore.lang()
        dayjs.extend(relativeTime);
        return dayjs(date).locale(lang.value)
    },
    calendar(date?: number|string, params?: any) : string {
        dayjs.extend(calenderPlugin);
        return dayjs(date).calendar(null, params || {
            lastDay: `昨天`,
            sameDay: `今天`,
            nextDay: `明天`,
            lastWeek: ' ',
            nextWeek: ' ',
            sameElse: ' '
        })
    },
}
