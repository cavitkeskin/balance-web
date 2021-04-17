import React from 'react'
import PropTypes from 'prop-types'

// Material
import Drawer from '@material-ui/core/Drawer'
import { withStyles } from '@material-ui/core/styles'

const drawerWidth = 240
const styles = {
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
  }
}

const Menu = ({ children, classes }) => {
  return (
    <Drawer variant='permanent' classes={{ paper: classes.drawerPaper }}>
      {children}
    </Drawer>
  )
}

Menu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Menu)
