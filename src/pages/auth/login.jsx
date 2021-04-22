import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Link as RouterLink } from 'react-router-dom'
import { login } from '@/store/auth'
import XHRErrorDialog from '@/components/error/XHRErrorDialog'
import XHRErrorPanel from '@/components/error/XHRErrorPanel'

// Metarial
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Copyright from '@/components/copyright'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => {
  return {
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(3),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      padding: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }
}

const schema = yup.object({
  username: yup
    .string()
    .required('Email address is required')
    .email('Should be a valid email'),
  password: yup.string().required('Password is required'),
  // .min(8, 'Password has to be longer than 8 characters!')
  // .max(16, 'Password has to be shorter than 16 characters!')
  // .matches(/[a-z]/, 'Password should have one lowercase')
  // .matches(/[A-Z]/, 'Password should have one uppercasecase')
  // .matches(
  //   /[\d@$!%*#?&]/,
  //   'Password should have one number or special character'
  // )
})

class LoginDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'admin-bogus.com',
      password: 'admin',
      times: 0,
      error: null,
      expanded: false,
      showError: false,
    }
  }

  handleChange = field => event => {
    this.setState({ [field]: event.target.value, error: {} })
  }

  render() {
    const { classes } = this.props
    const { error, showError } = this.state
    return (
      <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <XHRErrorDialog
            open={false}
            onClose={() => this.setState({ showError: false })}
            error={error}
          />
          <XHRErrorPanel
            open={showError}
            onClose={() => this.setState({ showError: false })}
            error={error}
          />
          <Formik
            className={classes.form}
            initialValues={{ username: '', password: '' }}
            validationSchema={schema}
            onSubmit={this.handleSubmit}
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
              // this.setState({ expand: Object.keys(errors) > 0 })
              return (
                <form
                  onSubmit={handleSubmit}
                  className={classes.form}
                  noValidate>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    error={!!errors.username}
                    name='username'
                    label='Email Address'
                    autoComplete='email'
                    autoFocus
                    type='email'
                    helperText={errors.username}
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    error={touched.password && !!errors.password}
                    name='password'
                    label='Password'
                    type='password'
                    autoComplete='current-password'
                    helperText={errors.password}
                    value={values.password}
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
                    Login
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link
                        component={RouterLink}
                        to='/auth/forgot'
                        variant='body2'>
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link
                        component={RouterLink}
                        to='/auth/register'
                        variant='body2'>
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              )
            }}
          />
        </Paper>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    )
  }
  handleSubmit = (values, { setSubmitting }) => {
    const { login } = this.props
    login({ ...values })
      .catch(xhr => this.setState({ error: xhr.response, showError: true }))
      .then(() => setSubmitting(false))
  }
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  login: PropTypes.func,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  login,
}

const styler = withStyles(styles)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(styler(LoginDialog))
