import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

const Rooms = new Mongo.Collection('Rooms')

if (Meteor.isServer) {
  Rooms.deny({
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

export default Rooms