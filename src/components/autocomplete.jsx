import React, { useState } from 'react'
import { TextField, formatMs } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import PropTypes from 'prop-types'
import get from 'lodash/get'

const MyAutocomplete = ({ field, form, children, label, options, ...props }) => {
  const [value, setValue] = useState(field.value)
  const wrap = params => {
    return {
      ...params,
      inputProps: {
        ...params.inputProps,
        onChange: event => {
          // console.log('I catch you!', event.target.value, value)
          params.inputProps.onChange(event)
          form.setFieldValue(field.name, event.target.value)
        },
      },
    }
  }

  return (
    <Autocomplete
      freeSolo
      // disableClearable
      // forcePopupIcon
      // filterSelectedOptions={false}
      value={value}
      options={options}
      getOptionLabel={x => String(x)}
      onChange={(ev, val) => {
      //   console.log('Autocomplete change:', val, value)
        form.setFieldValue(field.name, val)
      }}
      // onBlur={ev => {
      //   console.log('blur', ev.target.value, value)
      //   form.setFieldValue(field.name, ev.target.value)
      // }}
      // {...props}
      renderInput={(params) => (
        <TextField 
          {...wrap(params)}
          type='text'
          fullWidth
          margin= 'dense'
          // {...props}
          error={Boolean(get(form.errors, field.name))}
          helperText={get(form.errors, field.name, null)}
      
          label={label}
          name={field.name}
          value={field.value}
          // onChange={field.onChange}
          // onBlur={field.onBlur}
        >{children}</TextField>  
      )}
    />

  )
}

MyAutocomplete.propTypes = {
  form: PropTypes.object,
  field: PropTypes.object.isRequired,
  children: PropTypes.node,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
}

export default MyAutocomplete