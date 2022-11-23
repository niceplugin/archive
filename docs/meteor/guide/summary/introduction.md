---
title: 시작하기
---

# 시작하기 %{ #introduction }%

## Meteor란 무엇입니까? %{ #what-is-meteor }%

Meteor는 최신 웹 및 모바일 앱 개발을 위한 풀스택 JavaScript 플랫폼입니다.
Meteor에는 클라이언트와 연결된 반응형 앱, 빌드 도구, 선별된 핵심 패키지 세트로 이루어져 있습니다.

- 앱 서버, 웹 브라우저 및 모바일 장치 등 모든 환경에서 하나의 언어인 JS로 개발할 수 있습니다.
- 와이어 데이터를 사용해 서버가 HTML이 아닌 데이터를 보내고 클라이언트가 데이터를 렌더링합니다.
- 매우 활동적인 JS 커뮤니티 생태계를 포용하여, 가장 좋은 부분을 신중하게 고려해 여러분에게 제공합니다.
- 풀스택 반응성을 제공하므로, 최소한의 개발 노력으로 UI가 실제 상태를 원활하게 반영합니다.

## 설치 %{ #install }%

OS X 및 리눅스:

```shell
curl https://install.meteor.com/ | sh
```

Windows:
```shell
npm install -g meteor
```

::: info
- 64비트 운영체제만 지원됩니다.
- Windows의 경우, [Node.js](https://nodejs.org/ko/) 버전 14 이상에서 작동합니다.
- Windows 7/Windows Server 2008 R2 이상을 지원합니다.
- Apple M1, M2는 Meteor 2.5.1부터 지원됩니다.
  (이전 버전은 [Rosetta 터미널](https://osxdaily.com/2020/11/18/how-run-homebrew-x86-terminal-apple-silicon-mac/)로 실행해야 합니다.)
- Mac M1(Arm64 버전) 또는 M2를 사용 중인 경우, Meteor가 MongoDB를 실행하는데 Rosetta 2를 사용하므로, Rosetta 2를 설치해야 합니다.
  [설치 방법 확인](https://osxdaily.com/2020/12/04/how-install-rosetta-2-apple-silicon-mac/)
- iOS 개발에는 최신 Xcode가 필요합니다.
- Linux 바이너리는 CentOS 6.4 i386/amd64로 빌드됩니다.
:::

::: warning
프로젝트 package.json에 meteor를 설치하지 마십시오.
npm으로 받는 meteor는 이것을 설치하기 위한 프로그램일 뿐입니다.
:::

## 제거 %{ #uninstall }%

npm을 사용하여 설치한 경우:

```shell
meteor-installer uninstall
```

curl을 사용하여 설치한 경우:

```shell
rm -rf ~/.meteor sudo rm /usr/local/bin/meteor
```

## 빠른 시작 %{ #quick-start }%

Meteor가 성공적으로 설치 되었다면, 터미널(명령 프롬프트)에 다음과 같이 명령어 실행:

```shell
meteor create --blaze myapp   # myapp 이라는 폴더를 생성하고
                              # 내부에 meteor 프로젝트 구성
cd myapp                      # myapp 폴더로 이동
meteor npm install            # meteor를 처음 실행할 경우,
                              # 사전 설정된 npm 페키지 설치 필요
meteor                        # meteor 실행
# Meteor server running on: http://localhost:3000/
```

::: info
이 문서는 `blaze 템플릿`을 기반으로 설명합니다.
```shell
meteor create [ --Front-End ] myapp
```
위 커멘드에서 옵션 없이 `meteor create myapp`을 생성하면,
기본적으로 `react`를 기반의 앱이 생성됩니다.

사용할 수 있는 옵션: `--react`, `--blaze`, `--vue`, `--svelte`
:::

[//]: # (todo docs: 배포 관련 기본 사항 설명 필요)

## 참고 사이트 %{ #reference-site }%

- [공식 Meteor 사이트](https://www.meteor.com/)
- [공식 깃허브](https://github.com/meteor)
- [Atmosphere](https://atmospherejs.com/): Meteor를 위해 특별히 설계된 패키지의 저장소
- [공식 포럼 사이트](https://forums.meteor.com/)
- [공식 슬렉 채널](https://join.slack.com/t/meteor-community/shared_invite/enQtODA0NTU2Nzk5MTA3LWY5NGMxMWRjZDgzYWMyMTEyYTQ3MTcwZmU2YjM5MTY3MjJkZjQ0NWRjOGZlYmIxZjFlYTA5Mjg4OTk3ODRiOTc)
