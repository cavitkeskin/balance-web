import cookie from 'js-cookie'
import { createApiAction } from '../middleware/redux-tools'

export const login = createApiAction('LOGIN', 'post', '/api/auth/login')
export const logout = createApiAction('LOGOUT', 'get', '/api/auth/logout')
export const forgot = createApiAction('FORGOT', 'post', '/api/auth/forgot')
export const reset = createApiAction('RESET', 'post', '/api/auth/reset')
export const chpass = createApiAction('CHPASS', 'post', '/api/auth/chpass')
export const session = createApiAction('SESSION', 'get', '/api/auth/session')
export const register = createApiAction('REGISTER', 'post', '/api/register')

export default function(
  state = { 
    loading: true, // yes, it should be true, for refrefhing page corectly
    token: null, 
    user: null, 
    account: null, 
    modules:[], 
  },
  action,
) {
  const { type, data } = action
  switch (type) {
    case session.request:
    case login.request:
    case register.request:
    case reset.request:
      return { ...state, loading: true }
    case session.success:
    case login.success:
    case register.success:
    case reset.success:
      data && data.token && cookie.set('session', data.token, { path: '/' })
      return { ...state, ...data, loading: false }
    case session.failure:
    case login.failure:
    case register.failure:
    case reset.failure:
      cookie.remove('session')
      return { ...state, loading: false }
    case logout.success:
      cookie.remove('session', { path: '/' })
      return { ...state, token: null, user: null, account: null }
    default:
      return state
  }
}
