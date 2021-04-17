import React from 'react'
import PropTypes from 'prop-types'

// Material
import { Avatar, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2, 0), 
    textAlign: 'center',
  },
  avatar: {
    margin: `${theme.spacing(2)}px auto`,
    width: 120,
    height: 120,
    color: '#fff',
    backgroundColor: '#f00',
    fontSize: 60,
  },
}))

const UserProfileInfo = ({ setMode, profile }) => {
  const classes = useStyles()  
 

  const { firstname, lastname, username, title, email } = Object.assign({}, profile.user, profile)
  const initials = [firstname, lastname].filter(s => s && s.length).map(s => s[0]).join('').toUpperCase()
  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>{initials}</Avatar>
      <Typography variant="body1">{firstname} {lastname}</Typography>
      <Typography variant="body1">{title||''}</Typography>
      <Typography variant="body1">{email||username}</Typography>
      <Button onClick={() => setMode(true)}>Edit</Button>
    </div>
  )
}
UserProfileInfo.propTypes={
  setMode: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,  
}

export default UserProfileInfo