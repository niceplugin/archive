import { Meteor } from 'meteor/meteor'

export const notUserRedirect =
  (ctx, redirect) => !Meteor.userId() && redirect('signIn')

export const userRedirect =
  (ctx, redirect) => !!Meteor.userId() && redirect('roomList')

