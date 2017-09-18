var snakex=2;
var snakey=2;
var interval=100;
var height=90;
var width=100;
var increment=1;
var add=1;
var length=0;
var tailx=[snakex];
var taily=[snakey];
var fx;
var fy;
var running=false;
var gameover;
var direction=-1;
//up=0
//down=-1
//left=1
//right=2
var int;
var score=0;


var anotherx=4;
var anothery=4;
var atailx=[anotherx];
var ataily=[anothery];
var ax;
var ay;
var gameend;
var ascore=0;
var anotherdirection=-1;
var arunning=false;



function run(){
  initial();
  int=setInterval(gameloop,interval);
  aint=setInterval(agameloop,interval);
}

function initial(){
  createcanvas();
  createsnake();
  createfood();
  createanother();
}

function createcanvas(){
  document.write("<table>");
  for(var y=0;y<height;y++){
    document.write("<tr>");
    for(var x=0;x<width;x++){
      if(x==0 || x==width -1 || y==0 || y==height -1){
        document.write("<td class='wall' id='"+ x + "-" + y +"'></td>");
     }
      else{
        document.write("<td class='blank' id='"+ x + "-" + y +"'></td>");
      }
    }
      document.write("</tr>");
  }
    document.write("</table>");
}

function createsnake(){
  set(snakex,snakey,"snake");
  }
function createanother(){
  set(anotherx,anothery,"another");
  }


function get(x,y){
  return document.getElementById(x+"-"+y);
}

function set(x,y,value){
  if(x!=null && y!=null)
  get(x,y).setAttribute("class",value);
}

function rand(min,max)
{
  return Math.floor(Math.random()+(max-min)+min);
}

function getType(x,y)
{
  return get(x,y).getAttribute("class");
}

function createfood(){
  var flag=false;
  while(!flag && (length<(width-2)*(height-2)+1)){
    var foodx=rand(1,width-1);
    var foody=rand(1,height-1);
    if(getType(foodx,foody)=="blank")
    flag=true;
  }
  set(foodx,foody,"food");
  fx=foodx;
  fy=foody;
}


window.addEventListener("keypress",function key(){
  var key=event.keycode();
  if(key>=100 || key==32)
  {if(direction!=-1 && (key==119 || key==87))
    direction=0;
  else if(direction!=0 && (key==115 || key==83))
    direction=-1;
  else if(direction!=2 && (key==97 || key==65))
    direction=1;
  else if(direction!=1 && (key==100 || key==68))
    direction=2;

  if(!running)
    running=true;
  else if(key==32)
    running=false;
  }
  else
  {
  if(anotherdirection!=-1 && key==38)
    anotherdirection=0;
  else if(anotherdirection!=0 && key==40)
    anotherdirection=-1;
  else if(anotherdirection!=2 && key==37)
    anotherdirection=1;
  else if(anotherdirection!=1 && key==39)
    anotherdirection=2;
  if(!arunning)
    arunning=true;
  else if(key==13)
    arunning=false;
  }

});

function gameloop(){
  if(running && !gameover){
    update();
  }
  else if(gameover){
    clearInterval(int);
  }
}

function agameloop(){
  if(arunning && !gameend){
    aupdate();
  }
  else if(gameend){
    clearInterval(aint);
  }
}


function updatetail(){
  for(var i=length;i>0;i--){
    tailx[i]=tailx[i-1];
    taily[i]=taily[i-1];
  }
  tailx[0]=snakex;
  taily[0]=snakey;
}

function aupdatetail(){
  for(var i=length;i>0;i--){
    atailx[i]=atailx[i-1];
    ataily[i]=ataily[i-1];
  }
  atailx[0]=anotherx;
  ataily[0]=anothery;
}


function update(){
  set(fx,fy,"food");
  updatetail();
  set(tailx[length],taily[length],"blank");
  if(direction==0)
    snakey--;
  else if(direction==-1)
    snakey++;
  else if(direction==1)
    snakex--;
  else if(direction==2)
    snakex++;
  set(snakex,snakey,"snake");
  for(var i=tailx.length-1;i>=0;i--){
    if(snakex==tailx[i] && snakey==taily[i]){
      gameover=true;
      break;
    }
  }
  if(snakex==0 || snakex==width-1 || snakey==0 || snakey==height-1)
  gameover=true;
  else if(snakex==fx && snakey==fy){
    createfood();
    length+=increment;
    score+=increment;
  }
    document.getElementById("score").innerHTML="Score1:"+score;
}


function aupdate(){
  set(fx,fy,"food");
  aupdatetail();
  set(atailx[length],ataily[length],"blank");
  if(anotherdirection==0)
    anothery--;
  else if(anotherdirection==-1)
    anothery++;
  else if(anotherdirection==1)
    anotherx--;
  else if(anotherdirection==2)
    anotherx++;
  set(anotherx,anothery,"another");
  for(var i=atailx.length-1;i>=0;i--){
    if(anotherx==atailx[i] && anothery==ataily[i]){
      gameend=true;
      break;
    }
  }
  if(anotherx==0 || anotherx==width-1 || anothery==0 || anothery==height-1)
  gameend=true;
  else if(anotherx==fx && anothery==fy){
    createfood();
    length+=add;
    ascore+=add;
  }
    document.getElementById("score").innerHTML="Score2:"+ascore;
}

run();
