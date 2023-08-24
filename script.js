document.addEventListener("DOMContentLoaded", function () {
    const countdownElement = document.getElementById("countdown");
    const workLabel = document.getElementById("workLabel");
    const restLabel = document.getElementById("restLabel");
    const startButton = document.getElementById("startButton");
    const inputsElement = document.getElementById("inputs");
    const beepSound = new Audio("beep.mp3");
    let repetitions;
    let workDuration;
    let restDuration;
    let currentRep;
    workLabel.style.display = "none";
    restLabel.style.display = "none";

    startButton.addEventListener("click", function () {
        currentRep = 0;
        repetitions = parseInt(document.getElementById("repetitions").value);
        workDuration = parseInt(document.getElementById("workDuration").value) + 1;
        restDuration = parseInt(document.getElementById("restDuration").value) + 1;

        startWorkout();
    });

    function startWorkout() {
        let countdown = 5;
        inputsElement.style.display = "none";

        function doCountdown() {
            countdownElement.style.display = "block";
            countdownElement.textContent = countdown;

            const countdownInterval = setInterval(() => {
                countdown--;
                countdownElement.textContent = countdown;

                if (countdown <= 0) {
                    clearInterval(countdownInterval);
                    countdownElement.style.display = "none";
                    performRepetitions();
                } else if (countdown <= 3) {
                    beepSound.play();
                }
            }, 1000);
        }

        doCountdown();
    }

    function performRepetitions() {
        currentRep++;

        if (currentRep > repetitions) {
            inputsElement.style.display = "block";
            location.reload();
            return;
        }

        const repetitionsRemainingElement = document.getElementById("repetitionsRemaining");
        repetitionsRemainingElement.textContent = `Cycles restants : ${repetitions - currentRep}`;

        console.log("Rep " + currentRep + " of " + repetitions);
        countdownElement.style.display = "block";
        countdownElement.textContent = workDuration;
        document.body.classList.remove("rest");
        document.body.classList.add("work");
        workLabel.style.display = "block";

        function doWork() {
            if (workDuration === 0) {
                workDuration = parseInt(document.getElementById("workDuration").value) + 1;
                countdownElement.style.display = "none";
                workLabel.style.display = "none";
                document.body.classList.remove("work");
                doRest();
            } else {
                workDuration--;
                countdownElement.textContent = workDuration;
                if (workDuration <= 3) {
                    beepSound.play();
                }
                setTimeout(doWork, 1000);
            }
        }

        doWork();
    }

    function doRest() {
        countdownElement.style.display = "block";
        countdownElement.textContent = restDuration;
        document.body.classList.remove("work");
        document.body.classList.add("rest");
        restLabel.style.display = "block";

        function doRestCountdown() {
            if (restDuration === 0) {
                restDuration = parseInt(document.getElementById("restDuration").value) + 1;
                countdownElement.style.display = "none";
                restLabel.style.display = "none";
                document.body.classList.remove("rest");
                const repetitionsRemainingElement = document.getElementById("repetitionsRemaining");
                repetitionsRemainingElement.textContent = `Cycles restants : ${repetitions - currentRep}`;
                setTimeout(performRepetitions, 0);
            } else {
                restDuration--;
                countdownElement.textContent = restDuration;
                if (restDuration <= 3) {
                    beepSound.play();
                }
                const repetitionsRemainingElement = document.getElementById("repetitionsRemaining");
                repetitionsRemainingElement.textContent = `Cycles restants : ${repetitions - currentRep}`;
                setTimeout(doRestCountdown, 1000);
            }
        }

        doRestCountdown();
    }
});
