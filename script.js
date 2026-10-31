// Placeholder for JavaScript code



// Define the dice_array
// with their respective faces.
// Sampled from a real Italian Paroliere game.
const dice_array = [
["E", "O", "A", "A", "I", "T"],
["C", "L", "E", "R", "A", "S"],
["V", "E", "N", "Z", "D", "A"],
["H", "E", "S", "I", "E", "F"],
["H", "E", "N", "R", "S", "I"],
["L", "A", "R", "T", "B", "I"],
["D", "E", "S", "T", "O", "N"],
["C", "A", "M", "P", "E", "D"],
["O", "U", "T", "C", "E", "N"],
["P", "E", "T", "S", "L", "U"],
["B", "O", "M", "O", "A", "Qu"],
["C", "I", "F", "O", "R", "A"],
["R", "I", "L", "O", "U", "E"],
["O", "N", "E", "G", "U", "L"],
["T", "G", "I", "N", "E", "V"],
["O", "M", "I", "S", "A", "R"]];

const NUM_DICE   = dice_array.length;
const NUM_FACES  = dice_array[0].length; // Assuming all dice have the same number of faces

// Check assumption on the same number of faces for each die
for (let i = 1; i < NUM_DICE; i++) {
    if (dice_array[i].length !== NUM_FACES) {
        throw new Error(`Die ${i} has a different number of faces.`);
    }
}

function getRandomDieFace(die) {
    const randomIndex = Math.floor(Math.random() * NUM_FACES);
    return die[randomIndex];
}

function getRandomPermutation(num_elements) {
    const array = Array.from({ length: num_elements }, (_, i) => i);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getShuffledResults() {
    const randomPermutation = getRandomPermutation(NUM_DICE);
    return Array.from({ length: NUM_DICE }, (_, i) => getRandomDieFace(dice_array[randomPermutation[i]]));
}


// get the img elements for each die of the board and store them in an array for easy access
const dieImages = [];
for (let i = 0; i < NUM_DICE; i++) {
    const dieImage = document.getElementById(`die_${i.toString().padStart(2, '0')}`);
    dieImages.push(dieImage);
}

// check that the number of board dice is as expected
if (dieImages.length !== NUM_DICE) {
    throw new Error(`Number of dice images in HTML page does not match expected number of dice.`);
}

function randomlyRotateDieImage(dieImage) {
    const randomAngle = Math.floor(Math.random() * 4) * 90; // Randomly choose 0, 90, 180, or 270 degrees
    dieImage.style.transform = `rotate(${randomAngle}deg)`;
}


function updateResultsBoard() {

    const results = getShuffledResults();

    // Update the images for each die based on the results
    for (let i = 0; i < NUM_DICE; i++) {
        const letter = results[i];
        const imagePath = `img/letter_${letter}.svg`;
        dieImages[i].src = imagePath;
        randomlyRotateDieImage(dieImages[i]);
    }

}



//Initially, draw the results on the canvas when the page loads
window.onload = updateResultsBoard;
