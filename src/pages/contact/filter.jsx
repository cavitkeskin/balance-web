import React from 'react'
import PropTypes from 'prop-types'

import { Toolbar, Typography, IconButton, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  root: {
    width: 380,
    [`${theme.breakpoints.down('xs')} and (orientation: portrait)`]: {
      width: '100vw',
    },
  
  },
}))
const Filter = ({ onClose }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>Filter</Typography>
        <IconButton onClick={onClose}><CloseIcon/></IconButton>
      </Toolbar>
      <Divider/>
    </div>
  )
}

Filter.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default Filter