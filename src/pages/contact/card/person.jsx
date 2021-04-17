import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Typography } from '@material-ui/core'

const Person = ({ profile, classes }) => {
  const { id, type, first_name, last_name, attr } = profile
  const { profession } = attr||{}
  return (
    <>
      <Typography variant="h6" noWrap>
        <Link to={`/${type}/${id}/view`} className={classes.link}>{first_name} {last_name}</Link>
      </Typography>
      <Typography variant="body1" noWrap>{profession||'-'}</Typography>
    </>
  )
}
Person.propTypes={
  profile: PropTypes.object.isRequired,  
  classes: PropTypes.object.isRequired,  
}
export default Person