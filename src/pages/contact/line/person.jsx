import React from 'react'
import { find } from 'lodash'
import { useParams, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
// import LocationIcon from '@material-ui/icons/Room'
// import PhoneIcon from '@material-ui/icons/Phone'
// import MailIcon from '@material-ui/icons/MailOutline'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import Avatar from '@/components/avatar'

const Person = ({ contacts, classes }) => {
  const { type:path } = useParams()
  return (
    <TableContainer>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>{'\u00a0'}</TableCell>
            <TableCell width="50%">Name</TableCell>
            <TableCell>Profession</TableCell>
            <TableCell>E-Mail</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>{'\u00a0'}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map(profile => {
            const { id, first_name, last_name, email, attr, phones, addresses } = { attr: {}, ...profile }
            const address = find(addresses, { type: 'home' }) || {}
            const phone = find(phones, { type: 'mobile' }) || {}
            return (
              <TableRow key={id}>
                <TableCell>
                  <Link to={`/${path}/${id}/view`} className={classes.link}>
                    <Avatar className={classes.avatar} size={48} profile={profile}/>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to={`/${path}/${id}/view`} className={classes.link}>{first_name} {last_name}</Link>
                </TableCell>
                <TableCell>{attr.profession}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{phone.number  }</TableCell>
                <TableCell>{[address.city, address.state].filter(s => s).join(', ')}</TableCell>
                <TableCell>
                  <IconButton component={Link} to={`/${path}/${id}`}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

Person.propTypes={
  contacts: PropTypes.array.isRequired,  
  classes: PropTypes.object.isRequired,
}

export default Person