import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import _ from 'lodash'

// import AvatarEditor from '../../components/avatar-editor'

// Material
import { 
  Typography, 
  Grid, 
  Button, 
  Toolbar, 
  Divider, 
  IconButton, 
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PrevIcon from '@material-ui/icons/ChevronLeft'
import NextIcon from '@material-ui/icons/ChevronRight'
import CloseIcon from '@material-ui/icons/Close'

// Application
import { title } from '../../../store/contacts'

import * as snackbar from '../../../store/snackbar'
import { create, get, save } from '../../../store/contacts'
import Loading from '../../../components/loading'

import Person from './person'
import Employee from './employee'
import Company from './company'
import Student from './student'

const useStyles = makeStyles(theme => ({
  root: {
    width: 480,
    [`${theme.breakpoints.down('xs')} and (orientation: portrait)`]: {
      width: '100vw',
    },
    height: '100vh',
  },
  form: {
    padding: theme.spacing(1, 3),
  },
  caption: {
    marginTop: theme.spacing(2),
  },
  removeItem: {
    padding: 4,
    color: '#ccc',
    '&:hover': {
      color: '#f50057',
    },
  },
}))

const schema = yup.object({
  type: yup.string(),
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().when('type', (type, schema) => {
    return type !== 'company' ? schema.required('Last name is required') : schema
  }),
  email: yup.string().email('Should be a valid email').when('type', (type, schema) => {
    switch (type) {
      case 'employee':
        return schema.required('Email is required')  
      default:
        return schema.nullable()
    }
  }),
  attr: yup.object().when('type', (type, schema) => {
    switch(type){
      case 'student':
        return yup.object({
          id: yup.number().typeError('Type a number').required('Required'),
          grade: yup.string().required('Required'),
        })
      case 'employee':
        return yup.object({
          title: yup.string().required('Title is required'),
        })
      default:
        return schema
    }
  }),
  phones: yup.array().of(yup.object({
    type: yup.string(),
    number: yup.string().required('Phone is a required field'),
  })),
  addresses: yup.array().of(yup.object({
    type: yup.string(),
    line1: yup.string().required('Address line is required'),
    city: yup.string().required('City is a required field'),
    state: yup.string().required('State is a required field'),
  })),
})

const ContactEdit = ({ onPrev, onNext }) => {
  const { id, type:path } = useParams()  
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const profile = useSelector(state => state.contacts.contact)  
  const titles = useSelector(state => state.contacts.titles)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(!titles) dispatch(title())
  }, [])

  useEffect(() => {
    if(!id) return
    setLoading(true)
    if(id === 'new'){
      dispatch(create())
      setLoading(false)
      return
    } else {
      dispatch(get(id)).catch(error => {
        dispatch(snackbar.error(error))
        history.push('/contacts')
      }).then(() => setLoading(false))
    }
  }, [id])

  const { type } = profile||{}
  // if(loading) return <div className={classes.root}><Loading/></div>
  return (
    <div className={classes.root}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>{profile ? 'Edit User' : 'Create User'}</Typography>
        <IconButton onClick={onPrev}><PrevIcon/></IconButton>
        <IconButton onClick={onNext}><NextIcon/></IconButton>
        <IconButton component={Link} to={`/${path}`}><CloseIcon/></IconButton>
      </Toolbar>
      <Divider/>
      { loading
        ? <div className={classes.root}><Loading/></div>
        : <Formik 
          // enableReinitialize
          initialValues={{ 
            id: null, 
            phones: [{ type: 'home', number: '' }], 
            addresses: [], 
            attr: {},
            ..._.omit(profile, ['account', 'created_at', '__v']), 
          }}
          validationSchema={schema}
          onSubmit={values => {
            console.log('Save Contact:', values.attr)
            // return Promise.resolve()
            return dispatch(save(values))
              .then(() => history.push(`/${path}`))
              .then(() => dispatch(snackbar.success('Account profile is updated')))
              .catch(error => dispatch(snackbar.error(error)))
          }}>
          <Form className={classes.form}>
            {type === 'person' && <Person profile={profile} classes={classes}/>}
            {type === 'employee' && <Employee profile={profile} classes={classes}/>}
            {type === 'company' && <Company profile={profile} classes={classes}/>}
            {type === 'student' && <Student profile={profile} classes={classes}/>}
            <Grid container alignItems="flex-start" justify="flex-end" direction="row" spacing={2}>
              <Grid item>
                <Button component={Link} to={`/${path}`} 
                  // disabled={isSubmitting}
                >Cancel</Button>
              </Grid>
              <Grid item>
                <Button
                  type='submit'
                  className={classes.submit}
                  variant='contained'
                  color='primary'
                  //   disabled={isSubmitting}
                >Submit</Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>}
    </div>
  )
}

ContactEdit.propTypes = {
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
}

export default ContactEdit