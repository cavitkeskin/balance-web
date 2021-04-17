/* eslint-disable react/prop-types */
import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import * as yup from 'yup'

// Application
import { save } from '@/store/users'
import { get } from '@/store/account-users'
import * as snackbar from '@/store/snackbar'

// Material
import { Grid, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
  },
}))

const schema = yup.object({
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
  username: yup
    .string()
    .required('Email address is required')
    .email('Should be a valid email'),
})

const UserProfileForm = ({ setMode, profile }) => {
  const classes = useStyles()  
  const dispatch = useDispatch()
  
  const { errors, values, handleChange, handleBlur, isSubmitting, handleSubmit } = useFormik({
    initialValues: { ...profile },
    validationSchema: schema,
    onSubmit: values => {
      return dispatch(save(values))
        .then(() => dispatch(get('session')))
        .then(() => dispatch(snackbar.success('User profile is upfdated')))
        .catch(err => dispatch(snackbar.error(err.response.data)))
    },
  })  

  const fields = [
    { name: 'firstname', label: 'First Name' },
    { name: 'lastname', label: 'Last Name' },
    { name: 'username', label: 'E-Mail' },
  ].map(field => Object.assign({ 
    type: 'text', 
    fullWidth: true, 
    required: true, 
    margin: 'normal',
    error: !!errors[field.name],
    helperText: errors[field.name],
    value: values[field.name],
    onChange: handleChange,
    onBlur: handleBlur,
  }, field))

  return(
    <form className={classes.root} onSubmit={handleSubmit} noValidate>
      {fields.map(field => <TextField key={field.name} {...field}/>)}
      <Grid container alignItems="flex-start" justify="flex-end" direction="row" spacing={2}>
        <Grid item>
          <Button onClick={() => setMode(false)}>Cancel</Button>
        </Grid>
        <Grid item>
          <Button
            type='submit'
            className={classes.submit}
            variant='contained'
            color='primary'
            disabled={isSubmitting}
          >Submit</Button>
        </Grid>
      </Grid>
      
    </form>
  )
}

UserProfileForm.propTypes={
  setMode: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

export default UserProfileForm