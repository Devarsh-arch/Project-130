//All the variables
song1= "";
song2= "";
LeftWristX= 0;
LeftWristY= 0;
RightWristX= 0;
RightWristY= 0;
scoreLeftWrist= 0;
scoreRightWrist= 0;
SOfTSR= 0;
SOfTSL= 0;

//Function preload here
function preload(){
	song1= loadSound("Alone.mp3");
	song2= loadSound("Industry Baby.mp3");
}

//Function setup here
function setup(){
	canvas= createCanvas(400, 400);
	canvas.center();
	video= createCapture(VIDEO);
	video.hide();
	poseNet= ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

//Function draw here
function draw(){

	//Code for circle and video
	image(video, 0, 0, 400, 400);
	fill("chartreuse");
	stroke("chartreuse");

	//Code for playing Song1
	SOfTSL= song1.isPlaying();
	if(scoreLeftWrist > 0.2){
		circle(LeftWristX, LeftWristY, 20);
		song2.stop();
		if(SOfTSL == "false"){
			song1.play();
			document.getElementById("song_name_h3").innerHTML= "Playing Song 'Alone' Right Now";
		}
	}

	//Code for playing Song2
	SOfTSR= song2.isPlaying();
	if(scoreRightWrist > 0.2){
		circle(RightWristX, RightWristY, 20);
		song1.stop();
		if(SOfTSR == "false"){
			song2.play();
			document.getElementById("song_name_h3").innerHTML= "Playing Song 'Industry Baby' Right Now";
		}
	}
}

//Function modelLoaded here
function modelLoaded(){
	console.log("PoseNet Is Initialized");
}

//Function gotPoses here
function gotPoses(results){
	if(results.length > 0){
		//Code for LeftWrist
		scoreLeftWrist= results[0].pose.keypoints[9].score;
		LeftWristX= results[0].pose.leftWrist.x;
		LeftWristY= results[0].pose.leftWrist.y;

		//Code for RightWrist
		scoreRightWrist= results[0].pose.keypoints[10].score;
		RightWristX= results[0].pose.rightWrist.x;
		RightWristY= results[0].pose.rightWrist.y;
	}
}