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
    logout: {
        entryPoint: () => { document.cookie = 'username='; jobExit(); runJob('requestUsername'); return; }
    }
}

let aliases = {
    'ws': 'wordstreak'
}
let currentJob = 'requestUsername';
runJob(currentJob);

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
}

function updateUsername(text) {
    if(text) {
        $('#user').html(`(${text}) `);
    } else {
        $('#user').html("");
    }
}

function consoleLog(text) {
    $('#main').html(text)
}

function handleInput(input) {
    jobs[currentJob].inputHandler(input);
}

function runJob(job) {
    if(!jobs[job]) {
        updatePrompt("Not a valid command. Enter a command")
        return;
    }
    currentJob = job;
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
        commandStr += `<span style="${green}">` + count + `.${close} ` + prop + `<br>`;
        count += 1;
    }
    let helpStr = `Welcome to my (terminal) website, where no terminal emulation libraries are allowed. No Xterm, no React, just pure, vanilla JavaScript ... unless a React app would be more impressive. In which case I did use React (I didn't). <br><br> Here you can play games, look at projects \
                   I've done, or learn about me. At any time you may type \"exit\" to go back to this \
                   screen. If there is not a text interface, there will be a back button to return here, or a new tab will open. \
                   Other possible commands are: <br><br> ${commandStr} <br> \
                   To run these commands, type them in and press 'Enter'.`
    consoleLog(helpStr);
    console.log("Good update");
    updatePrompt('Enter a command');
}

function shellHandler(input) {
    if(aliases[input]) {
        runJob(aliases[input]);
    } else {
        runJob(input);
    }
}

function usernameEntry() {
    let username = getCookie('username')
    if(username) {
        updateUsername(username);
        jobExit();
        return;
    }
    updateUsername('')
    consoleLog('Please enter a username, or leave it blank. This is used for keeping track of scores on the games.')
    updatePrompt('Enter a username, and press "Enter"');
}

function usernameHandler(input) {
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

