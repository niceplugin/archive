import { FlowRouter } from 'meteor/ostrio:flow-router-extra'

FlowRouter.route('*', {
  name: 'notFound',
  triggersEnter: [
    (ctx, redirect) => redirect('main'),
  ],
})