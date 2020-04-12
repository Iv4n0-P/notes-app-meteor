import React from 'react'
import { Session } from 'meteor/session'
import { withTracker } from 'meteor/react-meteor-data'
import { Notes } from '../api/notes'
import { Meteor } from 'meteor/meteor'
import browserHistory from '../api/myHistory'

export class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.note ? this.props.note.title : '',
            body: this.props.note ? this.props.note.body : ''
        }
    }

    handleBodyChange(e) {
        this.setState({ body: e.target.value })
        this.props.call('notes.update', this.props.note._id, { body: e.target.value })
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value })
        this.props.call('notes.update', this.props.note._id, { title: e.target.value })
    }

    onClick() {
        this.props.call('notes.remove', this.props.note._id)
        this.props.browserHistory.push('/dashboard')
        Session.set('selectedNoteId', undefined)
    }

    render() {
        if (this.props.note) {
            return (
                <div className="editor">
                    <input className="editor__title" type="text" value={this.state.title} placeholder="Yout title here" onChange={this.handleTitleChange.bind(this)} />
                    <textarea className="editor__body" value={this.state.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)}></textarea>
                    <div>
                    <button className="button button--secondary" type="button" onClick={this.onClick.bind(this)}>Delete note</button>
                    </div>
                    </div>
            )
        } else {
            return (
                <div className="editor">
                    <p className="editor__message">{this.props.selectedNoteId ? 'Note not found' : 'Please select or create a note'}</p>
                </div>)
        }
    }
}




export default withTracker(() => {
    const selectedNoteId = Session.get('selectedNoteId')
    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call,
        browserHistory
    }
})(Editor)