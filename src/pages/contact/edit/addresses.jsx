import React from 'react'
import { Field, FieldArray } from 'formik'
import PropTypes from 'prop-types'

// Material
import { 
  Grid, 
  Button, 
  IconButton, 
  InputAdornment,
  MenuItem,
  Typography,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/DeleteForever'

// Application
import MyTextField from '../../../components/text-field'
  
const Addresses = ({ classes }) => {
  return (
    <>
      <Typography variant="h6" className={classes.caption}>Addresses</Typography>

      <FieldArray name="addresses">
        {({ remove, push, form }) => {
          const lines = form.values.addresses.map((addr, i) => (
            <Grid container key={i} spacing={1}>
              <Grid item xs={3}>
                <Field name={`addresses[${i}].type`} label="Type" select component={MyTextField}>
                  {['Home', 'Work', 'Other'].map(key => (
                    <MenuItem key={key} value={key.toLowerCase()}>{key}</MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={9}>
                <Field name={`addresses[${i}].line1`} label="Line 1" component={MyTextField} 
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton 
                          onClick={() => remove(i)} 
                          color="secondary" 
                          className={classes.removeItem}
                        >
                          <DeleteIcon/>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}/>
                <Field name={`addresses[${i}].line2`} label="Line 2" component={MyTextField}/>
                <Field name={`addresses[${i}].city`} label="City" component={MyTextField}/>
                <Field name={`addresses[${i}].state`} label="State" component={MyTextField}/>
                <Field name={`addresses[${i}].zip`} label="Zip" component={MyTextField}/>
              </Grid>
            </Grid>
          ))
          lines.push((
            <Grid container justify="flex-end" spacing={4} key="add">
              <Grid item>
                <Button 
                  onClick={() => push({ type:'home', line1:'', line2:'', city:'', state:'', zip:'' })} 
                  color="primary" 
                  size="small" 
                  startIcon={<AddIcon/>}
                >Add Phone</Button>
              </Grid>
            </Grid>
          ))
          return lines
        }}
      </FieldArray>
    </>
  )
}

Addresses.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default  Addresses