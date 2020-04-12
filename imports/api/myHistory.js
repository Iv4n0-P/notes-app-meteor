import { createBrowserHistory, createMemoryHistory } from 'history'
import { Meteor } from 'meteor/meteor'

const browserHistory = Meteor.isServer ? createMemoryHistory() : createBrowserHistory()

export default browserHistory