import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
import { userRedirect } from '/imports/util/routeEnter'

FlowRouter.route('/signIn', {
  name: 'signIn',
  triggersEnter: [userRedirect],
  async action() {
    await import('/imports/client/pages/signInPage')
    this.render('baseLayout', 'signInPage')
  },
})