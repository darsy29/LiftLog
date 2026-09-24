export function basicAuth(request, response, next) {
  const header = request.headers.authorization

  if (header && header.startsWith('Basic ')) {
    const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8')
    const separator = decoded.indexOf(':')
    const user = decoded.slice(0, separator)
    const pass = decoded.slice(separator + 1)

    if (user === process.env.BASIC_AUTH_USER && pass === process.env.BASIC_AUTH_PASS) {
      return next()
    }
  }

  response.set('WWW-Authenticate', 'Basic realm="LiftLog"')
  response.status(401).json({ error: 'Authentication required' })
}
