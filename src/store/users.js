import { omit } from 'lodash'
import { createApiAction } from '../middleware/redux-tools'

const ENTITY = 'USER'
export const search = createApiAction(`${ENTITY}S`, 'get', '/api/user')
export const get = createApiAction(ENTITY, 'get', '/api/user/:id')
export const patch = createApiAction(ENTITY, 'patch', '/api/user/:id')
export const post = createApiAction(ENTITY, 'post', '/api/user')

export const save = payload => {
  const { id } = payload
  const data = omit(payload, 'id')
  return id ? patch(id, data): post(data)
}

export default function(state = { fetching: false, users: [], user: null }, action) {
  const { type, data } = action
  switch (type) {
    case search.request:
      return { ...state, fetching: true }
    case search.success: 
      return { ...state, users: data, fetching: false }
    case get.success:
      return {
        user: data,
        users: state.users.map(user => user.id === data.id ? data : user),
        fetching: false,
      }
    case search.failure:
    case get.failure:
      return { ...state, fetching: false }
    default:
      return state
  }
}
