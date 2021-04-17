import React from 'react'
import { FieldArray } from 'formik'
// Material
import { 
  Typography, 
} from '@material-ui/core'

import MyTextField from '../../components/text-field'

const Employee = ({ name, values, touched, errors, handleChange, handleBlur, children, classes, ...props }) => {
  const fprops = { values, touched, errors, handleChange, handleBlur }
  return (
    <>
      <Typography variant="h6" className={classes.caption}>Employee</Typography>
      <MyTextField name="attr.id" label="Employee #" {...fprops}/>
      <MyTextField name="attr.dob" label="Date of Bird" {...fprops}/>
      <MyTextField name="attr.ssn" label="SSN" {...fprops}/>
    </>

  )
}

export default Employee