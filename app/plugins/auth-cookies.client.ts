import { createAuthCookieAdapter } from '~/utils/auth-cookies'

export default defineNuxtPlugin({
  name: 'auth-cookie-preference',
  // Configure the documented cookie adapter before the Supabase module creates its client.
  order: -30,
  setup() {
    const config = useRuntimeConfig().public.supabase
    Object.assign(config.clientOptions, {
      cookies: createAuthCookieAdapter(() => document.cookie, value => { document.cookie = value }, config.cookiePrefix, window.location.protocol === 'https:')
    })
  }
})
