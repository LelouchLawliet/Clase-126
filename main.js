cancion="";
var scoreRightWrist=0;
var scoreLeftWrist=0;
var rightX=0;
var rightY=0;
var LeftX=0;
var LeftY=0;
function preload(){
    cancion=loadSound("comotevoyaolvidar.mp3");
}
function setup(){
    canvas=createCanvas(400, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on("pose", gotPoses);}
function modelLoaded() 
{ console.log('PoseNet está inicializado');
}

function draw(){
image(video, 0, 0, 400, 500);
	fill("#FF0000");
stroke("#FF0000");
if(scoreLeftWrist>0.2){
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    newY = floor(InNumberleftWristY*2);
    vol = newY/1000;
document.getElementById("volumen").innerHTML="volumen="+vol;
cancion.setVolume(vol);
}
if(scoreRightWrist>0.2)
{
    if(rightWristY >0 && righttY <= 100)
    {
    document.getElementById("velocidad").innerHTML = "Speed = 10x";		
        cancion.rate(10);
    }
    else if(rightWristY >100 && rightY <= 200)
    {
        document.getElementById("velocidad").innerHTML = "velocidad = 6x";		
        cancion.rate(6);
    }  
    else if(rightWristY >200 && rightY <= 300)
    {
        document.getElementById("velocidad").innerHTML = "velocidad = 3x";		
        cancion.rate(3);
    }  
    else if(rightWristY >300 && rightY <= 400)
    {
        document.getElementById("velocidad").innerHTML = "velocidad = 1x";		
        cancion.rate(1);
    }  
    else if(rightWristY >400 && rightY <= 500)
    {
        document.getElementById("velocidad").innerHTML = "velocidad = 0.01x";		
        cancion.rate(0.01);
    }  
}

}

function play(){
    cancion.play();
    cancion.setVolume(1);
    cancion.rate(1);
}
function gotPoses(results){
    if(results.length>0){
        scoreRightWrist = results[0].pose.keypoints[10].score;
         scoreLeftWrist = results[0].pose.keypoints[9].score;
          console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
          rightX=results[0].pose.rightWrist.x; 
          rightY=results[0].pose.rightWrist.y;
          LeftX=results[0].pose.leftWrist.x; 
          LeftY=results[0].pose.leftWrist.y;
             
   
    }
}