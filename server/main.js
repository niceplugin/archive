import '/imports/server/redirection'
import '/imports/server/publish'
import '/imports/server/methods'

Meteor.startup(()=>{
  Meteor.isDevelopment && console.log('Meteor server started !!');
});

Meteor.onConnection(()=>{
  Meteor.isDevelopment && console.log('New connection !!');
});

WebApp.connectHandlers.use('/', (req, res, next)=>{
  const path = req.url.replace('/', '');

  if (path === '' || path === 'chat' || path === 'zip') {
    return next();
  }

  const { url } = Meteor.call('getUrl', path) || {};
  if (url) {
    res.writeHead(301, { 'Location': url });
    return res.end();
  }

  next();
});