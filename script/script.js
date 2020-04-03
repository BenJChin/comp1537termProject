
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

//An array to hold the game buttons generated
let gameButtons = [];

//Will be used to track if the word is guessed correctly or not.
let correctGuess = 0;

//Counter used to count the number of wrong guesses.
let wrongGuess = 0;

//Game score
let gameScore = 0;

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
        let charElement = new Character(wordChar);
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
function Character(char) {
    this.char = char;
    this.revealed = false;
    this.charEl = document.createElement("p");
    this.charEl.innerHTML = "_";
    this.charEl.classList.add("word_char");
    
    
    let domInsertion = document.getElementById("word_characters");
    domInsertion.appendChild(this.charEl);

    this.reveal = function() {
        this.charEl.innerHTML = this.char;
        this.revealed = true;
    }

}

/**
 * A Button class for the user to click on to make
 * guesses in the game. The onclick function handles
 * most of the game logic in checking if that button
 * matches any letters in the game word.
 * @param {integer} i 
 */
function Button(i) {
    this.btn = document.createElement("BUTTON");
    this.btn.innerHTML = String.fromCharCode(i + 65);
    this.btn.classList.add("btn_char");
    document.body.appendChild(this.btn);
    this.btn.active = true;
    

    this.btn.addEventListener ("click", function(){
        let buttonChar = this.innerHTML;
        let buttonCharLower = buttonChar.toLowerCase();
        let guessedRight = false;

        if (this.active) {
            this.active = false;
            gameWordChars.forEach((letter) => {
                if (buttonCharLower == letter.char) {
                    guessedRight = true;
                    letter.reveal();
                    this.classList.add('right_guess_button');
                    gameScore++;
                }
            });

            if(!guessedRight) {
                wrongGuess++;
                gameScore--;
                this.classList.add('wrong_guess_button');
                generateHangman();
            }
            
            checkGameState();
        }
        

    });
}

/**
 * Generates and inserts alphabet buttons for the
 * user to click to play.
 */
function generateButtons(){
    for (i = 0; i < 26; i++){
        let newButton = new Button(i);
        gameButtons.push(newButton);

    }
}

/**
 * Checks the game state, whether the user
 * has won or lost yet. Counts the number
 * of unrevealed letters. If there are 0 unrevealed
 * letters, then the game is considered won.
 */
function checkGameState() {
    let lettersLeft = [];

    /* Checking if the game is won*/
    gameWordChars.forEach((letter) => {
        if (!letter.revealed) {
            lettersLeft.push(letter);
        }
    });

    /* Checking if the game is won*/
    if (lettersLeft.length == 0) {
        gameWin();
        return;
    }

    //Checking if the game is lost
    if (wrongGuess >= 7) {
        gameLost();
    }
}

/**
 * Called when the game is won. Hides all buttons
 * and displays a message to user. Should create a 
 * REPLAY GAME button. Should also call a resetGame() function
 * to wipe the game state and recreate the board and game.
 */
function gameWin() {
    gameButtons.forEach((button) => {
        button.btn.classList.add('hidden');
        //button.classList.add("hidden");
    })
    let domInsertion = document.getElementById("game_message");
    domInsertion.innerHTML = `You win! You got a score of ${gameScore}!`;
} 

/**
 * Called when the game is lost. Hides all buttons
 * and displays a message to user. Should create a 
 * REPLAY GAME button. Should also call a resetGame() function
 * to wipe the game state and recreate the board and game.
 */
function gameLost() {
    gameButtons.forEach((button) => {
        button.btn.classList.add('hidden');
    })
    let domInsertion = document.getElementById("game_message");
    domInsertion.innerHTML = `Some people are winners, some people are losers. You're not in the first group. Try again?`;
}


/**
 * Used to generate the body of the hangman.
 * 
 * if the word hasnt been guessed yet,it adds 1 to the wrongGuess counter to bring up next image.
 * call after each wrong guess.
 */
function generateHangman() {
    let hangman = document.getElementById("hangman_image");

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
    if (wrongGuess >= 7) {
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
 * Should probably put these functions into a "startGame()" function
 * that we can call at first and then call with the Replay Game button too.
 * 
 **************************/

generateButtons();
generateRandomWord();
generateWordBlanks();
insertWordDefinition();
