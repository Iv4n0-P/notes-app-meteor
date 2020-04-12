import { Meteor } from 'meteor/meteor'
import expect from 'expect'
import { Notes } from '../../imports/api/notes'

if (Meteor.isServer) {
    describe ('Block notes', function () {

        const testNote = {
            _id: 'testNoteId1',
            title: 'My Title',
            body: 'My body for note',
            updatedAt: 0,
            userId: 'testUserId1'
        }

        const testNote2 = {
            _id: 'testNoteId2',
            title: 'My Title 2',
            body: 'My body for note 2',
            updatedAt: 0,
            userId: 'testUserId2'
        }

        beforeEach(function () { //ovo je mocha lifecycle motoda koja će se pokrenit prije svakog testa
            Notes.remove({}) //reset prvo, brisanje svega. To neće dirat matičnu bazu nego testnu bazu koju meteor kreira kada se pokrene u test modu
            Notes.insert(testNote)
            Notes.insert(testNote2)
        })

        it ('it should insert new note', function () {
            const _id = Meteor.server.method_handlers['notes.insert'].apply({
                userId: testNote.userId
            })

            expect(Notes.findOne({_id, userId: testNote.userId})).toBeTruthy()
            
        })

        it('should not insert note', function () {

            expect(() => {
                Meteor.server.method_handlers['notes.insert']()
            }).toThrow()
        })

        it('should remove note', function () {
            Meteor.server.method_handlers['notes.remove'].apply({userId: testNote.userId}, [testNote._id])
            expect(Notes.findOne({_id: testNote._id})).toBeFalsy()
        })

        it('should not remove note if unauthenticated', function () {
            expect(() => {
                Meteor.server.method_handlers['notes.insert'].apply({}, [testNote._id])
            }).toThrow()

        })

        it('should not remove note if invalid _id', function () {
            expect(() => {
                Meteor.server.method_handlers['notes.remove'].apply({userId: testNote.userId})
            }).toThrow()

        })

        it('should update note', function () {
            const title = 'This is an updated title'
            Meteor.server.method_handlers['notes.update'].apply({userId: testNote.userId}, [testNote._id, {title}])
            
            const note = Notes.findOne(testNote._id)
            
            expect(note.updatedAt).toBeGreaterThan(0)
            expect(note.title).toContain(title)
            expect(note.body).toContain(testNote.body)
        })

        it('should throw error if extra updates', function () {
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({userId: testNote.userId}, [testNote._id, {title: 'New Title', name: 'Ivanko Perišić'}])
            }).toThrow()
        })

        it('should not update not if user was not creator', function () {
            const title = 'This is an updated title'
            Meteor.server.method_handlers['notes.update'].apply({userId: 'fakeId'}, [testNote._id, {title}])
            
            const note = Notes.findOne(testNote._id)
            
            expect(note.title).toContain(testNote.title)
        })

        it('should not update note if unauthenticated', function () {
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({}, [testNote._id])
            }).toThrow()

        })

        it('should not update note if invalid _id', function () {
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({userId: testNote.userId})
            }).toThrow()

        })

        it ('should return user notest', function () {
            const res = Meteor.server.publish_handlers.notes.apply({userId: testNote.userId})
            const notes = res.fetch() //dobit će array

            expect(notes.length).toBe(1)
            expect(notes[0]).toEqual(testNote)
        })

        it ('should not return note if user has no notes', function () {
            const res = Meteor.server.publish_handlers.notes.apply({userId: 'test'})
            const notes = res.fetch() //dobit će array

            expect(notes.length).toBe(0)
        })
    })
}

