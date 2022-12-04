import { Meteor } from 'meteor/meteor'

const devMode = Meteor.isDevelopment
const user = Boolean(Meteor.userId())

export const notUserRedirect =
  (ctx, redirect) => devMode || !user && redirect('signIn')

export const userRedirect =
  (ctx, redirect) => devMode || user && redirect('main')

