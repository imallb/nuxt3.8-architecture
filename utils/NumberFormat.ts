/**
 * 数字转化
 */
export default {
    /**
     * 汇率转换
     * @param numb 数字
     * @param rate 汇率, 默认为1倍（当前值）
     * @param point 小数点后几位数，默认2位数
     * @returns 
     */
    changerate(numb = 0, rate = 1, point = 2) : string|number {
        const num = Math.abs(numb)
        const values = rate
        const arr: Array<any> = new String(this.fullNum(num)).split('.')
        const rarr: Array<any> = new String(values).split('.')

        function beishufn(str: string) {
            let text = '1'
            if (str) {
                str.replace(/\d/g, function($1: any) {
                    text = text + '0'
                    return $1
                })
            }
            return Number(text)
        }
        
        const beishu = beishufn(arr[1])
        const rbeishu = beishufn(rarr[1])
        const nums = this.fullNum((Math.round(num * beishu) * Math.round(values * rbeishu)) / (beishu * rbeishu))
        let outnum: any = nums
        if (point) {
            let power = 1
            for (let i = 0; i < point; i++) power = Number(`${ power }0`)
            const exp = new RegExp(`^(\\d+[.])(0+)?[1-9][0-9]{0,${ point - 1 }}`)
            const pnum = `${ nums }`.match(exp)
            const numshu = beishufn(`${ pnum ? pnum[0] : nums }`.replace(/^\d+[.]/, ''))
            let round = pnum ? `${ nums }`.replace(exp, '').replace('.', '') : 0
            round = Math.round(Number('0.' + round) || 0)
            if (typeof nums == 'string') {
                outnum =  pnum ? pnum[0] : nums
            } else {
                outnum = Number(pnum ? pnum[0] : nums)
                outnum = this.unfloat(Math.round((outnum * numshu) + round), numshu, '/')
            }
        }
        return isNaN(outnum) || outnum === '' ? '' : numb >= 0 ? `${ outnum }` : `${ -outnum }`
    },
    /**
     * 千分位
     * @param value 数字/字符串
     * @returns 
     */
    currencyNo(value: any) : string|number {
        if (isNaN(value) || value == '') return ''
        // 获取整数部分
        const intPart = Math.trunc(value)
        // 整数部分处理，增加,
        const intPartFormat = this.fullNum(intPart).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
        // 预定义小数部分
        let floatPart = ''
        // 将数值截取为小数部分和整数部分
        const valueArray = value.toString().split('.')
        if (valueArray.length === 2) { // 有小数部分
          floatPart = valueArray[1].toString() // 取得小数部分
          return intPartFormat + '.' + floatPart
        }
        return intPartFormat + floatPart
    },
    /**
     * 乘除计算浮点数问题解决方案
     * @param numb  数字
     * @param point 倍数
     * @param comp  *乘，/除
     * @returns 
     */
    unfloat(numb: number, point = 1, comp = '*') : string|number {
        // 获取数值的正值
        const num = Math.abs(numb)
        // 区分数值的小数点和整数部分
        const arr = new String(num).split('.')
        // 区分倍数的小数点和整数部分
        const rarr = new String(point).split('.')
        // 该函数获取的是小数点有多少位数，用来把浮点数转为整数
        function beishufn(str: any): string {
            let text = '1'
            if (str) {
                str.replace(/\d/g, function($1: any) {
                    text = text + '0'
                    return $1
                })
            }
            return text
        }
        const beishu: any = beishufn(arr[1])
        const rbeishu: any = beishufn(rarr[1])
        let nums: any = ''
        if (comp == '*') {
            // 倍数过大会出现科学计算显示，需要解决才能获得准确数值
            const poor: any = this.fullNum(beishu * rbeishu)
            nums = this.fullNum((Math.round(num * beishu) * Math.round(point * rbeishu)) / poor)
        } else if (comp == '/') {
            // compPoor beishu与rbeishu的差倍数，确保不会被小数点后位数影响最终值不一样
            const compPoor: any = this.fullNum(beishu / rbeishu)
            const compNum: any = this.fullNum((Math.round(num * beishu) / Math.round(point * rbeishu)) / compPoor)
            const compArr = new String(compNum).split('.')
            const cbeishu: any = beishufn(compArr[1])
            const poor: any = this.fullNum(cbeishu)
            nums = this.fullNum(Math.round(compNum * cbeishu) / poor)
        } else {
            // 倍数过大会出现科学计算显示，需要解决才能获得准确数值
            const poor: any = this.fullNum(beishu * rbeishu)
            nums = this.fullNum((Math.round(num * beishu) * Math.round(point * rbeishu)) / poor)
        }
        return isNaN(nums) || nums === '' ? '' : numb >= 0 ? `${ nums }` : `${ -nums }`
    },
    /**
     * 处理科学计算法转数字
     * @param num 数字
     * @returns 
     */
    fullNum(num: number) : string|number {
        //处理非数字
        if(isNaN(num)) return num
        //处理不需要转换的数字
        const str = '' + num
        if(!/e/i.test(str)) return num
        const list:Array<any> = `${ num }`.split(/e[-+]/i);
        const number = `${ Math.abs(list[0]) }`.replace('.', '')
        // 基数
        let basis: any = `${ num }`.match(/^[\d.]+/)
        basis = basis[0].replace(/\./, '')
        const tag = num > 0 ? '' : '-'
        const text = /e[+]/.test(`${ num }`) ? number.padEnd(Number(list[1]) + 1 || 0, '0') :
            /e[-]/.test(`${ num }`) ? number.padStart(Number(list[1]) + basis.length, '0').replace(/^0/, '0.') :
            ''
        return tag + text
    }
}
