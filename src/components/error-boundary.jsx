import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, info: null }
  }
  
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({ error, info: errorInfo })
    // console.error({ componentDidCatch: { error, errorInfo } })
  }
  
  render() {
    const { error, info } = this.state

    if (error) {
      return (
        <div style={{ padding: '1em' }}>
          <h1>Something went wrong.</h1>
          <p>{error.message}</p>
          <pre>{info.componentStack}</pre>
        </div>
      )
    }
  
    // eslint-disable-next-line react/prop-types
    return this.props.children
  }
}

export default ErrorBoundary
