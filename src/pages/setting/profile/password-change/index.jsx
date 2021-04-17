import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Application
import PasswordChangeForm from './edit'

// Material
import { Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 2),
  },
}))

const UserProfile = () => {
  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <Typography variant="h6">Password Change</Typography>
      <Typography variant="body2">You may need to login again after your password is changed</Typography>
      <PasswordChangeForm/>
    </Paper>
  )
}

UserProfile.protoTypes = {}

export default UserProfile