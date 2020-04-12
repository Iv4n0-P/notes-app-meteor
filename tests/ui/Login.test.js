import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'
import { Login } from '../../imports/ui/Login'
import '../setupTests.js'

if (Meteor.isClient) {
    describe('Login', function () {

        it('should call loginWithPassword with the form data', function () {
            const email = 'test@test.com'
            const password = '123$'
            const spy = expect.createSpy()
            const wrapper = mount(<Login loginWithPassword={spy} />)

            wrapper.find('#email').simulate('change', { target: { value: email } })
            wrapper.find('#password').simulate('change', { target: { value: password } })
            wrapper.find('form').simulate('submit')

            expect(spy.calls[0].arguments[0]).toEqual({ email })
            expect(spy.calls[0].arguments[1]).toBe(password)

        })
    })
}