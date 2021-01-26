import Collections from '/imports/common/collections'

if (Meteor.isDevelopment) {
  Collections.Guest.remove({});
  Collections.ChatText.remove({});
  console.log('Remove all mongodb data !! (only in dev mode)');
}

Meteor.publish('guest', function(){
  const id = this.connection.id;

  Meteor.call('addGuest', id);

  this.onStop(function(){
    const id = this.connection.id;

    Meteor.call('removeGuest', id);
  });

  return Collections.Guest.find({ id });
});

Meteor.publish('chat', function(){
  return Collections.ChatText.find({ createdAt: { $gt: new Date() } }, { limit: 50 });
});