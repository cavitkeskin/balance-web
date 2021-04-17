import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Application
import * as actions from '@/store/account-users'
import Loading from '@/components/loading'

// import ProfileForm from './profile-form'
import UserProfile from './user-profile'
import AccountProfile from './account-profile'
import PasswordChange from './password-change'

// Metarial
import { Grid } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles'

// const useStyles = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(1, 2),
//   },
// }))

function Profile() {
  const dispatch = useDispatch()
  // const classes = useStyles()
  const session = useSelector(state => state.session)
  const profile = useSelector(state => state.accountUsers.user)
  useEffect(() => {
    if(!profile || profile.user.id !== session.user.id) {
      dispatch(actions.get('session'))
    }
  })
  if(!profile) return <Loading/>
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <UserProfile profile={profile.user}/>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <AccountProfile profile={profile}/>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <PasswordChange/>
      </Grid>
    </Grid>
  )
}

export default Profile
