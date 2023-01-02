import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
import { notUserRedirect } from '/imports/util/routeEnter'

FlowRouter.route('/chatRoom/:_id', {
  name: 'chatRoom',
  triggersEnter: [notUserRedirect],
  async action() {
    await import('/imports/client/pages/chatRoomPage')
    this.render('baseLayout', 'chatRoomPage')
  },
})