import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Typography } from '@material-ui/core'
import A from '@material-ui/core/Link'

const Company = ({ profile, classes }) => {
  const { id, type, first_name, attr:{ web } } = { attr: { web: '' }, ...profile }
  const hostname = web.replace(/https?:\/\//gi, '')
  const url = /\w+:\/\//gi.test(web) ? web : `http://${web}`
  return (
    <>
      <Typography variant="h6" noWrap>
        <Link to={`/${type}/${id}/view`} className={classes.link}>{first_name}</Link>
      </Typography>
      <Typography variant="body1" noWrap>
        <A href={url} target="_blank" className={classes.link}>{hostname}</A>
      </Typography>
    </>
  )
}
Company.propTypes={
  profile: PropTypes.object.isRequired,  
  classes: PropTypes.object.isRequired,  
}
export default Company