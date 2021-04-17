import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Field } from 'formik'

// Material
import { 
  Typography, 
} from '@material-ui/core'

// Application
import { title } from '../../../store/contacts'

import MyTextField from '../../../components/text-field'
import MyAutocomplete from '../../../components/autocomplete'

import Phones from './phones'
import Addresses from './addresses'

const Person = ({ classes }) => {
  const dispatch = useDispatch()

  const titles = useSelector(state => state.contacts.titles)
  
  useEffect(() => {
    if(!titles) dispatch(title())
  }, [])

  return (
    <>
      <Field name="first_name" label="First name" component={MyTextField}/>
      <Field name="last_name" label="Last name" component={MyTextField}/>
      <Field name="attr.title" label="Title" options={titles} component={MyAutocomplete}/>
      <Field name="email" label="E-Mail" component={MyTextField}/>
      <Typography variant="h6" className={classes.caption}>Employee</Typography>
      <Field name="attr.id" label="Employee #" component={MyTextField}/>
      <Field name="attr.dob" label="Date of Bird" component={MyTextField}/>
      <Field name="attr.ssn" label="SSN" component={MyTextField}/>
      <Phones classes={classes}/>  
      <Addresses classes={classes}/>
    </>
  )
}

Person.propTypes={
  profile: PropTypes.object.isRequired,  
  classes: PropTypes.object.isRequired,  
}

export default Person