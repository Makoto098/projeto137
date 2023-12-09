status = "";

function preload() {}

function draw() {
  image(video, 0, 0, 480, 380);

  if (status != "") {
    objectDetector.detect(gotResult);
    for (i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML =
        "Status: Objetos Detectados";
      document.getElementById("numberOfObjects").innerHTML =
        "Quantidade de Objetos Detectados: " + objects.length;

      fill("#FF0000"); //tá diferente
      percent = floor(objects[i].confidence * 100);
      text(
        objects[i].label + " " + percent + "%",
        objects[i].x + 15,
        objects[i].y + 15
      );
      noFill();
      stroke("#FF0000"); //tá diferente
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}

function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}

function start() {
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML = "Status: Detectando Objetos";
}

function modelLoaded() {
  console.log("poseNet Is Initialized");
  status = true;
}
function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}
