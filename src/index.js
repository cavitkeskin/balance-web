import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './app.jsx'
import { store } from './store'
import ErrorBoundary from '@/components/error-boundary'
import { SnackbarProvider } from 'notistack'

import CssBaseline from '@material-ui/core/CssBaseline'

render(
  <Provider store={store}>
    <CssBaseline />
    <Router>
      <ErrorBoundary>
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
          <App />
        </SnackbarProvider>
      </ErrorBoundary>
    </Router>
  </Provider>,
  document.getElementById('root')
)
