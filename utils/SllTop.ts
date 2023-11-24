/**
 * 页面块定位滑动
 */
interface params {
  offset?: number;
  callback?: Function;
}

export function setTop (elem: HTMLElement): number {
  let top = elem.offsetTop
  let parent = elem.offsetParent
  while (parent !== null) {
    top += (parent as HTMLElement).offsetTop
    parent = (parent as HTMLElement).offsetParent
  }
  return top
}
const slltopTimer: any = 0
slltop.slltopTimer = slltopTimer
export default function slltop (that?: HTMLElement, { offset = 0, callback = () => void('') }: params = {}) {
  // 防止抖动
  if (slltop.slltopTimer !== 0) return false
  /*
  * speen都是调整返回的速度；
  * time默认值为10，值越高速度越慢；
  * speen默认为0.2，值越高速度越快；
  * height为页面显示到的位置。
  */
  const speen = 1.2
  const time = 10
  let height = 0
  let scrollHeight = 0
  /*
  * sll函数为主要运行函数
  * sll函数每次运行可以看作一个动画帧跳动
  */
  const sll = () => {
    const vh = that ? setTop(that) : 0
    const elemCh = document.documentElement.clientHeight
    if (vh + elemCh > document.body.offsetHeight) {
      height = document.body.offsetHeight - elemCh
    } else {
      height = vh
    }
    height = height > offset ? height - offset : 0
    // console.log(height)
    /*
    * 计算滚动条位置
    */
    const n = document.documentElement.scrollTop || document.body.scrollTop
    if (height === 0) {
      scrollHeight = Math.floor(n / speen)
    } else if (height > 0) {
      if (height > n) {
        scrollHeight = height - Math.floor((height - n) / speen)
      } else if (height < n) {
        scrollHeight = Math.floor((n - height) / speen) + height
      } else {
        scrollHeight = height
      }
    }
    window.scroll(0, scrollHeight)
    /*
    * 创建动画帧，并且赋予slltop.slltopTimer值；
    * 当动画没有结束时slltop.slltopTimer值大于0（正在动画中）；
    * 当动画结束时slltop.slltopTimer值被赋予为0（结束动画）。
    */
    if (height <= 0) {
      if (n > 0) {
        slltop.slltopTimer = setTimeout(sll, time)
      } else {
        callback(height)
        slltop.slltopTimer = 0
      }
    } else {
      if (n < height || n > height) {
        slltop.slltopTimer = setTimeout(sll, time)
      } else {
        callback(height)
        slltop.slltopTimer = 0
      }
    }
  }
  /*
    * 获得节点在页面上位置的高度
    */
  // 启动滚动条动画。
  sll()
}
