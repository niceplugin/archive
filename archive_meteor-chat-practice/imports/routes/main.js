import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
import { notUserRedirect, userRedirect } from '/imports/util/routeEnter'

FlowRouter.route('/', {
  name: 'main',
  triggersEnter: [notUserRedirect, userRedirect],
})