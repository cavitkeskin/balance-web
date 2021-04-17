import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Field } from 'formik'

// Application
import { profession } from '../../../store/contacts'

import MyTextField from '../../../components/text-field'
import MyAutocomplete from '../../../components/autocomplete'

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
      <Field name="first_name" label="First name" component={MyTextField}/>
      <Field name="last_name" label="Last name" component={MyTextField}/>
      <Field name="attr.profession" label="Profession" options={professions} component={MyAutocomplete}/>
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