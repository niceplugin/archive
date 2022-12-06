import { Meteor } from 'meteor/meteor'
import { Messages } from '/imports/collections'

Meteor.publish('chatMsg', function(roomId) {
  return Messages.find({
    roomId
  })
})