let testingString = "Please wait for story to load..."
let currentLetter = 0;
let blockLoading = false;
let charsTyped = 0;
let timer = 60.0;
let timeup = false;
let started = false;

function typingtestEntry() {
    $.get("https://shortstories-api.onrender.com/", function(data) {
        testingString = data.story;
        updatePrompt("Start typing to start test (use the back button to go to the home page)")
        document.addEventListener('keydown', (event) => typingtestKey(event.key));
        consoleLog(`Characters typed: <span id="charstyped">${charsTyped}</span><br>Timer: <span id="timer">${timer}</span><br><span id="typingtest" class="typed"><span id="nottyped">${testingString}</span></span>`)

        const i = setInterval(() => {
            if(timer <= 0.1) {
                timeup = true;
                updatePrompt("Good job! Press enter to exit")
                clearInterval(i)
            }
            timer -= started ? .1 : 0;
            if(timer < 0) {
                timer = 0;
            }
            $('#timer').text(timer.toFixed(1));
        }, 100)
    })
}

function typingtestHandler(input) {
    if(timeup) {
        jobExit();
    }
}

function typingtestKey(key) {
    if(!started) {
        updatePrompt("Type away")
        started = true;
    }
    if(timeup) {
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
            $.get("https://shortstories-api.onrender.com/", function(data) {
                testingString += "<br>" + data.story
                $('#typingtest')[0].innerHTML = testingString.slice(0, currentLetter) + `<span id="nottyped">` + testingString.slice(currentLetter)            })
                blockLoading = true;
            }
    }
}