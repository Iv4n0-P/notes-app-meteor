import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import moment from 'moment'
import SimpleSchema from 'simpl-schema'

export const Notes = new Mongo.Collection('notes')

if (Meteor.isServer) {
    Meteor.publish('notes', function () {
        return Notes.find({userId: this.userId})
    })
}

Meteor.methods({
    'notes.insert'() {
        if (!this.userId) {
            throw new Meteor.Error('not-autorized')
        }

        return Notes.insert({
            title: '',
            body: '',
            userId: this.userId,
            updatedAt: moment().valueOf()
        })
    },
    'notes.remove'(_id) {
        if (!this.userId) {
            throw new Meteor.Error('not-autorized')
        }

        try {
            new SimpleSchema({
                _id: {
                    type: String,
                    min: 1
                }
            }).validate({
                _id
            })
        } catch (e) {
            throw new Meteor.Error(400, e.message)
        }

        return Notes.remove({ _id, userId: this.userId })
    },
    'notes.update'(_id, updates) {
        if (!this.userId) {
            throw new Meteor.Error('not-autorized')
        }

        try {
            new SimpleSchema({
                _id: {
                    type: String,
                    min: 1
                },
                title: {
                    type: String,
                    optional: true
                },
                body: {
                    type: String,
                    optional: true
                }
            }).validate({
                _id,
                ...updates //ovde spreda da provjeri SVE šta se može poslat kroz updates objekt a ne samo title and body, da se pošalje nešto stoto bi prošlo validaciju ako bi se gledao točno title iil dočno body, jer u updates objektu može bit i hakirano dodan dodatni property, a ovako će sve spreadat i pogledat sve živo, sva propertija koja su došla sa updates objektom 
            })
        } catch (e) {
            throw new Meteor.Error(400, e.message)
        }

        return Notes.update({ _id, userId: this.userId }, { $set: { updatedAt: moment().valueOf(), ...updates } })
    }
})

