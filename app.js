var game1=game1 || {};
var kb1= kb1 || {};
var c1=c1 || {};
var game2=game2 || {};
var kb2=kb2 || {};
var c2=c2 || {};

kb1.keymap={
  37:"left",
  38:"up",
  39:"right",
  40:"down"
};
kb2.keymap={
  65:"left",
  87:"up",
  68:"right",
  83:"down"
};

kb1.events=function(){
  var s=this;
  this.presskey=null;
  this.keymap=kb1.keymap;
}

kb2.events=function(){
  var s=this;
  this.presskey=null;
  this.keymap=kb2.keymap;
}

document.onkeydown=function(e){
  s.presskey=e.which;
}


this.getakey=function(){
  return this.keymap[this.presskey];
}

c1.stage=function(canvas,co){
this.keyevent=new kb1.event();
this.width=canvas.width;
this.height=canvas.height;
this.length=[];
this.food={};
this.score=0;
this.direction="right";
this.co={
  cw:10;
  size:5;
  fps:1000;
}
}


c2.stage=function(canvas,co){
this.keyevent=new kb1.event();
this.width=canvas.width;
this.height=canvas.height;
this.length=[];
this.food={};
this.score=0;
this.direction="right";
this.co={
  cw:10;
  size:5;
  fps:1000;
}
}

if(typeof co=="object"){
  for(var key in co){
    if(co.hasOwnProperty(key)){
      this.co[key]=co[key];
    }
  }
}

c1.snake=function(canvas,co){
this.stage=new c1.stage(canvas,co);
this.initialsnake1=function(){
  for(var i=0;i<this.stage.co.size;i++){
    this.stage.length.push({x:i,y:0});
  }
}
}
this.initialsnake1();

c2.snake=function(canvas,co){
this.stage=new c1.stage(canvas,co);
this.initialsnake2=function(){
  for(var i=0;i<this.stage.co.size;i++){
    this.stage.length.push({x:i,y:0});
  }
}
}

this.initialsnake1();

this.initialfood=function(){
  x:Math.round(Math.random()*(this.stage.width-this.stage.co.cw)/this.stage.co.cw);
  y:Math.round(Math.random()*(this.stage.height-this.stage.co.cw)/this.stage.co.cw);
}


this.initialfood();

//restart
this.restart=function(){
this.stage.length=[];
this.stage.food={};
this.stage.score=0;
this.stage.direction="right";
this.stage.event.presskey=null;
this.initialsnake1();
this.initialsnake2();
this.initialfood();
}

game1.draw1=function(context,snake1){
this.drawstage=function(){
var keypress=snake1.stage.event.getkey;
if(typeof(keypress)!="undefined"){
  snake1.stage.direction=keypress;
}
context.fillstyle="black";
contect.fillRect(0,0,snake1.stage.width,snake1.stage.height);
var x1=snake1.stage.length[0].x;
var x2=snake2.stage.length[0].y;
switch(snake1.stage.direction){
  case "right"
  x1++;
  break;
  case "left"
  x1--;
  break;
  case "up"
  y1--;
  break;
  case "down"
  y1++;
  break;
}
if(x1==snake1.stage.food.x && y1==snake1.stage.food.y){
  var tail={
    x:x1,
    y:y1
  };
  snake1.stage.score++;
  snake1.initialfood;
}
else{
  var tail=snake1.stage.length.pop();
  tail.x=x1;
  tail.y=y1;
}
snake1.stage.length.unshift();

for(var i=0;i<snake1.stage.length;i++)
{
  var cell=snake1.stage.length[i];
  this.drawcell1(cell1.x,cell1.y);
}

this.drawcell1(snake1.stage.food.x,snake1.stage.food.y);

context.filltext("A: "+ snake1.stage.score, 5, (snake1.stage.height - 5));

this.drawcell1=function(x,y){
context.fillstyle="rgb(170,170,170)";
context.arc((x*snake1.stage.co.cw+6),(y*snake1.stage.co.cw+6),4,0,2*Math.PI,false);
context.fill;
};

game1.snake1=function(elementId,co)
{var canvas=document.getElementById(elementId);
var context=canvas.getContext("2d");
var snake1=new c1.snake1(canvas,co);
var gamedraw=new Game1.Draw(context,snake1);
setInterval(function() {gameDraw.drawStage();}, snake1.stage.conf.fps);
};
window.onload = function() {
  var snake = new Game.Snake('stage', {fps: 100, size: 4});
};
