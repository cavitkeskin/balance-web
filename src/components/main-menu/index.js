import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Application
// import { logout } from '@/services/auth'

// Material
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MoreIcon from '@material-ui/icons/MoreVert'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import Hidden from '@material-ui/core/Hidden'
import { withStyles } from '@material-ui/core/styles'

import UserMenu from '@/components/user-menu'

const styles = {
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  menuButton: {
    marginLeft: -10,
  },
  accounticon: {
    marginRight: 12,
  },
  menuitem: {
    minWidth: 120,
  },
}

class MainMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen(event) {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose() {
    this.setState({ anchorEl: null })
  }

  logout() {
    // TODO: do not forget to clear state
    this.setState({ anchorEl: null })
    // logout()
    // 	.catch(err => alert(err.response.data))
  }

  render() {
    // const {classes} = this.props
    const { classes, session } = this.props
    const { anchorEl } = this.state
    const renderUsermenu = () => {
      return session.user ? (
        <React.Fragment>
          <MenuItem className={classes.menuitem}>Language</MenuItem>
          <MenuItem className={classes.menuitem}>Theme</MenuItem>
          <Divider />
          <MenuItem
            onClick={this.logout.bind(this)}
            className={classes.menuitem}>
            Logout
          </MenuItem>
        </React.Fragment>
      ) : (
        <MenuItem className={classes.menuitem} component={Link} to='/auth'>
          <AccountCircle className={classes.accounticon} />
          Login
        </MenuItem>
      )
    }

    return (
      <AppBar position='static' className={classes.root}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color='inherit'
            aria-label='Menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h5' color='inherit' className={classes.title}>
            AppName
          </Typography>
          <Hidden smDown>
            <Button color='inherit' component={Link} to='/dashboard'>
              Dashboard
            </Button>
            <Button color='inherit' component={Link} to='/inventory'>
              Asset
            </Button>
            <Button color='inherit' component={Link} to='/setting'>
              Settings
            </Button>
            <UserMenu />
          </Hidden>
          <Hidden mdUp>
            <IconButton
              aria-haspopup='true'
              color='inherit'
              onClick={this.handleOpen}>
              <MoreIcon />
            </IconButton>
            <Menu
              getContentAnchorEl={null}
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}>
              <MenuItem
                className={classes.menuitem}
                component={Link}
                to='/dashboard'>
                Dashboard
              </MenuItem>
              <MenuItem
                className={classes.menuitem}
                component={Link}
                to='/inventory'>
                Asset
              </MenuItem>
              <MenuItem
                className={classes.menuitem}
                component={Link}
                to='/setting'>
                Settings
              </MenuItem>
              <Divider />
              {renderUsermenu()}
            </Menu>
          </Hidden>
        </Toolbar>
      </AppBar>
    )
  }
}

MainMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    session: state.session,
  }
}

const connecter = connect(mapStateToProps)
const styler = withStyles(styles)

export default connecter(styler(MainMenu))
