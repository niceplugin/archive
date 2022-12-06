import { Meteor } from 'meteor/meteor'
import { Messages } from '/imports/collections'

Meteor.methods({
  messageInsert(messages) {
    return Messages.insert(messages)
  },

})