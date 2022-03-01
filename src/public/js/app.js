const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const cameraSelect = document.getElementById("cameras");

const call = document.getElementById("call");

call.hidden = true;

let myStream;
let muted = true;
let cameraOff = false;
let roomName;
let myPeerConnection;

async function getCamera() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices(); //user가 가지고 있는 device 종류
    const cameras = devices.filter((device) => device.kind === "videoinput"); //device중 videoInput 만 가쟈오기
    const CurrnetCamera = myStream.getVideoTracks()[0]; // 내가 지금 쓰고 있는 카메라의 ID 가져오기
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (CurrnetCamera.label == camera.label) {
        option.selected = true;
      }
      cameraSelect.appendChild(option);
    });
  } catch (err) {
    console.log(err);
  }
}

async function getMedia(deviceID) {
  const initialConstrains = {
    audio: true,
    video: { facingMode: "user" },
  };

  const cameraConstraints = {
    audio: true,
    video: { deviceID: { exact: deviceID } },
  };
  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceID ? cameraConstraints : initialConstrains
    );
    myFace.srcObject = myStream;
    if (!deviceID) {
      await getCamera();
    }
  } catch (err) {
    console.log(err);
  }
}

getMedia();

function handleMuteClick() {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
}

function handleCameraClick() {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  } else {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  }
}

async function handleCameraChange() {
  await getMedia(cameraSelect.value);
  if (myPeerConnection) {
    const videoTrack = myStream.getVideoTracks()[0];
    const videoSender = myPeerConnection
      .getSenders()
      .find((sender) => sender.track.kind === "video");
    videoSender.replaceTrack(videoTrack);
  }
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
cameraSelect.addEventListener("input", handleCameraChange);

//welcome Form (choose a room)
const welcome = document.getElementById("welcome");
const welcomeForm = welcome.querySelector("form");

async function initcall() {
  welcome.hidden = true;
  call.hidden = false;
  await getMedia();
  makeConnection();
}

async function handleWelcomeSubmit(e) {
  e.preventDefault();
  const input = welcomeForm.querySelector("input");
  value = input.value;
  await initcall();
  socket.emit("join_room", value);
  roomName = value;
  input.value = "";
}

welcomeForm.addEventListener("submit", handleWelcomeSubmit);

// Socket Code

//offer part (Peer A에서 일어나는 일 / 알림을 받는 쪽)
socket.on("welcome", async () => {
  const offer = await myPeerConnection.createOffer(); //offer를 만든는 부분
  myPeerConnection.setLocalDescription(offer); //offer를 peer A의 환경에서 설정해 주는 것. (=Local)
  console.log("sent the offer");
  socket.emit("offer", offer, roomName); // Peer A가 offer를 보내는 부분, 어떤방이 offer을 emit 할 것인지 누구한테 보낼지 알려줘야 한다.
});

//offer를 받는 부분, (Peer B에서 일어나는 일이다.)
socket.on("offer", async (offer) => {
  console.log("received the offer");
  myPeerConnection.setRemoteDescription(offer); //Offer받은거 Peer B에 설정해 주기
  const answer = await myPeerConnection.createAnswer(); // Answer을 만드는 부분
  myPeerConnection.setLocalDescription(answer); // Answer을 peer B 로컬에 설정하는 부분
  socket.emit("answer", answer, roomName); //Peer B가 Answer을 보내는 부분.
  console.log("sent the answer");
});

socket.on("answer", (answer) => {
  console.log("received the answer");
  myPeerConnection.setRemoteDescription(answer);
});

socket.on("ice", (ice) => {
  console.log("received candidate");
  myPeerConnection.addIceCandidate(ice);
});

//RTC code (이 함수가 실제로 연결을 만드는 함수가 될 것이다.)
function makeConnection() {
  myPeerConnection = new RTCPeerConnection();
  myPeerConnection.addEventListener("icecandidate", handleIce);
  myPeerConnection.addEventListener("addstream", handleAddstream);
  myStream
    .getTracks() //VideoTrack and AudioTrack
    .forEach((track) => myPeerConnection.addTrack(track, myStream));
}

function handleIce(data) {
  console.log("sent candidate");
  socket.emit("ice", data.candidate, roomName);
}

function handleAddstream(data) {
  const peerFace = document.getElementById("peerFace");
  peerFace.srcObject = data.stream;
}
