/* eslint-disable react/prop-types */
import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import * as yup from 'yup'

// Application
import { chpass } from '@/store/auth'
import * as snackbar from '@/store/snackbar'

// Material
import { Grid, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
  },
}))

const schema = yup.object({
  current: yup.string().required('please type your current password'),
  password: yup
    .string()
    .required('Please type your new password')
    .matches(/[A-Z!@#$%&?|]/, 'At least one uppercase or symbol')
    .matches(/[0-9]/, 'At least one number')
    .min(8, 'Should be 8 chars min.'),
  confirm: yup
    .string()
    .required('Please re-type your new password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
})

const UserProfileForm = ({ setMode, profile }) => {
  const classes = useStyles()  
  const dispatch = useDispatch()
  
  const { errors, values, handleChange, handleBlur, isSubmitting, handleSubmit } = useFormik({
    initialValues: { current:'', password:'', confirm: '' },
    validationSchema: schema,
    onSubmit: values => {
      return dispatch(chpass(values))
        .then(() => dispatch(snackbar.success('Account profile is upfdated')))
        .catch(error => dispatch(snackbar.error(error)))
    },
  })  

  const fields = [
    { name: 'current', label: 'Current password' },
    { name: 'password', label: 'New password' },
    { name: 'confirm', label: 'Confirm' },
  ].map(field => Object.assign({ 
    type: 'password', 
    fullWidth: true, 
    required: true, 
    margin: 'normal',
    error: !!errors[field.name],
    helperText: errors[field.name],
    value: values[field.name],
    onChange: handleChange,
    onBlur: handleBlur,
    autoComplete: 'new-password',
  }, field))

  return(
    <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
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