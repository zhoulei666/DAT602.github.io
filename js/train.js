let mobilenet;
let classifier;
let video;
let label = '';
let introduce1;
let introduce2;
let happyButton;
let sadButton;
let normalButton;
let angryButton;
let fearButton;
let trainButton;


function modelReady() {
  console.log('Model is ready!');
}

function videoReady() {
  console.log('Video is ready!');
}

function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    classifier.classify(gotResults);
  }else{
    console.log(loss);
  }
}

function gotResults(error,results) {
  if (error) {
    console.error(error);
  } else {
    label = results[0].label;
    classifier.classify(gotResults);
  }
}

//function imageReady() {
//  image(squirrel, 0, 0, width, height);
//}

function setup() {
  var cnv = createCanvas(640, 550);
  var x = (windowWidth - width) / 2;
  cnv.position(x, 90);
  video = createCapture(VIDEO);
  //video.position((windowWidth - width) / 2,90);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet',modelReady);
  classifier = mobilenet.classification(video, videoReady);

  introduce1 = createP('If i am not smart enough.You can train me here.');
  introduce1.position(x,650);
  introduce2 = createP('Click the emotion button and give the corresponding expression.Then click train and see what happens.');
  introduce2.position(x,675);

  happyButton = createButton('Happy');
  happyButton.style('font-size','30px');
  happyButton.style('background-color','#0086d2');
  happyButton.position(x+10,730);
  happyButton.mousePressed(function(){
    classifier.addImage('You look Happy!That is good!');
  });

  sadButton = createButton('S a d');
  sadButton.style('font-size','30px');
  sadButton.style('background-color','#0086d2');
  sadButton.position(x+155,730);
  sadButton.mousePressed(function(){
    classifier.addImage('You look Sad.Hope you cheer up!');
  });

  normalButton = createButton('Normal');
  normalButton.style('font-size','30px');
  normalButton.style('background-color','#0086d2');
  normalButton.position(x+280,730);
  normalButton.mousePressed(function(){
    classifier.addImage('You look expressionless.Are you a robot?');
  });

  angryButton = createButton('Angry');
  angryButton.style('font-size','30px');
  angryButton.style('background-color','#0086d2');
  angryButton.position(x+420,730);
  angryButton.mousePressed(function(){
    classifier.addImage('You look Angry.Please calm down!');
  });

  fearButton = createButton('Fear');
  fearButton.style('font-size','30px');
  fearButton.style('background-color','#0086d2');
  fearButton.position(x+550,730);
  fearButton.mousePressed(function(){
    classifier.addImage('You look Fear.I will be with you!');
  });

  trainButton = createButton('Train');
  trainButton.style('font-size','30px');
  trainButton.style('background-color','#0086d2');
  trainButton.position(x+550,780);
  trainButton.mousePressed(function(){
    classifier.train(whileTraining);
  });
}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(32);
  text(label, 10, height-20);
}
