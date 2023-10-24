function start() {
    $("#menu").addClass("menu_open");
    $("#sb_left").hide()
}


var slider = 0;
function sb_left() {
    switch (slider) {
        case 100:
            slider = 0
            $("#sb_left").hide()
            break;
        case 200:
            slider = 100
            $("#sb_right").show()
            break;
    }
    sliderMove();
}
function sb_right() {
    switch (slider) {
        case 0:
            slider = 100
            $("#sb_left").show()
            break;
        case 100:
            slider = 200
            $("#sb_right").hide()
            break;
        case 200:
            slider = 0
            break;
    }
    sliderMove();
}

var canvas = document.getElementById("filterDisplay");
const context = canvas.getContext('2d');
function sliderMove() {
    waveColor= "rgba(0, 0, 0, 0)";
    waveChange();
    $("#filterDisplay").empty();
    anime({
        targets: '.scroller',
        translateX: "-" + slider + 'vw',
        easing: 'easeInOutExpo'
    });
}



const inputField = document.getElementById("amplitudePicker");
inputField.addEventListener('input', function() {
    waveColor = "white";
    waveChange();
    let waveAmplitude = Number(document.getElementById("amplitudePicker").value);
    if (waveAmplitude <= 30 || waveAmplitude >= 50) {
        $("#filterLamp").removeClass("yellowLamp");
        $("#filterFlare").hide();
    }
    if (waveAmplitude > 30 && waveAmplitude < 50) {
        $("#filterLamp").addClass("yellowLamp");
        $("#filterFlare").show();
        $("#filterLamp").removeClass("greenLamp");
        $("#filterFlare").css("background-image", "url(images/yellow_flare.png)");
        if (waveAmplitude > 40 && waveAmplitude < 45) {
            $("#filterLamp").addClass("greenLamp");
            $("#filterFlare").css("background-image", "url(images/green_flare.png)");
        }
    }
});
const inputeField = document.getElementById("frequencyPicker");
inputeField.addEventListener('input', function() {
    waveColor = "white";
    waveChange();
    let waveFrequency = Number(document.getElementById("frequencyPicker").value);
    let frequencyAccuracy = (0.3 - Math.abs(0.14 - waveFrequency)*9)/0.3 *100;
    if (frequencyAccuracy <= 0) {document.getElementById("filterNumber").innerHTML = "0%";}
    else {
        document.getElementById("filterNumber").innerHTML = frequencyAccuracy.toFixed(1)+"%";
        if (frequencyAccuracy >= 90) {
            $("#filterFlarer").show();
            $("#filterNumber").css("background-color", "rgb(66, 155, 66)");
        }
        else {
            $("#filterFlarer").hide();
            $("#filterNumber").css("background-color", "rgb(34, 53, 34)");
        }
    }
});


function waveChange() {
    let waveAmplitude = Number(document.getElementById("amplitudePicker").value);
    let waveFrequency = Number(document.getElementById("frequencyPicker").value);
    var props = {
        canvas: canvas,
        lineWidth: 2,
        waveName: "sine",
        waveProperties: {
            color: waveColor,
            amplitude: waveAmplitude,
            frequency: waveFrequency
        }
    };
    var waves = new drawWave(props);
    waves.draw();
}


var ray = 0;
function polarButton() {
    if (ray == 0) {
        $("#polarizationArrow").css("height", "100%");
        $("#polarizationArrow").css("transform-origin", "center");
        $("#polarizationButton").addClass("polarizationButton_pressed");
        ray = 1;
    }
    else {
        $("#polarizationArrow").css("height", "50%");
        $("#polarizationArrow").css("transform-origin", "bottom");
        $("#polarizationButton").removeClass("polarizationButton_pressed");
        ray = 0;
    }
    photonDisplay();
}

var angle = 0;
let polarizationGoal = Number(85);
var polarizationKf;
const polarField = document.getElementById("polarizationSpeed");
polarField.addEventListener('input', function() {
    angle = Number(polarField.value);
    $("#polarizationArrow").css("transform", "rotate("+ angle + "deg)");
    photonDisplay();
});

function photonDisplay() {
    polarizationKf = Number(Math.abs(polarizationGoal-angle));
    if (polarizationKf <= 40) {
        photonSettings();
        $("#photon1").css("opacity", photonDetection);

        photonSettings();
        $("#photon2").css("opacity", photonDetection);

        photonSettings();
        $("#photon3").css("opacity", photonDetection);

        photonSettings();
        $("#photon4").css("opacity", photonDetection);

        photonSettings();
        $("#photon5").css("opacity", photonDetection);
        if (ray == 1) {
            photonSettings();
            $("#photon6").css("opacity", photonDetection);

            photonSettings();
            $("#photon7").css("opacity", photonDetection);

            photonSettings();
            $("#photon8").css("opacity", photonDetection);

            photonSettings();
            $("#photon9").css("opacity", photonDetection);
            
            photonSettings();
            $("#photon10").css("opacity", photonDetection);
        };

        if (polarizationKf <= 2) {
            $("#polarLamp").css("background-color", "rgb(78, 204, 53)");
            $("#polarFlare").show();
        }
        else {
            $("#polarLamp").css("background-color", "rgb(75, 50, 50)");
            $("#polarFlare").hide();
        }
    }
}

var rnger;
function photonSettings() {
    rnger = Math.floor(Math.random()*(45-30+1))+10;
    photonDetection = Number(1 - (polarizationKf/rnger));
}