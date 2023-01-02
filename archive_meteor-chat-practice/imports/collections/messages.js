import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

const Messages = new Mongo.Collection('Messages')

if (Meteor.isServer) {
  Messages.deny({
    insert() {
      return true
    },
    update() {
      return true
    },
    remove() {
      return true
    },
  })
}

export default Messages