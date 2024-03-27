const webcamButton = document.getElementById("webcamButton");
const webcamVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

const callButton = document.getElementById("callButton");

const callInput = document.getElementById("callInput");
const answerButton = document.getElementById("answerButton");

const hangupButton = document.getElementById("hangupButton");

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);
let localStream;
let remoteStream;

webcamButton.onclick = async () => {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    // Push tracks from local stream to peer connection
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    // Pull tracks from remote stream, add to video stream
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    // Stream tracks from local stream and remote stream
    webcamVideo.srcObject = localStream;
    remoteVideo.srcObject = remoteStream;

    callButton.disabled = false;
    answerButton.disabled = false;
    webcamButton.disabled = true;
  } catch (e) {
    console.log("Error with accessing webcam", e);
  }
};

callButton.onclick = () => {
  console.log("callButton clicked");
};

answerButton.onclick = () => {
  console.log("answerButton clicked");
};

hangupButton.onclick = () => {
  console.log("hangupButton clicked");
};
