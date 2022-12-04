import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
import { userRedirect } from '/imports/util/routeEnter'

FlowRouter.route('/signUp', {
  name: 'signUp',
  triggersEnter: [userRedirect],
  async action() {
    await import('/imports/client/pages/signUpPage')
    this.render('baseLayout', 'signUpPage')
  },
})