import React from 'react'
import PropTypes from 'prop-types'

// Material
import { Typography, Grid } from '@material-ui/core'

// Application
import Avatar from '../../../components/avatar'
import DataSet, { Cell } from '../../../components/data-set'

import Phones from './phones'
import Addresses from './addresses'

const Employee = ({ classes, profile }) => {
  const { first_name, last_name, email, phones, addresses, attr } = profile||{}
  
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={4} >
        <Avatar profile={profile}/>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h5">{first_name} {last_name}</Typography>
        <Typography variant="body1">{attr.title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <DataSet title="Employee Info">
          <Grid container spacing={2}>
            <Cell xs={6} label="Employee Id" value={attr.id}/>
            <Cell xs={6} label="SSN" value={attr.ssn}/>
            <Cell xs={12} label="Date of Birth" value={attr.dob}/>
            <Cell xs={12} label="E-Mail" value={email}/>
          </Grid>
        </DataSet>      </Grid>
      <Grid item xs={12}>
        <Phones phones={phones} classes={classes}/>
        <Addresses addresses={addresses} classes={classes}/>
      </Grid>
    </Grid>
  )
}

Employee.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default Employee
