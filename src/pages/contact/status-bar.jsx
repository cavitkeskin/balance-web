import React from 'react'
import PropTypes from 'prop-types'

import { CircularProgress, Grid, Button, Typography, Menu, MenuItem } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

const StatusBar = ({ records, onLoadMore, loading }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const loadmore = limit => {
    return () => {
      onLoadMore(limit)
      handleClose()
    }
  }
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Typography>
        Total: {records.length}
        </Typography>
      </Grid>
      <Grid item>
        <Button size="small" onClick={loadmore(25)} disabled={loading}>Load more</Button>
        <Button 
          size="small" style={{ minWidth:'initial' }} onClick={handleClick} disabled={loading}
        ><ArrowDropDownIcon/></Button>
        <Menu 
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          {[50, 100].map(limit => <MenuItem onClick={loadmore(limit)} key={limit}>{limit}</MenuItem>)}
        </Menu>
      </Grid>
      {loading && <Grid item><CircularProgress size={18}/></Grid>}
    </Grid>
  )
}
StatusBar.propTypes = {
  records: PropTypes.array.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}
export default StatusBar