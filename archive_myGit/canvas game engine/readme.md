module_fortestcode.js 를 제외하고 나머지는  일단은 분할되어 있으나 하나로 바인드 해야 함.

바인드 할때에는 익명함수 내부로 할것. (스코프에 따른 속도)

바인드 후 사용자 API만 따로 리턴해서 밖으로 뺄것.

### module core

requestAnimationFrame로 콜백 함수 실행.

매 함수 실행마다 프레임 관련 데이터 업뎃

### module view

이름 그대로 보여지는 부분에 관련된 컨트롤 객체

엔진에 의해 켄버스가 실행중일때 윈도우(브라우저 창)이 활성 비활성화 됨에 따른 이벤트 컨트롤

리사이즈에 따른 이벤트 컨트롤

가로 세로 화면전환에 따른 상태 업뎃 및 이벤트 컨트롤

화면 크기에 따른 켄버스 뷰포트 크기는 조절될 수 있으나 내부적인 좌표는 유지되어야 하므로 비율에 따른 좌표 계산을 위한 기타 정보값 업뎃 및 저장

(아.. 뭐라 설명을 저장해야 될지 모르겠지만 매우 심플하므로 코드 몇번 읽으면 알것)

### module input

켄버스 내에서 키보드, 마우스, 휠 입력에 관한 이벤트 헨들러 처리부분

쉽게 말해 keydown 이벤트 헨들러는 키보드 재입력 속도에 따라 매번 이벤트 헨들러가 호출되나

아마도 게임내에서 원하는 것은 눌려지고 있을 경우 최초 실행하고 지속유지되며 keyup 되었을때 소멸하는 이벤트 헨들러를 원할것.

아무튼 javascript 네이티브 이벤트 헨들러와 흡사하나 사용목적에 따른 재구성된 헨들러임.

터치 헨들러는 구현하지 않았는데 마우스와 다를건 없어서 금방 구현할수 있었으나 마우스는 하나임에 불구하고 터치는 멀치터치를 지원해야 하므로 약간의 보완이 필요했음.

추후 프로젝트 재 추진시 참고할것. (터치 미구현 및 멀티 터치 처리부분)

### module_fortestcode

위 모듈들을 테스트 하기 위한 셈플 코드.

모듈 부분부분에 맞춰 그때그때 테스트 할때 쓴거라 이거 그대로 복붙 하면 아마 일부에서 오작동 할 것임.

모듈이나 테스트 코드 자체에 문제가 있는것은 아니고 해당 모듈에 맞게 테스트 코드 손봐야 함.

(프로젝트 재 추진시 해매지 말것.)