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

const Phones = ({ classes }) => {
  return (
    <>
      <Typography variant="h6" className={classes.caption}>Phones</Typography>

      <FieldArray name="phones">
        {({ remove, push, form }) => {
          const lines = form.values.phones.map((phone, i) => (
            <Grid container key={i} spacing={1}>
              <Grid item xs={3}>
                <Field name={`phones[${i}].type`} label="Type" margin="none" select component={MyTextField}>
                  {['Mobile', 'Home', 'Work', 'Other'].map(key => (
                    <MenuItem key={key} value={key.toLowerCase()}>{key}</MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={9}>
                <Field name={`phones[${i}].number`} label="Number" margin="none" component={MyTextField} 
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
              </Grid>
            </Grid>
          ))
          lines.push((
            <Grid container justify="flex-end" spacing={4} key="add">
              <Grid item>
                <Button 
                  onClick={() => push({ type:'mobile', number:'' })} 
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

Phones.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default  Phones