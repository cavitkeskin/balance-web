import React, { Suspense, lazy, useEffect } from 'react'
import {  Switch, Route, Redirect } from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux'
// import PropTypes from 'prop-types'

// Application
import 'typeface-roboto'
import * as auth from '@/store/auth'
import * as uiActions from '@/store/ui'
import AppBar from '@/components/app-bar'
import AppMenu from '@/components/app-menu'
import Loading from '@/components/loading'
import SnackBars from '@/components/snackbars'
import ErrorBoundary from '@/components/error-boundary'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, Hidden } from '@material-ui/core'

// Lazy Loads
const AuthPage = lazy(() => import(/* webpackChunkName: "auth" */ './pages/auth'))
const DashboardPage = lazy(() => import(/* webpackChunkName: "dashboard" */ './pages/dashboard')) 
const ContactPage = lazy(() => import(/* webpackChunkName: "contact" */ './pages/contact')) 
const Users = lazy(() => import(/* webpackChunkName: "users" */ './pages/users'))
const Setting = lazy(() => import(/* webpackChunkName: "setting" */ './pages/setting'))

const drawerWidth = 240
const useStyles = makeStyles(theme => (
  {
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
    },
    paper: {
      height: '100vh',
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(0),
    },
  }
))

const App = () => {
  const dispatch = useDispatch()
  const ui = useSelector(state => state.ui)
  const session = useSelector(state => state.session)
  const classes = useStyles()

  useEffect(() => {
    dispatch(auth.session())
  }, [])

  const AuthSwitch = (
    <Switch>
      <Route path='/auth' component={AuthPage} />
      <Redirect to='/auth'></Redirect>
    </Switch>
  )

  const PageSwitch = (
    <Switch>
      <Route path='/dashboard' component={DashboardPage} />
      <Route path='/:type(students|contacts|employees|companies)/:id?/:mode?' component={ContactPage} />
      <Route path='/users/:id?' component={Users} />
      <Route path='/settings' component={Setting} />
      <Redirect to='/dashboard'></Redirect>
    </Switch>
  )  

  const SideMenu = (
    <>
      <Hidden mdDown>
        <Drawer
          variant='permanent'
          open={true}
          className={classes.drawer}
          classes={{ paper: classes.paper }}>
          <AppMenu />
        </Drawer>
      </Hidden>
      <Hidden lgUp>
        <Drawer
          variant='temporary'
          open={ui.appMenu}
          onClose={() => dispatch(uiActions.appMenu(false))}
          className={classes.drawer}
          classes={{ paper: classes.paper }}>
          <AppMenu />
        </Drawer>
      </Hidden>
    </>
  )

  if(session.loading)  return <Loading/>

  return (
    <section className={classes.root}>
      <SnackBars/>
      {session.user && SideMenu}
      <div className={classes.content}>
        {session.user && <AppBar />}
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            {session.user ? PageSwitch : AuthSwitch}
          </Suspense>
        </ErrorBoundary>
      </div>
    </section>
  )
}

export default App