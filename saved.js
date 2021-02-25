var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

var backgroundImg = new Image();
backgroundImg.src = "assets/golf_field.jpg";
backgroundImg.onload = function() {
  ctx.drawImage(backgroundImg, 50, 50);
}

class Ball {
  constructor(xpos, ypos){
    this.xpos = xpos;
    this.ypos = ypos;}

  get getx(){
    return this.xpos;}
  get gety(){
    return this.ypos;}
  set setx(x){
    this.xpos = x;}
  set setx(y){
    this.ypos = y;}
}

let ball1 = new Ball(110, 270);
let ball2 = new Ball(140, 310);

var ball1img = new Image();
ball1img.src = "assets/ball1.png";

var ball2img = new Image();
ball1img.src = "assets/ball2.png";

   ball1img.onload = function() {
     ctx.drawImage(ball1img, ball1.getx, ball1.gety);
   }
