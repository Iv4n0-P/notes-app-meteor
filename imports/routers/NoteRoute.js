//ovo uopće ne radi, kopija PrivateRoute a onEnter uopće ne registrira
//i zbog toga kad se refresha ne ostaje označen note, briše se id iz url-a i briše se Session varijabla umjesto da se seta

import React from 'react'
import {Route, Redirect} from 'react-router-dom'

export default ({isAuthenticated, component: Component, ...rest}) => {

    const onEnterNote = (nextState) => {
        console.log(nextState)
        if (!Meteor.userId()) {
            browserHistory.replace('/')
        } else {
            Session.set('selectedNoteId', nextState.params.id)
        }
    }

    return (
        <div>
        <Route {...rest} component={(props) => {
            return isAuthenticated ? (<div><Component {...props}/></div>) : (<Redirect to='/'/>) 
    }
    } onEnter={onEnterNote}/>
        </div>
    )
}
   

