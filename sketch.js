var PLAY = 1;
var END = 0;
var gameState = PLAY;
var sword,swordImage;
var fruit,fruit1,fruit2,fruit3,fruit4,fruitgroup;
var enemy,enemyImage,enemygroup;
var score;
var gameOverImg;
var diesound,knifesound;

function preload(){
  swordImage=loadImage("sword.png");
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  enemyImage=loadAnimation("alien1.png","alien2.png")
  gameOverImg = loadImage("gameover.png")
  diesound=loadSound("gameover.mp3");
  knifesound=loadSound("knifeSwooshSound.mp3");
}
function setup(){
createCanvas(500,500);
  sword=createSprite(100,200,10,10);
  sword.addImage(swordImage);
  sword.scale=0.6;
  
 
  fruitgroup = createGroup();
  enemygroup=createGroup();
 
score = 0;
  gameOver = createSprite(250,250);
  gameOver.addImage(gameOverImg);

}

function draw(){
  background("lightblue");
  text("Score: "+ score, 400,50);

  if(gameState === PLAY){
   gameOver.visible = false;
    spawnFruit();
    spawnEnemy();
    sword.y=mouseY;
 sword.x=mouseX;
   if(sword.isTouching(fruitgroup)){
      fruitgroup.destroyEach();
      score=score+2;
      knifesound.play();
     
       }
    if(sword.isTouching(enemygroup)){
       gameState=END;
      diesound.play();
     }
  
  }
   else if (gameState === END) {
   gameOver.visible = true;
      fruitgroup.destroyEach();
     enemygroup.destroyEach();
     sword.destroy();
   }
  
    
   
  drawSprites();
}

function spawnFruit(){
 if(frameCount % 60===0){
   fruit=createSprite(500,90,10,10)
   fruit.velocityX=-(7+(score/4));
   fruit.y=Math.round(random(50,450));
   fruit.scale=0.2;
   var rand=Math.round(random(1,4));
   switch(rand){
     case 1:fruit.addImage(fruit1);
           break;
    case 2:fruit.addImage(fruit2);
           break;
    case 3:fruit.addImage(fruit3);
           break;
    case 4:fruit.addImage(fruit4);
           break;
}
   fruitgroup.add(fruit);
   var position=Math.round(random(1,2));
   fruit=createSprite(500,90,10,10);
   if(position===1){
     fruit.x=400;
     fruit.x=-(7+(score/4));
   }
   else
     { 
       if(position===2){
     fruit.x=0;
     fruit.x=-(7+(score/4));
   }
       
     }
   
}
}
function spawnEnemy(){
  if(frameCount % 200===0){
   enemy=createSprite(500,90,10,10)
   enemy.velocityX=-(8+(score/10));
   enemy.y=Math.round(random(100,300));
   enemy.scale=1;
  enemy.addAnimation("running",enemyImage);
  enemy.setLifetime=50;
enemygroup.add(enemy);
  }
}
