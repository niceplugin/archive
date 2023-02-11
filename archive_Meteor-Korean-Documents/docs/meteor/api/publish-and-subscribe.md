---
title: 퍼블리쉬와 섭스크라입
---

# 퍼블리쉬와 섭스크라입 %{ #publish-and-subscribe }%

## publish()

- 사용: 서버
- 설명:
- 인자:
  - name:
  - func:
- 예제:
  ```js
  import { Meteor } from 'meteor/meteor'
  
  // Meteor.publish(name, func)
  Meteor.publish('myPub', function() {
  
  })
  ```
- 타입:
  ```ts
  function publish(name:string, func:Function):any;
  ```