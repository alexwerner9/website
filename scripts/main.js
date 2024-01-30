
// ideas:
// spotify listener (what i'm listening to)
// spotify add to playlist
// view the code
// ascii art / color codes
// sunset with background colors
// display the source code
const jobs = {
    shell: {
        inputHandler: shellHandler,
        entryPoint: shellEntry,
        internal: true,
        rel: true
    },
    aboutme: {
        entryPoint: aboutmeEntry,
        inputHandler: aboutmeHandler,
        rel: true
    },
    wordstreak: {
        entryPoint: wordStreakEntry,
        inputHandler: wordStreakInput,
        rel: true
    },
    ascii: {
        entryPoint: asciiEntry,
        inputHandler: asciiInput,
        rel: true
    },
    projects: {
        entryPoint: projectsEntry,
        rel: false
    },
    login: {
        entryPoint: usernameEntry,
        inputHandler: usernameHandler,
        rel: true
    }
}

let aliases = {
    'ws': 'wordstreak',
    '1': 'aboutme',
    '2': 'wordstreak',
    '3': 'ascii',
    '4': 'projects',
    '5': 'login'
}

const welcome = "\
 _   _   ___   _      ___   __    __ __   ___ <br>\
| | | | | __| | |    / _/  /__\\  |  |  | | __|<br>\
|  |  | | _|  | |_  | \\__ | \\/ | | \\_/ | | _| <br>\
!_/ \\_! |___| |___|  \\__/  \\__/  |_| |_| |___|<br><br>\
".replaceAll(' ', '&nbsp;')

// start up the correct page
let currentPage = location.href;
let cp = currentPage.split('/');
currentJob = cp[cp.length-2];
if(!['shell', 'wordstreak', 'ascii', 'aboutme', 'login'].includes(currentJob)) {
    currentJob = 'shell'
}
let u = getCookie('username');
updateUsername(u);
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

function relocate(job, justRun=false) {
    if(aliases[job]) {
        job = aliases[job];
    }
    if(!jobs[job]) {
        updatePrompt("Not a valid command. Enter a command")
        return;
    }
    if(!jobs[job].rel || justRun) {
        runJob(job);
        return;
    }
    window.history.pushState(null, null, '../'+job)
    window.location.replace('../'+job);
}

function runJob(job) {
    currentJob = job;
    jobs[currentJob].entryPoint();
}

function jobExit(rel=true) {
    if(!rel) {
        relocate('shell', justRun=true);
        return;
    }
    relocate('shell');
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
        commandStr += `<span style="${green}">` + count + `.${close} <span id=command${count}>` + prop + `${close}<br>`;
        count += 1;
    }
    let helpStr = welcome + `Welcome to my (terminal) website, where no terminal emulation libraries are allowed. In fact, no Xterm, React, Angular, Vue, Bootstrap, Lodash, etc. Just pure, vanilla JavaScript ... unless you're an employer, in which case I used all of the above (and if you're a lawyer, I didn't actually) :) I will admit I used a bit of jQuery, but does that count?<br><br> Here you can play games, look at projects \
                   I've done, or learn about me. At any time you may type \"exit\" to go back to this \
                   screen or just use the back button. \
                   Other possible commands are: <br><br> ${commandStr} <br> \
                   To run these commands, type them in and press 'Enter'.`
    consoleLog(helpStr, cb=registerShellClasses);
    updatePrompt('Enter a command');

}

function registerShellClasses() {
    let count = 1;
    for(const prop in jobs) {
        if(jobs[prop].internal) {
            continue;
        }
        $("#command"+count)[0].addEventListener("mouseover", (event) => {
            event.target.style['background-color'] = 'white';
            event.target.style['color'] = 'black';
            event.target.style.cursor = 'pointer'
        });
        $("#command"+count)[0].addEventListener("mouseout", (event) => {
            event.target.style['background-color'] = 'black';
            event.target.style['color'] = 'white';
            event.target.style.cursor = 'auto'
        });
        $("#command"+count)[0].addEventListener("click", (event) => {
            event.target.style['background-color'] = 'black';
            event.target.style['color'] = 'white';
            event.target.style.cursor = 'auto';
            relocate(event.target.id[event.target.id.length - 1]);
        });
        count += 1;
    }
}

function shellHandler(input) {
    relocate(input);
}

function usernameEntry() {
    let username = getCookie('username')
    if(username) {
        document.cookie = "username= ; path=/"
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
    document.cookie = "username=" + input + "; path=/";
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
    jobExit(rel=false);
}

function fullscreenEntry() {
    const elem = document.documentElement;
    elem.requestFullscreen();
    jobExit(rel=false);
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

