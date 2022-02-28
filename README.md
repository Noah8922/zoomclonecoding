# Noom

Zoom Clone using NodeJS, WebRTC and Websockets

## part.0 introduction recap

Nodemon은 우리의 프로젝트를 살펴보고 변경 사항이 있을 시 서버를 재시작해주는 프로그램

서버를 재시작하는 대신에 babel-node를 실행하게 되는데

Babel은 우리가 작성한 코드를 일반 NodeJS 코드로 컴파일 해주는것. 그 작업을 src/server.js 파일에 해준다.

server.js 파일에서는 express를 import하고 express 어플리케이션을 구성하고

여기에 view engine을 pug로 설정하고, views 디렉토리가 설정되고

그리고 public 파일들에 대해서도 똑같은 작업을 해주고 있다.

Public 파일들은 프론트엔드에서 구동되는 코드고 이건 아주 중요한 부분이다.

왜냐하면 여기저기서 js파일들을 다루다 보면 어떤게 front이고 back인지 헷갈리기 때문에 이름도 그렇게 지은 것이다.

Server는 백에서 app은 프론트에서 구동되는 것이다.

```javascript
app.use("/public", express.static(__dirname + "/public"));
```

위 줄이 public 폴더를 유저에게 공개해준다. 보안상 유저가 서버의 모든 파일을 보는 것이 좋지 않기 때문에, 유저가 볼 수 있는 파일을 미리 설정해준다.

## prat.1 Chat with Websocket recap

we have to focus on the differance between http and Websocket. in http, server is kind of vary shy guy who can only answer whenever someone ask a question to him. otherwise in Websocket, the relationship between browser and server is like hand shaking, if broser request to hand shake then server can accept or reject. but if request is accepted, then connection between server and clinet is on-going, literally, they are connected. that's why server can rememeber who is this clinet while http doesn't. and due to this connection server can send any data without request from broeser.

## 1.2 ws

what protocol is 어떤 사람들이 어딘가에 있는 방에서 만나고 그리고 어떻게 일들이 진행될지 결정한다. 어떻게 모든 것이 돌아가야 할지에 대한 규칙을 만들어 그런 다음에 프로그래머는 이 규칙을 가지고 이 규칙에 따르는 코드를 만들어서 실행해, 즉 protocol이란 표준이 되는 규칙.

## 1.3 WebSocket Events

Socket이란게 뭘까, Socket is the person who just connected. Socket is the line conected browser with server

## 1.8 Nickname part Two

JSON stringify는 javascript object를 string으로 바꿔주고
JSON Parse는 string을 Javascript object로 바꿔준다.

왜 Javascript Object를 String으로 보내야 하는가.

Back-end가 Javascript Object를 전혀 이해하지 못한다. 우리는 단순히 String만을 보낼수 있으니까,
Javascript Object를 백엔드로 보내는 것은 좋지 않다. 왜냐하면 연결하고 싶은 front-end와 back-end 서버가 서로 다른 언어일 수 있기 때문이다. Javascript Object로 보냈지만, 읽을 수 없는 상황일 수 있다. Javascript로 서버를 만들었지만 누군가는 front에서 Go언어로 접속할 수 있기 때문에 모두가 읽을 수 있는 String으로 보낸 다음에, 각 서버에서는 그 String을 가지고 뭘 할지 정하는 것.

## 2.0 what is SocketIO

it is framework, Websocket에 문제가 생겨도 SocketIO는 계속해서 작동한다. SocketIO가 WebSocket의 부가기능이 아님.
SocketIO는 프론트와 백엔드간 실시간 통신을 가능케 해주는 프레임워크 또는 라이브러리 이다.

## 2.1 Installing SocketIO

방을 만들어준다. 나중에 이부분이 필요할지도

## 2.2 SocketIO is Amazing

Socket.emit("room". {payload : input.value})

SocketIO에서는 emit을 사용함으로써 어떤 종류의 Event이든 보낼 수 있고, 굳이 String이 아니어도 괜찮다.
마지막에 실행되는 function을 보내고 싶으면, 마지막에 넣어야 한다.

## 2.3 Recap

프론트에 작성된 코드는 백엔드에서 재생 버튼을 누르면 실행되는 것이다.
