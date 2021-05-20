var monkey, monkey_running, monkey_collided;
var ground, invisibleGround, groundImage;
var bananasGroup,bananaimg;
var stoneGroup,stone,stoneimg;
var score;
var gameState=0;


function preload(){
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  //monkey_collided = loadImage("monkey.png");
  
  groundImage = loadImage("jungle2.jpg");
  stoneimg = loadImage("stone.png");
  bananaimg = loadImage("Banana.png");
  
}


function setup() {
  createCanvas(600,300);
  
  score=0;
   ground = createSprite(200,200,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  monkey = createSprite(50,280,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.3;
  
 
  
  invisibleGround = createSprite(200,290,400,10);
  invisibleGround.visible = false;
  
  bananasGroup=new Group();
  stoneGroup=new Group();
  
}


function draw(){
 background(255); 
  
  if(keyDown(UP_ARROW)){
    gameState=1;
  }
 if(gameState===1){
  ground.velocityX = -2;
    if(keyDown("space")) {
      gameState=1
       monkey.velocityY = -10;
     }
    
     
     monkey.velocityY = monkey.velocityY + 0.8
     
     if (ground.x < 0){
       ground.x = ground.width/2;
     }
     spawnBananas();
     spawnStone();
     if(monkey.isTouching(stoneGroup)){
      gameState=2;
      
    }
    if(monkey.isTouching(bananasGroup)){
      score=score+1
    }
  }
  else if(gameState===2){
    end();

  }
  

  
   
  
  monkey.collide(invisibleGround);
  drawSprites();
  fill("black");
  if(gameState===0){
    text("press up arrow to start",300,50);
    ground.velocityX = 0;
  }
  text("score "+ score,500,50);

}
function spawnBananas() {
 
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,220,40,10);
    banana.y = Math.round(random(180,220));
    banana.addImage(bananaimg);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    banana.depth = monkey.depth;
    banana.depth = monkey.depth + 1;
    bananasGroup.add(banana);
  }
}
function spawnStone() {
  if(frameCount % 60 === 0) {
    var stone = createSprite(600,265,10,40);
    stone.velocityX = -6;
    var rand = Math.round(random(1,6));
    stone.addImage(stoneimg);
    stone.scale = 0.1;
    stone.lifetime = 200;
    stoneGroup.add(stone);
  }
}
function end(){
  monkey.velocityY=0;
  stoneGroup.setVelocityXEach(0);
  ground.velocityX=0;
  bananasGroup.setVelocityXEach(0);
}