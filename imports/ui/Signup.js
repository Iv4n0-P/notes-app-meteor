import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Accounts } from 'meteor/accounts-base'
import browserHistory from '../api/myHistory'

export default () => {

    const [errorMessage, setErrorMessage] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleOnSubmit = (e) => {
        e.preventDefault()
        //ovde će se validirat lozinka zato što je hašira kad je pošalje meteoru pa je ne možemo validirat
        if (password.length < 8) {
            return setErrorMessage('Password must be minimum 8 characters long')
        }

        Accounts.createUser({ email, password }, (err) => {
            if (err) {
                setErrorMessage(err.reason)
            } else {
                setEmail('')
                setPassword('')
                setErrorMessage('')
                browserHistory.push('/link')
            }
        })
    }

    return (
        <div className="boxed-view">
        <div className="boxed-view__box">
            <h1>Signup</h1>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleOnSubmit} noValidate className="boxed-view__form">
                <input type="email" name="email" placeholder="E-mail" value={email} onChange={(e) => { setEmail(e.target.value.trim()) }} />
                <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value.trim()) }} />
                <button className="button">Signup</button>
            </form>
            <Link to="/">Already have account? Login here</Link>
            </div>
        </div>
    )
}