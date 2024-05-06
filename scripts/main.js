
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
    sourcecode: {
        entryPoint: sourcecodeEntry,
        rel: false
    },
    typingtest: {
        entryPoint: typingtestEntry,
        inputHandler: typingtestHandler,
        rel: true
    },
    basketball: {
        entryPoint: basketballEntry,
        inputHandler: basketballHandler,
        rel: true,
        extraText: '(work in progress)'
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
    '5': 'sourcecode',
    '6': 'typingtest',
    '7': 'basketball',
    '8': 'login'
}

// https://stackoverflow.com/a/11381730
function mobileCheck() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

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
if(!['shell', 'wordstreak', 'ascii', 'aboutme', 'typingtest', 'basketball', 'login'].includes(currentJob)) {
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
        commandStr += `<span style="${green}">` + count + `.${close} <span id=command${count}>` + prop;
        if(Object.hasOwn(jobs[prop], 'extraText')) {
            commandStr += " " + jobs[prop].extraText;
        }
        commandStr += `${close}<br>`
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
    updatePrompt('To go to the home screen, type "exit"')
}

function aboutmeHandler(input) {
    if(handleGenericInput(input)) {
        jobExit();
        return;
    } else {
        updatePrompt('Invalid input. To go to the home screen, type "exit"')
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
    consoleLog('This will create an ascii art version of your favorite photo and print it here! Although, you should probably choose a small image ... Press enter to continue.');
    updatePrompt("Press enter to choose file to ascii-fy");
}

function displayAscii(img) {
    consoleLog('')
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

    const ctx = canvas.getContext('2d', willReadFrequently=true);
    let buildStr = ""

    const iter = Math.ceil(Math.max(img.height, img.width) / 400)

    const range = ['&nbsp;', '.', ':', '-', '=', '+','*', '#', '%', '@']
    for(let y = 0; y < canvas.height; y += iter) {
        for(let x = 0; x < canvas.width; x += iter) {
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
    const fontSize = height / canvas.height * iter < 1 ? 1 : height / canvas.height * iter;
    el.style.fontSize = fontSize + "px";
    consoleLog(buildStr, null, false);
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

function sourcecodeEntry() {
    window.open('https://github.com/alexwerner9/alexwerner9.github.io', '_blank');
    jobExit(rel=false);
}

