const dictionary = words;
let currentWords = []
let currentDefinitions = []
let streak = 0;
let correctAnswer = -1;
let waitingOn = null;

const lets = ['a','b','c','d']

function longestCommonSubstring(str1, str2) {
    let n = str1.length; 
    let m = str2.length; 
  
    let lcs = []; 
    for (let i = 0; i <= n; i++) { 
        lcs[i] = []; 
        for (let j = 0; j <= m; j++) { 
            lcs[i][j] = 0; 
        } 
    } 
  
    let result = ""; 
    let max = 0; 
    for (let i = 0; i < n; i++) { 
        for (let j = 0; j < m; j++) { 
            if (str1[i] === str2[j]) { 
                lcs[i + 1][j + 1] = lcs[i][j] + 1; 
                if (lcs[i + 1][j + 1] > max) { 
                    max = lcs[i + 1][j + 1]; 
                    result = str1.substring(i - max + 1, i + 1); 
                } 
            } 
        } 
    }
    return result; 
} 

function randomProperty(obj) {
    var keys = Object.keys(obj);
    return keys[ keys.length * Math.random() << 0];
};

function chooseWords() {
    let firstWord = null
    while(!firstWord) {
        firstWord = randomProperty(words);
        if(longestCommonSubstring(firstWord.toLowerCase(), words[firstWord].definition.toLowerCase()).length > 4) {
            firstWord = null;
        }
    }
    const foundWords = [firstWord]
    const foundDefinitions = [words[firstWord].definition]
    const firstWordType = words[firstWord].type;
    while(foundWords.length < 4) {
        const newWord = randomProperty(words);
        const newWordDef = words[newWord].definition;
        const newWordType = words[newWord].type;
        if(newWord.length < 5 || longestCommonSubstring(newWord.toLowerCase(), newWordDef.toLowerCase()).length > 4 || newWordType != firstWordType) {
            continue
        }
        foundWords.push(newWord);
        foundDefinitions.push(newWordDef);
    }
    return [foundWords, foundDefinitions];
}


const green = 'color: green;'
const blue = 'color: blue;'
const backBlue = 'background-color: blue;';
const backGreen = 'background-color: green;';
const backRed = 'background-color: red;';
const black = 'color: black;'
const white = 'color: white;'
const close = '</span>'

function wordStreakHandleEntry() {
    [currentWords, currentDefinitions] = chooseWords();
    correctAnswer = Math.floor(Math.random() * 4);

    let highScore = getCookie('highscore'); 
    let currentStreak = getCookie('currentstreak');
    if(!currentStreak) {
        currentStreak = 0;
    } else {
        streak = parseInt(currentStreak);
    }
    let buildStr = `Current streak: <span style="${backBlue}${white}">${streak}${close}.`
    if(highScore) {
        buildStr += ` High score: <span style="${backBlue}${white}">${getCookie('highscore')}${close}<br>`
    } else {
        buildStr += `<br>`
    }
    buildStr += `What is the definition of: <span style="${backBlue}${white}">${currentWords[correctAnswer]}</span>?<br><br>`
    for(let i = 0; i < 4; i++) {
        buildStr += `<span style="${green}">${lets[i]})</span> <span id=word${i}>${currentDefinitions[i]}${close}<br>`
    }

    consoleLog(buildStr, cb=registerWordstreakClasses);
    updatePrompt("Answer (or \"exit\" to go to the home screen)")
    waitingOn = handleAnswer;
}

function wordStreakHandleInput(input) {
    waitingOn(input);
}

function handleAnswer(input, fromclick=false) {
    let rightOrWrong;
    let highScore;
    if(!lets.includes(input)) {
        updatePrompt("Answer must be one of a,b,c or d");
        return;
    }
    if(input == lets[correctAnswer]) {
        streak += 1;
        highScore = getCookie('highscore')
        if(!highScore || highScore < streak) {
            document.cookie = 'highscore=' + streak;
        }
        rightOrWrong = backGreen;
        updatePrompt("Press any key to continue")
    } else {
        streak = 0;
        rightOrWrong = backRed;
        updatePrompt("Press any key to continue")
    }
    document.cookie = 'currentstreak=' + streak;
    if(fromclick) {
        handleContinue();
        return;
    }
    highScore = getCookie('highscore'); 
    let buildStr = `Current streak: <span style="${backBlue}${white}">${streak}${close}.`
    if(highScore) {
        buildStr += ` High score: <span style="${backBlue}${white}">${getCookie('highscore')}${close}<br>`
    } else {
        buildStr += `<br>`
    }
    buildStr += `What is the definition of: <span style="${backBlue}${white}">${currentWords[correctAnswer]}</span>?<br><br>`
    for(let i = 0; i < 4; i++) {
        buildStr += `<span style="${green}">${lets[i]})</span> ${currentDefinitions[i]} <span style="${rightOrWrong}${black}">&nbsp;${currentWords[i]}&nbsp;${close}<br>`
    }
    consoleLog(buildStr, animate=false);
    waitingOn = handleContinue;
}

function handleContinue(input) {
    wordStreakHandleEntry();
}



function registerWordstreakClasses() {
    for(let i = 0; i < 4; i++) {
        $("#word"+i)[0].addEventListener("mouseover", (event) => {
            event.target.style['background-color'] = 'white';
            event.target.style['color'] = 'black';
            event.target.style.cursor = 'pointer'
        });
        $("#word"+i)[0].addEventListener("mouseout", (event) => {
            event.target.style['background-color'] = 'black';
            event.target.style['color'] = 'white';
            event.target.style.cursor = 'auto'
        });
        $("#word"+i)[0].addEventListener("click", (event) => {
            event.target.style['background-color'] = 'black';
            event.target.style['color'] = 'white';
            event.target.style.cursor = 'auto';
            handleAnswer(lets[i], fromclick=true);
        });
    }
}

