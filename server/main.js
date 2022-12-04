import '/imports/collections'
import '/imports/server/methods'
import '/imports/server/publications'

import { Meteor } from 'meteor/meteor'

Meteor.startup(() => {
  console.log(`Server started at ${ new Date() }`)
})
