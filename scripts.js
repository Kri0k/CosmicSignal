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
        if (frequencyAccuracy >= 90) {$("#filterFlarer").show();}
        else {$("#filterFlarer").hide();}
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