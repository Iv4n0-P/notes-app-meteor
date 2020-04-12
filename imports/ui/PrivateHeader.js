import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import browserHistory from '../api/myHistory'
import { Accounts } from 'meteor/accounts-base'
import { Session } from 'meteor/session'

export const PrivateHeader = (props) => {
    const navImgSrc = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg'

    return (
        <div className="header">
            <div className="header__content">
            <img className="header__nav-toggle" onClick={props.handleNavToggle} src={navImgSrc}/>
                <h1 className="header__title">{props.title}</h1>
                <button className="button button--to-button" onClick={props.handleOnLogout}>Logout</button>
            </div>
        </div>
    )
} 

export default withTracker(() => {
        return {
            handleOnLogout: () => { Accounts.logout(), browserHistory.push('/') },
            isNavOpen: Session.get('isNavOpen'),
            handleNavToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen'))
        }
    })(PrivateHeader)