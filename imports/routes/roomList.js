import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
import { notUserRedirect } from '/imports/util/routeEnter'

FlowRouter.route('/roomList', {
  name: 'roomList',
  triggersEnter: [notUserRedirect],
  async action() {
    await import('/imports/client/pages/roomListPage')
    this.render('baseLayout', 'roomListPage')
  },
})