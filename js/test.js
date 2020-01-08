let video;
let label = 'waiting...';
let classifier;

function preload(){
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/pO1VmcsR/');
}

function setup(){
  createCanvas(640,520);
  video = createCapture(VIDEO);
  video.hide();

  classifyVideo();
}

function classifyVideo(){
  classifier.classify(video, gotResults);
}


function draw(){
  background(0);

  image(video,0,0);

  textSize(32);
  textAlign(CENTER,CENTER);
  fill(255);
  text(label, width/2, height - 16);

  let emoji = '🤖';
  if (label == 'Class 1'){
    emoji = '😃'
  }else if (label == 'Class 2'){
    emoji = '😥'
  }

  textSize(256);
  text(emoji, width/2, height/2);
}

function gotResults(error, results){
  if (error) {
    console.error(error);
    return
  }
  label = results[0].label;
  classifyVideo();
}
