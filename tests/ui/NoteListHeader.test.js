import { NoteListHeader } from '../../imports/ui/NoteListHeader'
import { Meteor } from 'meteor/meteor'
import { mount } from 'enzyme'
import expect from 'expect'
import React from 'react'
import { notes } from '../fixtures/fixtures'

if(Meteor.isClient) {
    describe('NoteListHeader', function () {

        let meteorCall
        let Session

        beforeEach(()=>{
            meteorCall = expect.createSpy()
            Session = {
                set: expect.createSpy()
            }
        })

        it('should call spy with defaul arguments', function () {
            const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session} />)
            wrapper.find('button').simulate('click')
            meteorCall.calls[0].arguments[1](undefined, notes[0]._id)
            expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id)
            expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert') 
        })

        it('should not set Session for failed insert', function () {
            const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>)
            wrapper.find('button').simulate('click')
            meteorCall.calls[0].arguments[1]({},undefined)
            expect(Session.set).toNotHaveBeenCalled
        })
    })
}
 