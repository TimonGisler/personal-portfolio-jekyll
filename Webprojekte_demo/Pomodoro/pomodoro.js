$(document).ready(function () {

    let startWorkTime = 25;
    let startBreakTime = 5;

    let currentMin = startWorkTime;
    let currentSec = 0;

    let min = 60;
    let work = true;

    let intervalObject;


    let startButton = document.getElementById("start");
    let stopButton = document.getElementById("stop");
    let resetButton = document.getElementById("reset");

    let timeOutput = document.getElementById("timeOutput");
    let kindOfSession = document.getElementById("kindOfSession");
    let tabTitle = document.getElementById("tabTitle");



    startButton.onclick = function () {
        //Timer wird gestartet/fortgesetzt
        intervalObject = setInterval(subtractSecond, 1000);

        //Button is disabled
        startButton.disabled = true;
    };

    stopButton.onclick = function () {
        clearInterval(intervalObject);

        //enabel start button again
        startButton.disabled = false;
    };


    resetButton.onclick = function () {
        //reset Time
        currentMin = startWorkTime;
        currentSec = 0;

        //Reset displayed time
        timeOutput.innerHTML = currentMin + ":" + "0" + currentSec;
        tabTitle.innerHTML ="Pomodoro";

        kindOfSession.innerHTML = "Arbeit"

        clearInterval(intervalObject);
        startButton.disabled = false;
    };



    function subtractSecond() {
        
        

        if(currentSec<10){
            timeOutput.innerHTML = currentMin + ":" + "0" + currentSec;
            tabTitle.innerHTML ="(" + currentMin + ":" + "0" + currentSec + ") Pomodoro";
        }else{
            timeOutput.innerHTML = currentMin + ":"+currentSec;
            tabTitle.innerHTML = "(" + currentMin + ":"+currentSec + ") Pomodoro";
        }

        //If timer finished (minutes and seconds == zero)
        if(currentSec <= 0 && currentMin <= 0){

            //change session, if i had a break, change work to true, because now we work
            work = !work;

            if(work){
                kindOfSession.innerHTML = "Arbeit"
                currentMin = startWorkTime;
                currentSec = 1;
            }else{
                kindOfSession.innerHTML = "Pause"
                currentMin = startBreakTime;
                currentSec = 1;
            }




        //If timer is not finished, test if 1 minute is over
        }else if (currentSec <= 0) {
            //If seconds reached zero it will subtract 1 minute
            subtractMinute();
        }


        currentSec--;
    }

    function subtractMinute() {
        currentSec = 60;
        currentMin--;
    }

});