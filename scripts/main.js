
// ideas:
// spotify listener (what i'm listening to)
// spotify add to playlist
// view the code
// ascii art / color codes
// sunset with background colors
// display the source code
const jobs = {
    requestUsername: {
        inputHandler: usernameHandler,
        entryPoint: usernameEntry,
        internal: true
    },
    shell: {
        inputHandler: shellHandler,
        entryPoint: shellEntry,
        internal: true
    },
    aboutme: {
        entryPoint: aboutmeEntry,
        inputHandler: aboutmeHandler
    },
    wordstreak: {
        entryPoint: wordStreakEntry,
        inputHandler: wordStreakInput
    },
    projects: {
        entryPoint: projectsEntry
    },
    fullscreen: {
        entryPoint: fullscreenEntry
    },
    ascii: {
        entryPoint: asciiEntry,
        inputHandler: asciiInput
    },
    login: {
        entryPoint: () => { document.cookie = 'username='; runJob('requestUsername'); return; }
    }
}

let aliases = {
    'ws': 'wordstreak',
    '1': 'aboutme',
    '2': 'wordstreak',
    '3': 'projects',
    '4': 'fullscreen',
    '5': 'ascii',
    '6': 'login'
}

const welcome = "\
 _   _   ___   _      ___   __    __ __   ___ <br>\
| | | | | __| | |    / _/  /__\\  |  |  | | __|<br>\
|  |  | | _|  | |_  | \\__ | \\/ | | \\_/ | | _| <br>\
!_/ \\_! |___| |___|  \\__/  \\__/  |_| |_| |___|<br><br>\
".replaceAll(' ', '&nbsp;')

let currentJob = getCookie('lastjob');
if(!currentJob) {
    currentJob = 'shell';
}

runJob(currentJob);

let oldFont = null;

function getCookie(key) {
    let newKey = key + "="
    const cookie = document.cookie;
    let ca = cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        if(ca[i].charAt(0) == ' ') {
            ca[i] = ca[i].slice(1, ca[i].length)
        }
        if(ca[i].indexOf(newKey) == 0) {
            return ca[i].substring(newKey.length, ca[i].length);
        }
    }
    return null;
}

function updatePrompt(text) {
    $('#prompt').html(text + ": ");
    const main = $("#main")[0];
    const terminal = $("#terminal")[0];
    const height = window.getComputedStyle(terminal, null).getPropertyValue('height');
    main.style.height = window.innerHeight - parseFloat(height) + "px";
    console.log(parseFloat(height))
}

function updateUsername(text) {
    if(text) {
        $('#user').html(`(${text}) `);
    } else {
        $('#user').html("");
    }
}

function handleInput(input) {
    jobs[currentJob].inputHandler(input);
}

function runJob(job) {
    if(aliases[job]) {
        job = aliases[job];
    }
    if(!jobs[job]) {
        updatePrompt("Not a valid command. Enter a command")
        return;
    }
    currentJob = job;
    document.cookie = "lastjob=" + currentJob;
    console.log("Running: " + currentJob)
    jobs[currentJob].entryPoint();
}

function jobExit() {
    runJob('shell');
}

function handleGenericInput(input) {
    if(input == 'exit' || input == 'back') {
        return true;
    }
    return false;
}

function shellEntry() {
    let commandStr = ""
    let count = 1;
    for(const prop in jobs) {
        if(jobs[prop].internal) {
            continue;
        }
        commandStr += `<span style="${green}">` + count + `.${close} <span id=${count}>` + prop + `${close}<br>`;
        count += 1;
    }
    let helpStr = welcome + `Welcome to my (terminal) website, where no terminal emulation libraries are allowed. In fact, no Xterm, React, Angular, Vue, Bootstrap, Lodash, etc. Just pure, vanilla JavaScript ... unless you're an employer, in which case I used all of the above (and if you're a lawyer, I didn't actually) :) I will admit I used a bit of jQuery, but does that count?<br><br> Here you can play games, look at projects \
                   I've done, or learn about me. At any time you may type \"exit\" to go back to this \
                   screen. If there is not a text interface, there will be a back button to return here, or a new tab will open. \
                   Other possible commands are: <br><br> ${commandStr} <br> \
                   To run these commands, type them in and press 'Enter'.`
    consoleLog(helpStr);
    console.log("Good update");
    updatePrompt('Enter a command');

}

function registerClasses() {
    let count = 1;
    for(const prop in jobs) {
        if(jobs[prop].internal) {
            continue;
        }
        $("#"+count)[0].addEventListener("mouseover", (event) => {
            event.target.style['background-color'] = 'white';
            event.target.style['color'] = 'black';
            event.target.style.cursor = 'pointer'
        });
        $("#"+count)[0].addEventListener("mouseout", (event) => {
            event.target.style['background-color'] = 'black';
            event.target.style['color'] = 'white';
            event.target.style.cursor = 'auto'
        });
        $("#"+count)[0].addEventListener("click", (event) => {
            console.log(event.target.id)
            event.target.style['background-color'] = 'black';
            event.target.style['color'] = 'white';
            event.target.style.cursor = 'auto';
            runJob(parseInt(event.target.id));
        });
        count += 1;
    }
}

function shellHandler(input) {
    runJob(input);
}

function usernameEntry() {
    let username = getCookie('username')
    if(username) {
        updateUsername(username);
        jobExit();
        return;
    }

    updateUsername('')
    consoleLog('Enter a username or press "Enter". The username used for keeping track of scores on the games.', animate=true, animateSpeed=1)
    updatePrompt('Enter a username, and press "Enter"');
}

function usernameHandler(input) {
    if(input == 'back' || input == 'exit') {
        jobExit();
        return;
    }
    updateUsername(input);
    document.cookie = "username=" + input;
    jobExit();
}

function aboutmeEntry() {
    consoleLog("This is about me!");
    updatePrompt('To go back, type "exit"')
}

function aboutmeHandler(input) {
    if(handleGenericInput(input)) {
        jobExit();
        return;
    } else {
        updatePrompt('Invalid input. To go back, type "exit"')
    }
}

function wordStreakEntry() {
    console.log("In word streak;");
    wordStreakHandleEntry();
}

function wordStreakInput(input) {
    if(handleGenericInput(input)) {
        jobExit();
        return;
    }
    wordStreakHandleInput(input);
}

function projectsEntry() {
    window.open('https://cims.nyu.edu/~aaw7943/graphics/', '_blank');
    jobExit();
}

function fullscreenEntry() {
    const elem = document.documentElement;
    elem.requestFullscreen();
    jobExit();
    return; 
}

let alreadyAscii = false;

const fileSelector = $("#file-selector")[0];
fileSelector.addEventListener('change', (event) => {
    file = event.target.files[0];
    const img = $("#input-image")[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        img.onload = function() {
            displayAscii(this)
        }
        img.src = event.target.result;
    });
    reader.readAsDataURL(file);
})

function asciiEntry() {
    consoleLog('');
    updatePrompt("Press enter to choose file to ascii-fy");
}

function displayAscii(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

    const ctx = canvas.getContext('2d', willReadFrequently=true);
    console.log(canvas.height, canvas.width);
    let buildStr = ""

    const range = ['&nbsp;', '.', ':', '-', '=', '+','*', '#', '%', '@']
    for(let y = 0; y < canvas.height; y++) {
        for(let x = 0; x < canvas.width; x++) {
            const imgData = ctx.getImageData(x, y, 1, 1).data;
            let weight = imgData[0]+imgData[1]+imgData[2];
            weight /= (255*3);
            weight *= (range.length-2);
            weight = Math.floor(weight);
            buildStr += range[weight] + " ";
        }
        buildStr += "<br>"
    }
    const el = $("#main")[0];
    oldFont = window.getComputedStyle(el, null).getPropertyValue('font-size');
    const height = window.innerHeight * 0.8;
    const fontSize = height / canvas.height < 1 ? 1 : height / canvas.height;
    el.style.fontSize = fontSize + "px";
    console.log(height, canvas.height, canvas.width);
    consoleLog(buildStr, animate=false);
}

function asciiInput(input) {
    if(alreadyAscii) {
        alreadyAscii = false;
        const el = document.getElementById('main');
        el.style.fontSize = oldFont;
        jobExit();
        return;
    }
    fileSelector.click();
    alreadyAscii = true;
    updatePrompt("Press any key to exit")
}

