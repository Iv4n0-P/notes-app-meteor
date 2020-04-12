import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Notes } from '../api/notes'
import { Session } from 'meteor/session'

export const NoteListHeader = (props) => {
    return (
        <div className="item-list__header">
        <button className="button" onClick={() => props.meteorCall('notes.insert', (err, res) => {
            if (res) {
                props.Session.set('selectedNoteId', res)
            }
        })}>New Note</button>
        </div>
    )
}

export default withTracker(() => {

    return {
        meteorCall: Meteor.call,
        Session
    }
    })(NoteListHeader)