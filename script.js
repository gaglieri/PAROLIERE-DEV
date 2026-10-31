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

function drawDiceResults(results) {
    const canvas = document.getElementById('diceCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    const NUM_DICE_X = 4;
    const XPITCH = canvas.width / NUM_DICE_X; // Space between dice results horizontally
    const YPITCH = canvas.height / Math.ceil(results.length / NUM_DICE_X); // Space between dice results vertically
    const fontSize = Math.floor(0.75*XPITCH); // Font size for the letters
    ctx.fillTextAlign = 'center';
    ctx.fillStyle = 'red';
    ctx.font = `${fontSize}px Arial`;
    
    results.forEach((letter, index) => {
        startX = (index%NUM_DICE_X)*XPITCH;
        startY = Math.floor(index/NUM_DICE_X)*YPITCH;
        ctx.fillText(letter, startX, startY+fontSize); // Draw the letter at the calculated position
    });
}

function updateResultsCanvas() {
    const results = getShuffledResults();
    drawDiceResults(results);
}

//Initially, draw the results on the canvas when the page loads
window.onload = updateResultsCanvas;
