let testingString = "Please wait for story to load..."
let article = ""
let currentLetter = 0;
let blockTyping = false;
let blockLoading = false;
let charsTyped = 0;
let timer = 60.0;
let timeup = false;
let started = false;
let highScore = 0;

function typingtestEntry() {
    highScore = getCookie('typingHighscore'); 
    if(!highScore) {
        document.cookie = "highScore=0"
        highScore = 0;
    } else {
        highScore = parseInt(highScore);
    }
    console.log(blurbs.length)
    article = blurbs[Math.floor(Math.random()*blurbs.length)]
    testingString = article[1];
    updatePrompt("Start typing to start test (use the back button to go to the home page)")
    document.addEventListener('keydown', (event) => typingtestKey(event.key));
    consoleLog(`Characters typed: <span id="charstyped">${charsTyped}</span><span id="highScore">  High score: <span style='background-color: blue'>${highScore}</span></span><br>Timer: <span id="timer">${timer}</span><br><span id="typingtest" class="typed"><span id="nottyped">${testingString}</span></span>`)

    const i = setInterval(() => {
        if(timer <= 0.1) {
            console.log(charsTyped, highScore)
            if(charsTyped > highScore) {
                document.cookie = "typingHighscore=" + charsTyped;
                $('#highScore').text('  ' + charsTyped);
            }
            timeup = true;
            clearInterval(i)
            $("#input").text('')
            $('#nottyped')[0].style['background-color'] = 'darkred'
            blockTyping = true;
            setTimeout(() => {
                $('#nottyped')[0].style['background-color'] = 'black'
                updatePrompt("Good job! Choose command")
                blockTyping = false;
                $("#input").text('')
                endTest();
            }, 1500)
        }
        timer -= started ? .1 : 0;
        if(timer < 0) {
            timer = 0;
        }
        $('#timer').text(timer.toFixed(1));
    }, 100)
}

function endTest() {
    builtStr = `You typed <span style='background-color: blue'>${charsTyped}</span> characters! Your high score is <span style='background-color: blue'>${highScore}</span>. <br><br> Please choose from the following:<br><br>1. <span id="option1">Exit</span><br><span id="option2">2. Play again</span><br><span id="option3">3. View Wikipedia article: ("${article[0].replaceAll('_', ' ')}")</span>`
    consoleLog(builtStr, cb=registerOptions);
}

function registerOptions() {
    for(let i = 1; i < 4; i++) {
        $("#option"+i)[0].addEventListener("mouseover", (event) => {
            event.target.classList.add('hoverlink');
        });
        $("#option"+i)[0].addEventListener("mouseout", (event) => {
            event.target.classList.remove('hoverlink');
        });
        $("#option"+i)[0].addEventListener("click", (event) => {
            event.target.classList.remove('hoverlink');
            typingtestHandler(i);
        });
    }
}

function typingtestHandler(input) {
    if(timeup) {
        if(input == 1) {
            jobExit();
            return;
        } else if(input == 2) {
            location.reload();
        } else if(input == 3) {
            window.open('https://en.wikipedia.org/wiki/'+article[0], '_blank');
        }
    }
}

function typingtestKey(key) {
    if(!started) {
        updatePrompt("Type away")
        started = true;
    }
    if(timeup) {
        if(blockTyping) {
            $("#input").text('')
        }
        return;
    }
    $("#input").text('')
    const nottyped = $('#nottyped')[0]
    if(nottyped.innerHTML[0] == key || (key == 'Enter' && nottyped.innerHTML.slice(0, 4) == '<br>')) {
        if(key == 'Enter') {
            currentLetter += 4;
        } else {
            currentLetter += 1;
        }
        charsTyped += 1;
        $('#charstyped')[0].innerHTML = charsTyped;
        $('#typingtest')[0].innerHTML = testingString.slice(0, currentLetter) + `<span id="nottyped">` + testingString.slice(currentLetter)
        if(key == ' ') {
            $('#input').text('')
        }
        if(nottyped.innerHTML.length < 100 && !blockLoading) {
            blockLoading = true;
            article = blurbs[Math.floor(Math.random()*blurbs.length)]
            testingString += "<br>" + article[1];
            setTimeout(() => blockLoading = false, 1500);
        }
    }
}