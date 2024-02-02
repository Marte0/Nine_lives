//teachable mchine busso-----------------------------------------------------
let soundClassifier;
let soundLabel = "listening...";
let soundModel = "https://teachablemachine.withgoogle.com/models/lNW16UxdQ/";

// variabili mie--------------------------------------------------------------
let stato = "closed";
let z = 10;

//video-----------------------------------------------------------------------
const knockVideo = document.querySelector(".knockVideo");
knockVideo.style.opacity = 0;

const openVideo = document.querySelector(".openVideo");
openVideo.style.opacity = 0;

//bottone start video---------------------------------------------------------
const startButton = document.getElementById("startButton");
startButton.onclick = function () {
  startButton.remove();
  knockVideo.play();
  knockVideo.pause();
};

function preload() {
  soundClassifier = ml5.soundClassifier(soundModel + "model.json");
}
function setup() {
  soundClassifier.classify(gotAudioResult);

  // createCanvas(400, 400);
}

function draw() {
  // background(220);
  // // console.log(soundLabel);
  console.log(videoLabel);

  // fill(255);
  // textSize(32);
  // textAlign(CENTER, CENTER);
  // text(soundLabel, width / 2, height / 2);

  if (stato == "closed") {
    checkBusso();
  }

  if (stato == "checkingTicket") {
    checkTicket();
  }
}

function gotAudioResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  soundLabel = results[0].label;
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
  if (videoLabel == "biglietto") {
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
