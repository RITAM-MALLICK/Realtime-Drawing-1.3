noseX = 0;
noseY = 0;
difference = 0;
rightWristX = 0;
leftWristX = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550,500);

    canvas = createCanvas(550,550);
    canvas.position(560,150);

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('Pose',gotPoses);
}

function draw() {
    background('#1BA3C8');
    document.getElementById("square_side").innerHTML = "width and height of a square will be =" + difference + "px";
    fill('#F91300');
    stroke('#F91300');
    square(noseX,noseY,difference);
}

function modelLoaded() {
    console.log("Pose net is initialised");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("nose x = " + noseX + "nose y = " + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);

        console.log("left wrist x = " + leftWristX + " right wrist x = " + rightWristX + "difference = " + difference);
    }
}