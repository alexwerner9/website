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

let nottyped = "Please wait for story to load..."
let correctlytyped = ""
let incorrectlytyped = ""

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
    nottyped = article[1]
    nottyped = 'this is not typed'
    updatePrompt("Start typing to start test (use the back button to go to the home page)")
    document.addEventListener('keydown', (event) => typingtestKey(event.key));
    consoleLog(`Characters typed: 
                    <span id="charstyped">${charsTyped}</span>
                    <span id="highScore">  High score: <span style='background-color: blue'>${highScore}</span>
                    </span>
                    <br>
                    Timer: <span id="timer">${timer}</span>
                    <br>
                    <span id="correctlytyped" class="typed"></span><span id="incorrectlytyped" style="background-color: red;"></span><span id="nottyped">${nottyped}</span></span>`.replaceAll('\n', ''))

    const i = setInterval(() => {
        if(timer <= 0.1) {
            console.log(charsTyped, highScore)
            if(charsTyped > highScore) {
                document.cookie = "typingHighscore=" + charsTyped;
                $('#highScore').text('  ' + charsTyped);
                highScore = charsTyped
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
    builtStr = `You typed <span style='background-color: blue'>${charsTyped}</span> characters! 
                Your high score is <span style='background-color: blue'>${highScore}</span>. 
                <br><br>
                
                Please choose from the following:
                <br><br>
                
                1. <span id="option1">Exit</span><br>
                2. <span id="option2">Play again</span><br>
                3. <span id="option3">View Wikipedia article: ("${article[0].replaceAll('_', ' ')}")</span>`
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
    if(key == 'Shift' || key == 'Control' || key == 'Alt') {
        return;
    }
    $("#input").text('')
    if(key == 'Backspace') {
        if($('#incorrectlytyped')[0].innerHTML.length) {
            nottyped = incorrectlytyped.slice(incorrectlytyped.length-1, incorrectlytyped.length) + nottyped;
            incorrectlytyped = incorrectlytyped.slice(0, incorrectlytyped.length-1);
            $('#incorrectlytyped')[0].innerHTML = incorrectlytyped;
            $('#nottyped')[0].innerHTML = nottyped;
        }
        return;
    }
    if(!incorrectlytyped.length && (nottyped[0] == key || (key == 'Enter' && nottyped.slice(0, 4) == '<br>'))) {
        if(key == 'Enter') {
            correctlytyped += nottyped.slice(0,4)
            nottyped = nottyped.slice(4)
        } else {
            correctlytyped += nottyped.slice(0,1);
            nottyped = nottyped.slice(1)
        }
        charsTyped += 1;

        if($('#nottyped')[0].innerHTML.length < 100 && !blockLoading) {
            blockLoading = true;
            article = blurbs[Math.floor(Math.random()*blurbs.length)]
            nottyped += " ---- " + article[1];
            setTimeout(() => blockLoading = false, 1500);
        }

        $('#correctlytyped')[0].innerHTML = correctlytyped
        $('#nottyped')[0].innerHTML = nottyped
        $('#charstyped')[0].innerHTML = charsTyped

    } else {
        incorrectlytyped += nottyped.slice(0,1);
        nottyped = nottyped.slice(1);
        $('#incorrectlytyped')[0].innerHTML = incorrectlytyped
        $('#nottyped')[0].innerHTML = nottyped
    }
}