let showingCursor = false;

function typeLetter(letter, query) {
    const inputObj = $(query);
    inputObj.text(inputObj.text() + letter)
}

function backspace(query) {
    const inputObj = $(query);
    inputObj.text(inputObj.text().slice(0, -1));
}

function consoleLog(text, cb=null, animate=true, animateSpeed=25) {
    console.log("HErE")
    if(!animate) {
        console.log("don't animate")
        $('#main').html(text);
        return;
    }
    let buildStr = "";
    let i = 0;
    const time = setInterval(() => {
        buildStr = text.slice(0, i);
        if(i >= text.length + animateSpeed + 1) {
            $('#main').html(buildStr);
            clearTimeout(time);
            if(cb) {
                cb();
            }
            return;
        }
        $('#main').html(buildStr);
        i += animateSpeed;
    }, .1);
}

setInterval(() => {
    if(showingCursor) {
        backspace('#cursor');
        showingCursor = false;
    } else {
        typeLetter('_', '#cursor');
        showingCursor = true;
    }
}, 700);

let block = false;
input.addEventListener('compositionstart', function() { block = true; });
input.addEventListener('compositionend', function() { block = false; });

document.addEventListener("keydown", (event) => {
    if(event.key == 'Control') {
        block = true;
    }
    if(block) {
        return;
    }
    if(event.key == 'Backspace') {
        backspace('#input');
    } else if(event.key == 'Enter') {
        const inputObj = $('#input');
        handleInput(inputObj.text());
        inputObj.text('')
    } else if(event.key.length == 1) {
        typeLetter(event.key, '#input');
    }
});

document.addEventListener("keyup", (event) => {
    if(event.key == 'Control') {
        block = false;
        return;
    }
})



