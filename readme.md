# cookie.js (for client)

작업하다가 쿠키를 다뤄야 해서 예전에 만들어 놓았던 쿠키 관리 플러그인을 수정함.

원래 documnet.cookie 하면 쿠키야 조회할 수 있었지만, 생명주기 설정이나 인/디코딩 등이 매우 번거로워서 만듦.

npm에 올릴까 하다가 이미 cookie 라는 이름으로 있길레 관둠.(서버용인듯 하지만)

## Browser Support

IE는 9부터

나머지는 버전 크게 신경 안써도 잘 돌아감

## API

### window.cookie

별거 없음 쿠키 객체 만들었을뿐

### .list

참조형 프로퍼티 저장된 쿠키명들을 배열 리스트로 반환한다. (읽기전용)

```
cookie.list; // ['hello', 'korea', 'mike']
```

### .get(name)

해당 쿠키명의 값을 불러온다.
(해당 쿠키 없을 경우 undefined 반환)

객체, 배열, 숫자일 경우 해당 데이터 타입으로 파싱해서 반환해준다.
(NaN, -Infinity, Infinity 는 숫자이지만 파싱하지 않고 문자열로 반환)

파싱할 수 없는 값일 경우 문자열로 반환

```
cookie.get('hello'); // 'world'
```

### .set(object)

쿠키를 생성, 수정할 수 있다.(성공시 true 반환) 객체 구성은 아래와 같다.

`{name, value[, domain, path, expires, secure, samesite]}`

자세한 정보는 [여기](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie#Write_a_new_cookie)에서 알아보도록 하자.

모든 `value`는 JSON.stringify로 변환 후 encodeURIComponent 하여 저장된다.

`expires`는 사용하기 편하게 커스텀 했는데 생명주기로 설정할 시간만큼을 초단위 숫자로 입력하면 된다.

```
cookie.set({
    name: 'color',
    value: ['red', 'black', 'white'],
    expires: 60 // 1분 후 만료되는 쿠키
});
```

### .remove(object)

쿠키를 삭제한다.(성공시 true 반환) 객체 구성은 아래와 같다.

`{name[, domain, path]}`

```
cookie.remove('color');
```