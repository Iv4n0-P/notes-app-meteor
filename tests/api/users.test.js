import expect from 'expect'
import { Meteor } from 'meteor/meteor'
import { validateNewUser2 } from '../../imports/api/users'

if (Meteor.isServer) {
    describe('Users', function () {

        it('It should allow valid email address', function () {
            const testUser = {
                emails: [{
                    address: 'test@example.com'
                }]
            }

            const res = validateNewUser2(testUser)

            expect(res).toBe(true)
        })

        it('should reject invalid email', function () {

            const testUser = {
                emails: [{
                    address: '2333'
                }]
            }

            expect(() => {
                validateNewUser2(testUser)
            }).toThrow()
        })
    })
}
