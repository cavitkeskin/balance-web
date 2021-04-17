import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import * as actions from '@/store/snackbar'
import { Button, IconButton } from '@material-ui/core' 
import { CloseRounded } from '@material-ui/icons' 

var displayed = []
const setDisplayed = arr => displayed = arr

const Notifier = () => {
  const dispatch = useDispatch()
  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const snackbars  = useSelector(state => state.snackbar.bars)
  
  snackbars.forEach(({ key, message, options = {}, closed = false }) => {
    if(closed){
      dispatch(actions.remove(key))
      return
    }
    if(displayed.includes(key)) return

    let opt = {
      ...options,
      key,
      onClose: (event, reason, key) => {
        if (options.onClose) {
          options.onClose(event, reason, key)
        }
      },
      onExited: (event, key) => {
        setDisplayed(displayed.filter(id => id !== key))
        dispatch(actions.close(key))
      },
    }
    if(opt.variant === 'error') {
      opt.action = <IconButton onClick={() => closeSnackbar(key)}><CloseRounded style={{ color: '#fff' }}/></IconButton>
    }
    enqueueSnackbar(message, opt)
    setDisplayed([...displayed, key])
  })

  return null
}

export default Notifier
