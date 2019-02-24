# Install MongoDB on Ubuntu OS PC in AWS EC2

본인의 PC 운영체제가 window 이며 이미 Robo 3T가 설치되어 있고  
AWS EC2 서비스를 이용하여 리눅스 계열의 우분투(18.04) 운영체제 서버(PC)를 대여 했으며  
본인의 PC에서 대여한 서버로 PuTTY를 이용하여 접속 할 수 있다는 가정한다.

이곳에 몽고디비를 어떻게 설치하고 Robo 3T로 원격접속 할 수 있는지 알아보자.

설명 수준은 최소한 위 가정에 부합하는 추심자를 기준으로 한다.  
(설명, 용어 등을 너무 풀어서 구차하거나 오히려 이치에 맞지 않을 수 있음)

몽고디비 설치에 관하여 1도 모른다거나 계정설정에 따른 디비별 보안 구축에 대해 모른다면
[윈도우10에 MongoDB(몽고디비) 설치하기][몽고디비설치하기]를 참조하자.

그 외 방화벽 등 포트 보안 설명은 초심자 단계를 넘어가므로 설명하지 않는다.

## How to install mongoDB

1. PuTTY를 이용하여 서버에 접속한 터미널을 하나 띄워둔다.

1. 구글에 `mongoDB`를 검색하여 [몽고디비 홈페이지][몽고디비홈페이지]에 접속

1. 사이트 최하단까지 스크롤을 내려 사이트맵 리스트에서 `Education & Support > Installation`으로 이동

1. 스크롤을 죽 내려 `MongoDB Community Edition` 섹션의 `Install on Linux` 링크 클릭

1. `Install on Ubuntu` 링크 클릭

1. 스크롤을 내리면 몽고디비를 설치절차를 4단계 절차로 나눠 설명하고 있다.  
절차에 맞게 커멘드를 복사 붙여넣기 하며 설치를 진행한다.

1. 터미널에 `mongo --version` 입력 시, 정사적으로 설치되었을 경우 몽고디비 버전을 비롯한 기본 정보가 출력된다.

1. 터미널에 `sudo service mongod start` 입력으로 몽고디비를 실행한다.  
시작은 `start`, 중지는 `stop`, 재시작은 `restart` 이다.

## How to uninstall mongoDB

1. 터미널에 `sudo service mongod stop` 입력으로 몽고디비를 중지시킨다.

1. `sudo apt-get purge mongodb-org*` 입력으로 몽고디비 페키지를 삭제한다.

1. `sudo rm -r /var/log/mongodb` 입력으로 몽고디비 로그를 삭제한다.

1. `sudo rm -r /var/lib/mongodb` 입력으로 저장장치에 기록되어 있는 몽고디비 데이터베이스를 삭제한다.

## How do know if mongoDB is running

1. 콘솔에 `ps -ef|grep mongo` 입력!  
몽고디비가 실행중일 경우 대략 아래와 같이 두줄이 출력될 것이다. (숫자는 모두 0 처리함)
    ```text
    mongodb   0000     0  0 00:00 ?        00:00:00 /usr/bin/mongod --config /etc/mongod.conf
    ubuntu    0000  0000  0 00:00 pts/0    00:00:00 grep --color=auto mongo
    ```
    만약 실행중이지 않다면 `monogodb`로 시작하는 한줄 또는 출력되는 것이 없다.

## How to connect to Mongodb of AWS on Robo 3T

1. Robo 3T 실행

1. 좌측 상단의 PC 2대 아이콘 클릭

1. 팝업창의 좌상단 `Create` 버튼 클릭

1. `SSH` 탭으로 이동 후 `Use SSH tunnel` 채크

1. 아래와 같이 설정값을 입력!  
SSH Address: `본인 인스턴스(ec2)의 IPv4 퍼블릭 IP`:`22`  
SSH User Name: `ubuntu`  
SSH Auth Method: `Private Key`  
Private key: `이 인스턴스에 해당하는 *.pem 파일`

1. 좌하단에 `Test` 버튼 클릭!  
이상이 없을 경우 우하단의 `Save` 버튼 클릭으로 저장!

## If want to use an account to control access

몽고디비의 각 데이터베이스에 접근 허가를 부여한 계정으로 통제하려는 경우에 대해 알아보자.  
이미 몽고디비 계정을 생성할 수 있는 정도의 수준과 최소한의 vim 사용법을 숙지하고 있어야 아래 내용을 이어갈 수 있음.
(별도의 계정 생성방법이나 vim 사용법 서술 안함)

`mongod.conf`의 옵션정보는 [이곳][몽고설정파일설명]을 참고하자.

1. 터미널에 `su`를 입력하여 관리자로 전환한다.

1. `vim /etc/mongod.conf` 입력

1. `#security:` 부분의 주석을 풀어 아래와 같이 옵션값을 추가 후 저장한다.
    ```text
    security:
       authorization: enabled
    ```

[몽고디비설치하기]:https://github.com/niceplugin/howto/blob/master/MongoDB-install-window10.md
[몽고디비홈페이지]:https://www.mongodb.com/
[몽고설정파일설명]:https://docs.mongodb.com/manual/reference/configuration-options/