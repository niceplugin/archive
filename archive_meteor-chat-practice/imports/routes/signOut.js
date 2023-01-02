import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
import { notUserRedirect } from '/imports/util/routeEnter'

FlowRouter.route('/signOut', {
  name: 'signOut',
  triggersEnter: [notUserRedirect],
  async action() {
    await import('/imports/client/pages/signOutPage')
    this.render('baseLayout', 'signOutPage')
  },
})