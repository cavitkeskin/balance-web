import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Typography } from '@material-ui/core'

const Student = ({ profile, classes }) => {
  const { id, type, first_name, last_name, attr } = profile
  const { id:attrId, grade, homeroom } = attr||{}
  return (
    <>
      <Typography variant="h6" noWrap>
        <Link to={`/${type}/${id}/view`} className={classes.link}>{first_name} {last_name}</Link>
      </Typography>
      <Typography variant="body1" noWrap>#{attrId}</Typography>
      <Typography variant="body1" noWrap>{[grade, homeroom].join(' - ')}</Typography>
    </>
  )
}
Student.propTypes={
  profile: PropTypes.object.isRequired,  
  classes: PropTypes.object.isRequired,  
}
export default Student