import React from 'react'

// Material
import { CircularProgress, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '16rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(10),
    textAlign: 'center',
    '& > p': {
      marginTop: theme.spacing(2),
    },
  },
}))

const Loading = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CircularProgress/>
      <Typography variant="body1">Loading...</Typography>
    </div>
  )
}

export default Loading
