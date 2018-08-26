/* Starry Night */
  
/*
** Copyright by Kesson (Giovanni Muzio)
** Creative Commons: Attribution Non-Commercial license
**
** mail: kessoning@gmail.com
** YouTube: http://www.youtube.com/user/complexPolimorphic
** Vimeo: http://vimeo.com/kessondalef
** Behance: http://www.behance.com/kessondalef
** web: https://kesson.io
** Github: https://github.com/KessonDalef
*/
  
// release date: April 2017

// Inspired by Starry Night by Vincent Van Gogh
// Based on Flow Field example by Daniel Shiffman in Nature Of Code book
// Javascript version on https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js/tree/master/chp06_agents/NOC_6_04_FlowField

// Via Reynolds: http://www.red3d.com/cwr/steer/FlowFollow.html


var pg;

// Flowfield object
var flowfield;
// An ArrayList of brushes
var brushes = [];

var maxparticles = 2000;

var wind;

var locationData;

function preload(){
    // locationData =  getCurrentPosition();
}

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);

  // Make a new flow field with "resolution" of 16
  flowfield = new FlowField(50);
  
  background('#00031A');
  
  // position
	/*
  var lat = locationData.latitude;
  var lon = locationData.longitude;
  var pos = "" + lat + "," + lon;
	*/
  // var url = 'https://api.apixu.com/v1/current.json?key=71618018804d46059ad211538172504&q=' + pos;
  // loadJSON(url, gotWeather);
	genWind();
}

function draw() {
  for (var i = 0; i < brushes.length; i++) {
    brushes[i].follow(flowfield);
    brushes[i].run();
    if (brushes[i].dead) {
      brushes.splice(i, 1);
    }
  }
  addBrushes();
}

function addBrushes() {
  if (brushes.length < maxparticles) {
    for (var k = 0; k < 50; k++) {
      brushes.push(new PaintBrush(createVector(random(-200, width+200), random(-200, height+200)), random(2, 5), random(0.1, 0.5), wind));
    }
  }
}

function genWind() {
	wind = random(0, 50);
}
/*
function gotWeather(weather) {
  wind = Number(weather.current.wind_kph);
	print("wind" + wind);
}
*/