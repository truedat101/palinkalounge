// Based on "Coding Challenge #16: Fractal Trees - L-System"
// from The Coding Train.

let rules = [];
let axiom;
let angle;
let button;
let slider;
let sentence;
let len;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);

  axiom = "F"; // [-F][+F]";
  sentence = axiom;
  len = 150;

  rules[0] = {
    a: "F",
    b: "FF+[+F-F-F]-[-F+F+F]"
  }


  // Slider controlling angle
  slider = createSlider(2,4,3,1);
  slider.position(0,0);
  slider.mouseReleased(changeAngle);
  changeAngle();

  turtle();

  // Button to generate a new level of depth for the tree
  button = createButton("generate");
  button.position(20,30);
  button.mousePressed(generate);
}

// generates *sentence*.
function generate() {
  len *= 0.5;
  let tempSent = "";

  // Loop through all characters of *sentence*, checking
  // the rules for each of them and building up *tempSent*.
  for (let i = 0; i < sentence.length; i++) {
    current = sentence.charAt(i);
    let found = false; // Is any applicable rule found?

    for (let j = 0; j < rules.length; j++){
      if (current == rules[j].a){
        tempSent += rules[j].b;
        found = true;
        break;
      }
    }
    if (!found){ //if no rule is applicable, retain the character as is.
      tempSent += current;
    }
  }


  sentence = tempSent;
  turtle();
}

// Draws the plant based on *sentence*.
function turtle() {
  let depth = 0;
  background(51);
  stroke(color(0, 255, 0, 200));
  resetMatrix();
  translate(width / 2, height);
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);

    if (current == "F") {
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current == "+") {
      rotate(angle);
    } else if (current == "-") {
      rotate(-angle);
    } else if (current == "[") {
      push();
      depth++;
      changeColor(depth);
      strokeWeight(5-depth);
    } else if (current == "]") {
      pop();
      depth--;
      changeColor(depth);
      strokeWeight(5-depth);
    }

  }
}

function changeColor(power) {
  stroke(color(0, 255 * pow(0.7, power), 140 * (1 - pow(0.8, power))),200);
}

// Set angle based on value from slider.
// Angle can be PI / 12, PI / 8 or PI / 6.
function changeAngle(){
  angle = PI / 24 * slider.value();
  turtle();
}