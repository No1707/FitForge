const test = require('node:test')
const assert = require('node:assert/strict')
const { createBrowserClient, parseCookieHeader } = require('@supabase/ssr')
const { REMEMBER_COOKIE, REMEMBER_MAX_AGE, remembersSession, createAuthCookieAdapter, writeRememberPreference, applySessionCookiePolicy } = require('../app/utils/auth-cookies.ts')

function browserCookies(remember) {
  const jar = new Map(), writes = []
  const read = () => [...jar].map(([name, value]) => `${name}=${value}`).join('; ')
  const write = header => {
    writes.push(header)
    const pair = header.split(';')[0]
    const index = pair.indexOf('=')
    if (/;\s*Max-Age=0(?:;|$)/i.test(header)) jar.delete(pair.slice(0, index))
    else jar.set(pair.slice(0, index), pair.slice(index + 1))
  }
  if (remember !== undefined) writeRememberPreference(remember, write, true)
  return { jar, writes, read, write }
}

test('remember choice defaults to persistent and stores only the preference', () => {
  assert.equal(remembersSession(''), true)
  const browser = browserCookies(false)
  assert.equal(remembersSession(browser.read()), false)
  assert.deepEqual(parseCookieHeader(browser.read()), [{ name: REMEMBER_COOKIE, value: '0' }])
  assert.match(browser.writes[0], /Secure/)
  assert.match(browser.writes[0], /SameSite=Lax/)
})

test('client refresh honours changes of preference and preserves cookie deletion', () => {
  const browser = browserCookies(false)
  const adapter = createAuthCookieAdapter(browser.read, browser.write, 'sb-test-auth-token', true)
  const cookies = [{ name: 'sb-test-auth-token.0', value: 'test', options: { path: '/', sameSite: 'lax', maxAge: 34560000, expires: new Date('2040-01-01') } }]
  adapter.setAll(cookies)
  assert.doesNotMatch(browser.writes.at(-1), /Max-Age|Expires/i)
  assert.match(browser.writes.at(-1), /Secure/)
  writeRememberPreference(true, browser.write, true)
  adapter.setAll(cookies)
  assert.match(browser.writes.at(-1), new RegExp(`Max-Age=${REMEMBER_MAX_AGE}`))
  adapter.setAll([{ name: 'sb-test-auth-token.0', value: '', options: { path: '/', maxAge: 0 } }])
  assert.match(browser.writes.at(-1), /Max-Age=0/)
  assert.ok(!browser.jar.has('sb-test-auth-token.0'))
})

test('server refresh matches browser persistence for every chunk and PKCE cookie', () => {
  for (const name of ['sb-test-auth-token', 'sb-test-auth-token.0', 'sb-test-auth-token.1', 'sb-test-auth-token-code-verifier']) {
    const header = `${name}=test; Path=/; Max-Age=34560000; Expires=Sat, 01 Jan 2050 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax`
    const temporary = applySessionCookiePolicy(header, 'sb-test-auth-token', false)
    assert.doesNotMatch(temporary, /Max-Age|Expires/i)
    assert.match(temporary, /HttpOnly; Secure; SameSite=Lax/)
    assert.match(applySessionCookiePolicy(header, 'sb-test-auth-token', true), new RegExp(`Max-Age=${REMEMBER_MAX_AGE}$`))
    const deletion = `${name}=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    assert.equal(applySessionCookiePolicy(deletion, 'sb-test-auth-token', false), deletion)
  }
  const unrelated = 'site-theme=dark; Max-Age=1200; Path=/'
  assert.equal(applySessionCookiePolicy(unrelated, 'sb-test-auth-token', false), unrelated)
})

for (const remember of [true, false]) test(`Supabase sign-in and sign-out use the cookie policy (remember=${remember})`, async () => {
  const browser = browserCookies(remember)
  const prefix = `sb-test-${remember}-auth-token`
  const encode = value => Buffer.from(JSON.stringify(value)).toString('base64url')
  const now = Math.floor(Date.now() / 1000)
  const user = { id: 'c6d9e37d-81f2-49e0-a0d6-41a1f1ce94a0', aud: 'authenticated', role: 'authenticated', email: 'test@example.invalid', app_metadata: {}, user_metadata: {}, created_at: new Date().toISOString() }
  const access_token = `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode({ sub: user.id, iat: now, exp: now + 3600 })}.test-signature`
  const client = createBrowserClient('https://test.example.invalid', 'test-public-key', {
    isSingleton: false, cookieOptions: { name: prefix }, cookies: createAuthCookieAdapter(browser.read, browser.write, prefix, true),
    auth: { autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: async url => {
      if (String(url).includes('/logout')) return new Response(null, { status: 204 })
      assert.ok(String(url).includes('/token?grant_type=password'))
      return new Response(JSON.stringify({ access_token, refresh_token: 'test-refresh-token', expires_in: 3600, token_type: 'bearer', user }), { status: 200, headers: { 'content-type': 'application/json' } })
    } }
  })
  const result = await client.auth.signInWithPassword({ email: user.email, password: 'only-used-with-mocked-network' })
  assert.equal(result.error, null)
  const authWrites = browser.writes.filter(header => header.startsWith(prefix))
  assert.ok(authWrites.length > 0)
  for (const header of authWrites) {
    if (remember) assert.match(header, new RegExp(`Max-Age=${REMEMBER_MAX_AGE}`))
    else assert.doesNotMatch(header, /Max-Age|Expires/i)
  }
  assert.equal((await client.auth.getSession()).data.session.user.id, user.id)
  assert.equal((await client.auth.signOut({ scope: 'local' })).error, null)
  assert.ok(![...browser.jar.keys()].some(key => key.startsWith(prefix)))
})
