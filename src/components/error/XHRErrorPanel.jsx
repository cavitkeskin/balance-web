import React from 'react'
import PropTypes from 'prop-types'
import {
  Collapse,
  Paper,
  Typography,
  Button,
  IconButton
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Clear'
import { makeStyles } from '@material-ui/core/styles'
import { getTitle, getDescription } from './utils'

const useStyles = makeStyles(theme => ({
  collapse: {
    width: '100%'
  },
  paper: {
    padding: theme.spacing(1),
    margin: '1em 0',
    borderTop: '1px solid red',
    borderBottom: '1px solid red',
    backgroundColor: 'transparent',
    position: 'relative'
  },
  close: {
    position: 'absolute',
    right: theme.spacing(1)
  }
}))

const XHRErrorPanel = props => {
  const classes = useStyles()
  const { open, error, onClose } = props
  return (
    <Collapse in={error ? open : false} className={classes.collapse}>
      <Paper square elevation={0} className={classes.paper}>
        <Typography
          variant='subtitle1'
          align='center'
          gutterBottom
          color='error'>
          {getTitle(error)}
          <IconButton
            onClick={onClose}
            size='small'
            className={classes.close}
            color='secondary'>
            <CloseIcon fontSize='small' />
          </IconButton>
        </Typography>
        <Typography variant='body2' align='center' gutterBottom>
          {getDescription(error)}
        </Typography>
      </Paper>
    </Collapse>
  )
}

XHRErrorPanel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  error: PropTypes.object
}

export default XHRErrorPanel
