import { createApiAction } from '../middleware/redux-tools'

export const search = createApiAction('ACCOUNTS', 'get', '/api/account')
export const get = createApiAction('ACCOUNT', 'get', '/api/account/:id') 

export default function(state = { fetching: false, data: [] }, action) {
  const { type, data } = action
  switch (type) {
    case search.request:
      return { ...state, fetching: true }
    case search.success:
      return { ...state, data, fetching: false }
    case search.failure:
      return { ...state, fetching: false }
    default:
      return state
  }
}
