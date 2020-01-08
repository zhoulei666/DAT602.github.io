let sentiment;
let statusEl;
let submitBtn;
let inputBox;
let sentimentResult;
let classifier;
let video;
let label = '';

let flippedVideo = undefined;
let imageModelURL = './model/';

function preload() {
   //classifier = ml5.imageClassifier(imageModelURL + 'model.json');
 }

function setup() {
  var cnv = createCanvas(640,550);
  var x = (windowWidth - width) / 2;
  cnv.position(x, 90);
  video = createCapture(VIDEO);
  video.hide();
  background(0);

  classifier = ml5.imageClassifier(imageModelURL + 'model.json', video, modelReady);
  //flippedVideo = ml5.flipImage(video)

  // initialize sentiment
  sentiment = ml5.sentiment('movieReviews', modelReady);

  // setup the html environment
  statusEl = createP('Loading...');
  statusEl.position(x, 645);
  inputBox = createInput('Write something about your mood today.');
  inputBox.attribute('size', '90');
  inputBox.position(x, 690);
  submitBtn = createButton('send');
  submitBtn.position(x + 600, 690);
  sentimentResult = createP('My suggestions:');
  sentimentResult.position(x, 700);
  // predicting the sentiment on mousePressed()
  submitBtn.mousePressed(getSentiment);
}

//function init() {
//  statusEl.createP('Loading...').style.color = 'white';
//  inputBox.createInput('Write something about your mood today.').style.color = 'white';
//  sentimentResult.createP('My suggestions:').style.color = 'white';
//}

function getSentiment() {
  // get the values from the input
  const text = inputBox.value();

  // make the prediction
  const prediction = sentiment.predict(text);

  // display sentiment result on html page
  if (prediction.score < 0.2) {
    sentimentResult.html('My suggestions:Sounds like you are in a bad mood and you need some help.Win a few, lose a few. That is life.Just look on the bright side!');//'Sentiment score: ' + prediction.score);
  } else if (prediction.score < 0.4) {
    sentimentResult.html('My suggestions:You are a little bit sad.Cheer up! Things will work out for the best.');
  }
  else if (prediction.score < 0.95) {
    sentimentResult.html('My suggestions:Well, you are a person i cannot guess.I dont know your feeling.Maybe give me more imformation.');
  }
  else {
    sentimentResult.html('My suggestions:You are so happy!Keep it up!');
  }
}

function modelReady() {
  // model is ready
  console.log('Model is ready!');
  //mobilenet.predict(gotResults);
  statusEl.html('Hello! im Emotion Detection Robot. Do you have anything to tell me? I can give you some suggestions!');

  // Start classifying
  classifyVideo();
}

function classifyVideo() {
  classifier.classify(gotResult);
}


function gotResult(error,results) {
  if (error) {
    console.error(error);
    return;
  }
  flippedVideo = ml5.flipImage(video);
  label = results[0].label;
  classifyVideo();
}

function draw() {
  background(0);
  if (flippedVideo) {
    image(flippedVideo, 0, 0);
  }
  fill(255);
  textSize(32);
  text(label, 10, height-20);
}
