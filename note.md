# Initialize Project
- npx create-react-app react-board
- cd react-board
- code . -r
- "필요없는 파일들 삭제"
- "필요없는 코드들 삭제"
  - app.css 초기화
  - app.js header 속 내용 삭제
  - index.js reportwebvitals() 삭제, 필요없는 import 삭제

# React + Express
- npm 패키지 설치 진행
  - npm i express 
  - npm i mysql 
  - npm i axios 
  - npm i body-parser 
  - npm i json 
  - npm i cors 
  - npm i nodemon
- React 파트 npm 패키지 설치
  - npm i react-router-dom
  - npm i react-bootstrap bootstrap
- package.json에 프록시 추가
  - "proxy" : http://localhost:5000

# Express 세팅
- src 폴더 밑에 component, server 폴더 생성
- server 폴더 밑에 server.js 파일 생성
- server.js 코딩

# Express 기동
- /src/server로 이동
- node ./server.js

# Component 세팅
- React 수업때 했던 컴포넌트 복사
- App.js, App.css 내용 복사

# 데이터 소스 수정
- data.js에서 받아오던 데이터를 mysql을 통해 받아오도록 변경해야 함
  - boardlist.jsx
    - import boardlist from ..data/data 삭제
  - boardview.js에서 데이터 가져오는 부분 삭제

# 수정, 삭제, 게시 버튼 기능 추가
- BoardView.jsx에 onDelete 함수 추가
- BoardWrite.jsx에 onChange, onSubmit 함수 추가