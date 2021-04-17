import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { omit } from 'lodash'

// Material
import { makeStyles } from '@material-ui/core/styles'
import { 
  Toolbar, 
  Typography, 
  Hidden, 
  Button, IconButton, 
  InputBase, InputAdornment, 
  Divider,
} from '@material-ui/core'
// import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add'
import AddBoxIcon from '@material-ui/icons/AddBox'
import FilterIcon from '@material-ui/icons/FilterList'
import SearchIcon from '@material-ui/icons/Search'
import CancelIcon from '@material-ui/icons/Cancel'

// Application
// import { appMenu } from '@/store/ui'

export const useStyles = makeStyles(theme => ({
  toolbar: {
  },
  caption: {
    color: '#333',
    flexGrow: 1,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    '&>*': {
      marginLeft: theme.spacing(0),
    },
  },
  iconButton: {
    // padding: theme.spacing(1/2),
    // marginLeft: 0,
  },
  quickSearch: {
    // border: '1px solid silver', 
    // borderRadius: theme.spacing(1/2), 
    paddingLeft: theme.spacing(1/2),
    paddingRight: theme.spacing(1/2),
    width: '16em',
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

export const HeaderButton = props => {
  const classes = useStyles()
  const { title, to, iconDesktop, iconMobile } = props
  return (
    <>
      <Hidden smDown>
        <Button 
          variant="contained"
          color="primary"
          // size="large"
          component={to ? Link : 'button'}
          startIcon={iconDesktop}
          {...omit(props, ['iconDesktop', 'iconMobile'])}
        >{title}</Button>
      </Hidden>
      <Hidden mdUp>
        <IconButton 
          className={classes.iconButton} 
          component={to ? Link : 'button'}
          {...omit(props, ['iconDesktop', 'iconMobile'])}
        >{iconMobile}</IconButton>
      </Hidden>
    </>
  )
}
HeaderButton.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  iconDesktop: PropTypes.node,
  iconMobile: PropTypes.node,
}

export const AddButton = props => 
  <HeaderButton 
    color="primary" 
    iconDesktop={<AddIcon/>}
    iconMobile={<AddBoxIcon/>} 
    title="New" 
    {...props}/>

export const FilterButton = props => 
  <HeaderButton 
    // variant="" 
    iconDesktop={<FilterIcon/>}
    iconMobile={<FilterIcon/>} 
    title="Filter" 
    // variant="text" 
    {...props}/>

export const SearchButton = props => <IconButton {...props}><SearchIcon/></IconButton>

export const VerticalDivider = () => <Divider style={{ height: 28, margin: 4 }} orientation="vertical"/>

export const QuickSearch = ({ onSearch }) => {
  const classes = useStyles()
  const [que, setQue] = useState('')
  const search = q => {
    onSearch({ que: q })
  }
  const reset = () => {
    setQue('')
    search('')
  }
  const keyHandle = e => {
    switch(e.keyCode){
      case 13: 
        search(que)
        break
      case 27:
        reset()
        break
    }
  }

  return (
    <InputBase 
      placeholder="Search" 
      value={que}
      onChange={e => setQue(e.target.value)}
      className={classes.quickSearch}
      onKeyDown={keyHandle}
      startAdornment={
        <InputAdornment position="start">
          {/* <IconButton size="small" > */}
          <SearchIcon />
          {/* </IconButton> */}
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <IconButton size="small" disabled={!que} onClick={reset}>
            <CancelIcon fontSize="small"/>
          </IconButton>
        </InputAdornment>
      }/>
  )
}
QuickSearch.propTypes = {
  onSearch: PropTypes.func,
}

const PageHeader = ({ title, description, children }) => {
  // const dispatch = useDispatch()
  const classes = useStyles()
  return (
    <Toolbar className={classes.toolbar}>
      {/* <Hidden smUp>
        <IconButton
          edge='start'
          className={classes.menuButton}
          onClick={() => dispatch(appMenu(true))}
          color='inherit'
          aria-label='menu'>
          <MenuIcon />
        </IconButton>
      </Hidden> */}
      <div className={classes.caption}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </div>
      <div className={classes.actions}>
        {children}
      </div>
    </Toolbar>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}
export default PageHeader
