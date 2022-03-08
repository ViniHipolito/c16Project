//Estados de Jogo
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position, logo;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var gameOverSound ,knifeSwoosh ,Spawn ,Spawn2 ,Death;
var mapp,map,logoImg;

function preload(){
  
  knifeImage = loadImage("sword.png");
  monsterImage = loadAnimation("Alien0.png");
  fruit1 = loadImage("Noob1.png");
  fruit2 = loadImage("Noob2.png");
  fruit3 = loadImage("Noob3.png");
  fruit4 = loadImage("Noob4.png");
  gameOverImage = loadImage("fimdeJogo.png");
  mapp = loadImage("Map.png");
  logoImg = loadImage("Logo.png");
  
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3");
  Spawn = loadSound("Sword_Spawn.mp3");
  Spawn2 = loadSound("Spawn2.mp3");
  Death = loadSound("Death.mp3");
}



function setup() {
  createCanvas(600, 600);


  map = createSprite(300,300,20,20);
  map.addImage(mapp);
  map.scale = 2.75

  logo = createSprite(175,50,20,20);
  logo.addImage(logoImg);
  logo.scale = 0.45;
  
  //criando espada
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.3
   //knife.debug = true
  
  //definir colisor para espada
  knife.setCollider("rectangle",0,0,100,100);

  //Variáveis de pontuação e Grupos
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  Spawn2.play();
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){

    fruits();
    Monster();
    
    //mover espada com o mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    //Aumenta a pontuação se a espada tocar na fruta
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      Spawn.play();
       score=score+1;
      
    }
    else
    {
      //Vá para o estado final se a espada tocar o inimigo
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        //som de fim de jogo/gameover
        Death.play()
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        //Mude a animação da espada para fim de jogo e redefina sua posição
        knife.addImage(gameOverImage);
        knife.scale=1;
        knife.x=300;
        knife.y=300;
      }
    }
  }
  
  drawSprites();
  //exibir pontuação
  textSize(25);
  text("Kills: "+ score,475,50);
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(550,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.scale = 0.3
    monster.y=Math.round(random(100,550));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.x = 0    
  //aumentar a velocidade das frutas após a pontuação 4 

       fruit.velocityX= (7+(score/4));
     
    fruit.scale=0.4;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}
