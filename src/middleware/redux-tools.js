import { compile } from 'path-to-regexp'

var actions = []

export const createAction = (type, func) => {
  if (actions.includes(type)) throw new Error(`action (${type}) already exists`)
  actions.push(type)

  const action = data => {
    return func || { type, data }
  }
  action.type = type
  return action
}

export const createApiAction = (type, method, url) => {
  const types = ['REQUEST', 'SUCCESS', 'FAILURE']
    .map(act => ([method, type, act].join('_').toUpperCase()))

  for (const type of types) {
    if (actions.includes(type)) throw new Error(`action (${type}) already exists`)
    actions.push(type)
  }

  const toPath = compile(url, { encode: encodeURIComponent })

  const action = (...args) => {
    const params = url.includes('/:') ? args.shift() : {}
    const payload = args.shift()
    const options = args.shift()

    return {
      api: types,
      method,
      url: toPath(typeof params === 'string' ? { id: params } : params),
      payload,
      options,
    }
  }
  action.request = types[0]
  action.success = types[1]
  action.failure = types[2]
  return action
}
