import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Application
import { appMenu } from '@/store/ui'
import UserMenu from './user-menu'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Hidden from '@material-ui/core/Hidden'

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const AppHeader = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const account = useSelector(state => state.session.account) 

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Hidden lgUp>
          <IconButton
            edge='start'
            className={classes.menuButton}
            onClick={() => dispatch(appMenu(true))}
            color='inherit'
            aria-label='menu'>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Typography variant='h6' className={classes.title}>
          {(account && account.name) || process.env.APP_NAME}
        </Typography>
        <UserMenu />
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader