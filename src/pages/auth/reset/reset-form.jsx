import React from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
// Metarial
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(2, 0),
  },
}))

const schema = yup.object({
  password: yup
    .string()
    .required('Please type your password')
    .matches(/[A-Z!@#$%&?|]/, 'At least one uppercase or symbol')
    .matches(/[0-9]/, 'At least one number')
    .min(8, 'Should be 8 letters min.'),
  confirm: yup
    .string()
    .required('Please re-type your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
})

const ResetForm = props => {
  const classes = useStyles()
  const { onSubmit } = props
  return (
    <Formik
      className={classes.form}
      initialValues={{ password: '', confirm: '' }}
      validationSchema={schema}
      onSubmit={onSubmit}
      validateOnBlur={false}
      validateOnChange={false}
      render={props => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        } = props
        return (
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              error={touched.password && !!errors.password}
              name='password'
              label='Password'
              type='password'
              helperText={errors.password}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              error={touched.confirm && !!errors.confirm}
              name='confirm'
              label='Confirm Password'
              type='password'
              helperText={errors.confirm}
              value={values.confirm}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Button
              type='submit'
              fullWidth
              className={classes.submit}
              variant='contained'
              color='primary'
              disabled={isSubmitting}>
              Reset Password
            </Button>
          </form>
        )
      }}
    />
  )
}

export default ResetForm
