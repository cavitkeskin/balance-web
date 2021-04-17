import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import { getTitle, getDescription } from './utils'

export default function XHRErrorDialog(props) {
  const { open, onClose, error } = props
  return (
    <Dialog open={error ? open : false} onClose={onClose}>
      <DialogTitle>{getTitle(error)}</DialogTitle>
      <DialogContent>
        <DialogContentText>{getDescription(error)}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary' autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

XHRErrorDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  error: PropTypes.object
}
