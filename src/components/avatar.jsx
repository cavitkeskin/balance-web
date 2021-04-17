import * as React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const colors = ['#f00', '#0b0', '#00f', '#0c8', '#90f', '#f90']

const useStyles = makeStyles(theme => ({
  avatar: { 
    width: props => props.size, 
    height: props => props.size, 
    fontSize: props => props.size / 2, 
    backgroundColor: props => props.color,
    // display: 'block',
    margin: `${theme.spacing(1)}px auto`,
  },
}))

const BuildAvatar = ({ size, profile, className, ...props }) => {
  const { id, first_name, last_name, avatar } = profile
  const initials = [first_name, last_name].filter(s => s && s.length).map(s => s[0]).join('').toUpperCase()
  const n = id.replace(/[a-z]/g, '') % colors.length
  const classes = useStyles({ size: size || 100, color: colors[n] })
  return (
    <Avatar 
      className={clsx(classes.avatar, className)}
      src={avatar}
      {...props}
    >{avatar?'':initials}</Avatar>
  )
}

BuildAvatar.propTypes={
  src: PropTypes.string,
  size: PropTypes.number,
  profile: PropTypes.object,  
  className: PropTypes.string,
}

export default BuildAvatar

