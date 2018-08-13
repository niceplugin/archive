인수인계.md

# 목차

1. 인수인계 방향???
1. 인수인계 제외목록
1. 인수인계 목록

# 인수인계 방향

인수인계 문서 내 경로는 프로젝트 디렉토리가 최상위라는 가정 하에 작성함.

미티어를 활용한 챗봇 프로젝트는 기본적으로 HTML, CSS, JS로 이루어져 있음.

HTML은 Blaze Template로 이루어져 있음

중점은 각각의 JS가 어떤 기능을 담당하는지 목록 나열로 인수인계 함.

# 인수인계 제외 목록

- 디렉토리: ../.meteor , ../node_modules
- 파일: ../모든파일.확장자

는 미티어 플렛폼 자체 시스템으로 관주하고 인수인계하지 않음.

# 인수인계 목록

인수인계 대상 디렉토리 목록음 아래와 같음

- ../client
- ../lib
- ../private
- ../public
- ../server

## ../client

클라이언트에서 실행되는 모든 템플릿과 템플릿의 JS파일은 이곳에 있음.

목적에 따른 분류를 위해 하위 디렉토리가 있음.

솔루션이므로 본 프로젝트에서 미사용 되는 부분은 미사용이라고 명시함.

- ./answerList
- ./chat
- ./chatInput
- ./header
- ./lib
- ./login : 미사용
- ./menu
- ./message
- ./popup
- ./roomList : 미사용
- ./stylesheet
- ./amqp.js
- ./main.html
- ./main.js
