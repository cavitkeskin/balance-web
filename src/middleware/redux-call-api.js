import axios from 'axios'
import cookie from 'js-cookie'
// import { pick } from "lodash";

axios.defaults.baseURL = process.env.API_SERVER

const actionTypes = type => [
  `${type}_REQUEST`,
  `${type}_SUCCESS`,
  `${type}_FAILURE`,
]

const buildOptions = action => {
  const { url, method, payload, headers } = action
  const token = cookie.get('session')
  let options = {
    url,
    method,
    headers: { Authorization: token ? `Bearer ${token}` : '', ...headers },
  }
  if (!payload) return options
  switch (method) {
    case 'post':
    case 'update':
    case 'patch':
      options['data'] = payload
      break
    case 'get':
    case 'delete':
    default:
      options['params'] = payload
  }
  return options
}

// eslint-disable-next-line
export default store => next => action => {
  const { api, payload } = action
  if (!api) return next(action)
  const [requestType, successType, failureType] = Array.isArray(api) ? api : actionTypes(api)
  next({ type: requestType, payload })
  let options = buildOptions(action)
  return axios({ ...options })
    .then(({ data }) => next({ type: successType, data }))
    .catch(error => {
      next({ type: failureType, error })
      return Promise.reject(error)
    })
}
