import { createApiAction } from '../middleware/redux-tools'

export const search = createApiAction('INVITATIONS', 'get', '/api/invitation')
export const get = createApiAction('INVITATION', 'get', '/api/invitation/:id')
export const create = createApiAction('INVITATION', 'post', '/api/invitation')
export const update = createApiAction('INVITATION', 'patch', '/api/invitation/:id')
export const remove = createApiAction('INVITATION', 'delete', '/api/invitation/:id')

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
