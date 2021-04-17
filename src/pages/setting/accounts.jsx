import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// Application
// import UserForm from './user-form'
import * as action from '@/store/accounts'

// Material
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  content: {
    padding: theme.spacing(2),
    backgroundColor: 'white',
  },
})

class AccountList extends React.Component {
  componentDidMount() {
    const { search } = this.props
    search({})
  }
  render() {
    const { classes, accounts } = this.props
    return (
      <div className={classes.content}>
        {accounts.data.map((account, n) => (
          <div key={n}>{account.name}</div>
        ))}
      </div>
    )
  }
}

AccountList.propTypes = {
  classes: PropTypes.object.isRequired,
  search: PropTypes.func,
  accounts: PropTypes.object,
}

const mapStateToProps = state => ({
  accounts: state.accounts,
})

const mapDispatchToProps = {
  search: action.search,
  get: action.get,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AccountList))
