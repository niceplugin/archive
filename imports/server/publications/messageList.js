import { Meteor } from 'meteor/meteor'
import { Messages } from '/imports/collections'

Meteor.publish('pubMessages', function() {
  return Messages.find({})
})