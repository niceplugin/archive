import { ShortUrl } from '/imports/common/collections'

WebApp.connectHandlers.use('/', (req, res, next)=>{
  const DEFAULT_DOMAIN = 'url-zip.com'
  const host = req.headers.host;
  const path = req.url.replace('/', '');
  const isIE = req.headers['user-agent'].match('Trident');

  // 호스트 도메인이 url-zip.com 일 경우
  if (Meteor.isDevelopment || host === DEFAULT_DOMAIN) {
    if (isIE) { // 구형 브라우저 IE 일 경우
      const page = Assets.getText('no_ie.html');
      // res.writeHead(200);
      return res.end(page);
    }
    return next();
  }

  // 압축 URL 서비스 커넥션으로 판단될 경우
  const result = ShortUrl.findOne( {zip: path} );
  const _default = `https://${DEFAULT_DOMAIN}`;
  const url = result ? result.url : _default;
  const status = result ? 301 : 302;

  res.writeHead(status, { 'Location': url });
  return res.end();
});