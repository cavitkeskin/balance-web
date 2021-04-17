import React from 'react'
import PropTypes from 'prop-types'

const Addresses = ({ classes, addresses }) => {
  
  return (
    <table size="small" className={classes.table}>
      <tbody>
        <tr className={classes.header}><th colSpan={2}>Address</th></tr>
        {addresses.map(({ _id, type, line1, line2, city, state, zip, country }) => (
          <tr key={_id} className={classes.line}>
            <th>{type}</th>
            <td>
              {[line1, line2].filter(Boolean).join('<br/>')}<br/>
              {city} {state} {zip} {country}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

Addresses.propTypes = {
  addresses: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
}

export default Addresses
