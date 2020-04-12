import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Notes } from '../api/notes'
import NoteListHeader from './NoteListHeader'
import NoteListItem from './NoteListItem'
import NoteListEmptyItem from './NoteListEmptyItem'
import { Session } from 'meteor/session'

export const NoteList = (props) => {

    return (
        <div className="item-list">
        <NoteListHeader />
        {props.notes.map((note) => <NoteListItem key={note._id} note={note}/>)}
        {props.notes.length === 0 && <NoteListEmptyItem />}
        </div>
    )
}

export default withTracker(() => {
    const selectedNoteId = Session.get('selectedNoteId')

    Meteor.subscribe('notes')
        return {
            notes: Notes.find({}, {
                sort: {
                    updatedAt: -1
                }
            }).fetch().map((note)=> {
                return {
                    ...note,
                    selected: note._id === selectedNoteId
                }
            })
        }
    })(NoteList)