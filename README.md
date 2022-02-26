# Noom

Zoom Clone using NodeJS, WebRTC and Websockets

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
