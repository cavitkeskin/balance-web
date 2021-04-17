import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Field } from 'formik'

// Material
import { 
  // Typography, 
  Grid,
  MenuItem,
} from '@material-ui/core'

// Application
import { grade, homeroom } from '../../../store/contacts'

import MyTextField from '../../../components/text-field'
import MyAutocomplete from '../../../components/autocomplete'

import Phones from './phones'
import Addresses from './addresses'

const Person = ({ classes }) => {
  const dispatch = useDispatch()
  const grades = useSelector(state => state.contacts.grades)
  const homerooms = useSelector(state => state.contacts.homerooms)

  useEffect(() => {
    if(!grades) dispatch(grade())
    if(!homerooms) dispatch(homeroom())
  }, [])

  return (
    <>
      <Field name="first_name" label="First name" component={MyTextField}/>
      <Field name="last_name" label="Last name" component={MyTextField}/>
      {/* <Typography variant="h6" className={classes.caption}>Student</Typography> */}
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Field name="attr.id" label="Student #" component={MyTextField}/>
        </Grid>
        <Grid item xs={3}>
          <Field name="attr.grade" label="Grade" options={grades} component={MyAutocomplete}/>
        </Grid>
        <Grid item xs={6}>
          <Field name="attr.homeroom" label="Homeroom" options={homerooms} component={MyAutocomplete}/>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Field name="attr.gender" label="Gender" select component={MyTextField}>
            {['Male', 'Female', 'Other'].map(key => (
              <MenuItem key={key} value={key.toLowerCase()}>{key}</MenuItem>
            ))}
          </Field>
        </Grid>
        <Grid item xs={9}>
          <Field name="attr.dob" label="Date of Birth" component={MyTextField}/>
        </Grid>
      </Grid>
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