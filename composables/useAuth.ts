export const useAuth = () => {
  const token = useCookie('auth_token', {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax'
  })

  const user = useState('user', () => null as { username: string } | null)

  // Mock credentials
  const MOCK_USER = {
    username: 'ha',
    password: '1'
  }

  const login = (username: string, password: string): boolean => {
    if (username === MOCK_USER.username && password === MOCK_USER.password) {
      // Generate mock JWT token
      const mockToken = generateMockToken(username)
      token.value = mockToken
      user.value = { username }
      return true
    }
    return false
  }

  const logout = () => {
    token.value = null
    user.value = null
    navigateTo('/login')
  }

  const isAuthenticated = computed(() => {
    return !!token.value
  })

  const checkAuth = () => {
    if (token.value) {
      try {
        const payload = parseToken(token.value)
        user.value = { username: payload.username }
        return true
      } catch {
        token.value = null
        user.value = null
        return false
      }
    }
    return false
  }

  return {
    token,
    user,
    login,
    logout,
    isAuthenticated,
    checkAuth
  }
}

// Generate mock JWT-like token
function generateMockToken(username: string): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(JSON.stringify({
    username,
    iat: Date.now(),
    exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
  }))
  const signature = btoa(`mock-signature-${username}-${Date.now()}`)
  return `${header}.${payload}.${signature}`
}

// Parse mock token
function parseToken(token: string): { username: string; iat: number; exp: number } {
  const parts = token.split('.')
  if (parts.length !== 3) throw new Error('Invalid token')
  
  const payloadPart = parts[1]
  if (!payloadPart) throw new Error('Invalid token payload')
  
  const payload = JSON.parse(atob(payloadPart))
  
  if (payload.exp < Date.now()) {
    throw new Error('Token expired')
  }
  
  return payload
}
