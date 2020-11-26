var database;
var syncball;
var position;

function setup(){
    createCanvas(500,500);

    database = firebase.database();

    syncball = createSprite(250,250,10,10);
    syncball.shapeColor = "red";

    var positionref = database.ref('ball/position');
    positionref.on("value",readPosition,showError);
}

function draw(){
    background("white");

    if(position!==undefined){
    if(keyDown(LEFT_ARROW)){
        updatePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        updatePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        updatePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        updatePosition(0,+1);
    }
    drawSprites();
}
}

function updatePosition(x,y){
   database.ref('ball/position').set({

    'x':position.x+x,
    'y':position.y+y

   })
      
   
}

function readPosition(data){

    position=data.val();
    syncball.x=position.x
    syncball.y=position.y

}

function showError(){
    console.log("error");
}
