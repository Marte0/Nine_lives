//teachable mchine busso
let soundClassifier;
let soundLabel = "listening...";
let soundModel = "https://teachablemachine.withgoogle.com/models/lNW16UxdQ/";

//teachable machine video

// Classifier Variable
let videoClassifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/QBfiA-3tZ/";

let video;
let flippedVideo;
let videoLabel = "";

// variabili mie
let stato = "closed";

let rythm = [];
let bgNoiseCounter = 0;

let img;

let knockVideo;
let openingVideo;

function preload() {
  // Load the model busso
  soundClassifier = ml5.soundClassifier(soundModel + "model.json");
  videoClassifier = ml5.imageClassifier(imageModelURL + "model.json");

  //knock video
  knockVideo = createVideo("assets/knock.mp4");
  knockVideo.size(884, 310.636);
  knockVideo.hide();

  //open video
  openingVideo = createVideo("assets/opening.mp4");
  openingVideo.size(884, 310.636);
  openingVideo.hide();
}

function setup() {
  createCanvas(884, 390);
  // Start classifying
  // The sound model will continuously listen to the microphone
  soundClassifier.classify(gotAudioResult);

  //roba per detect dalla webcam
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  flippedVideo = ml5.flipImage(video);
  classifyVideo();
}

function draw() {
  background(200);
  // Draw the label in the canvas
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(soundLabel, width / 2, height / 2);

  if (img != null) {
    image(img, 0, 0);
  }

  if (stato == "checking") {
    img = knockVideo.get();

    if (videoLabel == "biglietto") {
      stato = "opening";
    }
  }
  if (stato == "opening") {
    openingVideo.play();
    img = openingVideo.get();
  }
}

// The model recognizing a sound will trigger this event
function gotAudioResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  soundLabel = results[0].label;

  if (stato == "closed") {
    checkBusso();
  }
}

function checkBusso() {
  // if (bgNoiseCounter > 2) {
  //   bgNoiseCounter = 0;
  //   rythm = [];
  // }

  // if (soundLabel == "Rumore di sottofondo") {
  //   bgNoiseCounter++;
  // }

  if (soundLabel == "3 tap") {
    rythm = ["3 tap"];
  } else {
    rythm.push(soundLabel);
  }

  // if (
  //   rythm.toString() == ["3 tap", "Rumore di sottofondo", "1 tap"].toString() ||
  //   rythm.toString() == ["3 tap", "Rumore di sottofondo", "Rumore di sottofondo", "1 tap"].toString() ||
  //   rythm.toString() == ["3 tap", "1 tap", "Rumore di sottofondo", "1 tap"].toString() ||
  //   rythm.toString() == ["3 tap", "1 tap", "1 tap", "Rumore di sottofondo", "1 tap"].toString()
  // ) {
  //   stato = opening
  //   console.log("sei dentro testa di cazzo")
  // }

  if (soundLabel == "3 tap") {
    stato = "checking";
    console.log("sei dentro testa di cazzo");
    knockVideo.play();
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
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  videoLabel = results[0].label;
  console.log(videoLabel);
  // Classifiy again!
  classifyVideo();
}
