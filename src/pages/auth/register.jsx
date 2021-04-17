import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import * as yup from 'yup'
import { register } from '@/store/auth'

// Metarial
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

import Copyright from '@/components/copyright'

// import Dialog from '@material-ui/core/Dialog'
// import DialogActions from '@material-ui/core/DialogActions'
// import DialogContent from '@material-ui/core/DialogContent'
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle'
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
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }
}

const schema = yup.object({
  username: yup
    .string()
    .required('Please type your email')
    .email('Should be a valid email'),
  password: yup
    .string()
    .required('Please type your password')
    .min(8, 'Should be 8 chars min.')
    .matches(/[A-Z]/, 'At least an uppercase')
    .matches(/[0-9]/, 'At least an number'),
  fullname: yup.string().required('Please type your name'),
  company: yup.string().required('Please type your company name'),
})

class RegisterDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fullname: '',
      username: '',
      password: '',
      company: '',
      error: {},
    }
  }

  handleChange = field => event => {
    this.setState({ [field]: event.target.value })
  }

  render() {
    const { classes } = this.props
    const { company, fullname, username, password, error } = this.state
    return (
      <Container component='main' maxWidth='xs'>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>

          <form className={classes.form} noValidate onSubmit={this.submit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              autoFocus={error.company}
              error={error.company}
              helperText={error.company}
              label='Company Name'
              type='text'
              fullWidth
              value={this.state.company}
              onChange={this.handleChange('company')}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              error={error.fullname}
              helperText={error.fullname}
              label='Name'
              type='text'
              fullWidth
              value={this.state.fullname}
              onChange={this.handleChange('fullname')}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              error={error.username}
              helperText={error.username}
              id='email'
              label='Email Address'
              autoComplete='email'
              type='email'
              value={this.state.username}
              onChange={this.handleChange('username')}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              autoFocus={error.password}
              error={error.password}
              helperText={error.password}
              name='password'
              label='Password'
              type='password'
              value={this.state.password}
              onChange={this.handleChange('password')}
            />
            <Button
              type='submit'
              fullWidth
              className={classes.submit}
              variant='contained'
              color='primary'>
              REGISTER
            </Button>
            <Grid container justify='center'>
              <Grid item>
                <Link component={RouterLink} to='/auth/login' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
          <Box mt={8}>
            <Copyright />
          </Box>
        </div>
      </Container>
    )
  }
  submit = event => {
    event.preventDefault()
    const { company, fullname, username, password } = this.state
    const { register } = this.props
    schema
      .validate({ company, fullname, username, password }, { abortEarly: true })
      .then(payload => {
        return register(payload).then(result => {
          const { response } = result.error
          if (response && response.status === 400) {
            return Promise.reject(response.data)
          }
        })
      })
      .catch(error => {
        let errors = {}
        if (error.name === 'ValidationError' && error.inner) {
          error.inner.forEach(err => {
            errors[err.path] = err.message
          })
          if (error.inner.length === 0) {
            let { path, message } = error
            errors[path] = message
          }
          this.setState({ error: errors })
        }
      })
  }
}

RegisterDialog.propTypes = {
  classes: PropTypes.object,
  register: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    open: !state.user,
  }
}

const mapDispatchToProps = {
  register,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RegisterDialog))
