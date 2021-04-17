import React from 'react'
import PropTypes from 'prop-types'

// Material
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  content: {
    padding: theme.spacing(1, 3),
    [`${theme.breakpoints.down('sm')}`]: {
      padding: theme.spacing(1),
    },
  },
}))

const Content = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.content}>{children}</div>
}

Content.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default Content
