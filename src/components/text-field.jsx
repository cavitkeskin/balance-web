import React from 'react'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import get from 'lodash/get'

const MyTextField = ({ form, field, children, label, ...props }) => {
  return <TextField 
    type='text'
    fullWidth
    margin= 'dense'
    {...props}
    error={Boolean(get(form.errors, field.name))}
    helperText={get(form.errors, field.name, null)}
    label={label}
    name={field.name}
    value={field.value}
    onChange={field.onChange}
    onBlur={field.onBlur}
  >{children}</TextField>
}

MyTextField.propTypes = {
  form: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  children: PropTypes.node,
  label: PropTypes.string,
}

export default MyTextField