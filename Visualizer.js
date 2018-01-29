var fft, // Allow us to analyze the song
    numBars = 1024, // Number of bars. Powers of two, max is 1024
    song,
    distortButton, distorty, activeDistorty, distortyLevel;

//Loading the song in
var loader = document.querySelector(".loader");
document.getElementById("audiofile").onchange = function(event) {
    if(event.target.files[0]) {
        if(typeof song != "undefined") {
            song.disconnect();
            song.stop();
        }
        
        // Loading in the new song
        song = loadSound(URL.createObjectURL(event.target.files[0]));
        loader.classList.add("loading");
    }
}

function setup() {
    createCanvas(640, 480);
    //distorty.wet.value = 1;

    //distortButton = createButton('Distortion');
    //distortButton.position(25, 20);
    //distortButton.mousePressed(distort);
}

/*function distort() {
    activeDistorty != activeDistorty;
    if(activeDistorty == true){
    song.connect(distorty);
    }
    else {
        song.disconnect(distorty);
    }
}*/

function draw() {
    background(0);
    
    if(typeof song != "undefined" 
       && song.isLoaded() 
       && !song.isPlaying()) { // Do once
        loader.classList.remove("loading");
        
        song.play();
        song.setVolume(0.5);

        fft = new p5.FFT();
        fft.waveform(numBars);
        fft.smooth(0.85);
    }
    
    if(typeof fft != "undefined") {
        var spectrum = fft.analyze();
        noStroke();
        fill("rgb(170, 0, 170)"); // Sets the color of the bars
        for(var i = 0; i < numBars; i++) {
            var x = map(i, 0, numBars, 0, width);
            var h = -height + map(spectrum[i], 0, 255, height, 0);
            rect(x, height, width / numBars, h);
        }
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
