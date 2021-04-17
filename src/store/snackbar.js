var n = 1
export const create = payload => ({
  type: 'CREATE_SNACKBAR',
  payload: {
    ...payload,
    options: { autoHideDuration: 3000, ...payload.options },
    key: n++, //key || new Date().getTime() + Math.random(),
    closed: false,
  },
})

export const info = message => create({ message, options: { variant: 'info' } })
export const warning = message => create({ message, options: { variant: 'warning' } })
export const success = message => create({ message, options: { variant: 'success' } })

export const error = error => {
  let options = { 
    variant: 'error', 
    autoHideDuration: 15000,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    }, 
  }

  if(typeof error === 'string') return create({ 
    message: error, 
    options,
  })
  
  if(error.response){
    let message
    const { status, statusText, data } = error.response
    switch(status){
      case 400: 
        message = Object.keys(data).map(key => `${key}: ${JSON.stringify(data[key])}`).join('\n')
        break
      default: 
        message = typeof data === 'string' ? data : statusText
    }
    return create({ message, options })
  }

  return create({ 
    message: error.message, 
    options,
  })
}

export const close = key => ({
  type: 'CLOSE_SNACKBAR',
  key,
})

export const remove = key => ({
  type: 'REMOVE_SNACKBAR',
  key,
})

const defaultState = {
  bars: [],
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'CREATE_SNACKBAR':
      return {
        ...state,
        bars: [
          ...state.bars,
          {
            key: action.key,
            ...action.payload,
          },
        ],
      }

    case 'CLOSE_SNACKBAR':
      return {
        ...state,
        bars: state.bars.map(
          bar => bar.key === action.key ? { ...bar, closed: true } : bar 
        ),
      }

    case 'REMOVE_SNACKBAR':
      return {
        ...state,
        bars: state.bars.filter(
          bar => bar.key !== action.key,
        ),
      }

    default:
      return state
  }
}
