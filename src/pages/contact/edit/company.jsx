import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Field } from 'formik'

// Application
import { profession } from '../../../store/contacts'

import MyTextField from '../../../components/text-field'

import Phones from './phones'
import Addresses from './addresses'

const Person = ({ classes }) => {
  const dispatch = useDispatch()

  const professions = useSelector(state => state.contacts.professions)
  
  useEffect(() => {
    if(!professions) dispatch(profession())
  }, [])

  return (
    <>
      <Field name="first_name" label="Company Name" component={MyTextField}/>
      <Field name="attr.web" label="Web" component={MyTextField}/>
      <Field name="email" label="E-Mail" component={MyTextField}/>
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