import { Meteor } from 'meteor/meteor'
import { Messages } from '/imports/collections'

Meteor.methods({
  messageInsert(message) {
    return Messages.insert({ message })
  }
})