import { pick } from 'lodash'
import { createAction, createApiAction } from '../middleware/redux-tools'

const ENTITY = 'ACCOUNT_USER'
export const create = createAction('CREATE_ACCOUNT_USER')
export const search = createApiAction(`${ENTITY}S`, 'get', '/api/account-user')
export const get = createApiAction(ENTITY, 'get', '/api/account-user/:id')
export const post = createApiAction(ENTITY, 'post', '/api/account-user')
export const patch = createApiAction(ENTITY, 'patch', '/api/account-user/:id')

export const save = payload => {
  const { id } = payload
  const data = pick(payload, ['firstname', 'lastname', 'title', 'email', 'enable'])
  return id ? patch(id, data) : post(data)
}

export default function(
  state = { fetching: false, users: [], user: null },
  action,
) {
  const { type, data } = action
  switch (type) {
    case search.request:
      return { ...state, fetching: true }
    case search.success:
      return { ...state, users: data, fetching: false }
    case search.failure:
      return { ...state, fetching: false }
  
    case create.type:
      return { ...state, user: { firstname: '', lastname:'', title:'', email:'' } }  
      
    case get.request:
      return { ...state, user: null }
    case get.success:
    case post.success:
    case patch.success: {
      const found = state.users.find(u => u.id === data.id)
      return {
        user: data,
        users: found ? state.users.map(user => {
          return user.id === data.id ? data : user
        }) : [...state.users, data],
        fetching: false,
      }
    }
    default:
      return state
  }
}
