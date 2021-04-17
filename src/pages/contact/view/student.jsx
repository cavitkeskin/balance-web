import React from 'react'
import PropTypes from 'prop-types'
import { capitalize } from 'lodash'

// Material
import { Typography, Grid } from '@material-ui/core'

// Application
import Avatar from '../../../components/avatar'
import DataSet, { Cell } from '../../../components/data-set'
// import Cell from '../../../components/data-cell'

import Phones from './phones'
import Addresses from './addresses'

const Student = ({ classes, profile }) => {
  const { first_name, last_name, email, phones, addresses, attr } = profile||{}
  
  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4} >
          <Avatar profile={profile}/>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h5">{first_name} {last_name}</Typography>
          <Typography variant="body1">
          Student
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <DataSet title="Student Info">
            <Grid container spacing={2}>
              <Cell xs={3} label="Student Id" value={attr.id}/>
              <Cell xs={3} label="Grade" value={attr.grade}/>
              <Cell xs={6} label="Homeroom" value={attr.homeroom}/>
              <Cell xs={3} label="Gender" value={capitalize(attr.gender)}/>
              <Cell xs={9} label="Date of Birth" value={attr.dob}/>
              <Grid item xs={12}>
                <Cell horizontal xs={3} label="E-Mail" value={email}/>
              </Grid>
            </Grid>
          </DataSet>
        </Grid>
        <Grid item xs={12}>
          <Phones phones={phones} classes={classes}/>
          <Addresses addresses={addresses} classes={classes}/>
        </Grid>
      </Grid>
    </>
  )
}

Student.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default Student
