var dog;
var happyDog;
var database;
var foodS;
var foodStock;

function preload()
{
  dogIMG = loadImage("Dog.png");
  happyDogIMG = loadImage("happyDog.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();

  dog = createSprite(250,270,60,60);
  dog.addImage(dogIMG);
  dog.scale = 0.2;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

 
}


function draw() {  
 background(46,139,87);

 if(keyWentDown(UP_ARROW)){
   writeStock(foodS);
   dog.addImage(happyDogIMG);}

  textSize(24);
  fill("lightBlue");
  text("Press Up Arrow to Feed the Dog Milk!", 60, 90);

  drawSprites();

  textSize(30);
  fill("lightBlue");
  text("Food Remaining:" + foodS ,120,180)

}


function readStock(data){
  foodS = data.val();
}


function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food : x
  })
}


