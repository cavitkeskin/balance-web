import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

// Application
import Page from '@/components/page'
import Login from './login'
import Register from './register'
import Forgot from './forgot'
import Reset from './reset'

const Auth = ({ match }) => {
  const session = useSelector(state => state.session)
  return session.token ? (
    <Redirect to={'/dashboard'}></Redirect>
  ) : (
    <Page>
      <Switch>
        <Route path={`${match.url}/login`} component={Login} />
        <Route path={`${match.url}/register`} component={Register} />
        <Route path={`${match.url}/forgot`} component={Forgot} />
        <Route path={`${match.url}/reset/:token`} component={Reset} />
        <Redirect to={`${match.url}/login`}></Redirect>
      </Switch>
    </Page>
  )
}

Auth.propTypes = {
  match: PropTypes.object,
  session: PropTypes.object,
}

export default Auth