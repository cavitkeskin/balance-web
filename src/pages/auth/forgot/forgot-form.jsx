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
  email: yup
    .string()
    .required('Email address is required')
    .email('Should be a valid email'),
})

const ForgotForm = props => {
  const classes = useStyles()
  const { onSubmit } = props
  return (
    <Formik
      className={classes.form}
      initialValues={{ email: '' }}
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
              error={!!errors.email}
              name='email'
              label='Email Address'
              autoComplete='email'
              autoFocus
              type='email'
              helperText={errors.email}
              value={values.email}
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
              Submit
            </Button>
          </form>
        )
      }}
    />
  )
}

export default ForgotForm
