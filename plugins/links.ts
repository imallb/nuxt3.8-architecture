/**
 * 解决快速切换路由报错问题
 * Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.
 * 重写router钩子函数，，这种方法不会让你丢失之前跳转过的路径，以便用户可以使用游览器的回退
 * 测试的时候这个方法有点问题，但是暂时没有更好的办法，如果认为可以忽略这个错误，可以去掉
*/
export default defineNuxtPlugin({
    name: 'router',
    hooks: {
        'page:start': function() {
            const nuxtApp = useNuxtApp();
            (nuxtApp.$router as any).running = false
            nuxtApp.$router.beforeEach((to, from, next) => {
                if ((nuxtApp.$router as any).running) next(true)
                else {
                    (nuxtApp.$router as any).nextRoute = to.fullPath
                    next(false)
                }
            })
        },
        'page:transition:finish': function() {
            const nuxtApp = useNuxtApp();
            (nuxtApp.$router as any).running = true
            if ((nuxtApp.$router as any).nextRoute) {
                nuxtApp.$router.push((nuxtApp.$router as any).nextRoute);
                (nuxtApp.$router as any).nextRoute = null
            }
        }
    }
})