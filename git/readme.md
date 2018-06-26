# .gitignore

## .gitignore 이란?

git을 통해 프로젝트를 버전관리 할 때 버전관리를 할 필요가 없는 파일 또는 폴더(예를들어 .idea 또는 log와 같은) 목록을 지정하는 파일이다.

## .gitignore를 설정하지 않고 git remote로 push 하였을 경우 .idea 디렉토리 삭제 방법

```
git rm -r --cached .idea
git commit -m "remove webstorm .idea directory"
git push origin master
```

## .gitignore 파일 설정

프로젝트 최상위에서 .gitignore 파일 생성

내부에 채워 넣을 내용은 텍스트 에디터로 채워 넣으면 됨(당연히 메모장도 됨).

|커멘드|설명|
|----|---|
|빈라인|아무영향없음|
|#|주석|
|folder_name/|해당폴더 무시|
|folder_name/*.a|해당폴더 내 .a 확장자 파일 모두 무시|
|folder_name/**/*.a|해당폴더 및 하위폴더  내 .a 확장자 파일 모두 무시|
|/.a|현재 폴더 내 .a 확장자 파일 모두 무시|

## .gitignore 설정 적용이 안될 때

보통 git 서버에는 default 설정이 있기때문에 해당 파일을 생성했다고 해서 바로 적용되는 것이 아니다.

서버에 적용시키기 위해서는 아래와 같이 커멘드를 입력하자.

```
git rm -r --cached .
git add .
git commit -m "fixed gitignore"
```