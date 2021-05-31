import { createApiAction } from '../middleware/redux-tools'

export const search = createApiAction('PERMISSIONS', 'get', '/api/permission')
export const get = createApiAction('PERMISSION', 'get', '/api/permission/:id')
export const create = createApiAction('PERMISSION', 'post', '/api/permission')
export const update = createApiAction('PERMISSION', 'patch', '/api/permission/:id')
export const remove = createApiAction('PERMISSION', 'delete', '/api/permission/:id')
export const unsubscribe = createApiAction('UNSUBSCRIBE', 'delete', '/api/permission/unsubscribe')

const defaults = { fetching: false, data: [] }

export default function (state = defaults, action) {
  const { type, data } = action
  switch (type) {
    case search.request:
      return { ...state, data: [], fetching: true }
    case search.success:
      return { ...state, data, fetching: false }
    case search.failure:
      return { ...state, fetching: false }

    case create.success:
      return { ...state, data: [...state.data, data] }
    case update.success: {
      const items = state.data.filter(rec => rec.id !== data.id)
      return { ...state, data: [...items, data] }
    }
    case remove.success:
      return { ...state, data: state.data.filter(rec => rec.id !== data.id) }

    default:
      return state
  }
}
