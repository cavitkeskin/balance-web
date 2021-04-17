import React, { useState, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { find } from 'lodash'

// Application
import * as ui from '@/store/ui'
import * as auth from '@/store/auth'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import { List, ListItem, ListItemIcon, ListItemText, Divider, Collapse } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import AssetIcon from '@material-ui/icons/ImportantDevices'
import SettingIcon from '@material-ui/icons/Settings'
import ProfileIcon from '@material-ui/icons/Face'
import UsersIcon from '@material-ui/icons/PeopleOutline'
import AccountIcon from '@material-ui/icons/Business'
import ContactsIcon from '@material-ui/icons/PeopleOutline'
import SchoolIcon from '@material-ui/icons/School'
import EmployeesIcon from '@material-ui/icons/PeopleAlt'
import BusinessIcon from '@material-ui/icons/Business'
import ExitIcon from '@material-ui/icons/ExitToApp'
import NextIcon from '@material-ui/icons/NavigateNext'
import ExpandIcon from '@material-ui/icons/ExpandMore'

const menus = [
  { code: '---' },
  { code: 'dashboard', name: 'Home', icon: <HomeIcon/> },
  { code: 'assets', name: 'Assets', icon: <AssetIcon/> },
  { code: 'contacts', name: 'Contacts', icon: <ContactsIcon/> },
  { code: 'students', name: 'Students', icon: <SchoolIcon/> },
  { code: 'employees', name: 'Employees', icon: <EmployeesIcon/> },
  { code: 'companies', name: 'Companies', icon: <BusinessIcon/> },
  { code: 'settings', icon: <SettingIcon/>, children: [
    { code: 'settings/profile', name:'Profile', icon: <ProfileIcon/> },
    { code: 'settings/account', name:'Account', icon: <AccountIcon/> },
    { code: 'users', name:'Users', icon: <UsersIcon/> },
  ] },
  { code: '---' },
  { code: 'logout', name:'Logout', icon: <ExitIcon/> },
]

const useStyles = makeStyles(theme => ({
  toolbar: {
    ...theme.mixins.toolbar,
    textAlign: 'center',
    lineHeight: theme.mixins.toolbar.minHeigh,
    fontSize: '44px',
  },
  icon: {
    minWidth: 36,
  },
  pointer: {
    transition: 'all 150ms ease-in',
  },
  rotate180: {
    transform: 'rotate(180deg)',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

const AppMenu = () => {
  const dispatch = useDispatch()
  const modules = useSelector(state => state.session.modules) 
  const history = useHistory()
  const classes = useStyles()

  const [status, setStatus] = useState(menus.reduce((acc, m) => { acc[m.code] = false; return acc }, {}))  

  const handleClick = url => () => {
    dispatch(ui.appMenu(false))
    if(url === 'logout') dispatch(auth.logout()); else history.push(`/${url}`)
  }

  const toggleStatus = code => () => {
    setStatus({ ...status, [code]: !status[code] })
  }

  return (
    <>
      <div className={classes.toolbar}>ASSET</div>
      <List style={{ paddingTop: 0 }}>
        {menus.map((menu, n) => {
          const module = find(modules, { code: menu.code })
          const { code, name, icon, children } = { ...module, ...menu }
          const iconClassName = [classes.pointer, status[code] && classes.rotate180].filter(c => c).join(' ')
          if(code === '---') return <Divider key={n}/>
          return (
            <Fragment key={n}>
              <ListItem button onClick={children ? toggleStatus(code) : handleClick(code)}>
                <ListItemIcon className={classes.icon}>
                  {icon || <NextIcon/>}
                </ListItemIcon>
                <ListItemText primary={name}/>
                {children && <ExpandIcon className={iconClassName}/>}
              </ListItem>
              {children && <Collapse in={status[code]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding >
                  {children.map(child => (
                    <ListItem button className={classes.nested} onClick={handleClick(child.code)} key={child.code}>
                      <ListItemIcon className={classes.icon}>
                        {child.icon || <NextIcon />}
                      </ListItemIcon>
                      <ListItemText primary={child.name} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>}
            </Fragment>
          )
        })}
      </List>
    </>
  )  
}

export default AppMenu