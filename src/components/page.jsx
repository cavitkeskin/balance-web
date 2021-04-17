import React from 'react'
import PropTypes from 'prop-types'

// Material
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  page: {
    // zIndex: 1,
    // flexGrow: 1,
    // height: '100vh',
    // overflow: 'auto',
    // paddingTop: 56,
    // [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
    //   paddingTop: 48,
    // },
    // [theme.breakpoints.up('sm')]: {
    //   paddingTop: 64,
    // },
  },
}))

const Page = ({ children }) => {
  const classes = useStyles()
  return <section className={classes.page}>{children}</section>
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default Page
