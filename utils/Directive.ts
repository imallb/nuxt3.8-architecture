/**
 * 滑动固定头部在顶部
 */
interface scrolFiexdlBind {
    offsetTop?: number;
    offset?: number;
    class?: string;
}

function getStyle(elem: any, styleArr: any) {
    if(typeof window.getComputedStyle!='undefined'){
        return window.getComputedStyle(elem,null)[styleArr]
    }else if(typeof elem.currentStyle!='undefined') {
        return elem.currentStyle[styleArr]	
    }
}

export default {
    scrollFiexd: {
        mounted(el: Element, binding: { value?: scrolFiexdlBind }) {
            const value = binding.value || {}
            new Promise((resolve, reject) => {
                const elm: any = value.class ? (el.querySelector(value.class) || el) : el
                if (!elm) reject('reject')
                elm.style = ''
                resolve(elm)
            }).then((res: any) => {
                const width = getStyle(res, 'width')
                scroll()
                document.addEventListener('scroll', scroll, true)
                function scroll() {
                    const top = value.offsetTop || 0
                    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    if (scrollTop >= top) {
                        res.style.position = 'fixed'
                        res.style.top = 0 + (value.offset || 0) + 'px'
                        res.style.zIndex = '99'
                        res.style.width = width
                    } else {
                        res.style = ''
                    }
                }
            }).catch((e: any) => {
                console.log(e)
            })
        }
    }
}