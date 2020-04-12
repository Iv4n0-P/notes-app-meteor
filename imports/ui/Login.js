import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import browserHistory from '../api/myHistory'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'

export const Login = (props) => {

  const [errorMessage, setErrorMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleOnSubmit = (e) => {
    e.preventDefault()

    props.loginWithPassword({ email }, password, (err) => {
      if (err) {
        setErrorMessage(err.reason)
      } else {
        setEmail('')
        setPassword('')
        setErrorMessage('')
        browserHistory.push('/')
      }
    })
  }

  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Login</h1>
        {errorMessage && <p id="paragraph">{errorMessage}</p>}
        <form onSubmit={handleOnSubmit} noValidate className="boxed-view__form">
          <input id="email" type="email" name="email" placeholder="E-mail" value={email} onChange={(e) => { setEmail(e.target.value.trim()) }} />
          <input id="password" type="password" name="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value.trim()) }} />
          <button className="button">Login</button>
        </form>
        <Link to="/signup">Need an account?</Link>
      </div>
    </div>
  )
}

export default withTracker(() => {
  return {
    loginWithPassword: Meteor.loginWithPassword
  }
})(Login)

/* class Login extends React.Component {
    constructor(props) {
      super(props)

      this.handleSetErrorMessage = this.handleSetErrorMessage.bind(this)
      this.state = {error: ''}
    }

    handleSetErrorMessage(formErrorMessage) {
      this.setState({
        error: formErrorMessage
      })
    }

    render() {
      return (
        <div>
      {this.state.error && <p>{this.state.error}</p>}
          <p>This is Login component</p>
          <Form formSubmit={'login'} handleSetErrorMessage={this.handleSetErrorMessage}/>
          <Link to="/signup">Need an account?</Link>
      </div>
      )
    }
  }

  export default Login */


