alert('Is jy gereed om te begin?');

// Objects
let audio = new Audio();

let smilies = ['smile1.png', 'smile2.png', 'smile3.png', 'smile4.png', 'smile5.png'];
let unhappyFaces = ['unhappy1.png', 'unhappy2.png', 'unhappy3.png', 'unhappy4.png', 'unhappy5.png'];
let simboolArray = ['+', '-', 'X', '/'];
let countDownSeconds = 90;



var x = setInterval(function() {

    document.getElementById('telAf').innerHTML = countDownSeconds;

    countDownSeconds--;

    if (countDownSeconds < 0) {
        clearInterval(x);

        document.querySelector('#antwoord_text').disabled = true;
        document.querySelector('#antwoord_text').setAttribute('placeholder', 'STOP');

    }

}, 1000);


let punte = 0;
nuweSom();

function kry_eersteGetal() {
    var eersteGetal = Math.floor(Math.random() * 10);
    return eersteGetal;
}

function kry_twedeGetal() {
    var twedeGetal = Math.floor(Math.random() * 10);  
    return twedeGetal;
}

function nuweSom() {
    let getal1 = kry_eersteGetal();
    let getal2 = kry_twedeGetal();
    let randomNumberSimbol = 0;

    if (punte <= 5) {
        document.getElementById('levelNumber').innerHTML = '1';  
    } 
    else if (punte <= 10) {
        document.getElementById('levelNumber').innerHTML = '2';
        randomNumberSimbol = Math.floor(Math.random() * 2);
    }
    else if (punte <= 15) {
        document.getElementById('levelNumber').innerHTML = '3';
        randomNumberSimbol = Math.floor(Math.random() * 3);
    }
    else {
        document.getElementById('levelNumber').innerHTML = '4';
        randomNumberSimbol = Math.floor(Math.random() * 4);
    }

    let simbool = simboolArray[randomNumberSimbol];

    if (simbool == '-' && getal1 < getal2) {
        var c = getal2;
        getal2 = getal1;
        getal1 = c;
    }

    else if (simbool == 'X') {
        var getal2Array = [1, 2, 3, 5, 10, 12];
        getal2 = getal2Array[Math.floor(Math.random() * getal2Array.length)];
    }

    else if (simbool == '/') {
        var getal2Array = [1, 2, 3, 5, 10];
        var getal2RandNumber = Math.floor(Math.random() * getal2Array.length);
        getal2 = getal2Array[getal2RandNumber];

        var randAntwoord = Math.ceil(Math.random() * 12);
         getal1 = randAntwoord * getal2;

    }



    document.querySelector('#eersteGetal').innerHTML = getal1;
    document.getElementById('simbool').innerHTML = simbool;
    document.getElementById('twedeGetal').innerHTML = getal2;
    
    document.getElementById('antwoord_text').value = '';

}

function dieSom() {  // Return die antwoord

    let simboolGewys = document.getElementById('simbool').textContent;
    let antwoord = '';
    let getal1 = Number(document.getElementById('eersteGetal').textContent);
    let getal2 = Number(document.getElementById('twedeGetal').textContent);    

    if (simboolGewys == "+") {
        antwoord = getal1 + getal2;
    }
    else if (simboolGewys == "-") {
        antwoord = getal1 - getal2;
    }
    else if (simboolGewys == "X") {
        antwoord = getal1 * getal2;
    }
    else if (simboolGewys == "/") {
        antwoord = getal1 / getal2;
    }

    return Number(antwoord);
    
}

function triggerBerekening(event) {
    var enter = event.key;

    if(enter == 'Enter') {
        berekening();
    }
}


function berekening() {

    var smilieNumber = Math.floor(Math.random() * smilies.length);
    var unhappyNumber = Math.floor(Math.random() * unhappyFaces.length);

    var uitgewerkteAntwoord = dieSom();
    var antwoord = document.querySelector('#antwoord_text').value;
    
    if (antwoord != '') {
        document.getElementById('pleaseText').textContent = '';
    if (uitgewerkteAntwoord == antwoord) {
        document.getElementById('blank').innerHTML = '<img src="./faces/' + smilies[smilieNumber] + '" style="width: 50px;" alt="smily">';
        punte++;
        document.getElementById('punte').innerHTML = punte;
        nuweSom();

    }
    else {
        document.querySelector('#blank').innerHTML = '<img src="./faces/' + unhappyFaces[unhappyNumber] + '" style="width: 50px;" alt="smily">';
        punte--;
        document.getElementById('punte').innerHTML = punte;
        document.querySelector('#antwoord_text').value = '';
        audio.src = 'kick-bass.mp3';
        audio.play();
     }
    }
    else {
        // Laat weet daar moet iets in die blokkie gevul word.
        document.getElementById('pleaseText').innerHTML = '&rarr\; Tik eers \'n getal in. &larr\;';
    }
}
