export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) return
    const _ids = useCookie(
        '_ids',
        {
            default: () => '',
            watch: 'shallow',
            httpOnly: true,
            path: '/',
            maxAge: 24 * 60 * 60
        }
    )
    if (!_ids.value) {
        _ids.value = 'user'
    }
})