//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

var knife, knifeImage, orange, apple, pear, banana, alien1, alien2;

var knifeImage, orangeImage, appleImage, pearImage, bananaImage, alien1Image, alien2Image, gameoverImage, gameoverSound, knifeSwooshSound, knifeSound;

var fruitGroup, alienGroup;

function preload() {

  knifeImage = loadImage("knife.png");
  orangeImage = loadImage("fruit1.png");
  pearImage = loadImage("fruit3.png");
  appleImage = loadImage("fruit2.png");
  bananaImage = loadImage("fruit4.png");
  alien1Image = loadImage("alien1.png");
  alien2Image = loadImage("alien2.png");
  gameoverSound = loadSound("gameover.mp3");
  knifeSound = loadSound("knifeSwoosh.mp3");
  gameoverImage = loadImage("gameover.png");
}



function setup() {
  createCanvas(600, 600);

  //creating sword
  knife = createSprite(40, 200, 20, 20);
  knife.addImage(knifeImage);
  knife.scale = 0.7

  //set collider for sword
  knife.setCollider("rectangle", 0, 0, 40, 70);
  knife.debug = true;
  score = 0;

  gameover = createSprite(300, 300, 10, 10);
  gameover.addImage(gameoverImage);
  gameover.scale = 2;
  //create fruit and monster Group variable here
  fruitGroup = createGroup();
  alienGroup = createGroup();
}

function draw() {
  background("lightblue");

  if (gameState === PLAY) {
    //calling fruit and aliens function
    fruits();
    aliens();
    // Move knife with mouse
    knife.y = World.mouseY;
    knife.x = World.mouseX;

    gameover.visible = false;
    // Increase score if knife touching fruit

    if (fruitGroup.isTouching(knife)) {
      fruitGroup.destroyEach();
      knifeSound.play();
      score = score + 5;
    }
    // Go to end state if knife touching enemy
    if (knife.isTouching(alienGroup)) {
      gameState = END;
      fruitGroup.destroyEach();
      alienGroup.destroyEach();


    }
    if (gameState === END) {
      gameover.visible = true;
      knife.changeAnimation("gameover.png", gameoverImage);
      gameoverSound.play();
    }
  }
  drawSprites();

  //Display score
  textSize(25);
  text("Score : " + score, 250, 50);
}

function fruits() {
  if (frameCount % 60 === 0) {
    var fruit = createSprite(400, Math.round(random(10, 600)), 20, 20);
    fruit.scale = 0.2;
    fruit.setCollider("rectangle", 0, 0, 70, 10);
    fruit.debug = true;
    //generate random obstacles
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1:
        fruit.addImage(appleImage);
        break;
      case 2:
        fruit.addImage(pearImage);
        break;
      case 3:
        fruit.addImage(bananaImage);
        break;
      case 4:
        fruit.addImage(orangeImage);
        break;
      default:
        break;
    }


    //assign scale and lifetime to the obstacle           
    fruit.velocityX = -(10 + score / 4);
    fruit.lifetime = 100;

    //add each obstacle to the group
    fruitGroup.add(fruit);


  }
}

function aliens() {
  if (frameCount % 80 === 0) {
    var alien = createSprite(400, Math.round(random(10, 600)), 20, 20);
    alien.scale = 0.7;
    alien.setCollider("rectangle", 0, 0, 70, 70);
    alien.debug = true;
    //generate random obstacles
    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1:
        alien.addImage(alien1Image);
        break;
      case 2:
        alien.addImage(alien2Image);
        break;
      default:
        break;
    }
    alien.velocityX = -(10 + (score / 10));
    alien.lifeTime = 100;
    //add each obstacle to the group
    alienGroup.add(alien);
  }

}