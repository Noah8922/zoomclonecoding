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

## 2.4

```Javascript
    console.log(socket.id); // socket에는 id가 있어서 id로 구별할 수 있다.
    console.log(socket.rooms); // socket이 어떤 방에 있는지 알기 위해서는  socket.rooms를 하면 된다.
    socket.join(roomname); // 방에 들어가기 위해서는 socket.join을 하면 된다.
```

# 3.0 User Video

- 첫번째로 유저로부터 비디오를 가져와서 화면에 보여줘야 한다. 음소거, 카메라, 카메라 전환
- playsinLine은 모바일 브라우저가 필요로하는 property이다.
  모바일로 비디오를 재생할 때, 그 비디오는 전체화면이 되어버린다. 그리고 핸드폰의 비디오 플레이어를 실행한다.
  playsinLine을 사용하면 비디오는 전체화면이 되지 않을 것이고, 웹사이트에서만 실행되도록 할 것이다.
- Stream은 비디오와 오디오가 결합된 것.

## 3.2 Camera Switch

- Camera를 바꾸기 위해서는 Select에서 Input값이 변경 되었는지를 감지해야 한다.

## 3.3 Introduction to WebRTC

- peer to peer, 브라우저끼지 연결되어 영상이나 오디오가 서버에 업로드 되지 않는다. 대신 서버는 어떤 브라우저에게 다른 한 브라우저의 위치를 알려줄 때만 사용된다.

## 3.4 Rooms

- 사람들이 Room을 submit하면 어떻게 되지? 우리는 form을 얻을거고 Welcome안에서 submit event를 listen할거고 그 다음 input을 얻어서 그것을 백엔드로 보낼거야.
  RoomName도 선언해준 후에, 나중에 방에 참가했을 때 쓸 수 있도록 RoomName을 입력할때 받아올 수 있도록 한다. 왜냐하면 우리가 지금 현재 있는 방의 이름을 알아야 하기 때문이다.

## 3.5 Offer

- addStream을 하기 전에 양쪽 브라우저에 RTC 연결을 만들어줘야 함. 이 연결은 일단 각각 따로 설정이 이루어진 후에 그 다음에 서버를 이용하여 즉, Socket IO를 활용하여 이어줄 것이다.

- 실제로 peerConnection을 모든 곳에 다 공유하고 싶다. 누군가가 getMedia 함수를 불렀을 때와 똑같이 myStream을 공유할 것이다.

```javascript
let myStream;
let muted = false;
let cameraOff = false;
let roomName;
let myPeerConnection;
```

첫번째 단계는 우리가 peerConnection을 각 브라우저에 만드는 것이다.

그 다음이 addStream인데, 이건 낡은 옛날 함수이다. 우리가 하고싶은 것은 우리 카메라에서 오는 이 Stream의 데이터를 가져다가 연결을 만드는 것, 우리는 그 peer-to-peer 연결 안에다가 영상과 오디오를 집어넣어야 한다.

```javascript
function makeConnection() {
  myPeerConnection = new RTCPeerConnection();
  console.log(myStream.getTracks()); //VideoTrack and AudioTrack
}
```

영상과 오디오를 주고 받을때, 그 영상의 오디오와 그 영상의 데이터들을 peer connection에 넣어야겠지?

- CreateOffer를 해야하는데, peer A가 offer를 생성하고 peerB가 answer를 생성한다. 그렇다면 누가 peerA이고 누가 peerB인가.
  peerA는 누군가 들어왔을 때 알림을 받는 브라우저이다. 즉 이 브라우저가 offer를 만드는 이 행위를 시작하는 주체라고 할 수 있다.
  그 내용의 코드가 아래와 같다.

```javascript
//offer part (Peer A에서 일어나는 일 / 알림을 받는 쪽)
socket.on("welcome", async () => {
  const offer = await myPeerConnection.createOffer(); //offer를 만든는 부분
  myPeerConnection.setLocalDescription(offer); //offer를 peer A의 환경에서 설정해 주는 것. (=Local)
  console.log("sent this offer");
  socket.emit("offer", offer, roomName); // 어떤방이 offer을 emit 할 것인지 누구한테 보낼지 알려줘야 한다.
});
```

- sibnaling process : 우리는 오디오와 영상을 주고받기 위해 서버가 필요하지 않는다. 하지만 offer을 주고 받기 위해서는 server가 필요하다. offer가 주고 받아진 순간, 우리는 직접적으로 대화를 할 수 있다.

## 3.6 Answer

- 우리가 offer을 보낸 다는 것은 이미 offer를 만든 후에 setLocalDescription을 마쳤고 peer B 에게 Description을 보낸다는 것이다. 그것이 setRemoteDescription을 의미한다.

## 3.7 IceCandidate

- 우리가 offer와 answer를 가질 때, 그걸 받는 걸 모두 끝냈을 때, 그러면 pee-to-peerㅇ 연결의 양쪽에서 icecnadidate라는 이벤트를 실행할거야
- Icecandidate란 Internet Connectivity Establishment (인터넷 연결 생성)이며 webRTC에 필요한 프로토콜을 의미하는데, 멀리 떨어진 장치와 소통할 수 있게 하기 위함이다. 즉, 브라우저가 서로 서통살 수 있게 해주는 방법이다. 일종의 중재하는 프로세스 같은 거지. 어떤 소통 방법이 가장 좋을 것인지를 제안할 때 쓰는 것이다.
- 다수의 후보들이 각각의 연결에서 제안되고 그리고 그들은 서로의 동의하에 하나를 선택한다. 그리고 그것을 소통 방식으로 사용한다.
- 이 모든 것은 answer을 받은 후에 일어나는 일이다.

- 서로 Stream을 주고 받은 후에는 peersStream이라는 video를 하나 더 만들어서

## 3.8 Sender

- 카메라를 바꾸면 그게 peer의 브라우저에서도 나타나게 해보자.
- 우리는 peer연결을 만들었고, 연결을 만드는 동시에 그 연결에 track을0 추가했다.
- 우리가 해야 할 일은 그 track을 바꾸는 일이다. 왜냐하면 카메라를 바꿀때마다 우리는 여기서 새로운 stream을 새로운 deviceID로 만들것이다.
- 즉, peer한테 줄 stream을 업데이트 하는 것이다. 왜냐하면 우리가 peer-to-peer 연결을 만들 때, 그 peer 연결에 track을 추가하기 떼문이다.

- sender란 peer로 보내진 media stream track을 컨트롤하게 해준다.
