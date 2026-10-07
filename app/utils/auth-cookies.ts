import { parseCookieHeader, serializeCookieHeader, type CookieOptions } from '@supabase/ssr'

export const REMEMBER_COOKIE = 'fitforge-remember'
export const REMEMBER_MAX_AGE = 60 * 60 * 24 * 30

export function remembersSession(header: string): boolean {
  return parseCookieHeader(header).find(cookie => cookie.name === REMEMBER_COOKIE)?.value !== '0'
}

export function isAuthCookie(name: string, prefix: string): boolean {
  return [prefix, `${prefix}-code-verifier`].some(base => name === base || (name.startsWith(`${base}.`) && /^\d+$/.test(name.slice(base.length + 1))))
}

export function sessionCookieOptions(options: CookieOptions, remember: boolean): CookieOptions {
  // Keep deletion headers intact, including obsolete chunks and explicit sign-out.
  if (options.maxAge !== undefined && options.maxAge <= 0) return { ...options }
  if (options.maxAge === undefined && options.expires && options.expires.getTime() <= Date.now()) return { ...options }
  const result = { ...options }
  delete result.expires
  if (remember) result.maxAge = REMEMBER_MAX_AGE
  else delete result.maxAge
  return result
}

export function writeRememberPreference(remember: boolean, write: (cookie: string) => void, secure: boolean) {
  // Only the preference is stored here, never an email or password.
  write(serializeCookieHeader(REMEMBER_COOKIE, remember ? '1' : '0', { path: '/', sameSite: 'lax', secure, maxAge: REMEMBER_MAX_AGE }))
}

export function createAuthCookieAdapter(read: () => string, write: (cookie: string) => void, prefix: string, secure: boolean) {
  return {
    getAll: () => parseCookieHeader(read()).map(cookie => ({ name: cookie.name, value: cookie.value || '' })),
    setAll: (cookies: { name: string, value: string, options: CookieOptions }[]) => {
      const remember = remembersSession(read())
      for (const { name, value, options } of cookies) {
        const policy = isAuthCookie(name, prefix) ? sessionCookieOptions(options, remember) : options
        write(serializeCookieHeader(name, value, { ...policy, secure }))
      }
    }
  }
}

export function applySessionCookiePolicy(header: string, prefix: string, remember: boolean): string {
  const name = header.slice(0, header.indexOf('='))
  if (!isAuthCookie(name, prefix)) return header
  const age = header.match(/;\s*Max-Age=(-?\d+)/i)
  if (age && Number(age[1]) <= 0) return header
  const expires = header.match(/;\s*Expires=([^;]+)/i)
  if (!age && expires && Date.parse(expires[1]!) <= Date.now()) return header
  const session = header.replace(/;\s*(Max-Age|Expires)=[^;]*/gi, '')
  return remember ? `${session}; Max-Age=${REMEMBER_MAX_AGE}` : session
}
