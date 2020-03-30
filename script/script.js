
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


/**************************
 * 
 * MAIN AREA TO CALL FUNCTIONS
 * 
 **************************/

generateRandomWord();
generateWordBlanks();
insertWordDefinition();