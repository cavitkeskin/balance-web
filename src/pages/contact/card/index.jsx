import React from 'react'
import { Link, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Card, CardContent, CardActions, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BlockIcon from '@material-ui/icons/Block'
import EnableIcon from '@material-ui/icons/CheckCircleOutline'
import EditIcon from '@material-ui/icons/Edit'

import Avatar from '@/components/avatar'

import Person from './person'
import Employee from './employee'
import Company from './company'
import Student from './student'

const useStyles = makeStyles(theme => ({
  card: {
  },
  content: {
    // minHeight: 210,
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
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
}))

const Contact = ({ profile }) => {
  const { type:path } = useParams()
  const { id, type, enable } = profile
  const classes = useStyles()
    
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Link to={`/${path}/${id}/view`} className={classes.link}>
          <Avatar size={100} profile={profile}/>
        </Link>
        {type === 'person' && <Person classes={classes} profile={profile}/>}
        {type === 'employee' && <Employee classes={classes} profile={profile}/>}
        {type === 'company' && <Company classes={classes} profile={profile}/>}
        {type === 'student' && <Student classes={classes} profile={profile}/>}
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
        {enable ? <EnableIcon className={classes.enable}/> : <BlockIcon className={classes.disable}/>}
        <IconButton component={Link} to={`/${path}/${id}`}>
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

Contact.propTypes={
  profile: PropTypes.object.isRequired,  
}

export default Contact
