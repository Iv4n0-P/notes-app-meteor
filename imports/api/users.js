import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import SimpleSchema from 'simpl-schema'

export const validateNewUser2 = (user) => {
  const email = user.emails[0].address

  try {
    new SimpleSchema({
      email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
      }
    }).validate({ email })
  } catch (e) {
    throw new Meteor.Error(400, e.message)
  }
  return true
}

if (Meteor.isServer) {
  Accounts.validateNewUser(validateNewUser2);
}
