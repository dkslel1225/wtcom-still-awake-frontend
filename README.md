# Still Awake

## 메모

rm -rf node_modules package-lock.json
npm install

NEXT_PUBLIC_SERVER = "https://wtcom-still-awake-backend.onrender.com"

NEXT_PUBLIC_SERVER = "http://localhost:3000/"

- 새로고침하면 리셋된다는거 명시하기
- 이름, 직업 입력란 : 글자수 제한

* 미사용 라이브러리 제거
  - "@react-three/drei": "^10.7.6",
  - "@react-three/fiber": "^9.4.0",
  - classnames

## 구현 우선순위

1. socket.io 사용하여, 실시간 접속자 수 표시 (28/n명)
2. 폼 제출 후 -> 모든 사용자에게 activatedRoom[] 데이터를 받아, 방 불이 켜질 것.
   - 내 방 모습 - scene으로 보여주기.
3. 방을 클릭하면, 해당 방의 유저와 실시간 채팅 가능.
   - 상대방 방 모습 - scene으로 보여주기.

## 예외 상황

- 방 등록
  - 만석인 경우:
    - guest로 참여.
    - 본인 방은 없으나, 채팅에 참여 가능.
- 충돌이 없도록 여러 요청은 백에서 순차적으로 실행할 것.(백)
- 금지어 필터링(백)

## 추가 구현(희망사항)

- 방에 내 아바타(캐릭터) 보여주기.
- 아바타 스킨 선택 가능하기 (4~5개)
- 접속 시간 기록(얼마나 오랫동안 집중했는지.) (ex. 뽀모도로)
- DB 연결
- 대화중인 방은, 창문 불빛이 깜빡깜빡

---

## 작업 완료

### UI

- 빌딩 Scene
  - 백그라운드 mesh (빌딩 하단부 & 공간의 바닥)
  - 각 방 mesh
  - 방 mesh 모아서 빌딩 만들기
- 방 창문 빛 제어
  - 호실에 해당하는 emissiveIntensity 제어.
  - bloom 적용하여, 더 사실감 있는 발광체로 구현.

### Feature

- 유저 정보 제출 폼
  - 호실 정보, 직업, 이름, 무엇으로 불릴지.
  - API: "/submit/userdata"

### Logic

- 화면 리사이징 대응

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
