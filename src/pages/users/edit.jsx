import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory, Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as yup from 'yup'

// Material
import { 
  Paper, 
  Typography, 
  Grid, 
  Button, 
  TextField, 
  Toolbar, 
  Divider, 
  IconButton, 
  FormControlLabel, 
  Switch, 
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'

// Application
import * as snackbar from '../../store/snackbar'
import { create, get, save } from '../../store/account-users'
import Loading from '../../components/loading'

const useStyles = makeStyles(theme => ({
  root: {
    width: 380,
    [`${theme.breakpoints.down('xs')} and (orientation: portrait)`]: {
      width: '100vw',
    },
    height: '100vh',

  },
  form: {
    padding: theme.spacing(1, 3),
  },
}))

const schema = yup.object({
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
  title: yup.string().required('Title is required'),
  email: yup
    .string()
    .required('Email address is required')
    .email('Should be a valid email'),
})

const UserEdit = () => {
  const { id } = useParams()  
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const profile = useSelector(state => state.accountUsers.user)  
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(id === 'new'){
      dispatch(create())
      setLoading(false)
      return
    }
    dispatch(get(id)).catch(error => {
      dispatch(snackbar.error(error))
      history.push('/users')
    }).then(() => setLoading(false))
  }, [])

  const fields = [
    { name: 'firstname', label: 'First Name' },
    { name: 'lastname', label: 'Last Name' },
    { name: 'title', label: 'Title' },
    { name: 'email', label: 'E-Mail' },
  ].map(field => Object.assign({ 
    type: 'text', 
    fullWidth: true, 
    required: true, 
    margin: 'normal',
  }, field))
  
  if(loading) return <div className={classes.root}><Loading/></div>
  return (
    <Paper className={classes.root}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>{profile.id ? 'Edit User' : 'Create User'}</Typography>
        <IconButton component={Link} to="/users"><CloseIcon/></IconButton>
      </Toolbar>
      <Divider/>

      <Formik 
        initialValues={profile}
        validationSchema={schema}
        onSubmit={values => {
          return dispatch(save(values))
            .then(() => history.push('/users'))
            .then(() => dispatch(snackbar.success('Account profile is updated')))
            .catch(error => dispatch(snackbar.error(error)))
        }}>
        {({ values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            {fields.map(field => <TextField key={field.name} {...field} 
              value={values[field.name]}
              error={touched[field.name] && !!errors[field.name]}
              helperText={touched[field.name] && errors[field.name]}
              onChange={handleChange}
              onBlur={handleBlur}
            />)}
            <FormControlLabel 
              control={<Switch checked={values['enable']} onChange={handleChange} name="enable" color="primary"/>} 
              label="Enable" />
            <Grid container alignItems="flex-start" justify="flex-end" direction="row" spacing={2}>
              <Grid item>
                <Button component={Link} to="/users" disabled={isSubmitting}>Cancel</Button>
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
        )}
      </Formik>
    </Paper>
  )
}

export default UserEdit