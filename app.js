// VARIABLES
  var snakex=2;//initial position of snake
  var snakey=2;
  var interval=100;//interval at which game loop ocurrs
  var height=30;//height of canvas made
  var width=60;//width of canvas made
  var increment=1;//increment in score and length for snake1
  var snakelength=0;//length of snake1
  var tailx=[snakex];//tail coordinates of snake1
  var taily=[snakey];
  var fx;//food coordinates
  var fy;
  var running=false;//running set to false.As soon as a key is pressed running changes to true
  var gameover;
  var direction=-1;//initial direction is set to -1
  var tempdirection=direction;//the variable used to prevent crashing when multiple keys are pressed quickly
//up=0
//down=-1
//left=1
//right=2
  var int;//varibale used to call the loop
  var score=0;//variable for calculating the score
  var foodx;//coordinates for food
  var foody;
  //snake2 variables
  var anotherx=4;//initial position of snake2
  var anothery=4;
  var atailx=[anotherx];//tail coordinates of snake2
  var ataily=[anothery];
  var anotherlength=0;//length of snake2
  var gameend;
  var ascore=0;
  var anotherdirection=-1;//initial direction of snake2 set to -1 that is downwards
  var tempanotherdirection=anotherdirection;//similar to tempdirection
  var arunning=false;//similar to running
  var aint;//similar to int
  var add=1;//increment in score and length for snake1


  //functions
    function run(){ //the only function which is executed.Rest all functions are interconnected by this function.
      initial(); //it creates snakes,food and walls
      int=setInterval(looping,interval);
    }

   function looping(){
     gameloop();//runs snake1
     agameloop();//runs snake2
   }

    function initial(){
        createCanvas(); //creates the walls for the game
        createSnake(); //creates snake1
        createFood(); //creates food particle
        createAnother();//creates snake2
    }


    function createCanvas(){ //this function makes a table. And adds color to each cell depending on its poition.
        document.write("<table>");

        for( var y = 0; y < height; y++){
            document.write("<tr>");
            for( var x = 0; x < width; x++){
                if(x == 0 || x == width -1 || y == 0 || y == height -1){
                    document.write("<td class='wall' id='"+ x + "-" + y +"'></td>");
                }else{
                    document.write("<td class='blank' id='"+ x + "-" + y +"'></td>");
                }
            }
            document.write("</tr>");
        }

        document.write("</table>");

    }



    function createSnake(){ //this function creates snake1
        set(snakex, snakey, "snake");
    }
    function createAnother(){ //this function creates snake2
        set(anotherx, anothery, "another");
    }

    function get(x,y){ //done because cells in table represented by x-y format
        return document.getElementById(x+"-"+y);
    }

    function set(x,y,value){ //colors the cells according to the value class
        if(x != null && y != null)
            get(x,y).setAttribute("class", value);
    }

    function rand(min,max){ //generates a random no. between max and min
        return Math.floor(Math.random() * (max - min) + min);
    }

    function getType(x,y){ //gets the class name for x-y
        return get(x,y).getAttribute("class");
    }

    function createFood(){ //creates food at a random position
        var found = false; //length of both the snakes should be within the area of the canvas
        while(!found && ((snakelength+anotherlength) < (width-2)*(height-2)+1)){
            foodx = rand(1,width-1);
            foody = rand(1,height-1);
            if(getType(foodx, foody) == "blank")
                found = true;
        }
        set(foodx, foody, "food");
        fx = foodx;
        fy = foody;
    }

    window.addEventListener("keypress",function key(event){// It records the key which is pressed
    var key=event.keyCode();
    if(key>50 || key==32)//keys pressed for snake1 a/A=left, s/S=down w/W=up, d/D=down
    {
      if(direction != -1 && (key == 119 || key == 87))
        tempdirection = 0;
      else if(direction != 0 && (key == 115 || key == 83))
        tempdirection = -1;
      else if(direction != 2 && (key == 97 || key == 65))
        tempdirection = 1;
      else if(direction != 1 && (key == 100 || key == 68))
        tempdirection = 2;

      if(!running) //when a key is pressed running changes to true
        running=true;
      else if(key==32)//to stop the snake use spacebar
        running=false;
    }
    else
    {//when a key is pressed for snake2 the keys are left,right,up and down keys
      if(anotherdirection !=- 1 && key == 38)
        tempanotherdirection=0;
      else if(anotherdirection != 0 && key == 40)
        tempanotherdirection=-1;
      else if(anotherdirection != 2 && key == 37)
        tempanotherdirection=1;
      else if(anotherdirection != 1 && key == 39)
        tempanotherdirection=2;
      if(!arunning)//similar to the above one
        arunning=true;
      else if(key==13)
        arunning=false;
    }
    });

    function gameloop(){//function to check if game is over or not. If not calls the update function for snake1
      if(running && !gameover){
        update();
      }
      else if(gameover){
        clearInterval(int);
      }
    }

    function agameloop(){//for snake2
      if(arunning && !gameend){
        aupdate();
      }
      else if(gameend){
        clearInterval(aint);
      }
    }

    function updatetail(){//moves the snake1
      for(var i=length;i>0;i--){
        tailx[i]=tailx[i-1];
        taily[i]=taily[i-1];
      }
      tailx[0]=snakex;
      taily[0]=snakey;
    }

    function aupdatetail(){//moves snake2
      for(var i=length;i>0;i--){
        atailx[i]=atailx[i-1];
        ataily[i]=ataily[i-1];
        }
      atailx[0]=anotherx;
      ataily[0]=anothery;
      }

    function update(){//main function
      direction=tempdirection;
      set(fx,fy,"food");//check if food is present or not.If not make the food
      updatetail();
      set(tailx[length],taily[length],"blank");
      if(direction == 0)// according the key pressed adds snake color to the next cell
        snakey--;
      else if(direction == -1)
        snakey++;
      else if(direction == 1)
        snakex--;
      else if(direction == 2)
        snakex++;
      set(snakex,snakey,"snake");//draws head of the snake
      for(var i=tailx.length-1;i>=0;i--){
        if(snakex==tailx[i] && snakey==taily[i]){
        gameover=true;
        break;
        }
      }
      if(snakex == 0 || snakex == width-1 || snakey == 0 || snakey == height-1)
        gameover=true;//check if snake touches the canvas
      else if(snakex==fx && snakey==fy){
        score+=1;//if snake eats food add 1 to the score
        createfood();//creates food again
        length+=increment;//increases the length
      }

    }


    function aupdate(){//for snake2 similar to update
      anotherdirection=tempanotherdirection;
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
      ascore+=add;
      createfood();
      length+=add;
      }
    }

    run();//finally run the entire code.






    
