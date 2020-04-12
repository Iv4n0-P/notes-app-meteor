import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'
import { PrivateHeader } from '../../imports/ui/PrivateHeader'
import '../setupTests.js'

if (Meteor.isClient) {
    describe('PrivateHeader', function () {
        it('should set title i render it', function () {
            //prvo će renderirat komponentu koju će čuvat wrapper
            const wrapper = mount(<PrivateHeader title="Test title" />)
            const h1Text = wrapper.find('h1').text()
            expect(h1Text).toBe('Test title')
        })

        it('should call the function', function () {
            const spy = expect.createSpy()
            expect(spy).toNotHaveBeenCalled()
        })

        it('should call handleOnLogout funciju', function () {
            const spy = expect.createSpy()
            const wrapper = mount (<PrivateHeader title="" handleOnLogout={spy()}/>)

            wrapper.find('button').simulate('click')
            expect(spy).toHaveBeenCalled()
        })
    })
}