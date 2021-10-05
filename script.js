let camera = document.getElementsByClassName("camera")[0];
let SpeechRecognition = window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

Webcam.set({
    width: 360,
    height: 250,
    image_format: 'png',
    png_quality: 90
});

function start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function run(event) {
    console.log(event);
    let content = event.results[0][0].transcript;
    console.log(content);
    if (content == "take my selfie") {
        console.log("taking selfie...");
        speak();
    }
    document.getElementById("textbox").innerHTML = content;
    speak();
}


function speak() {
    let synth = window.speechSynthesis;
    speak_data = "Taking your selfie in 5 seconds...";
    let utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    Webcam.attach(camera);
    setTimeout(function () {
        take_snapshot();
        save();
    }, 5000);
}

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="selfie_image" src="' + data_uri + '">';
    });
}

function save() {
    link = document.getElementById("link");
    image = document.getElementById("selfie_image").src;
    console.log(image);
    link.href = image;
    link.click();
}
