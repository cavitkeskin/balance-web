import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/styles'

import Person from './person'
import Student from './student'
import Employee from './employee'
import Company from './company'

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 0,
    marginBottom: 0,
    borderBottom: '1px solid #eee',
    transition: 'background-color .2s',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.03)',
    },
  },
  detail: {
    flexGrow: 1,
  },
  infoIcon: {
    color: '#ccc',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  avatar: {
    margin: 0,
  },
}))

const Contact = ({ type, contacts }) => {
  const classes = useStyles()
  switch (type){
    case 'person':
      return <Person contacts={contacts} classes={classes}/>
    case 'student':
      return <Student contacts={contacts} classes={classes}/>
    case 'employee':
      return <Employee contacts={contacts} classes={classes}/>
    case 'company':
      return <Company contacts={contacts} classes={classes}/>
    default:
      return <div>Not Found</div>
  }
}

Contact.propTypes={
  type: PropTypes.string.isRequired,  
  contacts: PropTypes.array.isRequired,  
}

export default Contact