import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Application
import UserProfileInfo from './info'
import UserProfileEdit from './edit'

// Material
import { Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 2),
  },
}))

const UserProfile = ({ profile }) => {
  const classes = useStyles()
  const [mode, setMode] = useState(false)
  return (
    <Paper className={classes.root}>
      <Typography variant="h6">Work Profile</Typography>
      <Typography variant="body2">Specify your profile for this account</Typography>
      {mode 
        ? <UserProfileEdit setMode={setMode} profile={profile}/> 
        : <UserProfileInfo setMode={setMode} profile={profile}/>}
    </Paper>
  )
}

UserProfile.propTypes = {
  profile: PropTypes.object.isRequired,
}
export default UserProfile