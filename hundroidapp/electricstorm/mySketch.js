// idea from:  bodytag.org
// lightning from:  https://www.openprocessing.org/sketch/152492 (Ryan Chao)
// worth a look:  https://gamedevelopment.tutsplus.com/tutorials/how-to-generate-shockingly-good-2d-lightning-effects--gamedev-2681
// image, boolean, vector, line, frameCount, random, parallax scrolling, parallax, scroll, lightning, array, QUARTER_PI, rect, floor, ellipse, grayscale
// There is a stutter in the rain sound loop I haven't been able to remove.
// no interaction
var pic1, pic2, pic3, pic4;
var move1, move2, move3, move4;
var incrFlashTime; // increment through from 0 to flashTime
var flashTime; // time length of each individual flash
var flashGroupTime; // time length of each group of flashes
var howOften; // time between groups 
var rain, lightning; // sound files
var start, dir // vectors
var tree; // lightning, an upside down tree
var isTree, makeSound; // booleans
var chance;
var bird;

function preload() {
    pic1 = pic2 = loadImage("gry.png");
    pic3 = pic4 = loadImage("blk.png");
    rain = loadSound("rain2.mp3");
    lightning = loadSound("lightning.mp3");
}

function setup() {
    createCanvas(1200, 650);
    background(40);
    move1 = move3 = 0;
    move2 = move4 = 1400;
    bird = new Vehicle();
    rain.setVolume(.5);
    rain.loop();
    lightning.play();
    makeSound = false;
}

function draw() {
    background(40);
    howOften = floor(random(100, 110));
    if (frameCount % howOften === 0) {
        flashGroupTime = random(0, 15); // but not every time
    }
    if (flashGroupTime > 0) sheetFlash();
    if (frameCount % 180 === 0 && !isTree) lightningStrike();
    if (isTree === true) tree.display();
    chance = random(1);
    if (frameCount % 180 === 0 && chance < .9 && makeSound) lightning.play();
    makeSound = false;
    scroll();
    bird.fly();
    drawFrame();
}

function lightningStrike() {
    strt = createVector(random(width), 0);
    dir = createVector(random(width) - strt.x, (height) - strt.y);
    tree = new Tree(strt, dir, 0.02 * dir.mag());
    tree.display();
}

function scroll() {
    move1 -= .5;
    move2 -= .5;
    move3--;
    move4--;
    image(pic1, move1, 510);
    image(pic2, move2, 500);
    if (move1 <= -1400) move1 = 1400;
    if (move2 <= -1400) move2 = 1400;
    image(pic3, move3, 520);
    image(pic4, move4, 520);
    if (move3 <= -1400) move3 = 1400;
    if (move4 <= -1400) move4 = 1400;
}

function drawFrame() {
    noStroke();
    fill(0);
    rect(0, 0, 250, height);
    rect(950, 0, 250, height);
    rect(0, 0, width, 50);
    rect(0, 600, width, 100);
}

function Vehicle() {
    this.vel = createVector(4, 0);
    this.pos = createVector(-10, height / 2);
    this.display = function () {
        this.pos.add(this.vel);
        stroke(255);
        fill(random(255));
        ellipse(this.pos.x, this.pos.y, 5, random(8, 18)); // wings
        stroke(255);
        strokeWeight(.4);
        fill(0);
        ellipse(this.pos.x, this.pos.y, 12, 3); // body
    }
    this.turn = function () {
        if (this.pos.x > width + 100) {
            this.pos.y = random(425, 500);
            this.vel.set(random(-1, -2), random(-.1, .3));
        }
        if (this.pos.x < -100) {
            this.pos.y = random(425, 500);
            this.vel.set(random(1, 2), random(-.1, .3));
        }
    }
    this.fly = function () {
        this.display();
        this.turn();
    }
}

function sheetFlash() {
    flashGroupTime--;
    incrFlashTime++;
    flashTime = random(0, 10); // not every time
    if (incrFlashTime < flashTime) {
        fill(255);
        noStroke();
        rect(0, 0, width, height);
    }
    else {
        incrFlashTime = 0;
    }
}

function Tree(startPoint, direction, initialWeight) {
    //var branches;
    //var currentDirection;
    //var treeSize, treeIndex, branchIndex;
    //var fade;
    isTree = true;
    this.fade = 255;
    this.treeSize = 5;
    this.branches = [this.treeSize];
    this.branches[0] = new Twig(startPoint, direction, initialWeight);
    this.currentDirection = direction;
    this.treeIndex = 1;
    for (var i = 0; i < this.treeSize - 1; i++) {
        this.branchIndex = floor(random(0.0, this.branches[i].getPointSum() * 0.75));
        this.branches[this.treeIndex] = new Twig(this.branches[i].getPoint(this.branchIndex), this.currentDirection, this.branches[i].getWeight(this.branchIndex));
        if (this.treeIndex < this.treeSize) this.treeIndex++;
    }
    this.display = function () {
        this.fade -= 8;
        if (this.fade <= 40) {
            this.fade = 255;
            isTree = false;
        }
        for (var j = 0; j < this.treeSize; j++) {
            this.branches[j].displayTwig();
        }
    }
}

function Twig(startPoint, direction, initialWeight) {
    //var pathPoints;
    //var ref, nextPoint;
    //var weights;
    //var pointSum, maxPoints;
    //var maxLen, ang, ang2, ang3, magnitude;
    this.maxPoints = floor(random(10.0, 10 * initialWeight));
    this.maxLen = initialWeight;
    this.ref = createVector(1.0, 0.0);
    this.ang = p5.Vector.angleBetween(direction, this.ref);
    if (direction.y < 0) this.ang *= -1.0;
    this.pointSum = this.maxPoints;
    this.pathPoints = [this.maxPoints];
    this.pathPoints[0] = startPoint;
    this.ang2 = 0;
    for (var j = 1; j < this.maxPoints; j++) {
        this.magnitude = random(0.0, this.maxLen);
        this.ang3 = random(-QUARTER_PI, QUARTER_PI) + this.ang2;
        this.nextPoint = createVector(this.magnitude * cos(this.ang3 + this.ang), this.magnitude * sin(this.ang3 + this.ang));
        this.ang2 = this.ang3 * 0.85;
        this.nextPoint.add(this.pathPoints[j - 1]);
        this.pathPoints[j] = this.nextPoint;
    }
    this.weights = [this.maxPoints];
    if (initialWeight > 2) {
        for (var j = 0; j < this.maxPoints; j++) {
            this.weights[j] = map(j, 0, this.maxPoints - 1, initialWeight, 2);
        }
    }
    else {
        for (var j = 0; j < this.maxPoints; j++) {
            this.weights[j] = 2;
        }
    }
    this.displayTwig = function () {
        if (isTree) stroke(tree.fade);
        for (var j = 1; j < this.pointSum; j++) {
            strokeWeight(this.weights[j] * 0.3);
            line(this.pathPoints[j - 1].x, this.pathPoints[j - 1].y, this.pathPoints[j].x, this.pathPoints[j].y);
            if (this.pathPoints[j].y > 500) makeSound = true;
        }
    }
    this.getPoint = function (index) {
        return this.pathPoints[index];
    }
    this.getPointSum = function () {
        return this.pointSum;
    }
    this.getWeight = function (index) {
        return this.weights[index];
    }
}