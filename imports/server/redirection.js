import { ShortUrl } from '/imports/common/collections'

WebApp.connectHandlers.use('/', (req, res, next)=>{
  const isIE = req.headers['user-agent'].match('Trident');
  if (isIE) {
    const page = Assets.getText('no_ie.html');
    // res.writeHead(200);
    return res.end(page);
  }

  const path = req.url.replace('/', '');

  // 정해진 경로일 경우
  if (!path || path === 'chat' || path === 'zip') {
    return next();
  }

  // 압축 URL 일 경우
  const data = ShortUrl.findOne({zip: path});
  if (data) {
    res.writeHead(301, {'Location': data.url});
    return res.end();
  }

  // 그외 페이지 클라이언트 라우터가 404 처리
  return next();
});