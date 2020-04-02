
/**
 * The main word list array. Each word is stored as an object of word and definition.
 * There are 10 words, one of which is the required 'committee'. Feel free to add more!
 */
const wordList = [
    {
        word: 'zephyr',
        definition: 'Definition: a soft gentle breeze'
    },
    {
        word: 'buzzword',
        definition: 'Definition: a word or phrase that is fashionable at a particular time or context'
    },
    {
        word: 'committee',
        definition: 'Definition: a group of people appointed for a specific function'
    },
    {
        word: 'embezzle',
        definition: 'Definition: steal or misappropriate'
    },
    {
        word: 'kitsch',
        definition: 'Definition: considered to be in poor taste but appreciated in an ironic or knowing way'
    },
    {
        word: 'transgress',
        definition: 'Definition: to infringe or go beyond the bounds of'
    },
    {
        word: 'pizazz',
        definition: 'Definition: an attractive combination of vitality and glamour'
    },
    {
        word: 'haphazard',
        definition: 'Definition: lacking any obvious principle of organization'
    },
    {
        word: 'quorum',
        definition: 'Definition: the number of members of a body that when assembled is legally competent to transact business'
    },
    {
        word: 'Lesotho',
        definition: 'Definition: a small sovereign nation within the country of South Africa'
    }
]

//The word that will be randomly generated for that round of gameplay
let gameWord;

//The definition of the word for that round of gameplay
let gameWordDefinition;

//An array that will hold the character objects representing a letter from the gameWord.
//Holds all the character objects that are inserted into the DOM
let gameWordChars = [];

//Will be used to track if the word is guessed correctly or not.
let correctGuess = 0;

//Counter used to count the number of wrong guesses.
let wrongGuess = 0;

/**************************
 * 
 * FUNCTION DECLARATIONS
 * 
 **************************/



/* Randomly generates a word and sets the gameWord
 * and gameWordDefinition to that word. 
 */
function generateRandomWord() {
    let randomWord = Math.floor(Math.random() * wordList.length);
    gameWord = wordList[randomWord].word;
    gameWordDefinition = wordList[randomWord].definition;
}

/**
 * Generates and inserts the "_" based on length of the gameWord
 */
function generateWordBlanks() {
    for (let i = 0; i < gameWord.length; i++) {
        let wordChar = gameWord[i];
        let charElement = new character(wordChar);
        gameWordChars.push(charElement);
    }
}

/**
 * Inserts the definition of the word into the DOM
 */
function insertWordDefinition() {
    document.getElementById("word_definition").innerHTML = gameWordDefinition;
}

/**
 * A class for character. Each character has it's char value and
 * has a reveal() function that can be called to reveal it once the
 * user guesses it correctly
 * @param {*} char the char from the gameWord
 */
function character(char) {
    this.char = char;
    this.charEl = document.createElement("p");
    this.charEl.innerHTML = "_";
    this.charEl.classList.add("word_char");
    
    let domInsertion = document.getElementById("word_characters");
    domInsertion.appendChild(this.charEl);

    this.reveal = function() {
        this.charObj.innerHTML = this.char;
    }
}

/**
 * Generates and inserts alphabet buttons
 */
function generateButtons(){
    for (i = 0; i < 26; i++){
        this.btn = document.createElement("BUTTON");
        this.btn.innerHTML = String.fromCharCode(i + 65);
        this.btn.classList.add("btn_char");
        document.body.appendChild(this.btn);
        this.btn.addEventListener ("click", function(){
            console.log("Button " + this.innerHTML + " was clicked");
        })
        
    }
}


/**
 * Used to generate the body of the hangman.
 * 
 * if the word hasnt been guessed yet,it adds 1 to the wrongGuess counter to bring up next image.
 * call after each wrong guess.
 */
function generateHangman() {
    let hangman = document.getElementById("hangman_image");

    if (correctGuess == 0) {
        wrongGuess++;
    }
    if (wrongGuess == 1) {
        hangman.src = "./images/hangman1.png";
    }
    if (wrongGuess == 2) {
        hangman.src = "./images/hangman2.png";
    }
    if (wrongGuess == 3) {
        hangman.src = "./images/hangman3.png";
    }
    if (wrongGuess == 4) {
        hangman.src = "./images/hangman4.png";
    }
    if (wrongGuess == 5) {
        hangman.src = "./images/hangman5.png";
    }
    if (wrongGuess == 6) {
        hangman.src = "./images/hangman6.png";
    }
    if (wrongGuess == 7) {
        hangman.src = "./images/hangman8.png";
    }
    if (correctGuess == 1) {
        //
    }

}


/**************************
 * 
 * MAIN AREA TO CALL FUNCTIONS
 * 
 **************************/

generateButtons();
generateRandomWord();
generateWordBlanks();
insertWordDefinition();
