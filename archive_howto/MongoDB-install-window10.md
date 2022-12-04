# Mongo DB install at window10

아무것도 없는 컴퓨터에 몽고디비 4.xx 설치를 시작하는 것으로 가정한다.

시간이 지남에 따라 기록하는 시점과 약간의 차이가 있을 수 있다.

정말 몽고디비의 M도 모르고 이제 막 무엇인가 배우려는 사람의 눈높이로 썼다. (용어선정을...)

말 그대로 설치에 대해서만 기록했다... (몽고디비 사용법은 다른곳에서 알아보자...)

## download and install

1. google 에서 mongodb 라고 검색

1. [몽고디비 공식 홈페이지][몽고디비공식홈페이지]로 접속

1. 홈페이지 맨 아래 사이트맵 영역에서 **installation** 클릭

1. 아래로 쭈~욱 내리다 보면 **Tutorials** 라는 제목아래 **MongoDB Community Edition** 라는 소제목 아래
**Install on Windows** 클릭  
묻지도 따지지도 말고 커뮤니티 애디션 몽고디비로 가는거다

1. 조금만 아래로 내리면 **Install MongoDB Community Edition** 제목 아래 어떠한 절차가 보인다.

1. 첫번째 절차(1.Download MongoDB Community Edition)에서 링크 걸어준 [MongoDB Download Center][몽고디비다운로드센터]로 이동  
사실 처음부터 여기로 가면 되지만 어떻게 찾아가는지 서술해봄

1. 초록색 다운로드 버튼 왼쪽에 .msi를 .zip으로 변경후 다운로드 클릭!  
.msi는 사람이 사용하기 편하게 만들어 놓은 앱같은게 설치됨  
.zip은 무설치에 도스모드로만 실행 가능하다고 보면 된다. (꺼~먼 화면에 흰글자 쳐야된다는 말)  
초심자는 .msi 설치하고 싶겠지만... 사실 서버에 설치할때는 윈도우는 비싸서 리눅스계열 서버를 쓰게 될 것이고  
그러면 결국 도스를 써야 한다.(물론 리눅스 도스랑 윈도우는 쬐~금 다르긴 하지만)  
그러니 .zip으로 받자 (.zip 기준으로만 설명함)

1. 페이지가 바뀌고... 잠시후에 .zip 파일이 다운되가기 시작한다  
다운로드가 다 되면 다운 받은 폴더로 가서 해당 압축을 풀자

1. **mongodb-win32-x86_64-2008plus-ssl-4.0.6** 라는 폴더가 생겼다  
(뒤에 숫자는 버전이니 달라도 긴장하지 말자)  
그럴싸해 보이도록 폴더명을 mongodb 라고 바꾸고 `내컴퓨터 > C드라이브`에 가져다가 넣자.

1. `내컴퓨터 > C드라이브`에 **data**라는 폴더가 없을경우 만들자.  
클릭해서 만든 폴더로 들어가자.  
이곳에 **db**라는 폴더를 만들자. (이미 있을경우는 당연하게도 구지 다시 만들필요 없다.)
만드는 이유는 몽고디비를 실행하면 이 폴더에 데이터를 저장하기 때문에 미리 만들어 주는 것이다.

1. `내컴퓨터 > C드라이브 > mongodb > bin`으로 이동  
**mongod.exe** 더블클릭하여 실행 (이녀석을 실행해야 몽고디비가 가동된다)  
**mongo.exe** 더블클릭하여 실행  
알수 없는 블라블라 글씨가 주욱 나오고 맨~ 아래 `>` 표시와 타이핑을 할 수 있는 커서가 깜빡이면 설치 끝!  
이제 이곳에 몽고디비를 컨트롤 하는 명령어로 몽고디비를 주물럭 거리면 된다.

마지막 절차에서 알아먹을수 없는 오류와 함께 몽고디비가 실행되지 않을 수 있다!
(특히 이런걸 처음 시도하는 거라면 더더욱이 높은 확률로)  
이럴 경우에는 바로 아래 오류 조치에 관해서 보도록 하자.

## mongodb not run... error

설치 순서 5번에 해당하는 웹 페이지를 차근차근 읽어보면 대략 윈도우 10은 C 런터임 환경이 별도로 필요하다고 나온다.

> Windows 2012 Server and Windows 10 need [KB2999226][c런타임업데이트링크] to provide Universal C Runtime support for Windows.

이걸 업데이트(혹은 설치) 해줘야 애러없이 몽고디비가 시작된다.  
그런데 이게 왠걸....  
링크를 타고 들어가면 업데이트 링크들이 쫘~악 있는데 눈씻고 찾아봐도 윈도우10 을 위한 링크만 없다.  
아마 정말 아무것도 모르고 시작하려는 초심자에겐 이런 상황이 제일 방황하게 되는 포인트가 아닐까 싶다.

그래서 친절히 방법을 적어본다.

1. 애러가 나면서 실행되지 않는다는걸 알지만 다시한번 `mongod`를 실행해본다.

1. 그럴싸해보이는 애러 메세지를 `ctrl + c` 해서 구글 검색을 한다.  
(뜻은 모르더라도 무엇이 애러메세지인지 대략 찾을수는 있겠지?)

1. 검색결과도 다 영어로 나올것이다. (ㅠ.ㅠ)  
보통 검색 1~3번째 내에서 해답을 찾을수 있으니 한번씩 클릭해서 들어가보자.  
영어를 못읽으면 구글번역기의 도움을 받자.  
무슨 내용인지 정확히 알 필요 없이 쭉 그냥 눈으로 스켄만 하면 된다.

1. 내용들을 종합해보니 사람들이 'Visual Studio 2015 Visual C++'를 설치하라는 거 같다.  
(2017 이라고 나올수도 있지만 필자는 2015로 나왔고 그걸 설치했으니 참고하자.)

1. 이제 구글에 `Visual Studio 2015 Visual C++` 라고 검색하자.  
아마 첫번째 검색결과가 [이 페이지][2015비쥬얼c다운로드링크]일 것이다.

1. 이제 이곳에서 한국어 언어로 다운받아 설치하자.  
2015 보다 높은 년도의 버전으로 설치해도 무관하다.

1. 이제 다시 `mongod`를 실행해보자!  
아마 매우 잘 될껄?  
안된다면 될때까지 `2 > 3 > 7` 과정을 될때까지... 계속 하자.

## mongodb path set

설치는 다 했는데 컴퓨터를 켜고 몽고디비를 사용할 때마다 `내컴퓨터 > C드라이브 > mongodb > bin` 이동,  
**mongod.exe** 더블클릭, **mongo.exe** 더블클릭 으로 실행하는게  
귀찮고, 개발자스럽지 않다고 생각되면 *환경변수*라는 것을 설정해주면 된다.

우선 환경변수를 설정하기 전에 삽질을 좀 해보자

1. 우선 mongod.exe, mongo.exe를 켜두었다면 모두 종료하자

1. `윈도우키 + r > cmd 입력 > 엔터` 하면 검은색 도스창이 뜬다.  
윈도우에서는 **명령 프롬프트**, 리눅스계열에선(맥,우분투 같은거) **터미널**이라고 부른다  
또는 **콘솔**이라고 부르기도 한다

1. 콘솔에 `cd \ > 엔터`하면 c드라이브로 이동이 된다.
그리고 `cd mongodb\bin > 엔터`하면 몽고디비가 설치된 폴더로 이동된다  
(한번에 `cd \mongodb\bin > 엔터`로 이동해도 된다)

1. `mongod`를 입력하고 앤터를 치면 mongod.exe가 실행된다!!!  
이유는 지금 이동한 폴더에서 `mongod`를 입력했기 때문에  
해당이름의 실행할 뭔가를 찾다가 mongod.exe를 발견하고 실행하기 때문이다.  
만약 해당 폴더에서 `mongod` 실행파일을 찾지 못하면 **미리 설정해둔 폴더경로 리스트**를 뒤진다.  
예를들어 리스트에 `C:\mike`와 `C:\abc\def`가 있으면 이곳에서 다시한번 `mongod` 실행파일 찾기를 시도한다.  
그리고 이 리스트를 **환경변수**라고 한다.  
(사실 환경변수의 원래 의미는 이것이 아니지만 지금은 그렇게 알아두자.)

그럼 이제 환경변수를 설정해보자.

1. 아무 폴더나 열어보자

1. 열린 창에서 위에 주소표시줄이 있고, 그 좌측끝에는 좌,우,위를 바라보는 화살표가 보인다.  
위방향 화살표가 더이상 눌러지지 않을때까지 눌러보자

1. 그럼 바탕화면으로 나와진다...  
이곳에서 `내 PC > 마우스 우클릭 > 속성` 으로 이동

1. 그러면 시스템이라는 새로운 창이 보인다.  
좌측에 `고급 시스템 설정` 클릭. (고~오급)

1. `컴퓨터이름 / 하드웨어 / 고급 / 시스템보호 / 원격` 중에서 `고급` 클릭

1. 아래 `환경변수` 버튼 클릭!!!

1. 낯선용어에 당황하지 말고 중앙정도에 위치한 `시스템 변수`란을 보자.  
`변수 : 값`으로 정렬된 표가 보일 것이다.  
한번에 보일수도 있고 안보이면 스크롤을 조금만 내려서 변수가 `Path`인 줄을 찾아 클릭.  
그리고 `편집`을 클릭 (그냥 해당 줄을 더블클릭해도 동일한 동작이 실행된다.)

1. **환경 변수 편집** 이라는 창이 뜬다.  
이제 `새로 만들기`를 클릭하고 `mongod.exe`를 설치한 폴더 경로를 넣어준다.  
이곳에서 알려준대로 했다면 폴더 경로는 `C:\mongodb\bin` 일 것이다.

1. `확인 > 확인`  
이제 콘솔창을 켜고 바로 `mongod`라고만 입력하면 **mongod.exe**를 실행한다!!
그리고 새로운 콘솔창을 하나 더 켜서 `mongo`라고 입력하면 **mongo.exe**를 실행한다!!

## Robo 3T install

몽고디비 설치도 실행도 잘 되고 사실상 문제는 없는데...

매번 콘솔에서만 하려니까 시각적으로 눈에도 들어오지 않고 조작하는것도 번거로운게 여간 귀찮은가?

이럴경우에는 **Robo 3T** 라는 툴을 설치하면 된다.

마우스 클릭을 이용해서 시각적으로 편하게 조작할 수 있다.

1. 구글에 `robo 3t`라고 검색.  
보통 검색결과의 첫번째가 [공식홈페이][robo3t홈페이지]지 일 것이다.  
클릭하여 접속.

1. 홈페이지 좌측에는 **Studio 3T**, 우측에는 **Robo 3T**를 다운로드 할 수 있게 소개하고 있다.  
스튜디오3티는 일정기간 사용하고 금액을 지불해야 더 사용할 수 있는 것이다.  
물론 기능이야 더 많지만, 특별한 경우가 아니라면 로보3티로 충분하고도 남는다.  
`Download Robo 3T` 클릭

1. 윈도우 64비트 .exe 파일로 다운로드 시작

1. .exe 파일을 실행하여 `다음 > 수락 > 다음 > ... > 완료` 설치완료를 하자.

1. **Robo 3T** 실행  
실행전 반드시 `mongod`가 실행되고 있어야 한다.

1. 몽고디비가 실행되고 `MongoDB Connections`라는 작은 팝업창이 떠있을 것이다.  
팝업창 상단에 `Create, edit, remove, clone`이라는 링크처럼 보이는 버튼이 있는데,  
`Create` 클릭!

1. `Connection Settings`라는 팝업이 떴다.  
지금은 본인 PC에 설치한 몽고디비에 접속하는 것이므로  
`Connection / Authentication / SSH / SSL / Advanced`라는 하위 탭중에 `Connection`만 설정한다.

1. type: Direct Connection  
Name: 본인이 짓고 싶은 이름으로...
Address: localhost : 27017  
로컬 호스트는 본인PC에 접속하므로 그렇고 27017이라는 포트는 몽고디비에 특별히 설정을 하지 않았을 경우 기본포트이다.

1. 좌측 하단에 `Test` 클릭.  
정상이라면 초록색 바탕의 원에 채크박스가 될 것이고,  
무엇인가 문제가 있다면 빨간글씨로 **Failed**라고 나올 것이다.  
여기서 알려주는 절차대로 했다면 실패는 뜨지 않을 것이니, 실패가 떳을 경우 구글링을 하자.  
우측 하단에 `Save` 클릭

1. `Connection Settings`라는 팝업에 리스트가 하나 추가 되었다.  
해당 리스트 더블클릭!  
몽고디비로 접속이 되었다!

## Basic security in MongoDB

지금까지 몽고디비와 편의 툴 설치가 잘 되었고 동작도 잘 해서 안심인가?...

그런데 생각해보자.

난 개발자라 접속해도 되지만 다른사람이 이 디비에 함부로 접근해도 문제가 없을까?

지금 나의 몽고디비 상태는 다른피시에서도 누구나 접속이 가능한 형태이다.

따라서 몽고디비에 `난 똑똑해!`를 저장해 둔 것을 누군가 `나는 빡빡이다!`로 변경시킬 수도 있다.

이거 정말 심각한 상황 아닌가!

그래서 지금부터 다른 피시에서 접속할때 또는 특정 디비에 접속할 때  
인가된 아이디와 비밀번호를 입력해야지만 가능하도록 하는 방법에 대해 알아보자.  
(이 절차는 디비 보안을 강화시키는 첫걸음일 뿐 방화벽 설정이라든가 등 더 많은 것을  
해야 하지만 간단하게 계정 설정에 관해서만 알아보고 넘어간다.  
필자가 실력이 없고 무지해서 넘어간다는건 비밀.)

미리 말하지만 이 설정을 하고 나서도 콘솔을 이용해서 접속할 때 아이디와 비번을 물어보지 않을 것이다.

이유는 몽고디비에 해당 로컬피시로 접속할 경우에는 최고 관리자로 판단하기 때문에 묻지 않는 것이다.

1. `mongod` 실행 > `mongo` 실행

1. `use admin` 입력  
몽고디비의 기본관리자 디비로 간다는 소리다.  
우리는 지금 관리자 디비로 가서 사용자들을 추가할 것이다.

1. 아래 코드를 복사해서 붙여넣자.  
아! 붙여넣기 전에 **사용자이름**과 **비밀번호**는 적절히 바꾸자.
    ```javascript
    db.createUser(
      {
        user: "사용할 이름",
        pwd: "사용할 비밀번호",
        roles: [ {role: "userAdminAnyDatabase", db: "admin"} ]
      }
    )
    ```
    지금만든 이 계정은 내 피시 몽고디비 내 어떤 디비에든 접근하여 모든 짓(읽기,쓰기 등)을 할 수 있다.  
    자 그럼 정말 그러한지 확인을 해보자.

1. `mongod, mongo, robo 3t`를 모두 종료한다

1. `mongod --auth` 실행  
여기서 `--auth`는 '몽고디비 사용은 계정을 통해서만' 이라는 의미를 전달하는 플레그(옵션)이다.

1. `mongo` 실행

1. `use admin` 타이핑...  
그런데 아이디 비번을 물어보질 않는다??!  
서두에 말했듯 로컬피시에서 접속해서 그렇다

1. `robo 3t`실행

1. 아까 설정해둔 커넥션 접속 시도...  
영어로 뭐라뭐라 하면서 애러와 함께 접속되지 않는다???  
그렇다.  
몽고디비가 로보3티로 접속하는 것은 외부PC로 인식하고 접속을 거부하는 것이다.  
그럼 어떻게 해야 할까?  
다음장을 살펴보자.

## use Robo 3T with DB auth

1. 로보3티의 좌측 상단에 컴퓨터 두대의 아이콘이 보일것이다. 클릭!

1. 만들어놓은 리스트를 클릭하고 상단에 링크모양의 `edit` 버튼 클릭!

1. 두번째 탭 `Authentication` 선택

1. `Perform authentication 채크박스` 채크

1. Database: admin  
User Name: 위에서 설정한 계정명  
Password: 위에서 설정한 비밀번호  
Auth Mechanism: SCRAM-SHA-1

1. `Save` 클릭!

1. 리스트를 더블클릭하여 다시 접속 시도!  
정상적으로 접속 되었을 것이다.  
만약 경고(애러) 메세지가 뜨면서 접속되지 않는다면 보통 다음과 같은 문제다.
    1. `mongod`가 실행중 상태가 아님
    1. 아이디 혹은 비번이 틀렸음
    1. 선택한 데이터베이스에 등록된 계정이 아님
    
## create more user in MongoDB

몽고디비에 `korea, japan, usa, china` 이렇게 4개의 디비를 만들어 쓰고 있다고 가정하자.

이중에 `usa, china` 디비만 사용하면 되는 사용자(또는 서비스)가 있는데 위에서 설정한  
최고 관리자 계정을 부여하는게 부담스러운가? (부담스러워 해야 한다!)

이럴때는 추가 계정을 생성하면 된다.  
(짧게 셈플 코드만 개떡같이 써놓을태니 찰떡같이 알아먹도록 하자.)

```javascript
db.createUser(
  {
    user: "사용할 이름",
    pwd: "사용할 비밀번호",
    roles: [ {role: "원하는권한등급", db: "usa"}, {role: "원하는권한등급", db: "china"} ]
  }
)
```

## about roles

몽고디비 문서에서 허우적 거릴 일부 입문자를 위해 아주 간단하게 몇몇 권한에 대해 써놓겠다.  
(자세한 정보는 공식문서 [이곳][몽고디비권한문서]에서 확인)

|등급|설명|
|:---:|:----|
|userAdminAnyDatabase|admin 디비를 포함한 모든 디비에 모든 권한 부여|
|dbOwner|데이터베이스 소유자는 데이터베이스에 대한 관리 조치를 수행 할 수 있도록 readWrite, dbAdmin, userAdmin의 모든 권한을 가집니다.|
|dbAdmin|지정한 디비에서 스키마 관련 작업, 인덱싱 및 통계 수집과 같은 관리 작업을 수행 할 수 있는 권한을 가집니다. userAdmin의 권한은 없습니다.|
|userAdmin|지정한 디비에서 사용자를 만들고 권한을 설정 및 수정할 수 있는 권한을 가집니다. dbAdmin의 권한은 없습니다.|
|readWrite|지정한 디비에서 시스템이 아닌 모든 콜렉션 및 콜렉션의 데이터를 읽고 수정할 수 있는 권한을 가집니다.|
|read|지정한 디비에서 모든 데이터를 읽을 수있는 권한을 가집니다.|

## mongod service not run

몽고디비 아래와 같은 오류로 서비스 실행 안될때
```
Failed to start mongod.service: Unit mongod.service not found.
```

해결책
```
sudo systemctl enable mongod
sudo service mongod stop
sudo service mongod start
```

[몽고디비공식홈페이지]:https://www.mongodb.com
[몽고디비다운로드센터]:https://www.mongodb.com/download-center/community?jmp=docs
[c런타임업데이트링크]:https://support.microsoft.com/en-us/help/2999226/update-for-universal-c-runtime-in-windows
[2015비쥬얼c다운로드링크]:https://www.microsoft.com/ko-kr/download/details.aspx?id=48145
[robo3t홈페이지]:https://robomongo.org/download
[몽고디비권한문서]:https://docs.mongodb.com/manual/reference/built-in-roles/