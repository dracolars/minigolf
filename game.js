  var game_canvas = document.getElementById("game");
  var game_context = game_canvas.getContext("2d");

  var backgroundImg = new Image();
  backgroundImg.src = "assets/golf_field2.png";


  backgroundImg.onload = function() {
    game_context.drawImage(backgroundImg, 50, 50);
  }

  class Ball {
    constructor(x, y, xmov, ymov, element, wins, color, loss){
      this.x = x;
      this.y = y;
      this.xmov = xmov;
      this.ymov = ymov;
      this.element = document.getElementById(element)
      this.wins = wins;
      this.color = color;
      this.score = 0;
      this.hits = 0;
      this.ballIn = false;
      this.loss = 0;
    }
    xpos(){return this.x;}
    ypos(){return this.y;}
    setx(x){  this.x = x;}
    sety(y){  this.y = y;}
    xmovv(){return this.xmov;}
    ymovv(){return this.ymov;}
    element(){return this.element;}
    setwins(w){this.wins = w;}
    getwins(){return this.wins;}
    clr(){return this.color;}
    getscore(){return this.score;}
    setscore(s){this.score = s;}
    gethits(){return this.hits;}
    sethits(h){this.hits = h;}
    isBallIn(){return this.ballIn;}
    setBallIn(){this.ballIn = true;}
    setBallOut(){this.ballIn = false;}
    getloss(){return this.loss;}
    setloss(l){this.loss = l;}
  }

  let ball1 = new Ball(130, 250, 6.15, 0.8, "ball1", 0, "blue");
  let ball2 = new Ball(130, 200, 6.15, 1.1, "ball2", 0, "yellow");
  let totalblue = 0;
  let totalyellow = 0;

  let winNTell = document.getElementById("winNTellDisplay");
  winNTell.style.visibility = 'hidden';
  let winNTellLabel = document.getElementById("winNTellText");

  drawStart(ball1);
  drawStart(ball2);

  let answered1 = false;
  let answered2 = false;
  let name1 = "";
  let name2 = "";

  name1 = window.prompt('Name of player 1: ')
  name2 = window.prompt('Name of player 2: ')
  document.getElementById("totalBlueLabel").innerHTML = name1 + "'s yards: ";
  document.getElementById("blueScoreLabel").innerHTML = name1 + "'s score: ";
  document.getElementById("totalYellowLabel").innerHTML = name2 + "'s yards: ";
  document.getElementById("yellowScoreLabel").innerHTML = name2 + "'s score: ";
  document.getElementById("LossBlueLabel").innerHTML = name1 + "'s losses: ";
  document.getElementById("LossYellowLabel").innerHTML = name2 + "'s losses: ";

  function drawStart(ball){
    if (ball.clr() == "blue"){
      ball.setx(130);
      ball.sety(250);
    }
    else {
      ball.setx(130);
      ball.sety(200);
    }
    ball.element.style.visibility = 'visible';
    ball.element.style.left = ball.xpos() + 'px';
    ball.element.style.bottom = ball.ypos() + 'px';
    //textPosition(ball1);
    //textPosition(ball2);
    ball1.sethits(0);
    ball2.sethits(0);
    ball1.setBallOut();
    ball2.setBallOut();
    updateTotal(ball1, 0);
    updateTotal(ball2, 0);
  }

  //end position (745, 330)

function draw2(ball, roll){
      ball.sethits( ball.gethits() + 1)
      let newx = ball.xpos() + (ball.xmovv() * roll);
      newx.toFixed(2);
      let newy = ball.ypos() + (ball.ymovv() * roll);
      newy.toFixed(2);
      if (newx > 740){
        let tempx = 130 + (ball.xmovv() * 100)
        let tempy = 200;
        if (ball.clr() == "blue"){
          tempy = 250 + (ball.ymovv() * 100)
        }
        else {
          tempy = 220 + (ball.ymovv() * 100)
        }
        ball.element.style.left = tempx + 'px';
        ball.element.style.bottom = tempy + 'px';
        setTimeout(() => {
          updateTotal(ball, roll);
          //textPosition(ball);
          ballIn(ball);
          if (ball1.isBallIn() && ball2.isBallIn()){
            totalblue = 0;
            totalyellow = 0;
            updateScore();
            drawStart(ball1);
            drawStart(ball2);
          }
        }, 1000);
      }
      else {
        ball.setx(newx);
        ball.sety(newy);
        ball.element.style.left = newx + 'px';
        ball.element.style.bottom = newy + 'px';
      }
      updateTotal(ball, roll);
      //textPosition(ball);
      if (ball.gethits() >= 5){
        //ball.element.style.visibility = 'hidden';
        if ( ((ball1.gethits() >= 5) && (ball2.gethits() >= 5)) || ((ball1.isBallIn()) && (ball2.gethits() >= 5)) || ((ball2.isBallIn()) && (ball1.gethits() >= 5)) ){
          totalblue = 0;
          totalyellow = 0;
          updateScore();
          drawStart(ball1);
          drawStart(ball2);
        }
      }

  }


function moveBall1(){
  var id = null;
  let roll = Math.floor(Math.random() * 100 +1);
  totalblue += roll;
  draw2(ball1, roll)
}

function moveBall2(){
  var id = null;
  let roll = Math.floor(Math.random() * 100 + 1);
  totalyellow += roll;
  draw2(ball2, roll)
}

function textPosition(ball, roll){
  if (ball.clr() == "blue"){
    document.getElementById("bluePosition").innerHTML = "( " + ball.xpos() + " , " + ball.ypos() + " )";}
  else {
  document.getElementById("yellowPosition").innerHTML = "( " + ball.xpos() + " , " + ball.ypos() + " )";}
}

function updateTotal(ball, roll) {
  if (ball.clr() == "blue"){
    document.getElementById("totalBlue").innerHTML = totalblue;
    //document.getElementById("blueroll").innerHTML = roll;
    document.getElementById("totalBlue").style.color = "black";
    if(totalblue >= 100){
      document.getElementById("totalBlue").innerHTML = 100;
      document.getElementById("totalBlue").style.color = "blue";
    }
  }
  else{
    document.getElementById("totalYellow").innerHTML = totalyellow;
    //document.getElementById("yellowroll").innerHTML = roll;
    document.getElementById("totalYellow").style.color = "black";
    if(totalyellow >= 100){
      document.getElementById("totalYellow").innerHTML = 100;
      document.getElementById("totalYellow").style.color = "orange";
    }
  }
}
function ballIn(ball){
  ball.element.style.visibility = 'hidden';
  ball.setBallIn();
}

function getScoreName(ball){
  let name = "";
  switch (ball.gethits()) {
    case 1: name =  "Hole in one";
      break;
    case 2: name = "Double Eagle";
      break;
    case 3: name = "Eagle";
      break;
    case 4: name = "Birdie";
      break;
    case 5: name = "Par";
    break;
    default: name = "n/a"
      }
 return name;
}

function updateScore(){
  if (ball1.isBallIn() && (ball1.gethits() < ball2.gethits())){
    ball1.setwins( ball1.getwins() + 1);
    ball2.setloss( ball2.getloss() + 1);
    document.getElementById("blueScore").innerHTML = "+1";
    document.getElementById("LossYellow").innerHTML = "+1";
    document.getElementById("blueScore").style.color = "blue";
    document.getElementById("LossYellow").style.color = "red";
    winNTellLabel.innerHTML = name1 + " wins with a " + getScoreName(ball1) + " !";
    winNTellLabel.style.color = "blue";
    winNTell.style.visibility = 'visible';
    setTimeout(() => {
      winNTellLabel.innerHTML = name1 + " ";
      winNTellLabel.style.color = "black";
      winNTell.style.visibility = 'hidden';
      document.getElementById("blueScore").innerHTML = ball1.getwins();
      document.getElementById("LossYellow").innerHTML = ball2.getloss();
      document.getElementById("blueScore").style.color = "black";
      document.getElementById("LossYellow").style.color = "black";
    }, 2000);
  }
  else if (ball2.isBallIn() && ball1.gethits() > ball2.gethits()){
    ball2.setwins( ball2.getwins() + 1);
    ball1.setloss( ball1.getloss() + 1);
    document.getElementById("yellowScore").innerHTML = "+1";
    document.getElementById("LossBlue").innerHTML = "+1";
    document.getElementById("yellowScore").style.color = "orange";
    document.getElementById("LossBlue").style.color = "red";
    winNTellLabel.innerHTML = name2 + " wins with a " + getScoreName(ball2) + " !";
    winNTellLabel.style.color = "orange";
    winNTell.style.visibility = 'visible';
    setTimeout(() => {
      winNTellLabel.innerHTML = name1 + " ";
      winNTellLabel.style.color = "black";
      winNTell.style.visibility = 'hidden';
      document.getElementById("yellowScore").innerHTML = ball2.getwins();
      document.getElementById("LossBlue").innerHTML = ball1.getloss();
      document.getElementById("yellowScore").style.color = "black";
      document.getElementById("LossBlue").style.color = "black";
    }, 2000);
  }
  else { //tie
      winNTellLabel.innerHTML = "TIE - TIE !";
      winNTellLabel.style.color = "pink";
      winNTell.style.visibility = 'visible';
      document.getElementById("yellowScore").innerHTML = "tie";
      document.getElementById("blueScore").innerHTML = "tie";
      document.getElementById("yellowScore").style.color = "green";
      document.getElementById("blueScore").style.color = "green";
      setTimeout(() => {
        document.getElementById("blueScore").innerHTML = ball1.getwins();
        document.getElementById("yellowScore").innerHTML = ball2.getwins();
        document.getElementById("yellowScore").style.color = "black";
        document.getElementById("blueScore").style.color = "black";
        winNTell.style.visibility = 'hidden';
      }, 2000);
  }
}

//field dimensions: 900 x 374
//balls dimensions: 35 x 35
