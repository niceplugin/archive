- [English](https://github.com/niceplugin/nicedb)
- [한국어](https://github.com/niceplugin/nicedb/blob/master/docs/readme_ko.md)

* * *

# 쉽고 간단한 NiceDB

**NiceDB** 는 **IndexedDB**를 쉽고 간단하게 사용하기 위한 라이브러리 입니다.
소규모 **SPA**, **PWA** 에서 사용하기 위해 만들었습니다.
**MongoDB** 와 유사한 인터페이스로 구성되었습니다.

이것을 사용하면 다음과 같은 장점이 있습니다:

- 코드가 간결해짐.
- 버전을 관리가 필요성 없음.
- 스토어 및 인덱스 설정을 자동으로 업데이트.

> **IndexedDB**란 무엇인가요? [링크](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

## 설치

### NPM

```shell
npm install nicedb
```
설치 이후 자바스크립트 파일에서 사용:
```js
import nicedb from "nicedb"
// ...
```

## 읽기 전에

**NiceDB** 에서 제공하는 모든 함수는 비동기이므로 `Promise`를 리턴합니다.
그러므로 `.then()`, `catch()`, `.finally()`로 후처리를 해야 합니다.

비동기 함수가 아닐 경우, 동기함수라고 명시됩니다.

> `Promise`란 무엇인가요? [링크](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

### 단어 설명

혼란을 예방하기 위해 이곳에서 사용할 단어 일부를 정의합니다.

- 저장소(store): 저장소는 사용자가 데이터를 저장 할 공간.
- 문서: 사용자가 저장할 또는 저장한 데이터 객체.
- 필드: 문서(객체)에서 사용된 키.
- 쿼리: 문서를 찾기 위한 조건문.

### 제한사항

- 복합 쿼리를 지원하지 않음.
- `skip`, `sort` 지원하지 않음.

### 브라우저 호환성

**IndexedDB** 는 공식 웹 스팩의 일부입니다.
그러므로 `Chrome`, `Firefox`, `Safari`, `Edge` 와 같은 최신 브라우저에서 동작합니다. [링크](https://caniuse.com/?search=indexeddb)

**IndexedDB 2.0** API 를 사용하므로 `IE`는 지원하지 않습니다.

## 목차

- [API `NiceDB class`](#api-nicedb-class)
  - [`define()`](#define)
  - [`getStore()` 동기함수](#getstore-동기함수)
  - [`onversionchange`](#onversionchange)
  - [`onblocked`](#onblocked)
- [API `Store class`](#api-store-class)
  - [`name`](#name)
  - [`indexList`](#indexlist)
  - [`indexInfo`](#indexinfo)
  - [`find()`](#find)
  - [`findOne()`](#findone)
  - [`count()`](#count)
  - [`insert()`](#insert)
  - [`upsert()`](#upsert)
  - [`remove()`](#remove)
  - [`clear()`](#clear)
- [비교 쿼리 연산자](#비교-쿼리-연산자)

* * *

# API `NiceDB class`

## `define()`

라이브러리를 사용하기 전 저장소를 정의하는 메서드.
라이브러리에서 재공되는 모든 메서드는 `define()`의 `Promise.resolve` 이후 사용할 수 있습니다.

### 문법

```js
define( stores )
```

### 파라미터

`stores`(필수-객체)

- 저장소를 정의하는 객체.
  - 키: 저장소의 이름 문자열.
  - 값: 저장소에서 사용할 문서의 "필드를 정의하는 문자열 또는 객체"로 이루어진 배열.
    - 객체일 경우 `키=필드명`, `값=옵션객체`

> `_id`는 필드명으로 선언할 수 없습니다. 하지만 쿼리에 사용할 수 있습니다.

> 필드배열에 선언하지 않은 필드명을 사용하여 문서를 저장할 수 있습니다.
> 하지만 해당 필드로 검색은 할 수 없습니다.
> 
> 선언된 필드더라도 Boolean 을 값으로 사용할 경우, 문서는 정상적으로 저장됩니다.
> 하지만 이런경우에는 해당 필드로 검색하더라도 해당 문서가 검색되지 않습니다.
> 그러므로 Boolean 대신 0과 1을 사용하는 것을 추천합니다. [링크](https://stackoverflow.com/questions/13672906/indexeddb-boolean-index)

> 필드배열 내에 문자열이 아닌 `{필드명: 옵션객체}` 같은 객체를 선언할 경우 옵션정보. [링크](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/createIndex)

### 반환 값

`resolve`: [IDBRequest success event](https://developer.mozilla.org/en-US/docs/Web/API/IDBRequest/success_event)

`reject`: [Error event](https://developer.mozilla.org/en-US/docs/Web/API/Element/error_event)

### 예제

```js
import NiceDB from "nicedb"

const store = {
  // user 라는 이름의 저장소를 정의했습니다.
  // 'name', 'age', 'gender' 를 선언했으므로,
  // 앞으로 이 필드로 검색을 할 수 있습니다.
  user: ['name', 'age', 'gender'],
  
  // car 라는 이름의 저장소를 정의했습니다.
  // modelNum 필드는 옵션을 사용했습니다.
  car: ['name', 'color', {modelNum: {unique: true, multiEntry: false} }]
  // ...
};

NiceDB.define( store )
  .then( event => { /* 저장소 정의가 성공적으로 완료됬을 경우 실행 코드 */ } ) 
  .catch( event => { /* 어떠한 이유로 오류가 발생. 라이브러리 사용불가 시 실행 코드 */ } );
```

## `getStore()` 동기함수

저장소 객체를 호출합니다.
저장소 객체는 문서를 생성, 수정, 삭제 할 수 있는 메서드를 제공합니다.

### 문법

```js
getStore( storeName )
```

### 파라미터

`storeName`(필수-문자열)

- 불러올 저장소의 이름.

### 반환 값

`Store class` 객체

### 예제

```js
import NiceDB from "nicedb"

NiceDB.define( { /* ... */ } ).then( /* Success_Handler */ ).catch( /* ... */ );

// Success_Handler 실행 된 이후

const User = NiceDB.getStore( "user" );
const Car = NiceDB.getStore( "car" );
```

## onversionchange

**IndexedDB** 의 `onversionchange` 를 핸들링. [링크](https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/onversionchange)

### 문법

```js
NiceDB.onversionchange = callback;
```

## onblocked

앱이 이미 실행중일 때, 새로운 탭에서 앱을 실행할 경우,
새 탭의 앱에서 라이브러리 작동을 차단하고 `onblocked` 이벤트를 호출합니다.

**IndexedDB** 의 `onblocked` 를 핸들링. [링크](https://developer.mozilla.org/en-US/docs/Web/API/IDBOpenDBRequest/onblocked)

### 문법

```js
NiceDB.onblocked = callback;
```

# API `Store class`

## `name`

읽기전용. 저장소의 이름.(문자열)

### 예제

```js
import NiceDB from "nicedb"

// ...

const FooStore = NiceDB.getStore( "foo" );

console.log( FooStore.foo ); // "user"
```

## indexList

읽기전용. 저장소에 인덱스로 등록한 필드 배열.

> 저장소를 정의할 때, 명시한 필드가 인덱스로 등록됩니다.

### 예제

```js
import NiceDB from "nicedb"

const store = { foo: ['a', 'b', 'c'] };
NiceDB.define( store ).then( /* Success_Handler */ ).catch( /* ... */ );

// Success_Handler 실행 된 이후
const FooStore = NiceDB.getStore( "foo" );
console.log( FooStore.indexList ); // ['a', 'b', 'c']
```

## indexInfo

읽기전용. 저장소에 인덱스로 등록한 필드의 정보를 객체로 하는 배열.

### 예제

```js
import NiceDB from "nicedb"

const store = { foo: ['a', {b: {unique: true} }, {c: {multiEntry: true}}] };
NiceDB.define( store ).then( /* Success_Handler */ ).catch( /* ... */ );

// Success_Handler 실행 된 이후
const FooStore = NiceDB.getStore( "foo" );
console.log( FooStore.indexInfo );
// [
//  { field: 'a', unique: false, multiEntry: false },
//  { field: 'b', unique: true, multiEntry: false },
//  { field: 'c', unique: false, multiEntry: true }
// ]
```

## `find()`

쿼리에 해당하는 문서를 조회.

### 문법

```js
find()
find( query )
find( limit )
find( query, limit )
```

### 파라미터

`query`(옵션-객체)

- `{ 필드_이름 : 찾을값 또는 연산자 }` 으로 이루어진 객체.
- 생략할 경우 저장소의 모든 문서를 반환.
- 하나의 필드만 쿼리 가능. (멀티 필드 쿼리 미지원)
- 비교 쿼리 연산자 지원. [링크](#비교-쿼리-연산자)

`limit`(옵션-숫자):

- 양의 정수만 가능.
- 반환 될 문서의 최 수량 설정.

> 모든 검색 결과는 `_id` 를 기준으로 오름차순 정렬되어 반환됩니다.

### 반환 값

`resolve`: 문서 객체로 구성된 배열. 결과값이 없을 경우 빈 배열.

`reject`: 관련 애러 이벤트 객체.

### 예제

```js
const FooStore = NiceDB.getStore( "foo" );

// foo 저장소에 저장된 문서 중 필드 값이 100 인 문서를 조회하고 반환합니다.
FooStore.find( {bar: 100} ).then( result => console.log(result) );
// [
//   { _id: 33, bar: 100, ... },
//   { _id: 54, bar: 100, ... },
//   { _id: 89, bar: 100, ... },
//    ....
// ]
```

## `findOne()`

쿼리에 해당하는 하나의 문서를 조회.

### 문법

```js
findOne()
findOne( query )
```

### 파라미터

`query`(옵션-객체)

- `{필드 : 찾을값}` 으로 이루어진 객체.
- 생략할 경우 `_id` 값이 가장 낮은 문서.
- 하나의 필드만 쿼리 가능. (멀티 필드 쿼리 미지원)
- 비교 쿼리 연산자 지원. [링크](#비교-쿼리-연산자)

### 반환 값

`resolve`: 문서 객체. 결과 값이 없을 경우 `undefined`.

`reject`: 관련 애러 이벤트 객체.

### 예제

```js
const FooStore = NiceDB.getStore( "foo" );

// foo 저장소에 저장된 문서 중 bar의 값이 100 인 문서를 조회하고 반환합니다.
FooStore.find( {bar: 100} ).then( result => console.log(result) ); // { _id: 33, bar: 100, ... }
```

## `count()`

쿼리에 해당하는 문서를 조회.

### 문법

```js
count( query )
```

### 파라미터

`query`(옵션-객체)

- `{필드 : 찾을값}` 으로 이루어진 객체. 하나의 필드만 쿼리 가능. (멀티 필드 쿼리 미지원)
- 비교 쿼리 연산자 지원. [링크](#비교-쿼리-연산자)

### 반환 값

`resolve`: 쿼리에 해당하는 문서의 수.

`reject`: 관련 애러 이벤트 객체.

### 예제

```js
const FooStore = NiceDB.getStore( "foo" );

// foo 저장소에 저장된 문서 중 필드 값이 40 이상인 문서의 개수를 반환.
FooStore.count( {bar: {$gte: 40} } ); // 13
```

## `insert()`

문서를 저장소에 저장합니다.

### 문법

```js
insert( doc )
```

### 파라미터

`doc`(필수-객체)

- `{ 필드1: 값1, 필드2: 값2, ... }` 으로 이루어진 저장할 문서 객체.

### 반환 값

`resolve`: 저장된 문서의 `_id`. (숫자)

`reject`: 관련 애러 이벤트 객체.

### 예제

```js
const FooStore = NiceDB.getStore( "foo" );

const doc = {
  txt: 'text',
  num: 123,
  foo: new Date(),
  ...
};

FooStore.insert( doc ).then( result => console.log(result) ); // 93
```

## `update()`

쿼리에 해당하는 문서를 업데이트.

### 문법

```js
update( doc )
update( doc, change )
update( query, doc )
update( query, doc, change )
```

### 파라미터

`doc`(필수-객체)

- `{ 필드1: 값1, 필드2: 값2, ... }` 으로 이루어진 업데이트 할 필드 객체.

`query`(옵션-객체)

- `{필드 : 찾을값}` 으로 이루어진 객체. 하나의 필드만 쿼리 가능. (멀티 필드 쿼리 미지원)
- 비교 쿼리 연산자 지원. [링크](#비교-쿼리-연산자)

`change`(옵션-부울)

- 기본값: `false`
- `true` 일 경우, 쿼리에 해당하는 문서를 `doc` 으로 교체.

### 반환 값

`resolve`: 업데이트 된 문서 `_id` 를 인자로 하는 배열.

`reject`: 관련 애러 이벤트 객체.

### 예제

```js
const FooStore = NiceDB.getStore( "foo" );

const query = { bar: { $gte: 9 } }; // bar 필드 값이 9 이상
const doc = { bar: 9, etc: 'love' };

// 쿼리에 해당하는 문서를 조회하고, doc 에 해당하는 필드 값으로 업데이트
FooStore.update( query, doc ).then( result => console.log(result) ); // [ 1, 5, 32, 78 ]
```

## `remove()`

쿼리에 해당하는 문서를 삭제한다.

### 문법

```js
remove( query )
```

### 파라미터

`query`(옵션-객체)

- `{필드 : 찾을값}` 으로 이루어진 객체. 하나의 필드만 쿼리 가능. (멀티 필드 쿼리 미지원)
- 비교 쿼리 연산자 지원. [링크](#비교-쿼리-연산자)

> 쿼리를 생략할 경우 저장소의 모든 문서를 삭제합니다.
> 하지만 모든 문서를 삭제해야 할 경우, 성능상의 이유로 `remove()` 대신 `clear()` 를 사용해야 합니다.

### 반환 값

`resolve`: 없음.

`reject`: 관련 애러 이벤트 객체.

### 예제

```js
const FooStore = NiceDB.getStore( "foo" );

const query = { bar: 9 };

FooStore.remove( query ).then( result => console.log(result) ); // [ 1, 5, 32, 78 ]
```

## `clear()`

스토어에 저장된 모든 문서를 삭제한다.

### 문법

```js
clear()
```

### 파라미터

없음.

### 반환 값

`resolve`: 없음.

`reject`: 관련 애러 이벤트 객체.

### 예제

```js
const FooStore = NiceDB.getStore( "foo" );

FooStore.clear().then( result => console.log(result) ); // undefined
```

# 비교 쿼리 연산자

**NiceDB**가 멀티쿼리를 지원하지는 않지만,
**MongoDB** 에서 사용하는 비교 쿼리 연산자의 일부를 지원합니다.

| 연산자          | 의미              |
| :---:          | :---:            |
| `$gt`          | 쿼리 <  결과       |
| `$gte`         | 쿼리 <= 결과       |
| `$lt`          | 쿼리 >  결과       |
| `$lte`         | 쿼리 >= 결과       |

### 문법

```js
import NiceDB from "nicedb"

const store = { foo: ['num'] };
NiceDB.define( store ).then( /* Success_Handler */ ).catch( /* ... */ );

// Success_Handler 실행 된 이후

const FooStore = NiceDB.getStore( "foo" );

// 문서 배열의 _id 를 출력하는 함수
function log( docs ) {
  const ids = docs.map( v => v._id );
  console.log( ids );
}

// foo 라는 저장소에 아래와 같이 문서가 저장되어 있다고 가정합시다:
//
//      { _id: 1, num: 10 }
//      { _id: 2, num: 5  }
//      { _id: 3, num: 15 }
//      { _id: 4, num: 7  }
//      { _id: 5, num: 13 }

FooStore.find( {num: 5} ).then( log ); // 5 === num   →   [ 2 ]
FooStore.find( {num: { $gt: 10 }} ).then( log ); // 10 < num   →   [ 3, 5 ]
FooStore.find( {num: { $lte: 7 }} ).then( log ); // 7 >= num   →   [ 2, 4 ]
FooStore.find( {num: { $gte: 7, $lt: 15 }})
        .then( log ); // 7 <= num && 15 > num    →   [ 1, 2, 4, 5 ]
```

> 모든 검색 결과는 `_id` 를 기준으로 오름차순 정렬되어 반환됩니다.
















