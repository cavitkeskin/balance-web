import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardActions, IconButton, Avatar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BlockIcon from '@material-ui/icons/Block'
import EnableIcon from '@material-ui/icons/CheckCircleOutline'
import EditIcon from '@material-ui/icons/Edit'
import PropTypes from 'prop-types'

import MyAvatar from '../../components/avatar'

const useStyles = makeStyles(theme => ({
  card: {
  },
  content: {
    minHeight: 210,
    textAlign:'center',
    padding: theme.spacing(1),
    position: 'relative',
  },
  avatar: {
    margin: `${theme.spacing(2)}px auto`,
    width: 80,
    height: 80,
    color: '#fff',
    backgroundColor: '#f00',
    fontSize: 36,
  },
  enable: {
    color: 'green',
  },
  disable: {
    color: '#f00',
  },
}))

const colors = ['#f00', '#0b0', '#00f', '#0c8', '#90f', '#f90']

const UserCard = ({ profile }) => {
  const classes = useStyles()
  const useAvatar = true
  const { id, firstname, lastname, title, email, username, enable } = profile
  const initials = [firstname, lastname].filter(s => s && s.length).map(s => s[0]).join('').toUpperCase()

  const n = id.replace(/[a-z]/g, '') % colors.length
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        {useAvatar ? <MyAvatar id={id}/> : <Avatar 
          className={classes.avatar} 
          style={{ backgroundColor: enable?colors[n]:'#ddd' }}
        >{initials}</Avatar>}
        <Typography variant="h5">{firstname} {lastname}</Typography>
        <Typography variant="body1">{title||''}</Typography>
        <Typography variant="body2">{email||username}</Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
        {profile.enable ? <EnableIcon className={classes.enable}/> : <BlockIcon className={classes.disable}/>}
        <IconButton component={Link} to={`/users/${id}`}>
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}
UserCard.propTypes={
  profile: PropTypes.object.isRequired,  
}
export default UserCard