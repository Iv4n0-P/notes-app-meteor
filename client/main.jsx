import ReactDOM from 'react-dom'
import React from 'react'
import { Meteor } from 'meteor/meteor';
import AppRouter from '../imports/routers/AppRouter'
import { Session } from 'meteor/session'
import browserHistory from '../imports/api/myHistory'
import { Tracker } from 'meteor/tracker'

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId')
  Session.set('isNavOpen', false)
  
  if (selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`)
    
  }
})

Tracker.autorun(()=>{
  const isNavOpen = Session.get('isNavOpen')
  //ako je true onda ćemo dodat klasu na tijelo dokumenta a ako je false onda ćemo removat klasu
  document.body.classList.toggle('is-nav-open', isNavOpen)
})

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined)
  Session.set('isNavOpen', false)
  ReactDOM.render(<AppRouter />, document.getElementById('react-target'));
});


