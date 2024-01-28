let showingCursor = false;

function typeLetter(letter, query) {
    const inputObj = $(query);
    inputObj.text(inputObj.text() + letter)
}

function backspace(query) {
    const inputObj = $(query);
    inputObj.text(inputObj.text().slice(0, -1));
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

document.addEventListener("keydown", (event) => {
    if(event.isComposing) {
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
})



