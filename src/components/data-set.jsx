import React from 'react'
import PropTypes from 'prop-types'
// Material
import { Box, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const Context = React.createContext({ classes: {} })

const useStyles = makeStyles(theme => ({
  title: { 
    color: '#555',
    padding: `2px ${theme.spacing(1)}px`,
    marginTop: theme.spacing(1),
    borderBottom: '1px solid #ccc',
    fontWeight: 'bold',
    letterSpacing: '0.07em',
  },
  label: {
    color: '#555',
    textTransform: 'uppercase',
  },
  value: {
  },
  content: {
    padding: theme.spacing(1),
  },
}))

export const Label = ({ value }) => {
  return (
    <Context.Consumer>
      { ({ classes }) => 
        <Typography variant="caption" className={classes.label}>{value}</Typography>
      }
    </Context.Consumer>
  )
}
Label.propTypes={
  value: PropTypes.string.isRequired,
}

export const Value = ({ value }) => {
  return (
    <Context.Consumer>
      { ({ classes }) => 
        <Typography variant="body1" className={classes.value}>{value}</Typography>
      }
    </Context.Consumer>
  )
}
Value.propTypes={
  value: PropTypes.any.isRequired,
}

export const Cell = ({ label, value, horizontal, xs, ...props }) => {
  return horizontal ?     
    <Grid container spacing={2} alignItems="baseline" {...props}>
      <Grid item xs={xs}><Label value={label}/></Grid>
      <Grid item><Value value={value}/></Grid>
    </Grid>
    : 
    <Grid item xs={xs} {...props}>
      <Label value={label}/>
      <Value value={value}/>
    </Grid>
}
Cell.propTypes={
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  horizontal: PropTypes.bool,
  xs: PropTypes.number,
}
Cell.defaultProps = {
  value: '',
  horizontal: false,
  xs: 2,
}

const DataSet = ({ title, children }) => {
  const classes = useStyles()
  return (
    <Context.Provider value={{ classes }}>
      <Typography variant="subtitle2" className={classes.title}>{title}</Typography>
      <Box className={classes.content}>
        { children } 
      </Box>
    </Context.Provider>
  )
}

DataSet.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default DataSet
