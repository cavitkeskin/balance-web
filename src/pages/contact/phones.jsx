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

const Phones = ({ name, values, touched, errors, handleChange, handleBlur, children, classes, ...props }) => {
  const fprops = { values, touched, errors, handleChange, handleBlur }
  return (
    <>
      <Typography variant="h6" className={classes.caption}>Phone</Typography>
      <FieldArray name="phones">
        {helpers => {
          let lines = values.phones.map((phone, n) => (
            <Grid container spacing={1} key={n}>
              <Grid item xs={3}>
                <MyTextField name={`phones[${n}].type`} label="Type" {...fprops} select margin="none">
                  {['Mobile', 'Home', 'Work', 'Other'].map(key => (
                    <MenuItem key={key} value={key.toLowerCase()}>{key}</MenuItem>
                  ))
                  }
                </MyTextField>
              </Grid>
              <Grid item xs={9}>
                <MyTextField 
                  name={`phones[${n}].number`} 
                  label="Phone" 
                  margin="none"
                  {...fprops}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton 
                          onClick={() => helpers.remove(n)} 
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
                  onClick={() => helpers.push({ type:'mobile', number:'' })} 
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

export default Phones