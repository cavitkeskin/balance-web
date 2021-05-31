import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import callApi from '@/middleware/redux-call-api'
import session from './auth'
import ui from './ui'
import users from './users'
import permissions from './permissions'
import invitations from './invitations'
import accounts from './accounts'
import accountUsers from './account-users'
import contacts from './contacts'
import snackbar from './snackbar'

export const store = createStore(
  combineReducers({ session, ui, users, permissions, invitations, accounts, accountUsers, contacts, snackbar }),
  applyMiddleware(thunk, callApi, logger),
)
