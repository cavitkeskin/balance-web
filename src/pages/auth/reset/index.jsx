import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { reset } from '@/store/auth'
import XHRErrorPanel from '@/components/error/XHRErrorPanel'
import ResetForm from './reset-form'
// Metarial
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
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
    content: {
      width: '100%', // Fix IE 11 issue.
      padding: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }
}

class LoginDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sent: false,
      error: null,
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
            Forgot Password
          </Typography>
          <XHRErrorPanel
            open={showError}
            onClose={() => this.setState({ showError: false })}
            error={error}
          />
          <div className={classes.content}>
            <ResetForm onSubmit={this.handleSubmit} />
            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to='/auth/login' variant='body2'>
                  Remember?
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
          </div>
        </Paper>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    )
  }
  handleSubmit = (values, { setSubmitting }) => {
    const { reset, match } = this.props

    reset({ ...values, token: match.params.token })
      .then(result => {
        this.setState({ sent: true, error: null, showError: false })
      })
      .catch(xhr => {
        this.setState({ sent: false, error: xhr.response, showError: true })
      })
      .then(() => setSubmitting(false))
  }
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  reset: PropTypes.func,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  reset,
}

const styler = withStyles(styles)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(styler(LoginDialog))
