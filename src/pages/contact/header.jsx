import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// Material
import { Drawer, IconButton, Menu, MenuItem, ListItemIcon, Hidden, Typography } from '@material-ui/core'
import ViewListIcon from '@material-ui/icons/ViewList'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import MoreIcon from '@material-ui/icons/MoreVert'
import FilterIcon from '@material-ui/icons/FilterList'
import SearchIcon from '@material-ui/icons/Search'

// import { makeStyles } from '@material-ui/core/styles'

// Application
// import { AddButton, FilterButton } from '../../components/buttons'
import PageHeader, { AddButton, FilterButton, QuickSearch, VerticalDivider } from '../../components/page-header'
import scopes from './scopes'
import ContactFilter from './filter'

const Header = ({ view, setView, onQuickSearch }) => {

  const { type } = useParams()
  const scope = scopes(type)
  const [filter, setFilter] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const toggleView = () =>  setView(view === 'list' ? 'card' : 'list')

  return (
    <>
      <PageHeader title={scope.title}>
        <Hidden smDown>
          <IconButton onClick={toggleView}>
            {view === 'list' ? <ViewModuleIcon/> : <ViewListIcon/>}
          </IconButton>
          <VerticalDivider/>
          <QuickSearch onSearch={onQuickSearch}/>
          <VerticalDivider/>
          <FilterButton onClick={() => setFilter(true)}/>
          <AddButton to={`/${type}/new`}/>
        </Hidden>
        <Hidden mdUp>
          <IconButton onClick={handleClick}>
            <MoreIcon/>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: 200,
              },
            }}
          >
            <MenuItem onClick={toggleView}>
              <ListItemIcon>
                <ViewModuleIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>Card View</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SearchIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>Search</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <FilterIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>Filter</Typography>
            </MenuItem>
          </Menu>
        </Hidden>
      </PageHeader>
      <Drawer anchor="right" open={filter} onClose={() => setFilter(false)}>
        <ContactFilter onClose={() => setFilter(false)}/>
      </Drawer>
    </>  
  )
}

Header.propTypes = {
  onFilterClick: PropTypes.func,
}

export default Header