import React from 'react'

// Material
import { makeStyles } from '@material-ui/core/styles'
import { Toolbar, Typography, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  toolbar: {
    padding: theme.spacing(0, 2),
  },
  caption: {
    color: '#333',
    flexGrow: 1,
  },
}))
const Header = () => {
  const classes = useStyles()
  return (
    <Toolbar className={classes.toolbar}>
      <div className={classes.caption}>
        <Typography variant="h6">
      Dashboard
        </Typography>
        <Typography variant="body2">
      Lorem ipsum dolor sit amet.
        </Typography>

      </div>
      <Button color="inherit">Login</Button>
    </Toolbar>
  )
}

export default Header
