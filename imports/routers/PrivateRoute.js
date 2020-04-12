import React from 'react'
import {Route, Redirect} from 'react-router-dom'

export default ({isAuthenticated, component: Component, ...rest}) => {
    return (
        <div>
        <Route {...rest} component={(props) => (
            isAuthenticated ? (<div><Component {...props}/></div>) : (<Redirect to='/'/>) 
        )
    }/>
        </div>
    )
}
   