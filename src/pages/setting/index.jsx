import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

// Material
import { withStyles } from '@material-ui/core/styles'

// components
import Page from '@/components/page'

// Application
import AccountList from './accounts'
import Profile from './profile'


const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    minWidth: 0, // So the Typography noWrap works
  },
})

const Setting = ({ match, classes }) => {
  return (
    <Page>
      <div className={classes.content}>
        <Switch>
          <Route path={`${match.url}/account`} component={AccountList} />
          <Route path={`${match.url}/profile`} component={Profile} />
          <Redirect to={`${match.url}/profile`}></Redirect>
        </Switch>
      </div>
    </Page>
  )
}

Setting.propTypes = {
  match: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  location: PropTypes.object,
}

const mapStateToProps = state => {
  return {
    session: state.session,
  }
}

const connector = connect(mapStateToProps)
const styler = withStyles(styles)
export default connector(styler(Setting))
