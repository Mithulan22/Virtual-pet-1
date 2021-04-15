var dog,  dogIMG, happyDogIMG;
var  foodS, foodStock;
var database


function preload()
{
  //load images here
  dogIMG=loadImage("images/dogImg.png")
  happyDogIMG=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  
  dog=createSprite(250, 250, 10, 10);
  dog.scale = .5;
  dog.addImage(dogIMG);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46, 139, 87);
  
  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogIMG);
  }

  drawSprites();
  //add styles here

  textSize(24);
  fill("red");
  stroke(8);
  text("Press Up Arrow Key To Feed Drago Milk!", 30, 60);

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  } else {
    x=x-1;
  }

  database.ref(' / ').update({
    Food:x
  })
}