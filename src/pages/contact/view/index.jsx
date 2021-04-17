import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// Material
import { 
  Typography, 
  Grid, 
  Button, 
  Toolbar, 
  Divider, 
  IconButton,
  Box, 
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import PrevIcon from '@material-ui/icons/ChevronLeft'
import NextIcon from '@material-ui/icons/ChevronRight'
import CloseIcon from '@material-ui/icons/Close'

// Application
import * as snackbar from '../../../store/snackbar'
import { create, get } from '../../../store/contacts'
import Loading from '../../../components/loading'

import Person from './person'
import Employee from './employee'
import Company from './company'
import Student from './student'

const useStyles = makeStyles(theme => ({
  root: {
    width: 480,
    [`${theme.breakpoints.down('xs')} and (orientation: portrait)`]: {
      width: '100vw',
    },
    height: '100vh',

  },
  content: {
    padding: theme.spacing(2),
  },
  table: {
    width: '100%',
  },
  header : {
    '& > *': {
      color: '#555',
      textAlign: 'left',
      verticalAlign: 'top',
      borderBottom: '1px solid #ccc',
      padding: theme.spacing(1.25, 1, .25),
    },
  },
  line: {
    '& > *': {
      textAlign: 'left',
      verticalAlign: 'baseline',
      padding: theme.spacing(1),
    },
    '& > th': {
      color: '#555',
      fontSize: '.8em',
      fontWeight: 400,
      textTransform: 'uppercase',
      letterSpacing: .09,
      width: '20%',
    },
    '& > td': {
      fontSize: '1rem',
    },
  },
  removeItem: {
    padding: 4,
    color: '#ccc',
    '&:hover': {
      color: '#f50057',
    },
  },
}))

const ContactView = ({ onPrev, onNext }) => {
  const { id, type:path } = useParams()  
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const profile = useSelector(state => state.contacts.contact)  
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    if(!id) return
    setLoading(true)
    if(id === 'new'){
      dispatch(create())
      setLoading(false)
      return
    } else {
      dispatch(get(id)).catch(error => {
        dispatch(snackbar.error(error))
        history.push('/contacts')
      }).then(() => setLoading(false))
    }
  }, [id])

  const { type } = profile||{}
  return (
    <div className={classes.root}>
      <Toolbar>
        <Typography 
          variant="h6" 
          style={{ flexGrow: 1, textTransform: 'capitalize' }}
        >Contact</Typography>
        <IconButton onClick={onPrev}><PrevIcon/></IconButton>
        <IconButton onClick={onNext}><NextIcon/></IconButton>
        <IconButton component={Link} to={`/${path}`}><CloseIcon/></IconButton>
      </Toolbar>
      <Divider/>
      {loading 
        ? <div className={classes.root}><Loading/></div>
        : (
          <Box className={classes.content}>
            {type === 'person' && <Person profile={profile} classes={classes}/>}
            {type === 'employee' && <Employee profile={profile} classes={classes}/>}
            {type === 'company' && <Company profile={profile} classes={classes}/>}
            {type === 'student' && <Student profile={profile} classes={classes}/>}
            <Grid item container xs={12} justify="center">
              <Button 
                variant="outlined"
                color="primary" 
                component={Link}
                to={`/${path}/${id}`}
                startIcon={<EditIcon />}>Edit</Button>
            </Grid>

          </Box>
        )  
      }        
    </div>
  )
}

ContactView.propTypes = {
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
}

export default ContactView
