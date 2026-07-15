// Simple in-memory rate limiter, keyed by IP. Resets on server restart -
// good enough for a single-instance deployment without a database.
const requestLog = new Map<string, number[]>()

const WINDOW_MS = 60_000
const MAX_REQUESTS_PER_WINDOW = 5

export function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (requestLog.get(ip) || []).filter(t => now - t < WINDOW_MS)

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    requestLog.set(ip, timestamps)
    return true
  }

  timestamps.push(now)
  requestLog.set(ip, timestamps)
  return false
}
