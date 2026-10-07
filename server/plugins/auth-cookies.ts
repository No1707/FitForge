import { getRequestHeader, getResponseHeader, setResponseHeader } from 'h3'
import { applySessionCookiePolicy, remembersSession } from '~/utils/auth-cookies'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('beforeResponse', (event) => {
    const header = getResponseHeader(event, 'set-cookie')
    if (!header) return
    const prefix = useRuntimeConfig(event).public.supabase.cookiePrefix
    const remember = remembersSession(getRequestHeader(event, 'cookie') || '')
    const cookies = Array.isArray(header) ? header : [String(header)]
    // Server-side token refresh must honour the same choice as browser-side refresh.
    setResponseHeader(event, 'set-cookie', cookies.map(cookie => applySessionCookiePolicy(cookie, prefix, remember)))
  })
})
