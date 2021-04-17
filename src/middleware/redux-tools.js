var actions = []

export const createAction = type => {
  if(actions.includes(type)) throw new Error(`action (${type}) already exists`)
  actions.push(type)
  const action = payload => {
    return { type, payload }
  }
  action.type = type
  return action
}

export const createApiAction = (type, method, url) => {
  const types = ['REQUEST', 'SUCCESS', 'FAILURE'].map(act => ([method, type, act].join('_').toUpperCase()))
  for (let type of types)  {
    if(actions.includes(type)) throw new Error(`action (${type}) already exists`)
    actions.push(type)
  }

  const action = (...args) => {
    const useId = /:id/.test(url)
    return {
      api: types,
      method, 
      url: useId ? url.replace(/:id/, args.shift()) : url,
      payload: args.shift(),
    }
  }
  action.request = types[0]
  action.success = types[1]
  action.failure = types[2]
  return action
}

