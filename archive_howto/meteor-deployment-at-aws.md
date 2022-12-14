# Meteor deployment at AWS

사실 많은 입문자들이 격는 큰 난관중에 하나가  **만들줄만 아는 것**일 것이다.

분명 책도 보고, 개념도 잡고, 잘 만들었는데...

내 PC에서만 보고 어떻게 다른 사람들이 이용할 수 있게 런칭하는지 모른다는 것이다.

수많은 책들이 이런부분을 알려주지 않는다.

실무를 하더라도 내가 맡은 업무만 하게 되다 보니 1년이 지나고 2년이 지나도 여전히 그 방법을 모르긴 마찬가지...

흡사 동영상을 유튜브에 올리는 방법을 몰라 만들기만 하고 세상에 공개하지 못하는 것처럼...

그래서 조금은 구차하고 난잡하며 길수 있지만 그 절차의 맥락적인 부분을 기록해 보고자 한다.

사전 요구사항은 AWS(아마존 웹 서비스) 회원가입 절차정도는 끝냈고  
현재 PC는 *Windows 10* 이며  
미티어 버전은 **1.8** 이라고 가정하고 시작한다.  
(가입정도는 할 수 있겠지?)

## how to build meteor project

이 문서는 미티어 사용법에 대한 것은 아니지만 간단하게 미티어 프로젝트를 하나 만드는 과정까지 포함하여 설명한다.

1. `윈도우키 + r > cmd`로 콘솔(명령프롬프트)를 실행한 후 `cd Desktop`을 입력하면 바탕화면 디렉토리로 이동할 것이다.

1. `meteor create --ㅡminimal my_aws_test`를 입력한다.  
그러면 바탕화면에 **my_aws_test**라는 폴더가 생기고 그 안에 프로젝트 하나가 생성되었을 것이다.

1. 프로젝트 폴더 내 `package.json`이라는 파일내용 전체를 지우고 아래 내요으로 다시 채우자.  
(간단하게 할거라 필요없는 부분을 지운 json 되겠다.)
    ```json
    {
      "name": "my_aws_test",
      "private": true,
      "scripts": {
        "start": "meteor run",
        "visualize": "meteor --production --extra-packages bundle-visualizer"
      },
      "dependencies": {
        "@babel/runtime": "^7.1.5",
        "meteor-node-stubs": "^0.4.1"
      },
      "meteor": {
        "mainModule": {
          "client": "client/main.js"
        }
      }
    }
    ```
    
1. 그리고 `server`와 `test`라는 폴더를 삭제

1. 이제 열려있던 콘솔에 `cd ./my_aws_test`라고 입력하여 프로젝트 폴더로 이동

1. 콘솔에 `meteor`라고 입력하여 미티어 실행

1. 웹 브라우저를 실행 후 주소창에 `http://localhost:3000` 입력

1. 방금 만든 셈플 미티어 프로젝트가 로컬호스트 3000포트에서 실행되고 있음을 볼 수 있다.  
(원한다면 프로젝트 폴더 내 `client/main.html` 파일 내용을 간단하게 수정해보자.  
수정한대로 aws에 배포가 되는지!)

1. 오류없이 정상적으로 프로젝트가 실행됨을 확인했으니 이제 `Ctrl + c > y`를 하여 미티어를 중단시킨다.

1. 콘솔에 `meteor build ../ --architecture os.linux.x86_64`를 입력하여 빌드를 시작하자.  
커멘드를 해석하자면  
**미티어를 포장해라 현재폴더의상위폴더에 리눅스64운영체제용으로** 라는 뜻이다.  
윈도우10 PC에서 빌드하는데 리눅스64용으로 하는 이유는 미래에 배포할 aws PC 중  
리눅스64 계열의 운영체제가 설치된 PC를 임대할 것이기 때문이다.  
(리눅스는 상업적으로도 공짜로 사용할 수 있는 아주 착한 라이센스를 가진 운영체제이므로)

1. 빌드가 끝나면 바탕화면에 `my_aws_test.tar.gz` 파일이 생성되어 있다.

이제 이 파일을 aws 서버 PC를 임대해 그 PC에 압축을 풀고 그 폴더 내에서 미티어를 실행하면 되는데...  

말이 쉽지 이제부터 시작이다.

여기까지 무사히 끝냈으면 다음 섹션으로 넘어가자. (가자 신세계로)

## Rent a server PC from AWS

이번에는 AWS(아마존 웹 서비스)를 이용하여 서버로 사용할 PC를 렌탈해보자.  
(보통 이것을 클라우드 서비스를 이용한다라고 말한다.)

그리고 렌탈한 PC에 직접 접속하고 빌드파일을 이곳으로 옮겨서 압축을 풀어보자.  
미리 말하자면 연결한 화면은 (검은화면에 흰글씨밖에 없는 도스모드 같은)터미널이므로
 지금까지 바탕화면, 마우스, 아이콘이 있는 컴퓨터로 생각하고 있었다면 조금은 실망할 것이다.
 
1. 구글에 `aws`라고 검색하여 [AWS 홈페이지][aws홈페이지]에 접속하자.

1. 홈페이지 우측 상단에 `내 계정▼`에 마우스를 올리고, 그 하위매뉴인 `AWS Managemnt Console`를 클릭하자.

1. 로그인 페이지로 이동되었을 것이다. 로그인을 하자.  
그런 다음 AWS나 다른 클라우드 서비스를 사용해 본 적이 없는 경우 보통 이 부분에서 멘탈이 부서지기 시작한다.  
단지 평범한 종합비타민제를 사려고 검색했는데 다른듯 다르지 않은, 같은듯 같지않은 수천가지의 종합비타민제와
 기타 영양제가 나를 벙찌게 만드는 것과 비슷하달까...
 
1. 우선 화면의 우측 상단 끝에서 두번째 매뉴를 보면, 도시 이름이 나와있다.  
**서울**로 되어있지 않으면 클릭해서 서울로 변경하자.  
이유는 우리는 대한민국에 살기 때문에 대한민국에서 최대한 가까운 곳에서 서비스를 받는것이 속도면에서 유리하다.  
특수하게 다른 특정나라(지역)에 서비스를 오픈하려면 그곳에 가까운 곳을 선택하는게 좋을것이다.  
(이것을 리전을 선택한다 라고 한다)
 
1. 다음으로 화면 상단 좌측에 'Services'를 클릭!  
그럼 AWS에는 어떤 서비스를 제공하는지 목록이 펼쳐진다.  
정~말 많은 서비스를 제공한다. (너무 많아서 뭘 골라야 할지 혼란스러울 정도다...)

1. 서두에 **서버로 사용할 PC**를 렌탈 할 계획이라고 했다.  
그러니 우리는 **컴퓨팅** 이라는 항목을 보면 된다.  
이곳에만도 9개나 되는 세부 항목이 있는데 여기서는 가장 기본적인 **EC2**를 이용할 것이다. 클릭!  
(마트에 우유를 사러왔는데 멸균,저지방,고담백,어린이,00등급이 중요한가?  
일단 맥주가 아닌 우유를 사는게 중요하다. 그냥 흰 우유를 선택했다면 중간은 간것이다. 같은 이치다.)

1. 좌측에 매뉴 목록이 있을 것이다.  
인스턴스 대분류 내에 있는 **인스턴스** 클릭!

1. 이곳은 대여한 PC들의 목록이 나오는 곳이다. 단!  
지금은 대여한 적이 없으니 **인스턴스 시작**이라는 파란 버튼만 보일것이다. 클릭!

1. `단계 1: Amazon Machine Image(AMI) 선택`이라는 페이지로 이동되었을 것이다.  
이곳은 대여할 PC의 운영체제를 선택하는 곳이다.  
`Ubuntu Server 18.04 LTS (HVM), SSD Volume Type` 선택! (아마 목록에서 3번째 일것이다.)

1. `단계 2: 인스턴스 유형 선택` 페이지로 이동되었을 것이다.  
프리티어 사용가능상태라면 `t2.micro` 선택! (아마 기본적으로 선택되어 있을껄?)  
프리티어 사용가능이 아니라면 `t3`시리즈 중 적당한 것 선택! (연습이니 nano 또는 micro가 적당할 것이다.)  
숫자만 봐도 얼핏 느낄수 있겠지만 t2는 구 t3는 신 시리즈 이다.  
신 시리즈가 동급대비 10%정도 성능이 좋으며 10% 가격이 저렴하다. (하지만 프리티어 사용 불가... OTL)  
우측 하단에 `다음: 인스턴스 세부 정보 구성` 클릭!

1. `단계 3: 인스턴스 세부 정보 구성` 페이지로 이동되었을 것이다.  
초보자 기준이므로 이런것도 있구나~ 하고 그냥 넘어가자.  
우측 하단에 `다음: 스토리지 추가` 클릭!

1. `단계 4: 스토리지 추가` 페이지로 이동되었을 것이다.  
용량이 8기가로 되어있을 것이다. 프리티어는 30기가까지 가능하다고 하니 넉넉하게 24기가로 설정.  
우측 하단에 `다음: 태그 추가` 클릭!

1. `단계 5: 태그 추가` 페이지로 이동되었을 것이다.  
태그 설정은 나중에도 할수 있는 것이므로 눈팅만 하고 우측하단에 `다음: 보안 그룹 구성` 클릭!

1. `단계 6: 보안 그룹 구성` 페이지로 이동되었을 것이다.  
이곳은 임대받을 PC에 누가(어떤 IP의 PC) 접속할 수 있는지를 정의하는 페이지 되겠다.  
    ```text
    보안 그룹 할당: 새 보안 그룹 생성 (선택)  
    보안 그룹 이름: my_aws (또는 본인이 짓고 싶은 이름)  
    설명: my first aws ec2 (또는 본인이 기제하고 싶은 설명)
    ```
    그리고 나서 아래 표에 하나의 목록이 보일것이다.  
    `유형: SSH, 프로토콜: TCP, 포트범위: 22, 소스: 내 IP, 설명: PC 접근 권한 설정 값` (구지 설명은 안써도 된다)
    지금 설정의 의미는 '지금 대여하는 PC 원격 접속은 내 PC(IP)로만 하겠다'이다.
    우측 하단에 `검토 및 시작` 클릭!
    
1. `단계 7: 인스턴스 시작 검토` 페이지로 이동되었을 것이다.  
너 정말 이렇게 세팅한 PC를 대여받을거야? 라는 페이지 이다.  
우측 하단의 `시작하기` 클릭!

1. 그러면 `기존 키페어 선택 또는 새 키페어 생성`이라는 팝업창이 뜰 것이다.  
`새 키 페어 생성`을 선택하고, 키 페어 이름은 `FirstKey`라고 하자.  
그리고 `키 페어 다운로드`를 클릭하여 키를 다운받자.  
**주의: 방금 다운 받은 파일은 절대 잃어버리지 말자!**  
모두 끝났으면 `인스턴스 시작` 클릭!

1. 그러면 `시작 상태` 페이지가 보일것이다.  
크게 중요한 페이지는 아니므로 우측 하단에 `인스턴스 보기` 클릭!

이제 인스턴스 목록에 하나의 목록이 생겼을 것이다.  
이 목록이 가리키는 것이 바로 AWS 중 EC2 서비스를 이용하여 렌탈한 PC다.  
(앞으로는 이 PC를 t2라고 부르겠다.)

그럼 간단하게 t2를 켜고 끄는 동작을 해보도록 하자.

1. t2를 마우스 우클릭 한다.

1. 메뉴 목록에서 `인스턴스 상태`에 마우스를 가져다 놓는다.

1. 목록이 행하는 동작은 다음과 같다.

    |메뉴|동작|
    |:---:|:---|
    |시작|켠다|
    |중지|끈다|
    |Stop-Hibernate|절전모드로 전환한다|
    |재부팅|재부팅한다|
    |종료|대여한 t2를 반납한다|
    
다음장에서는 t2에 접속해보고 바탕화면에 압축되어있는 빌드파일을 옮겨보도록 하자.

## How to connect T2

윈도우PC 에서 리눅스계열(우리는 우분투를 선택했었다)의 PC에 (원격)접속하려면 특정 프로그램이 있어야 한다.  
설치부터 접속까지 해보도록 하자.

### PuTTY Install

1. 인스턴스 목록에 t2를 마우스 우클릭하여 연결을 클릭!  
(물론 t2가 켜져있는 상태여야 한다)

1. 연결은 되지 않고 메세지창 하나만 덩그러니 뜰 것이다.  
우리는 SSH 방식으로 연결할 것이므로(t2를 대여하는 과정에서 내 IP만 접속가능하게 설정했었다.),
 **독립 실행형 SSH 클라이언트**를 선택하고 아래 접속과정을 읽어보자.  
지금당장 무슨말인지는 이해가 잘 가지 않지만 맥락상 **PuTTY**를 사용해야 하는것 같다.  
`Putty를 사용하여 연결`을 클릭해보자.

1. `PuTTY를 사용하여 Windows에서 Linux 인스턴스에 연결`에 관한 페이지가 떳을 것이다.  
**사전 조건**을 읽어보니 일단 PuTTY를 다운로드 하라고 한다.
`PuTTY 다운로드 페이지에서`라는 링크를 클릭하면 다운로드 페이지가 뜬다.  
영어로 빽빽하게 뭐라고 써져있는데 굵은 파란글씨로 `Download it here`라고 되어있다.  
클릭하여 다운로드!... 하려고 하니 또 복잡한 페이지로 이동되었을 것이다.  
`Package files` 섹션에 32 또는 64bit msi 설치파일을 다운로드 받으면 된다.  
어떤 비트로 받아야 하는지 모를 경우에는 `윈도우키 + x > y`를 하여 *시스템 종류*란에 기제되어 있는 비트와 같은것을 받으면 된다.

1. 다운로드가 완료되었으면 실행하여 설치를 시작하자.  
`다음 > 다음 > ... > 완료`

1. 모니터 좌측 하단에 시작 버튼 클릭!  
**PuTTY (64-bit)** *새로 설치됨* 폴더가 생성되어 있음을 확인할 수 있다.  
앞으로는 PuTTY 관련된 실행파일은 이곳에서 찾아 실행하면 된다.

### PuTTYgen을 사용하여 프라이빗 키 변환

1. **PuTTYgen** 실행!

1. 실행창의 하단에 라디오 버튼은 `RSA`를 선택  
`Number of bits in a generated key:`는 **2048** 값으로 지정

1. `Load` 버튼 클릭!  
팝업창의 우측 하단에 `Putty Private Key File (*.ppk)`를 `All Files (*.*)`로 변경하고,  
예전에 t2를 대여하는 과정 후반부에 다운받았던 `FirstKey.pem`파일을 찾아서 `열기`를 클릭!  
(뭐라뭐라 메세지가 뜰수도 있는데 그냥 OK 누르면 된다.)

1. `Save private key`클릭!  
암호없이 저장할거냐는 경고문구에 예를 클릭!  
`.pem`파일의 이름을 **FirstKey**라고 하였으므로 `FirstKey`이름으로 저장!

1. **PuTTYgen** 종료.

### PuTTY 세션 시작

1. 인스턴스 목록 페이지로 돌아와 보자.  
아마 `인스턴스에 연결` 이라는 메세지가 아직도 떠있을 것이다.  
이곳에서 알려주는 **인스턴스 액세스 방법:** 의 4번에서 **예** 라는 곳을 보면, 
`ubuntu@************.amazonaws.com` 부분이 있는데 이부분을 앞으로 **아이디@주소**라고 부르겠다.  
잘 기억해두자.

1. **PuTTY** 실행!

1. 실행창이 뜨면 다른 값들은 건드리지 말자.  
`Host Name (or IP address)` 입력란에 **아이디@주소**를 그대로 붙여넣기로 입력!

1. 실행창의 좌측에 여러 메뉴가 있는데 `Connection > SSH > Auth`로 이동!  
`Browse...`버튼 클릭!  
**PuTTYgen을 사용하여 프라이빗 키 변환** 섹션에서 만들었던 `FirstKey.ppk`파일을 찾아서 열기 클릭!

1. PuTTY 실행창 우측 하단에 `Open`버튼 클릭!  
t2에 처음 접속을 시도할 경우 보안알림 메세지창이 뜨는데 **예**를 눌러서 수락한다.

검은화면에 흰 글씨가 나오는 도스같은 화면을 처음 보는 사람이라면 별 감흥이 오지 않을 것이다.  
특히 리눅스 명령어를 모른다면 더더욱이...  
이게 접속은 된게 맞는건지... 내가 여기서 뭘 할수 있는 것인지...

터미널에서 `pwd`를 입력하고 엔터!  
정상적으로 t2 원격접속에 성공했을 경우 **/home/ubuntu**라는 경로 문구가 나올 것이다.

이 접속된 터미널은 유지시킨 상태로 다음 섹션으로 넘어가자.

## Install Node.js on T2

미티어는 node.js를 기반으로 동작한다.  
따라서 미티어를 설치하면 자동으로 node.js가 설치된다. 하지만 미티어 내에서만 사용 가능하도록 설치가 된다.  
또한 자신이 만든 미티어 프로젝트를 빌드하면, 해당 압축 파일 내부에는 프로젝트에 필요한 소스들만 들어있다.  
고로 빌드파일의 압축을 풀고 해당 프로젝트를 실행하려면 미티어에 구애받지 않도록 PC자체에 Node.js가 설치되어 있어야 한다.

이때 PC에 Node.js를 아무버전 (혹은 최신버전)을  설치해서는 안된다.  
현재 내가 만든 미티어 프로젝트가 사용하는 미티어 내부 node.js 버전과 동일해야 한다.  
(미티어 프로젝트 node.js 버전보다 최신버전을 PC에 설치할 경우 보통은 문제가 없으나 그래도 버전은 맞추는게 좋다.)

### Check my meteor project version

1. 최초에 우리는 바탕화면에 셈플용 미티어 프로젝트를 만들었다.  
`윈도우키 + r > cmd > 앤터`를 하여 콘솔을 실행한다.

1. `cd Desktop/my_aws_test`를 입력하여 프로젝트 폴더로 이동

1. `meteor node --version`를 입력하여 프로젝트 내부 node.js 버전 확인  
이 글을 기록하는 시점에서 글쓴이의 프로젝트 버전은 `8.11.4`로 출력되므로 `8.x` 버전이다.  
이 다음 진행부터는 버전에 관한 것은 `8.x`가 아니라 본인의 콘솔에 찍힌 버전을 참고하면 된다.

### Install Node.js

1. 구글에 `node.js`를 검색하여 [Node.js 홈페이지][노드js홈페이지]로 이동

1. 상단에 `홈|ABOUT|다운로드|문서|참여하기|보안|뉴스|재단`메뉴중 `다운로드`를 클릭!

1. 최신 버전이 아닌 미니터 프로젝트에 맞는 버전을 리눅스에 설치해야 하므로 `패키지 관리자를 통한 Node.js 설치` 링크 클릭!

1. `데비안과 우분투 기반 리눅스 배포판. 엔터프라이즈 리눅스/페도라와 Snap 패키지` 클릭!

1. "공식 Node.js 바이너리 배포판은 NodeSource가 제공합니다." 라는 문구에서 [공식 Node.js 바이너리 배포판][공식Node.js바이너리배포판] 클릭!

1. 스크롤을 아래로 쭈~욱 내리다 보면 `Installation instructions` 섹션이 나온다.  
이곳에서 자신의 프로젝트에 해당하는 버전을 설치한다.  
글쓴이의 버전은 `8.x`이므로
    ```
    # Using Ubuntu
    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```
    를 복사하여 PuTTY로 열어놓은 터미널에 붙여넣기 하여 실행한다.  
    한번에 두줄을 다 복사하여 붙여넣기를 하면 첫줄은 자동으로 실행(다운로드)되며,  
    두번째 줄은 첫번째 동작이 종료된 뒤에 입력만 되어 있는 상태이므로 엔터를 눌러 실행(설치)한다.  
    \#으로 시작하는 구문은 주석이므로 복사할 필요는 없으며, 우리는 데비안이라는 운영체제를 사용하지 않으므로  
    `# Using Debian, as root`이하의 명령어는 실행하지 않는다.

1. 설치까지 모두 끝났으면 `node --version`을 입력해보자.  
글쓴이의 경우 `v8.15.0`이 출력된 것을 보아 `8.x` 버전이 정상적으로 설치됨을 확인했다.

t2에 nodejs도 설치 했으니 이제 미티어 프로젝트를 이곳으로 가지고 와서 압축을 풀고 실행만 하면 된다.  
그런데 t2에 파일을 옮기려면 옮기기 위한 전용 툴을 설치해야 한다.  
(필수는 아니지만 편의성을 위해 거의 필수급으로 설치하게 된다.)  
그럼 다음 섹션을 살펴 보자.

## Install FileZilla on T2

윈도우 운영체제에서 리눅스 계열 운영체제로 네트워크 환경을 이용하여 어떤 파일을 이동하기 위해서는 인증등의 복잡한 과정을 거쳐야 한다.  
그 과정을 한땀한땀 콘솔에 명령어를 쳐가면서 하기엔 매우 번거롭다.  
오타가 나서 엉뚱한 명령어가 실행되 곤란해질수도 있다.  
이러한 불편함을 해소하기 위해 여러 툴들이 개발되었는데 여기서는 **파일질라**를 이용할 것이다.

### Install FileZilla

1. 구글에 `파일질라`라고 검색하여 [파일질라][파일질라홈페이지]로 이동

1. 화면 중앙쯤에 `Quick download links` 섹션이 있고 아래에 다운로드 버튼이 있다.  
`Download FileZilla Client All platforms`를 클릭! (다운로드 시작이 아니라 페이지 이동이 될 것이다.)

1. 우리는 윈도우 운영체제를 쓰므로 `Windows (XX bit)` 섹션에 `Download FileZilla Client`를 클릭!  
(XX bit는 본인의 PC환경에 맞게 32 또는 64로 나올것이다.)

1. 다운로드가 시작될줄 알았더니 **pro** 버전과 **일반** 버전 중 어떤것을 다운받을거냐고 한다.  
우측의 일반을 다운받는다.

1. 다운로드가 완료되면 설치파일을 실행하여 설치를 시작한다.  
`동의 > 다음 > 다음 > ... > 완료`  
중간에 백신 프로그램을 설치할거냐는 채크박스가 두번 나오는데 채크해제를 하여 무료백신은 설치하지 말자.

### How to FileZilla connect to T2

1. **파일질라** 실행

1. 메뉴에서 `파일 > 사이트 관리자` 로 이동

1. `이름바꾸기` 클릭  
**aws test** 로 변경 (사실 이름바꾸기는 꼭 할 필요는 없다)

1. **PuTTY 세션 시작** 섹션에서 `아이디@주소`를 알아봤었다. 이곳에서도 해당 값을 써야한다  
프로토콜: `SFTP - SSH File Transfer Protocol`  
호스트: `주소`, 포트: `22`  
로그온유형: `키 파일`  
사용자: `아이디`
키파일: `FirstKey.ppk` (PuTTY 접속하기 위해 만든 파일을 찾아서 지정하면 된다)

1. 모든 설정을 지정하였으면 연결을 클릭!  
(다음부터는 `파일 > 사이트관리자`로 들어가보면 **aws test**라는 이름으로 목록에 저장되어 있을 것이다.)  
정상적으로 접속되었을 경우 상단 로그출력창 같은 곳에 *상태:	"/home/ubuntu" 디렉터리 목록 조회 성공*이라고 나올 것이다.  
좌측은 내 PC, 우측은 t2에 관한 컨트롤을 할수 있다.  
상단은 폴더 구조를 하단은 선택한 폴더에 들어있는 파일들의 리스트가 나온다.  
우측 폴더 구조를 보면
    ```text
    /
    └ home
       └ ubuntu
    ```
    와 같이 되어 있을텐데 `ubuntu`라는 폴더와 그 내부 폴더를 제외하고는 모두 폴더아이콘에 **?**가 있을 것이다.  
    **ubuntu**라는 계정으로 접속했기 때문에 해당 폴더 외에는 컨트롤 할 수 있는 권한이 없기 때문이다.  
    이어서 다음섹션을 보자.
    
### Pass the Meteor project build file to T2

1. 바탕화면에 있는 미티어 프로젝트 빌드 압축파일 `my_aws_test.tar.gz`를 찾아서 우측으로 드레그 하면 옮겨진다.  
t2의 옮기는 경로는 `/home/ubuntu` 이다.

1. 이후 **PuTTY**를 이용하여 t2로 접속한 콘솔창에 `pwd`를 입력해보자.  
`/home/ubuntu`라고 출력이 되지 않았다면 콘솔창에 `cd /home/ubuntu`를 입력.

1. 이제 콘솔창에 `ls`를 입력해보면 파일질라로 옮겨놓은 `my_aws_test.tar.gz`가 리스트에 나올것이다.  
콘솔창에 `tar -zxvf my_aws_test.tar.gz`를 입력하여 빌드 파일의 압축을 푼다.

압축까지 모두 풀었다.  
이제 프로젝트를 실행시키고 싶다면 다음 섹션을 보자.

## How to run meteor project

### run the project

1. 콘솔창에 다시 `ls`를 처보자.  
이번에는 `bundle`이라는 폴더도 리스트에 나올 것이다.  
콘솔창에 `cd ./bundle`을 입력하여 해당 폴더로 이동

1. 콘솔창에 `ls`를 입력하면 `README, main.js, programs, server, star.json` 다섯개의 리스트가 나올 것이다.  
이제 `node main.js`를 입력해보자.  
노드로 main.js를 실행시켜 미티어 프로젝트를 가동시키겠다는 의미이다.  
하지만 `Error: Cannot find module ` 이라는 애러와 함께 실행되지 않을 것이다.  
이유는 미티어 프로젝트에는 수많은 npm 모듈이 사용되는데 이 모듈을 모두 빌드파일에 넣어놓게 되면 용량과 파일개수가 많아져
불편함이 생기게 된다. 그래서 미티어 빌드파일은 수많은 npm 모듈 대신 *이 프로젝트에는 000 npm 모듈들을 사용합니다.* 라는
리스트만 `package.json`이라는 파일로 가지고 있다.  
따라서 프로젝트를 배포하기 전 최초에 npm 모듈들을 수동으로 설치해 주어야 한다.  
(프로젝트를 업데이트 하면서 새로운 모듈을 사용하게 되면 재배포 할때 수동으로 또 설치해줘야 한다.)

1. `package.json` 파일은 번들 폴더 내 `programs/server` 경로에 위치해 있다.  
그러므로 일단 `cd ./programs/server`을 입력하여 해당 폴더로 이동!  
(전체 경로는 `/home/ubuntu/bundle/programs/server` 이다.)

1. 콘솔에 `npm install`을 입력하여 모듈들을 설치!  
모든 모듈 설치가 끝나면 *run `npm audit fix` to fix them, or `npm audit` for details* 라는 메세지가 나올것이다.  
사용하는 모듈의 취약성 검사를 하라는 소리이다.

1. 콘솔에 `npm audit fix`를 입력!

1. 콘솔에 `cd ../..`를 입력!하여 다시 bundle 폴더로 돌아가자.

1. 콘솔에 `node main.js`을 입력하여 미티어 프로젝트를 실행!!!!!!!  
그러면 `Error: Must pass options.rootUrl or set ROOT_URL in the server environment`라고 애러가 뜬다... OTL...  
좌절하지 말자.  
미티어 프로젝트를 실행하기 전 컴퓨터에게 친절하게 `이 프로젝트는 000 주소의 000 포트로 대기하도록 실행시켜줘`라고 알려줘야 한다.  
이때 포트는 보통 80을 쓰게 되는데 1024 이하 포트를 조작하려면 관리자 권한이 필요하다.  
지금 `ubuntu`라는 계정으로 접속해있으므로 ... 조작할 수 없다.

1. 콘솔에 `sudo -i` 입력! (t2의 최고관리자 계정으로 전환한다)  
콘솔에 `pwd`를 쳐보면 `/root`로 이동해 있을 것이다.  
콘솔에 `cd /home/ubuntu/bundle` 입력!

1. 이제 미티어 프로젝트가 어떤 주소의 어떤 포트에 대기하도록 실행할지 설정하면 된다.
    ```text
    export ROOT_URL='http://localhost'
    export PORT=80
    node main.js
    ```
    라고 콘솔에 복사 붙여넣기! 엔터!
    
이렇게 미티어 프로젝트를 AWS를 이용하여 배포하였다. 그럼 정말 다른사람들이 내가 배포한 프로젝트로 접속할 수 있는지 확인해보자.

**PuTTY 세션 시작** 섹션에서 `아이디@주소`를 알아봤었다.  
여기서 **주소**가 바로 인터넷 주소이다. (구글이 https://google.com 인것처럼)  
브라우저를 실행하고 **주소*를 복사 붙여넣기 해보자! 접속이 될것이다!!

프로젝트를 실행할 때 매번 `export` 명령어로 환경변수를 설정해주는 것도 번거롭거나  
사람이 알아먹기 힘든 이상한 도메인 주소가 마음에 들지 않거나  
root 계정으로 변경하는데 비밀번호도 묻지 않는게 보안적으로 거슬리거나  
콘솔을 종료하고 다시 접속했을 때 이전에 실행시켰던 미티어 프로젝트를 어떻게 종료해야 할지 모른다면
다음섹션을 보자.

### How to exit Meteor project

프로젝트를 실행시킨 콘솔에서 `ctrl + c`를 하면 실행중인 미티어 프로젝트를 중지할 수 있다.  
그런데 프로젝트를 실행시켜놓고 콘솔을 종료해버렸다면?  
프로젝트는 계속 실행중이 되고 PuTTY로 재접속하여 `ctrl + c`를 한다고 종료되지 않는다.

1. PuTTY를 이용하여 t2에 재접속한다.

1. 콘솔에 `ps -ef|grep node` 실행 (노드로 실행되고 있는 프로세스를 보여줘 라는 의미이다.)

    |USER|PID|PPID|중간생략|실행파일|
    |:---:|:---:|:---:|:---:|:---:|
    |root|00000|11111|-----|main.js|
    
    대략 이런 형식으로 어떤 결과가 출력될 것이다.  
    여기서 PID는 프로세스 아이디를 의미한다.

1. 콘솔에 `sudo kill -9 00000`를 입력!  
여기서 `sudo`는 관리자 권한으로, `kill`은 종료, `-9`는 강제로, `00000`는 실제 출력된 PID를 넣으라는 소리이다.  
실행자가 **root**이므로 관리자 권한으로 실행해야지만 종료된다.

### How to set root user password

1. 콘솔에 `sudo passwd root` 입력

1. 설정할 페스워드를 입력하라고 나온다.  
페스워드를 입력하고 엔터! (입력하는 페스워드가 노출되지 않으나 입력되는 것이다.)  
다시한번 페스워드를 입력하라고 한다. 입력하고 엔터!

1. 앞으로는 최고관리자 계정으로 전환 할 때 비밀번호를 묻는다.  
최고 관리자로 전환하는 명령어는 `su` 이다.  
관리자에서 일반 사용자로 전환하는 명령어는 `su - username`이다.  
우리늬 일반 유저이름은 우분투이므로 `su - ubuntu`가 되겠다.

### Easily launch project using `*.sh` files

1. t2 콘솔로 접속후 `cd /home/ubuntu/bundle`을 입력하여 프로젝트 폴더로 이동!

1. 콘솔에 `vim start.sh` 입력!  
**vim** 이라는 텍스트 애디터로 `start.sh`파일을 생성해서 연다.  
(윈도우에서 메모장으로 start.txt를 만들었다고 생각하면 된다.)

1. 좌측에는 스프링노트의 스프링처럼 ~모양이 주~욱 있을 것이다.  
맨 위에는 초록색 또는 흰색 네모모양의 커서가 있을 것이다.  
맨 아래 한줄은 현재 **vim**에디터의 상태를 나타내는 것이라고 보면 된다.
여기서 타이핑을 한다고 바로 글자가 써지는 것은 아니고 키보드 `i`를 한번 눌러야 한다.  
그러면 상태표시줄이 `-- INSERT --`로 바뀌었을 것이다. (입력모드로 전환되었다는 소리다.)  
입력모드에서 나오고 싶다면 키보드의 `esc`를 누르면 된다.

1. `i`를 눌러 입력모드에서 아래 명령어를 입력한다.
    ```text
    export ROOT_URL='http://localhost'
    export PORT=80
    node main.js
    ```
    
1. 다 입력했으면 `esc`를 눌러 수정모드에서 나온 후 키보드 `shift + ;`키를 누른다.  
그러면 상태 표시줄에 `:`가 나타난다. 그러면 키보드 `w q`를 순차적으로 누른 후 앤터!  
(저장하고 종료 라는 의미이다.)

앞으로는 t2 콘솔접속 후 `bundle` 폴더로 이동 후 `sudo bash ./start.sh`를 입력하면 프로젝트가 실행된다.  
물론 지금은 이게 더 번거롭게 느껴질 수도 있지만 몽고디비 관련된 설정이나 기타 동작 및 설정을 지정해야 하는 경우,
이렇게 스크립트 파일을 만든 후 해당 파일실행 명령어 한줄만 입력하는 것이 편하다.

## How to change aws default domain to my domain

지금 오픈한 미티어 프로젝트는 aws에서 제공하는 aws기본 도메인을 사용하고 있다.  
이런 도메인을 사용하는 서비스에 사람들이 들어올 확률은 지극히 적다.  
그러므로 어떻게 내가 소유하고 있는 도메인으로 변경하는지 알아보도록 하자.

이럴때는 다른 서비스 제공 업체로부터 도메인을 산 경우와 (가비아, 후이즈 등등)  
AWS에서 직접 도메인을 산 경우로 나뉠 수 있다.

### First to do

AWS에서 `domain.com`을 구입했다고 하자.  
이제 **누가 이 도메인으로 접속하게 되면 t2의 주소로 연결시켜주세요**를 설정해야 한다.  
그 이전에 t2는 기본적으로 **유동IP**를 사용한다.  
한마디로 t2를 껏다 다시 켤때마다 IP가 변경된다는 소리이다.  
그렇기 때문에 우선 t2의 IP를 고정IP로 변경해주어야 한다.

1. AWS 홈페이지에 접속해서 로그인한다.

1. 상단 메뉴의 `Service > EC2`로 이동

1. 좌측 메뉴의 `네트워크 및 보안 > 탄력적 IP`로 이동  
아직 할당받은 IP가 하나도 없기때문에 목록에는 어떠한 결과도 없을 것이다.

1. 좌측 상단에 `새 주소 할당` 버튼 클릭

1. 변경된 페이지에서 별도로 무엇인가 선택하는 화면은 없을 것이다.  
`할당` 버튼 클릭

1. 새 고정 IP 주소를 할당 받았다. 잘 기억해두자.  
추가적으로 고정 IP는 할당받고 EC2에 적용 시킬경우 무료이지만, 할당받고 사용하지 않을 경우 시간당 요금이 부과된다.  
서둘러 우리의 t2에 적용시키자. 우측 하단의 `닫기` 버튼 클릭

1. 이제 방금 할당받은 고정 IP가 목록에 노출된다.  
해당 IP를 선택하고 좌측 상단의 `작업 > 주소연결` 클릭

1. 리소스 유형: 인스턴스  
인스턴스: 목록에서 선택 (우리는 t2 하나만 만들었으므로 목록에 하나밖에 없을 것이다)  
나머지는 설정하지 않고 우측 하단에 `연결`버튼 클릭

1. 이제 브라우저 주소입력란에 할당받은 고정 IP를 입력하면 실행시켜둔 서비스로 접속이 된다.

이제 언제나 우리의 t2를 껏다 켜도 IP 주소는 고정상태로 유지된다.  
이제 좀더 그럴싸해 보이도록 도메인을 구입해서 연결해보도록 하자.

### Use AWS DNS

AWS에서 도메인을 산 경우는 일단 도메인이 없다는 가정하에 도메인 구입 절차부터 시작하도록 하자.

#### how to buy domain

AWS에서 제공하는 [AWS에서 도메인 구매 방법][aws도메인구매방법]을 참고하는게 이 섹션을 읽는 것보다 더 좋을 수도 있다.

1. AWS 홈페이지에 접속하여 로그인 한다.

1. 상단 메뉴에서 `Services > 네트워킹 및 콘텐츠 전송 > Route 53` 클릭!

1. 화면 우측에 `Domain registration`의 `Get started now` 클릭!

1. 그러면 아직 구입한 도메인이 하나도 없으므로 빈 목록 상태의 페이지가 뜰 것이다.  
좌측 상단의 파란색 `RegisterDomain` 버튼 클릭!

1. 본인이 희망하는 도메인을 검색하고 사용 가능한 도메인일 경우 `Add to card` 버튼클릭!  
모두 골랐다면 우측 하단의 파란색 `Continue` 버튼 클릭!

1. 도메인을 소유주 정보를 입력하고 우측 하단의 파란색 `Continue` 버튼 클릭!

1. 입력정보 확인 후 좌측 하단의 약관 동의 채크박스 체크! 이후 우측 하단의 파란색 `Complate Purchase` 버튼 클릭!

1. Route 53에서 도메인을 등록해서 고맙다는 페이지가 뜬다.  
내용을 읽어보니 도메인 소유주 정보를 입력한 메일주소로 인증 메일이 발송되었다고 한다.  
15일 이내에 인증메일 내에 링크를 클릭하지 않으면 무효화 된다고 하니 해당을 읽고 링크를 클릭하자.  
참고로 필자는 10분정도 후에 이메일이 도착했다.  
이후 아래에 `도메인으로 이동` 버튼 클릭!  
인증 링크를 클릭 한 후에 바로 등록되는 것이 아니기 때문에 `Status of new domain registrations and domain transfers`라는 제목의 페이지로 이동될 것이다.  
그리고 방금 구매한 도메인이 등록대기중이라는 상태로 리스트에 노출되어 있을 것이다. (이것도 십여분정도 기다리면 된다.)  
이후 좌측 메뉴에서 `Registered domains`를 클릭하여 페이지를 이동하면 도메인이 등록되어 있다.

#### how to use this domain

1. 좌측 메뉴에서 `Hosted zones`로 이동  
AWS 페이지를 종료 한 경우 `aws홈페이지 > 로그인 > 상단 Service > 네트워킹 및 콘텐츠 전송 > Route 53 > 좌측 Hosted zones`

1. 리스트에서 방금 구입한 도메인 이름 클릭! (파란색 글씨로 되어있어 링크처럼 보일 것이다)

1. 상단 중앙 부근에 `Create Record Set` 파란색 버튼 클릭!  
좌측에 어떤 세팅값들을 입력하도록 표시될 것이다.

1. Name: `www` 입력  
Value: `First to do 섹션에서 할당받은 고정 IP` 입력  
우측 하단의 `Create` 버튼 클릭!

이제 브라우저 주소창에 구입한 도메인을 입력하면 우리의 프로젝트로 이동될 것이다!!!  
만약 앞에 www를 입력하지 않고도 들어오게 하고 싶다면 1~4번 과정을 한번 더 하되 마지막 단계에서 Name 값을 비워두면 된다.

### Use other DNS

이미 가비아, 후이즈 등등 다른 업체에서 도메인을 구매한 경우 아래 절차를 따르면 된다.  
특정 업체를 지정해서 설명할 수 없으므로 맥락을 잘 이해하고 업체관련된 세팅은 본인이 직접 해야 한다.

1. 좌측 메뉴에서 `Hosted zones`로 이동  
AWS 페이지를 종료 한 경우 `aws홈페이지 > 로그인 > 상단 Service > 네트워킹 및 콘텐츠 전송 > Route 53 > 좌측 Hosted zones`

1. 좌측 상단에 `Create Hosted Zone` 파란색 버튼 클릭!

1. Domain Name: `본인이 구입한 도메인 (예: domain.com)` 입력  
좌측 하단의 `Create` 버튼 클릭!

1. 그러면 호스트 존이 생성되고 해당 페이지로 이동 되있는 상태이다.  
리스트에서 타입이 `NS` 인 줄을 보면 `Value`가 4줄로 표시될 것이다.  
이것이 바로 네임서버 리스트인데 기억해두도록 하자!  
상단에 `Create Record Set` 클릭!  
좌측에 어떤 세팅값들을 입력하도록 표시될 것이다.

1. Name: `www` 입력  
Value: `First to do 섹션에서 할당받은 고정 IP` 입력  
우측 하단의 `Create` 버튼 클릭!

1. 이제 본인이 이용하고 있는 DNS 업체 홈페이지로 이동하여 로그인 하자.

1. 어딘가에 본인이 구매(소유)한 도메인 네임서버 값을 변경하는 페이지가 있을 것이다.  
잘 찾아서 해당 페이지로 이동

1. 아마 해당 업체의 기본 네임서버로 지정이 되어 있을 텐데 이제 아까 잘 기억해두라고 한 aws의 네임서버 값으로 모두 변경 적용해주자.

이제 몇분내로 모든 것이 적용 되고 정상적으로 본인의 도메인을 브라우저 주소창에 입력하면 우리의 프로젝트로 이동할 것이다.  
서비스 질이 불안정하거나 좋지 않은 곳의 업체를 사용하는 중이라면 적용까지 몇시간이 걸릴수도 있다.

[aws홈페이지]:https://aws.amazon.com/ko/
[노드js홈페이지]:https://nodejs.org/ko/
[공식Node.js바이너리배포판]:https://github.com/nodesource/distributions/blob/master/README.md
[파일질라홈페이지]:https://filezilla-project.org/
[aws도메인구매방법]:https://docs.aws.amazon.com/ko_kr/Route53/latest/DeveloperGuide/domain-register.html