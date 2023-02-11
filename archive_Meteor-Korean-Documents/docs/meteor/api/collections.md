---
title: 콜렉션
---

# 콜렉션 %{ #collections }%

Meteor는 컬렉션에 데이터를 저장합니다.
생성하려면 `new Mongo.Collection`으로 컬렉션을 선언합니다.

```js
import { Mongo } from 'meteor/mongo'

const name = 'myCollection'
const options = { ... }
const myCollection = new Mongo.Collection(name, options)
```

```ts
interface Mongo {
  Collection(name, optopn?)
}

type name = string | null
type option = {
  connection?: Object,
  idGeneration?: 'STRING' | 'MONGO',
  transform?: Function,
  defineMutationMethods?: Boolean
}
```

- 사용: 모든곳
- 인자:
  - name: 컬렉션 이름입니다. `null`일 경우, 로컬 컬렉션을 만듭니다.
  - connection: 이 컬렉션을 관리할 서버 연결입니다.
    지정하지 않으면 기본 연결을 사용합니다. <br>
    다른 서버를 지정하려면 `DDP.connect` 호출의 반환 값을 전달합니다.
    연결을 지정하지 않으려면 `null`을 전달하십시오. <br>
    `name: null`인 컬렉션은 연결(이 옵션)을 지정할 수 없습니다.
  - idGeneration: 이 컬렉션에서 새 문서의 `_id` 필드를 생성하는 방법입니다.
    - `STRING`: 랜덤 문자열 (기본값)
    - `MONGO`: 랜덤 [`Mongo.ObjectID`](https://docs.meteor.com/api/collections.html#Mongo-ObjectID) 값
  - transform: 문서가 `fetch`, `findOne`으로 반환되기 전과
    `observe`, `map`, `forEach`, `allow`, `deny`의 콜백으로 전달되기 전에
    이 함수를 통해 전달됩니다. <br>
    퍼블리쉬 함수로부터 반환된 `observeChanges`의 콜백 또는 커서에서는 적용되지 않습니다.
  - defineMutationMethods: 클라이언트 코드에서 삽입/업데이트/제거를 할 수 있는지 여부입니다.
    기본값은 `true`입니다.
- `transform` 예제:
```js
// 'Animal' 클레스를 정의
class Animal {
  constructor(doc) {
    _.extend(this, doc);
  }

  makeNoise() {
    console.log(this.sound);
  }
}

// 'Animals'을 문서로 사용하는 컬렉션을 정의
const Animals = new Mongo.Collection('animals', {
  transform: (doc) => new Animal(doc)
});

// 동물을 생성하고 `makeNoise` 메서드를 호출.
Animals.insert({ name: 'raptor', sound: 'roar' });
Animals.findOne({ name: 'raptor' }).makeNoise(); // 프린트 'roar'
```
  
  `transform` 함수는 반응형에 호출되지 않습니다.
  동적으로 변경되는 속성을 객체에 추가하려면,
  호출된 시간에 값을 계산하는 함수로 수행해야 합니다.
  `transform` 속성이 그 시간에 계산하지 않습니다.

*****

컬렉션을 만들 때 `name`을 전달하면,
서버에 저장되고 모든 사용자가 볼 수 있는 영구 컬렉션을 선언하는 것입니다.
클라이언트 코드와 서버 코드는 모두 동일한 API를 사용하여 동일한 컬렉션에 액세스할 수 있습니다.

특히 `name`을 전달하면 다음과 같은 일이 발생합니다:

- 서버에서(`connection`을 지정하지 않은 경우) 해당 이름의 컬렉션이 백엔드 Mongo 서버에 생성됩니다.
  서버의 해당 컬렉션에서 메서드를 호출하면 액세스 제어 규칙과 일치하는지 확인한 후,
  정상적인 Mongo 작업으로 직접 변환됩니다.

- 클라이언트(및 `connection`을 지정하는 경우 서버)에서 Minimongo 인스턴스가 생성됩니다.
Minimongo는 본질적으로 순수한 JavaScript로 Mongo를 메모리 내에서 비영구적으로 구현한 것입니다.
클라이언트에서 작업 중인 데이터베이스의 하위 집합만 저장하는 로컬 캐시 역할을 합니다.
이러한 컬렉션에 대한 쿼리(`find`)는 서버와 통신하지 않고 이 캐시에서 직접 제공됩니다.

- 클라이언트에서 데이터베이스에 쓸 때(`insert`, `update`, `remove`),
  명령이 로컬에서 즉시 실행되는 동시에 서버로 전송되어 그곳에서도 실행됩니다.
  이것은 쓰기가 메소드로 구현되기 때문에 [스텁(stubs)](https://docs.meteor.com/api/methods.html#Meteor-methods)을 통해 발생합니다.

:::info
서버에서 다른 서버에 지정된 `connection`을 가진 컬렉션에 쓸 때,
해당 메서드를 다른 서버로 보내고,
DDP를 통해 해당 컬렉션에서 변경된 값을 다시 받습니다.
클라이언트와 달리 로컬에서 먼저 쓰기를 실행하지 않습니다.
:::

클라이언트 전용 컬렉션에 이름을 전달하면 서버와 동기화되지 않으므로,
저수준의 등록 인터페이스(`added/changed/removed`)를 사용하여 컬렉션을 "수동으로" 채워야 합니다.
자세한 내용은 추가된 항목을 참조하십시오.

`name`에 `null`을 전달하면 로컬 컬렉션을 만드는 것입니다.
이 스크래치패드는 어디도 동기화되지 않으며,
Mongo 스타일의 `find`, `insert`, `update` 및 `remove` 작업을 지원하는 로컬 스크래치패드일 뿐입니다.
(클라이언트와 서버 모두에서 이 스크래치패드는 Minimongo를 사용하여 구현됩니다.)

기본적으로 Meteor는 컬렉션의 모든 문서를 연결된 각 클라이언트에 자동으로 등록합니다.
이 동작을 해제하려면 터미널에서 `autopublish` 패키지를 제거하십시오.
```shell
meteor remove autopublish
```

그리고나서 `Meteor.publish`를 사용하여 컬렉션의 어떤 부분을 어떤 사용자에게 퍼블리시 할 것인지 지정합니다.

:::warning
Minimongo에는 현재 인덱스가 없습니다.
클라이언트가 색인이 가치 있는 충분한 데이터를 가지고 있는 경우가 드물기 때문에 이것이 문제가 되는 경우는 드뭅니다.
:::

## find()

- 사용: 모든곳
- 설명: 컬렉션에서 셀렉터와 일치하는 문서를 찾습니다.
- 예제:























