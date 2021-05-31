import axios from 'axios'
import { get } from 'lodash'
import cookie from 'js-cookie'

axios.defaults.baseURL = process.env.API_SERVER

const actionTypes = type => [
  `${type}_REQUEST`,
  `${type}_SUCCESS`,
  `${type}_FAILURE`,
]

const buildOptions = (action, token) => {
  const { url, method, payload, headers, options } = action
  const config = {
    url,
    method,
    headers: { Authorization: token ? `Bearer ${token}` : '', ...headers },
  }
  switch (method) {
    case 'post':
    case 'put':
    case 'patch':
      config.data = payload
      if (options?.params) config.params = options.params
      break
    case 'get':
    case 'delete':
    default:
      config.params = payload
  }
  return config
}

// eslint-disable-next-line
export default store => next => action => {
  const { api, payload, options } = action
  if (!api) return next(action)
  const [requestType, successType, failureType] = Array.isArray(api) ? api : actionTypes(api)
  next({ type: requestType, payload, options })
  // const token = get(store.getState(), 'session.token', null)
  const token = cookie.get('session')
  const config = buildOptions(action, token)
  return axios(config)
    .then(({ data }) => next({ type: successType, data, options }))
    .catch(error => {
      next({ type: failureType, error, payload, options })
      return Promise.reject(error)
    })
}

