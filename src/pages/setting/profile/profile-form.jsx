/* eslint-disable max-len */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as yup from 'yup'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import { pick } from 'lodash'

// Application
import { save } from '@/store/user'

// Metarial
import { Button, TextField, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(1, 0, 1, 1),
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

const MyTextField = ({ fieldname, label, type, values, errors, handleChange, handleBlur }) => {
  return <TextField 
    margin='normal'
    required
    fullWidth
    error={!!errors[fieldname]}
    name={fieldname}
    label={label}
    type={type}
    helperText={errors[fieldname]}
    value={values[fieldname]}
    onChange={handleChange}
    onBlur={handleBlur}/>
}
MyTextField.propTypes={
  fieldname: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired, 
}

const EditForm = ({
  values,
  // touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => {
  const classes = useStyles()
  const makeProps = (fieldname, label, props) => ({ fieldname, label, type: 'text', values, errors, handleChange, handleBlur, ...props })
  return (
    <form onSubmit={handleSubmit} className={classes.form} noValidate>
      <MyTextField {...makeProps('firstname', 'First name')} />
      <MyTextField {...makeProps('lastname', 'Last name')} />
      <MyTextField {...makeProps('username', 'Email Address', { type: 'email' })} />
      <Grid container alignItems="flex-start" justify="flex-end" direction="row">
        <Button
          type='submit'
          className={classes.submit}
          variant='contained'
          color='primary'
          disabled={isSubmitting}>
          Submit
        </Button>
      </Grid>
    </form>
  )
}

EditForm.propTypes = {
  values: PropTypes.object.isRequired,
  // touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
}

const ProfileForm = ({ user }) => {

  const classes = useStyles()
  const dispatch = useDispatch()

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(save(pick(values, ['id', 'firstname', 'lastname'])))
      .then(result => {
        // this.setState({ sent: true, error: null, showError: false })
      })
      .catch(xhr => {
        // this.setState({ sent: false, error: xhr.response, showError: true })
      })
      .then(() => setSubmitting(false))
  }
  
  return (
    <Formik 
      className={classes.form}
      initialValues = {{ ...user }}
      validationSchema={schema}
      onSubmit={handleSubmit}
      validateOnBlur={false}
      validateOnChange={false}
    >{props => <EditForm {...props}/>}</Formik>
  )
}

ProfileForm.propTypes = {
  user: PropTypes.object.isRequired,
}

export default ProfileForm