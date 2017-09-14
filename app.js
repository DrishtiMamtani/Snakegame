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
