let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// --------------------- CREATING A RANDOM PATTERN --------------------- //
function nextSequence() {
    
    // Update level
    level++;
    $("#level-title").text(`Level ${level}`);

    // Reset the user clicked sequence for the next level
    userClickedPattern = [];

    let randomNumber = Math.floor(Math.random() * 4); // Generate a random integer between 0 and 3
    let randomChosenColour = buttonColours[randomNumber]; // Choose a random colour
    gamePattern.push(randomChosenColour);  // Add to the pattern sequence
    animatePress(randomChosenColour, 200); // Animate the chosen colour
    
}

// --------------------- CHECK WHICH BUTTONS ARE PRESSED --------------------- //
$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour, 125);
    
    checkAnswer(userClickedPattern.length - 1);
});

// --------------------- START THE GAME --------------------- //
$(".play-button").click(function () {
    if (!started) {
        level = 0; // Reset level
        $(this).fadeIn(100).fadeOut(100).fadeIn(100);
        setTimeout(nextSequence, 750);
        started = true;
    }
});


// --------------------- CHECK USER ANSWER --------------------- //
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length == gamePattern.length) {
            // All passed and the user has finished entering the pattern
            setTimeout(nextSequence, 1000);
        }
    } else {
        // console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Play to Restart");
        
        started = false;
        gamePattern = [];
    }

}

// --------------------- HELPER FUNCTIONS --------------------- //
function playSound(soundName) {
    let audio = new Audio(`sounds/${soundName}.mp3`);
    audio.play();
}

function animatePress(colour, interval) {
    playSound(colour);
    $(`#${colour}`).fadeIn(interval).fadeOut(interval).fadeIn(interval);
}


