//teachable mchine busso-----------------------------------------------------
let soundClassifier;
let soundLabel = "listening...";
let soundModel = "https://teachablemachine.withgoogle.com/models/CQEan2kQ3/";

//teachable machine video----------------------------------------------------

let videoClassifier;
let imageModelURL = "https://teachablemachine.withgoogle.com/models/rjYsncDqH/";
let video;
let flippedVideo;
let videoLabel = "";

// variabili mie--------------------------------------------------------------
let stato = "none";
let z = 10;
const tooLateTimer = 15000;
let ticketShown = false;
let isCloseVideoPlaying = false;

let mytTimer;

const divNero = document.querySelector(".div-nero");
//video-----------------------------------------------------------------------
const knockVideo = document.querySelector(".knockVideo");
knockVideo.style.opacity = 0;

const openVideo = document.querySelector(".openVideo");
openVideo.style.opacity = 0;

const close1Video = document.querySelector(".close1Video");
close1Video.style.opacity = 0;
close1Video.addEventListener(
  "ended",
  () => {
    close1Video.pause();
    console.log("finitovideochiuse");
    isCloseVideoPlaying = false;

    //close1Video.style.opacity = 0;
    //close1Video.muted = true;
    //divNero.style.zIndex = 99999;
  },

  false
);

const riddleVideo = document.querySelector(".riddleVideo");
riddleVideo.style.opacity = 0;

const winVideo = document.querySelector(".winVideo");
winVideo.style.opacity = 0;

const loseVideo = document.querySelector(".loseVideo");
loseVideo.style.opacity = 0;

const idleVideo = document.querySelector(".idleVideo");
idleVideo.style.opacity = 0;

// const idle1Video = document.querySelector(".idle1Video");
// idle1Video.style.opacity = 0;

// const idle2Video = document.querySelector(".idle2Video");
// idle2Video.style.opacity = 0;

// const idle3Video = document.querySelector(".idle3Video");
// idle3Video.style.opacity = 0;

// const idle4Video = document.querySelector(".idle4Video");
// idle4Video.style.opacity = 0;

// const idle5Video = document.querySelector(".idle5Video");
// idle5Video.style.opacity = 0;

//bottone start video---------------------------------------------------------
const startButton = document.getElementById("startButton");
startButton.onclick = function () {
  stato = "closed";
  startButton.remove();
  knockVideo.play();
  knockVideo.pause();

  openVideo.play();
  openVideo.pause();

  close1Video.play();
  close1Video.pause();

  riddleVideo.play();
  riddleVideo.pause();

  winVideo.play();
  winVideo.pause();

  idleVideo.play();
  idleVideo.pause();

  loseVideo.play();
  loseVideo.pause();
};

function preload() {
  soundClassifier = ml5.soundClassifier(soundModel + "model.json");
  videoClassifier = ml5.imageClassifier(imageModelURL + "model.json");

  knockVideo.pause();
  openVideo.pause();
  close1Video.pause();
  riddleVideo.pause();
  winVideo.pause();
  idleVideo.pause();
  loseVideo.pause();
}
function setup() {
  soundClassifier.classify(gotAudioResult);

  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  flippedVideo = ml5.flipImage(video);
  classifyVideo();

  // createCanvas(400, 400);
}

function draw() {
  // background(220);
  //console.log(soundLabel);
  //console.log(videoLabel);

  // fill(255);
  // textSize(32);
  // textAlign(CENTER, CENTER);
  // text(soundLabel, width / 2, height / 2);

  console.log(stato);

  if (stato == "closed") {
    checkBusso();
  }

  if (stato == "checkingTicket") {
    checkTicket();
  }

  if (stato == "tooLate") {
    tooLate();
  }

  if (stato == "riddle") {
    riddle();
  }

  if (stato == "checkingRiddle") {
    checkingRiddle();
  }

  if (stato == "win") {
    win();
  }

  if (stato == "lose") {
    lose();
  }
}

function gotAudioResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  soundLabel = results[0].label;
  if (soundLabel == "3 tap") {
    console.log("tre tap");
  }
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  videoClassifier.classify(flippedVideo, gotVideoResult);
}

// When we get a result
function gotVideoResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  videoLabel = results[0].label;

  classifyVideo();
}

//azioni dello stato----------------------------------
function checkBusso() {
  if (soundLabel == "3 tap") {
    stato = "animating";
    setTimeout(() => {
      stato = "checkingTicket";
    }, 2000);
    console.log("sei dentro testa di cazzo");
    //document.body.appendChild(knockVideo);
    //knockVideo.style.display = "block";

    knockVideo.style.opacity = 1;
    knockVideo.style.zIndex = z++;
    console.log(z);

    knockVideo.currentFrame = 0;
    knockVideo.play();
  }
}

function checkTicket() {
  mytTimer = setTimeout(() => {
    if (!ticketShown) {
      stato = "tooLate";
      clearTimeout(mytTimer);
    }
  }, tooLateTimer);
  if (videoLabel == "Biglietto") {
    ticketShown = true;
    console.log("dovrei controllare il ticket");
    stato = "animating";
    setTimeout(() => {
      stato = "riddle";
    }, 2000);
    //knockVideo.style.opacity = 0;
    openVideo.style.opacity = 1;
    openVideo.style.zIndex = z++;
    openVideo.currentFrame = 0;
    openVideo.play();
  }
}

function riddle() {
  riddleVideo.style.opacity = 1;
  riddleVideo.style.zIndex = z++;
  riddleVideo.currentFrame = 0;
  riddleVideo.play();
  stato = "animating";
  setTimeout(() => {
    stato = "checkingRiddle";
  }, 23000);
}

function checkingRiddle() {
  //console.log("checking riddle");

  idleVideo.style.opacity = 1;
  idleVideo.style.zIndex = z++;
  idleVideo.currentFrame = 0;
  idleVideo.play();

  if (idleVideo.currentTime.toFixed(1) == 1.1 || idleVideo.currentTime.toFixed(1) == 2.4 || idleVideo.currentTime.toFixed(1) == 4.4 || idleVideo.currentTime.toFixed(1) == 5.9 || idleVideo.currentTime.toFixed(1) == 0) {
    if (videoLabel == "Biglietto pieghetto") {
      stato = "win";
    } else if (videoLabel == "Storto") {
      stato = "lose";
    }
  }
}

function win() {
  winVideo.style.opacity = 1;
  winVideo.style.zIndex = z++;
  winVideo.currentFrame = 0;
  winVideo.play();
  stato = "animating";
  setTimeout(() => {
    expInit();
  }, 5000);
}

function lose() {
  loseVideo.style.opacity = 1;
  loseVideo.style.zIndex = z++;
  loseVideo.currentFrame = 0;
  loseVideo.play();
  stato = "animating";
  setTimeout(() => {
    expInit();
  }, 5000);
}

function tooLate() {
  clearTimeout(mytTimer);
  // console.log(stato);
  close1Video.muted = false;
  close1Video.style.opacity = 1;
  close1Video.style.zIndex = z++;
  close1Video.currentFrame = 0;

  if (stato != "animating" && isCloseVideoPlaying === false) {
    isCloseVideoPlaying = true;
    close1Video.play();
  }
  stato = "animating";

  setTimeout(() => {
    expInit();
    stato = "closed";
  }, 5000);
}

function expInit() {
  ticketShown = false;
  stato = "closed";

  knockVideo.currentFrame = 1;
  openVideo.currentFrame = 1;
  close1Video.currentFrame = 1;
  riddleVideo.currentFrame = 1;
  loseVideo.currentFrame = 1;
  winVideo.currentFrame = 1;
  idleVideo.currentFrame = 1;

  knockVideo.style.opacity = 0;
  openVideo.style.opacity = 0;
  close1Video.style.opacity = 0;
  riddleVideo.style.opacity = 0;
  winVideo.style.opacity = 0;
  loseVideo.style.opacity = 0;
  idleVideo.style.opacity = 0;
}
