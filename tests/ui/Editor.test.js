import { Editor } from '../../imports/ui/Editor'
import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'
import { notes } from '../fixtures/fixtures'

if (Meteor.isClient) {
    describe('Editor', function () {
        let browserHistory
        let call

        beforeEach(function () {
            call = expect.createSpy()
            browserHistory = {
                push: expect.createSpy()
            }
        })

        it('should render Please select or create a note message', function () {
            const wrapper = mount(<Editor />)
            const p = wrapper.find('p').text()
            expect(p).toBe('Please select or create a note')
        })

        it('should render Note not found message if there is selectedNoteId and no note', function () {
            const wrapper = mount(<Editor selectedNoteId={notes[0]._id}/>)
            expect(wrapper.find('p').text()).toBe('Note not found')
        })

        it('should remove note', function () {
            const wrapper = mount(<Editor call={call} browserHistory={browserHistory} selectedNoteId={notes[0]._id} note={notes[0]}/>)
            wrapper.find('button').simulate('click')
            expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id)
            expect(browserHistory.push).toHaveBeenCalledWith('/dashboard')
        })

        it ('should update the note body on textarea change', function () {
            const newBody = 'This is my new body text'
            const wrapper = mount(<Editor call={call} browserHistory={browserHistory} selectedNoteId={notes[0]._id} note={notes[0]}/>)
            wrapper.find('textarea').simulate('change', {
                target: {
                    value: newBody
                }
            })
            expect(wrapper.state('body')).toBe(newBody)
            expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {body: newBody})
        })

        it ('should update the note title on input change', function () {
            const newTitle = 'This is my new title'
            const wrapper = mount(<Editor call={call} browserHistory={browserHistory} selectedNoteId={notes[0]._id} note={notes[0]}/>)
            wrapper.find('input').simulate('change', {
                target: {
                    value: newTitle //ovo se prosljeđuje kao e, da se može zvat e.target.value
                }
            })
            expect(wrapper.state('title')).toBe(newTitle)
            expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {title: newTitle})
        })

        it ('should set state for new note', function () {
            const wrapper = mount(<Editor />)
            wrapper.setProps({
                selectedNoteId: notes[0]._id,
                note: notes[0]
            })
            expect(wrapper.state('title')).toBe('')
            expect(wrapper.state('body')).toBe('')
        })
    })
}