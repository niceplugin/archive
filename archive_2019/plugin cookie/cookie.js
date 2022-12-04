(function(){
  var cookie = {};

  // 브라우저 설정이 쿠키 사용 금지 일 경우
  if (!navigator.cookieEnabled) {window.cookie = false; return; }

  // 쿠키 읽어오기 함수
  function load() {
    var cookies = document.cookie && document.cookie.split('; ')
      , i, idx, name, value;

    if (!cookies) {return; }

    for (i = 0; i < cookies.length; i++) {
      idx = cookies[i].indexOf('=');
      name = cookies[i].substring(0, idx);
      value = decodeURIComponent(cookies[i].substring(idx + 1));
      cookie[name] = value;
    }
  }

  // set, remove 예외검사
  function check(obj, removeMode){
    if (typeof obj !== 'object' || obj === null) {
      return console.error('Parameter is invalid.');
    }
    if (typeof obj.name !== 'string' || !obj.name) {
      return console.error('Cookie "name" property must be non-empty string type.');
    }
    if (!removeMode && typeof obj.value !== 'string' && typeof obj.value !== 'number' && typeof obj.value !== 'object') {
      return console.error('Cookie "value" property must be one of string, number or object type.');
    }
    if (obj.domain && typeof obj.domain !== 'string') {
      return console.error('Cookie "domain" property must be string type.');
    }
    if (obj.path && typeof obj.path !== 'string') {
      return console.error('Cookie "path" property must be string type.');
    }
    if (!removeMode && obj.expires && (typeof obj.expires !== 'number' || !isFinite(obj.expires))) {
      return console.error('Cookie "expires" property must be finite number type.');
    }
    if (!removeMode && obj.secure && typeof obj.secure !== 'boolean') {
      return console.error('Cookie "secure" property must be boolean type.');
    }
    if (!removeMode && obj.samesite && (typeof obj.samesite !== 'string' || (obj.samesite !== 'strict' || obj.samesite !== 'lax'))) {
      return console.error('Cookie "samesite" property must be "strict" or "lax" string.');
    }

    return true;
  }

  // 사이트에서 쿠키를 읽어온다
  load();

  function Cookie(){
    // 해당 이름의 쿠키 값 반환
    this.get = function(name, origin){
      if (cookie[name]) {
        // 오리진 요청시 문자열 반환
        if (origin) {return cookie[name]; }
        // JSON 파싱 시도
        try {return JSON.parse(cookie[name]); }
        // 파싱 불가시 문자열 반환
        catch {return cookie[name]; }
      }
      else {return void 0; }
    };

    // 쿠키 생성
    this.set = function(obj){
      if (!check(obj)) {return; }

      obj.value = encodeURIComponent(JSON.stringify(obj.value));

      // 옵션 기본값 처리
      obj.domain = obj.domain ? '; domain=' + obj.domain : '';
      obj.path = obj.path ? '; path=' + obj.path : '';
      obj.samesite = obj.samesite ? '; samesite=' + obj.samesite : '';
      obj.secure = obj.secure ? '; secure' : '';
      obj.expires = obj.expires ? (function(){
        var date = new Date();

        date.setTime(new Date().getTime() + obj.expires * 1000);
        return '; expires=' + date.toUTCString();
      })() : '';

      // 쿠키 저장
      document.cookie = `${obj.name}=${obj.value}${obj.domain}${obj.path}${obj.samesite}${obj.secure}${obj.expires}`;

      load();

      return true;
    };

    // 해당 이름의 쿠키 삭제
    this.remove = function(obj){
      if (!check(obj, true)) {return; }

      // 옵션 기본값 처리
      obj.domain = obj.domain ? '; domain=' + obj.domain : '';
      obj.path = obj.path ? '; path=' + obj.path : '';

      // 쿠키 삭제
      document.cookie = `${obj.name}=${obj.domain}${obj.path};expires=Thu, 01 Jan 1970 00:00:00 GMT`;

      delete cookie[obj.name];
      load();

      return true;
    };

    // 쿠키 네임 리스트 반환
    Object.defineProperty(this, 'list', {
      get(){
        var list = [], name;

        for (name in cookie){list.push(name); }

        return list;
      }
    });
  }

  window.cookie = new Cookie();
  Object.freeze(window.cookie);
})();