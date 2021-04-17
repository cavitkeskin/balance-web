import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

// Application
import * as action from '@/store/account-user'

// Metarial
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'

function readableDateTime(datetime) {
  let dt = new Date(datetime)
  let t = new Date()

  const isPast = t.getTime() > dt.getTime()
  const isSameYear = dt.getFullYear() === t.getFullYear()
  const isSameMonth = isSameYear && dt.getMonth() === t.getMonth()
  const isSameDay = isSameMonth && dt.getDate() === t.getDate()
  const isSameWeek =
    isPast && isSameMonth && Math.abs(dt.getDate() - t.getDate()) < 7
  const inMinutes = Math.abs(
    Math.round((t.getTime() - dt.getTime()) / (60 * 1000)),
  )
  const inDays = Math.abs(
    Math.round((t.getTime() - dt.getTime()) / (24 * 60 * 60 * 1000)),
  )

  if (isPast && isSameDay && inMinutes < 60) return `${inMinutes} mins ago`
  else if (isSameDay) return 'Today ' + moment(dt).format('h:mm a')
  else if (!isPast && inDays === 1)
    return 'Tomorrow ' + moment(dt).format('h:mm a')
  else if (isPast && isSameWeek) return moment(dt).format('ddd h:mm a')
  else if (isSameYear) return moment(dt).format('MMM D, YYYY')
  else return dt.toDateString()
}

const UserList = () => {
  const dispatch = useDispatch()
  const { users } = useSelector(state => state.accountUsers)
  useEffect(() => {
    // fetching || users.length || dispatch(action.search())
    dispatch(action.search())
  }, [])
  const [testCount, setTestCount] = useState(0)
  const onTestClick = () => {
    setTestCount(testCount + 1)
    const user = users[0]
    if (!user) return
    dispatch(action.save({ id: user.id, firstname: `Test: ${testCount}` }))
    // setTimeout(dispatch, 5000, action.search())
  }
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name {testCount}</TableCell>
            <TableCell>E-Mail Address</TableCell>
            <TableCell>Created at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => {
            const { id, firstname, lastname, email, username, created_at } = Object.assign(user.user||{}, user)
            return (
              <TableRow key={id}>
                <TableCell>Hi {firstname}</TableCell>
                <TableCell>{lastname}</TableCell>
                <TableCell>{email || username}</TableCell>
                <TableCell>{readableDateTime(created_at)}</TableCell>
              </TableRow>
            )})}
        </TableBody>
      </Table>
      <Button onClick={onTestClick}>TEST</Button>
    </Paper>
  )
}

export default UserList
