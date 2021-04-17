import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

// Material
import { Grid, Drawer, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

// Application
import * as action from '@/store/account-users'
import Loading from '@/components/loading'
import Page from '@/components/page'
import Content from '@/components/content'
import PageHeader from '../../components/page-header'
import UserCard from './card'
import UserEdit from './edit'

const Dashboard = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.accountUsers)
  const { id } = useParams()

  useEffect(() => {
    dispatch(action.search())
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
      </Content>
      <Drawer anchor="right" open={!!id}>
        <UserEdit/>
      </Drawer>
    </Page>
  )
}

export default Dashboard
