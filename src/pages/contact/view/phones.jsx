import React from 'react'
import PropTypes from 'prop-types'

const Phones = ({ classes, phones }) => {
  
  return (phones.length !== 0 ? 
    <table size="small" className={classes.table}>
      <tbody>
        <tr className={classes.header}><th colSpan={2}>Phones</th></tr>
        {phones.map(({ _id, type, number }) => (
          <tr key={_id} className={classes.line}>
            <th>{type}</th>
            <td>{number}</td>
          </tr>
        ))}
      </tbody>
    </table>
    : '')

}

Phones.propTypes = {
  phones: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
}

export default Phones
