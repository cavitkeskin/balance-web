import { omit } from 'lodash'
import { createAction, createApiAction } from '../middleware/redux-tools'

const ENTITY = 'CONTACT'
const url = '/api/contacts'

export const create = createAction(`CREATE_${ENTITY}`)
export const search = createApiAction(`${ENTITY}S`, 'get', `${url}`)
export const get = createApiAction(ENTITY, 'get', `${url}/:id`)
export const post = createApiAction(ENTITY, 'post', `${url}`)
export const patch = createApiAction(ENTITY, 'patch', `${url}/:id`)
export const title = createApiAction(`${ENTITY}_TITLE`, 'get', `${url}/employee.title`)
export const profession = createApiAction(`${ENTITY}_PROFESSION`, 'get', `${url}/person.profession`)
export const grade = createApiAction(`${ENTITY}_GRADE`, 'get', `${url}/student.grade`)
export const homeroom = createApiAction(`${ENTITY}_HOMEROOM`, 'get', `${url}/student.homeroom`)

export const save = payload => {
  const { id } = payload
  const data = omit(payload, 'id')
  return id ? patch(id, data): post(data)
}

const defaults = { 
  fetching: false, 
  contacts: [], 
  contact: null, 
  titles: null, 
  professions: null, 
  grades: null, 
  homerooms: null, 
}
export default function(state = defaults, action) {
  const { type, payload, data } = action
  switch (type) {
    case search.request: 
      if(!payload.offset){
        return { ...state, contacts: state.contacts.filter(c => c.type !== payload.type), fetching: true }
      } else {
        return { ...state, fetching: true }
      }
    case search.success: {
      let ids = state.contacts.map(c => c.id)

      return { 
        ...state, 
        contacts: [...state.contacts, ...data.filter(c => !ids.includes(c.id))], 
        fetching: false, 
      }
    }
    // return { ...state, contacts: data, fetching: false }
    case patch.success:
    case get.success:
      return {
        ...state,
        contact: data,
        contacts: state.contacts.map(user => user.id === data.id ? data : user),
        fetching: false,
      }
    case search.failure:
    case get.failure:
      return { ...state, fetching: false }

    case title.success: {
      return { ...state, titles: data }
    }  
    case profession.success: {
      return { ...state, professions: data }
    }  
    case grade.success: {
      return { ...state, grades: data }
    }  
    case homeroom.success: {
      return { ...state, homerooms: data }
    }  
    case create.type:
      return { ...state, contact: {} }  
    default:
      return state
  }
}