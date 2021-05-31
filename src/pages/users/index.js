import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

// Material
import { Grid, Drawer, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

// Application
import * as action from '@/store/account-users'
import * as permissionActions from '@/store/permissions'
import * as invitationActions from '@/store/invitations'

import Loading from '@/components/loading'
import Page from '@/components/page'
import Content from '@/components/content'
import PageHeader from '../../components/page-header'
import UserCard from './card'
import UserEdit from './edit'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { book } = useSelector(state => state.session)
  const users = useSelector(state => state.accountUsers)
  const permissions = useSelector(state => state.permissions)
  const invitations = useSelector(state => state.invitations.data)
  const { id } = useParams()

  useEffect(() => {
    dispatch(action.search())
    dispatch(permissionActions.search({ book: book.id }))
    dispatch(invitationActions.search({ book: book.id }))
  }, [])
  
  if(users.fetching) return <Loading/>
  return (
    <Page>
      <PageHeader title="Users">
        <Button 
          variant="contained"
          color="primary"
          size="small"
          component={Link} to="/users/new" 
          startIcon={<AddIcon/>}>New</Button>
      </PageHeader>
      <Content>
        <Grid container spacing={2}>
          {users.users.map(user => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
              <UserCard profile={user}/>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2}>
          {invitations.map(invitation => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={invitation.id}>
              {invitation.status}{': '}
              <a href={`exp://0.0.0.0:19000/--/confirm/invitation/${invitation.id}`} 
                target="_blank" 
                rel="noreferrer">{invitation.id}</a>
              {/* <pre>{JSON.stringify(invitation, null, 2)}</pre> */}
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4} lg={3} key="not-found">
            {'Not Found: '}
            <a href={`exp://0.0.0.0:19000/--/confirm/invitation/${book.id}`} 
              target="_blank" 
              rel="noreferrer">{book.id}</a>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} key="no-token">
            {'No Token: '}
            <a href={'exp://0.0.0.0:19000/--/confirm/invitation'} 
              target="_blank" 
              rel="noreferrer">[empty]</a>
          </Grid>
        </Grid>
      </Content>
      <Drawer anchor="right" open={!!id}>
        <UserEdit/>
      </Drawer>
    </Page>
  )
}

export default Dashboard
