import React from 'react'
import PropTypes from 'prop-types'

// Material
import { Typography, Grid } from '@material-ui/core'

// Application
import Avatar from '../../../components/avatar'

import Phones from './phones'
import Addresses from './addresses'

const Company = ({ classes, profile }) => {
  const { first_name, last_name, email, phones, addresses } = profile||{}
  
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={4} >
        <Avatar profile={profile}/>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h5">{first_name} {last_name}</Typography>
        <Typography variant="body2">{email}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Phones phones={phones} classes={classes}/>
        <Addresses addresses={addresses} classes={classes}/>
      </Grid>
    </Grid>
  )
}

Company.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default Company
