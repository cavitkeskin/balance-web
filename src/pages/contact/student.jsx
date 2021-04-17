import React from 'react'
import { FieldArray } from 'formik'
// Material
import { 
  Typography,
  MenuItem, 
  Grid,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

import MyTextField from '../../components/text-field'

const Student = ({ name, values, touched, errors, handleChange, handleBlur, children, classes, ...props }) => {
  const fprops = { values, touched, errors, handleChange, handleBlur }
  return (
    <>
      <Typography variant="h6" className={classes.caption}>Student</Typography>

      <Grid container spacing={1}>
        <Grid item xs={3}>
          <MyTextField name="attr.id" label="Student #" {...fprops}/>
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            freeSolo
            disableClearable
            forcePopupIcon
            filterSelectedOptions={false}
            value={values.attr.grade}
            options={['P', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']}
            renderInput={params => (<MyTextField name="attr.grade" label="Grade" {...fprops} {...params}/>)}
          />
          {/* <MyTextField name="attr.grade" label="Grade" {...fprops}/> */}
        </Grid>
        <Grid item xs={6}>
          <MyTextField name="attr.homeroom" label="Homeroom" {...fprops}/>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <MyTextField name="attr.gender" label="Gender" {...fprops} select>
            {['Male', 'Female', 'Other'].map(key => (
              <MenuItem key={key} value={key.toLowerCase()}>{key}</MenuItem>
            ))}
          </MyTextField>
        </Grid>
        <Grid item xs={9}>
          <MyTextField name="attr.dob" label="Date of Birth" {...fprops}/>
        </Grid>
      </Grid>
    </>

  )
}

export default Student