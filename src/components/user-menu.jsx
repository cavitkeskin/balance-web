import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '@/store/auth'

// Material
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
// import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  accounticon: {
    marginRight: 12,
  },
  menuitem: {
    minWidth: 120,
  },
}

class UserMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
    }
    // this.handleOpen = this.handleOpen.bind(this)
    // this.handleClose = this.handleClose.bind(this)
  }

  handleOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  logout = () => {
    const { logout } = this.props
    this.setState({ anchorEl: null })
    logout()
    // TODO: do not forget to clear state
    // logout()
    // 	.catch(err => alert(err.response.data))
  }

  render() {
    const { classes, session } = this.props
    const { anchorEl } = this.state
    return session.user ? (
      <div>
        <Button color='inherit' onClick={this.handleOpen}>
          <AccountCircle className={classes.accounticon} />
          {session.user.firstname} {session.user.lastname}
        </Button>
        <Menu
          getContentAnchorEl={null}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}>
          <MenuItem
            onClick={this.handleClose}
            className={classes.menuitem}
            component={Link}
            to='/setting'>
            Settings
          </MenuItem>
          <MenuItem onClick={this.handleClose} className={classes.menuitem}>
            Language
          </MenuItem>
          <MenuItem onClick={this.handleClose} className={classes.menuitem}>
            Theme
          </MenuItem>
          <Divider />
          <MenuItem onClick={this.logout} className={classes.menuitem}>
            Logout
          </MenuItem>
        </Menu>
      </div>
    ) : (
      <Button color='inherit' component={Link} to='/auth'>
        <AccountCircle className={classes.accounticon} />
        Login
      </Button>
    )
  }
}

UserMenu.propTypes = {
  classes: PropTypes.object,
  session: PropTypes.object,
  logout: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    session: state.session,
  }
}

const mapDispatchToProps = {
  logout,
}

const connecter = connect(
  mapStateToProps,
  mapDispatchToProps
)
const styler = withStyles(styles)

export default connecter(styler(UserMenu))
