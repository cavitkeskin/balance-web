import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory, useLocation } from 'react-router-dom'
// Material
import { Grid, Paper, Drawer } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// Application
import * as action from '../../store/contacts'
import Loading from '../../components/loading'
import Page from '../../components/page'
import Content from '../../components/content'
import { info } from '../../store/snackbar'

import Header from './header'
import ContactItem from './line'
import ContactView from './view'
import ContactEdit from './edit'
import ContactCard from './card'
import StatusBar from './status-bar'

import scopes from './scopes'

const VIEW_MODE_KEY = 'clvm'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
  },
}))

function getQuery(){
  const q = new URLSearchParams(useLocation().search)
  const query = {}
  for (let [key, val] of q.entries()){
    query[key] = val
  }
  return query
}

var queries = {}
function useQuery(type, q){
  if(!queries[type]) queries[type] = {}
  const setQuery = q => {
    if(Object.keys(q).length)
      queries[type] = q
  }
  setQuery(q)
  return [queries[type], setQuery]
}

const ContactPage = () => {
  const { type, id, mode } = useParams()
  const history = useHistory()
  const scope = scopes(type)
  const dispatch = useDispatch()
  const [view, setView] = useState(localStorage.getItem(VIEW_MODE_KEY)||'list')
  const [query] = useQuery(type, getQuery())
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const contacts = useSelector(state => state.contacts.contacts.filter(c => c.type === scope.type))

  useEffect(() => {
    if(loading) return
    setLoadingMore(true)
    if(!query.offset) setLoading(true)
    dispatch(action.search({ ...query, type: scope.type }))
      .then(() => setLoading(false))
      .then(() => setLoadingMore(false))
  }, [type, JSON.stringify(query)])

  const search = payload => {
    console.log('Search', { ...payload, type: scope.type })
    let q = new URLSearchParams(payload).toString()
    history.push(`/${type}?${q}`)
    // setLoading(true)
    // dispatch(action.search({ ...payload, type: scope.type }))
    //   .then(() => setLoading(false))
  }

  const goPrev = () => {
    const ids = contacts.map(c => c.id)
    const n = ids.indexOf(id)-1
    if(n < 0) return dispatch(info('You hit begin of the list'))
    const url = [type, ids[n], mode].filter(Boolean).join('/')
    history.push(`/${url}`)
  }
  const goNext = () => {
    const ids = contacts.map(c => c.id)
    const n = ids.indexOf(id)+1
    if(n >= ids.length) return dispatch(info('You hit end of the list'))
    const url = [type, ids[n], mode].filter(Boolean).join('/')
    history.push(`/${url}`)
  }

  const loadMore = limit => {
    const payload = { ...query, offset: contacts.length }
    if(limit) payload.limit = limit
    let qStr = new URLSearchParams(payload).toString()
    history.push(`/${type}?${qStr}`)
  }

  if(view !== localStorage.getItem(VIEW_MODE_KEY)) localStorage.setItem(VIEW_MODE_KEY, view)
  const classes = useStyles()

  return (
    <Page>
      <Header view={view} setView={setView} onQuickSearch={search}/>
      {loading ? <Loading/> : <Content>
        {view === 'list' ? (
          <Paper className={classes.paper}>
            <ContactItem type={scope.type} contacts={contacts}/>
          </Paper>
        ) : (
          <Grid container spacing={2}>
            {contacts.map(contact => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={contact.id}>
                <ContactCard profile={contact} />
              </Grid>
            ))}
          </Grid>
        )}
        <StatusBar records={contacts} onLoadMore={loadMore} loading={loadingMore}/>
      </Content>
      }
      <Drawer anchor="right" open={!!id} onClose={() => history.push(`/${type}`)} >
        {mode === 'view' 
          ? <ContactView onPrev={goPrev} onNext={goNext}/> 
          : <ContactEdit onPrev={goPrev} onNext={goNext}/>}
      </Drawer>
    </Page>
  )
}

export default ContactPage