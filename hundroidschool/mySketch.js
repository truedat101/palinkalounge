var version = "v1.0.2";
var isOverRectangle = false;
var x = 1;
// These defaults get tossed
var y = 660; 
var w = 150;
var h = 80;
var x2 = 1470;
var a;
var flagimg;
var headlines = [
  "Köszi = Thanks", 
  "Szia = Hi", 
  "Komolyan? = Really?", 
  "Hogy vagy? = How are you? ", 
  "Viszontlátásra = Goodbye", 
  "Ez óriási = That’s great", 
  "Puszi = Kiss", 
  "Erre igyunk = Let’s drink to that", 
  "Mizu = Wassup? ", 
  "Egészségedre = Cheers ", 
];

var assetpath = "data/";
var audiofiles = [  
  assetpath + "koszi.mp3", 
  assetpath + "szia.mp3", 
  assetpath + "komolyan.mp3", 
  assetpath + "hogyvagy.mp3", 
  assetpath + "viszontlatasra.mp3", 
  assetpath + "ezoriasi.mp3", 
  assetpath + "puszi.mp3", 
  assetpath + "erreigyunk.mp3", 
  assetpath + "mizu.mp3", 
  assetpath + "egeszegedre.mp3"
];

var index = 0;

// final static AudioPlayer[] audiotracks = new AudioPlayer[audiofiles.length];
var audiotracks = [];

function preload() {
  flagimg = loadImage("img/hungarianflag.jpg");
  // Load up the audio tracks
  for ( var idx = 0; idx != audiofiles.length; idx++) {
       soundFormats('mp3');
       audiotracks.push(loadSound( audiofiles[idx], function() { print("done loading"); }));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
	print("windowHeight-" + windowHeight);
  stroke(0);
  noFill();
  textAlign(CENTER);
  // textFont(createFont( "Constantia-Bold-48",60, true));
  // minim = new Minim(this);
	x = width*0.009
  y = height*0.812;
	x2 = width*0.8
	w = width * 0.1
	h =  height * 0.12
}

function draw() {
  background(255);
  fill(255);
	//print("x:" + x + " y:" + y);
  rect(x, y, w, h);  // 
  rect(x2, y, w, h); // Play
	
  fill(0);
  
  // Play
  triangle(width*0.04, height*0.90421456, width*0.06875, height*0.8761175, width*0.04, height*0.8403576);
  
  // FFWD
  triangle(width*0.859375, height*0.90421456, width*0.8875, height*0.8761175, width*0.859375, height*0.8403576);
  triangle(width*0.828125, height*0.90421456, width*0.85625, height*0.8761175, width*0.828125, height*0.8403576);
  textSize(60);
  text(headlines[index],width*0.5, height*0.12771392); 
  line(0, height*0.19157088, width, height*0.19157088);
  textSize(20);
  text("Hundroid School " + version +":learn important hungarian words. Hit play on the left to play sound to hear the phrase.",width*0.48, height*0.25542784);
  text(" Click next on the right to continue to the next phrase", width*0.48, height*0.29);
	text("By liamkords + truedat101 2018, Voices by Imi (Palinka Lounge)",width*0.48,height*0.38)
	image(flagimg, width*0.28,height*0.48, flagimg.width/2, flagimg.height/2);
}

function mousePressed() {
  // if (mousePressed) {

  //
  // PLAY BUTTON FIRED
  //
  if (mouseX>x && mouseX <x+w && mouseY>y && mouseY <y+h) {
    fill(0);
    rect(x, y, w, h);
    audiotracks[index].setVolume(0.8);
    audiotracks[index].play();
    // audiotracks[index].rewind();

    isOverRectangle = true;
    print("Is over play rectangle\n");
  } else {
    isOverRectangle = false;
    print("Is not over play rectangle\n");
  }
  // if (mousePressed) {

  //
  // NEXT button fired
  //
  if (mouseX>x2 && mouseX <x2+w && mouseY>y && mouseY <y+h) {
    fill(0);
    rect(x2, y, w, h);
    index = (index + 1) % headlines.length;
    // printStringToInts(headlines[index]);

    isOverRectangle = true;
    print("Is over next rectangle\n");
  } else {
    isOverRectangle = false;
    print("Is not over next rectangle\n");
  }
}
function printStringToInts(s) {
  // for the length of the String
  for (var i=0; i<s.length(); i++) {
    // convert each character in the string to an int
    // and print it to the console (with a comma added)
    print(int(s.charAt(i)) + ",");
  }
}