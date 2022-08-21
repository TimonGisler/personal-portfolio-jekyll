$(document).ready(function () {
    console.log("ready!");

    let timerInput = document.getElementById("timer");

    //How much time at start
    let timerSek;
    //How much time is left
    let currentSek;

    let textarea = document.getElementById("inputText");
    let text;

    let totalWörterHtml = document.getElementById("totaleWörter");
    let totalWörter = 0;

    let wörterProMinHtml = document.getElementById("wörterProMin");
    let wörterProMin = 0;

    let intervalObject;
    let button = document.getElementById("button");

    button.onclick = start;

    function start() {
        //Textarea leeren so das man nichts schreiben kann bevor zeit läuft.
        textarea.value = "";
        textarea.disabled = false;

        //disable button
        button.disabled = true;

        //Es wird gespeichert wie lang Timer sein soll
        timerSek = timerInput.value;
        //Jetztige Zeit == Startzeit, am Anfang eines z.B. 20 sek Timers hat man 20 sek
        //danach wird von diesen 20 sek jede sek eine sek abgezogen
        currentsek = timerSek;

        console.log("TIMER IS SET TO " + currentsek);

        //Timer wird gestartet
        intervalObject = setInterval(timer, 1000);


    }

    function timerEnded(){
        countWords();
        calculateWordsPerMinute();

        console.log("TIMER IS SET TO " + timerSek);
        timerInput.value = timerSek;

        //enable button again
        button.disabled = false;

        //disable textarea
        textarea.disabled = true;

        //Reset timer to start value
        timerSek;
    }


    function timer() {
        currentsek--;
        console.log("CURRENT IS SET TO " + currentsek);

        timerInput.value = currentsek;

        //Execute when time is 0
        if (currentsek <= 0) {
            console.log("ENDE");

            clearInterval(intervalObject);

            timerEnded();
        }
    }

    function calculateWordsPerMinute() {
        wörterProMin = totalWörter / (timerSek / 60);
        wörterProMinHtml.textContent = "Wörter/min: " + wörterProMin;

    }

    function countWords() {
        text = textarea.value;
        totalWörter = 0
        text += " ";
        //es wird gezählt wie viele leertasten im String sind
        //wenn das letzte Zeichen auch eine leertaste ist wird Anzahlwörter nicht hochgezählt, damit man nicht einfach leertaste spammen kann

        for (var i = 0; i < text.length; i++) {
            if (text.charAt(i) == " " && text.charAt(i - 1) != " ") {
                totalWörter++;
            }
        }
        //da anzahl leertasten gezählt wird wird auch eine leertaste am anfang gezählt, dieser "Punkt wird hier entfernt"
        if (text.charAt(0) == " ") {
            totalWörter--;
        }

        totalWörterHtml.textContent = "Total Wörter: " + totalWörter;
    }








});