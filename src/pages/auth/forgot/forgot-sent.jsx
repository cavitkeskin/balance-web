import React from 'react'
import PropTypes from 'prop-types'
// Metarial
import { Link, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  content: {
    width: '100%', // Fix IE 11 issue.
    padding: theme.spacing(1, 0, 3),
    textAlign: 'center',
  },
  text: {
    margin: theme.spacing(1, 0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const MailSent = props => {
  const classes = useStyles()
  const { comeback } = props
  return (
    <div className={classes.content}>
      <Typography variant='body1' className={classes.text}>
        We sent an email to you. Please follow that direction to reset your
        passwors.
      </Typography>
      <Typography variant='body1' className={classes.text}>
        If you can&apos;t get email in a few minutes please
        <br />
        <Link href='#' onClick={comeback} variant='body1'>
          {'try again'}
        </Link>
        .
      </Typography>
    </div>
  )
}

MailSent.propTypes = {
  comeback: PropTypes.func,
}

export default MailSent
