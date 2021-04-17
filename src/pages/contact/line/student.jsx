import React from 'react'
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

const Contact = ({ contacts, classes }) => {
  const { type:path } = useParams()
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{'\u00a0'}</TableCell>
            <TableCell width="50%">Name</TableCell>
            <TableCell>Student{'\u00a0'}ID</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>Homeroom</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>{'\u00a0'}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map(profile => {
            const { id, first_name, last_name, attr } = { attr: {}, ...profile }
            return (
              <TableRow key={id}>
                <TableCell>
                  <Link to={`/${path}/${id}/view`} className={classes.link}>
                    <Avatar size={40} profile={profile}/>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to={`/${path}/${id}/view`} className={classes.link}>{first_name} {last_name}</Link>
                </TableCell>
                <TableCell>{attr.id}</TableCell>
                <TableCell>{attr.grade}</TableCell>
                <TableCell>{attr.homeroom}</TableCell>
                <TableCell>{attr.gender}</TableCell>
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

Contact.propTypes={
  contacts: PropTypes.array.isRequired,  
  classes: PropTypes.object.isRequired,
}

export default Contact