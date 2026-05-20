const WINDOW_MS = 15 * 60 * 1000
const MAX_REQUESTS = 5
const buckets = new Map()

const cleanupBuckets = (now) => {
  if (buckets.size < 500) return

  for (const [key, bucket] of buckets.entries()) {
    if (now - bucket.start > WINDOW_MS) {
      buckets.delete(key)
    }
  }
}

/**
 * @param {string | undefined | null} clientIp
 * @returns {boolean} true якщо запит дозволено
 */
function checkRateLimit(clientIp) {
  const ip = (clientIp || 'unknown').trim() || 'unknown'
  const now = Date.now()

  let bucket = buckets.get(ip)
  if (!bucket || now - bucket.start > WINDOW_MS) {
    bucket = { start: now, count: 0 }
  }

  bucket.count += 1
  buckets.set(ip, bucket)

  cleanupBuckets(now)

  return bucket.count <= MAX_REQUESTS
}

/**
 * @param {{ headers?: Record<string, string | undefined> }} event
 */
function getClientIpFromNetlifyEvent(event) {
  const headers = event?.headers || {}

  return (
    headers['x-nf-client-connection-ip'] ||
    headers['client-ip'] ||
    headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    'unknown'
  )
}

/**
 * @param {import('http').IncomingMessage} req
 */
function getClientIpFromRequest(req) {
  const forwarded = req.headers['x-forwarded-for']
  const forwardedIp = Array.isArray(forwarded)
    ? forwarded[0]
    : forwarded?.split(',')[0]?.trim()

  return forwardedIp || req.socket?.remoteAddress || 'dev'
}

module.exports = {
  checkRateLimit,
  getClientIpFromNetlifyEvent,
  getClientIpFromRequest,
  WINDOW_MS,
  MAX_REQUESTS,
}
