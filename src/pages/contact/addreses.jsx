import React from 'react'
import { FieldArray } from 'formik'
// Material
import { 
  Typography, 
  Grid, 
  Button, 
  IconButton, 
  InputAdornment,
  MenuItem,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/DeleteForever'

import MyTextField from '../../components/text-field'

const Addresses = ({ name, values, touched, errors, handleChange, handleBlur, children, classes, ...props }) => {
  const fprops = { values, touched, errors, handleChange, handleBlur }
  return (
    <>
      <Typography variant="h6" className={classes.caption}>Address</Typography>
      <FieldArray name="addresses">
        {helpers => {
          let lines = values.addresses.map((addr, n) => (
            <Grid container spacing={1} key={n}>
              <Grid item xs={3}>
                <MyTextField 
                  name={`addresses[${n}].type`} 
                  label="Type" 
                  select 
                  margin="none"
                  {...fprops}>
                  {['Home', 'Work', 'Other'].map(key => (
                    <MenuItem key={key} value={key.toLowerCase()}>{key}</MenuItem>
                  ))}
                </MyTextField>
              </Grid>
              <Grid item xs={9} >
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <MyTextField 
                      name={`addresses[${n}].line1`} 
                      label="Line 1" 
                      margin="none"
                      {...fprops}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton 
                              onClick={() => helpers.remove(n)} 
                              color="secondary" 
                              className={classes.removeItem}
                            ><DeleteIcon/></IconButton>
                          </InputAdornment>
                        ),
                      }}
                    /></Grid>
                  <Grid item xs={12}>
                    <MyTextField name={`addresses[${n}].line2`} label="Line 2" margin="none"{...fprops}/>
                  </Grid>
                  <Grid item xs={12}>
                    <MyTextField name={`addresses[${n}].city`} label="City" margin="none"{...fprops}/>
                  </Grid>
                  <Grid item xs={6}>
                    <MyTextField name={`addresses[${n}].state`} label="State" margin="none"{...fprops} />
                  </Grid>
                  <Grid item xs={6}>
                    <MyTextField name={`addresses[${n}].zip`} label="Zip Code" margin="none"{...fprops}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))
          lines.push((
            <Grid container justify="flex-end" spacing={4} key="add">
              <Grid item>
                <Button 
                  onClick={() => helpers.push({ type:'home', line1:'', line2:'', city:'', state:'', zip:'' })} 
                  size="small" 
                  color="primary" 
                  startIcon={<AddIcon/>}>Add Address</Button>
              </Grid>
            </Grid>
          ))
          return lines
        }}
      </FieldArray>
    </>
  )
}
export default Addresses