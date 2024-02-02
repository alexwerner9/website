let pixelArray = []
let pixelsW = 0;
let pixelsH = 0;
let basketballLocation = []
let locations = {
    hoop: {
        type: 'point',
        x: 20,
        y: 20,
        char: '____'
    },
    guide: {
        type: 'line',
        x1: 0,
        y1: 0,
        x2: 50,
        y2: 10,
        char: '.'
    },
    target: {
        type: 'point',
        x: 0,
        y: 0,
        char: '+'
    },
    basketball: {
        type: 'point',
        x: 0,
        y: 0,
        char: "O"
    }
}

function floor(num) {
    return Math.floor(num)
}

function basketballEntry() {
    const mainDiv = $("#main")[0]
    // get the font width (monospace font). use that for how many chars
    // per line of the main div
    const [fontWidth, fontHeight] = getTextWidthHeight('0', getCanvasFont(mainDiv));
    pixelsW = window.innerWidth*.98 / fontWidth
    pixelsH = window.innerHeight*.92 / fontHeight
    locations.target.x = floor(pixelsW/2);
    locations.target.y = floor(pixelsH/2);
    locations.basketball.x = 0
    locations.basketball.y = floor(pixelsH);
    locations.guide.x1 = locations.basketball.x;
    locations.guide.y1 = locations.basketball.y;
    updatePixels();
    consoleLog(pixelArrayToStr(), cb=null, animate=false)
    document.addEventListener('keydown', (event) => basketballkey(event.key));
}

function basketballHandler(input) {
    const gravity = .07;
    const objX1 = locations.guide.x1;
    const objY1 = locations.guide.y1;
    const objX2 = locations.guide.x2;
    const objY2 = locations.guide.y2;
    const rise = floor(objY2 - objY1);
    const run = floor(objX2 - objX1);
    const slope = rise/run;
    let velX = run / 25;
    let velY = rise / 25;
    setInterval(() => {
        velY += gravity;
        locations.basketball.x += floor(velX);
        locations.basketball.y += floor(velY);
        updatePixels();
        consoleLog(pixelArrayToStr(), cb=null, animate=false)
    }, 1000/60)
}

function basketballkey(key) {
    if(key == 'ArrowLeft') {
        locations.target.x -= 1;
        updatePixels();
    } else if(key == 'ArrowRight') {
        locations.target.x += 1;
        updatePixels();
    } else if(key == 'ArrowDown') {
        locations.target.y += 1;
        updatePixels();
    } else if(key == 'ArrowUp') {
        locations.target.y -= 1;
        updatePixels();
    }
    consoleLog(pixelArrayToStr(), cb=null, animate=false)
}

function updatePixels() {
    console.log("update")
    locations.guide.x2 = locations.target.x;
    locations.guide.y2 = locations.target.y;
    const locToCharMap = []
    for(const obj in locations) {
        if(locations[obj].type == 'point') {
            const objX = locations[obj].x;
            const objY = locations[obj].y;
            const objChar = locations[obj].char;
            for(let i = 0; i < objChar.length; i++) {
                locToCharMap.push([objY, objX+i, objChar.charAt(i)])
            }
        } else if(locations[obj].type == 'line') {
            const objX1 = locations[obj].x1;
            const objY1 = locations[obj].y1;
            const objX2 = locations[obj].x2;
            const objY2 = locations[obj].y2;
            const objChar = locations[obj].char;
            const rise = floor(objY2 - objY1);
            const run = floor(objX2 - objX1);
            const slope = rise/run;
            let x = objX1;
            let y = objY1;
            let v1 = y;
            let v2 = objY2;
            if(slope < 0) {
                v1 = objY2;
                v2 = y;
            }
            while(x <= objX2 && v1 <= v2) {
                locToCharMap.push([floor(y), floor(x), objChar])
                y += slope*2;
                x += 1*2;
            }
        }
    }
    pixelArray = []
    for(let y = 0; y < pixelsH; y++) {
        pixelArray.push([])
        for(let x = 0; x < pixelsW; x++) {
            pixelArray[y].push('&nbsp;')
            for(const loc of locToCharMap) {
                if(y == loc[0] && x == loc[1]) {
                    if(pixelArray[y][x] == '_' && loc[2] == 'O') {
                        console.log("HERE");
                        updatePrompt("You win!");
                    }
                    pixelArray[y][x] = loc[2]
                }
            }
        }
    }
}

function pixelArrayToStr() {
    let ret = "";
    for(let y = 0; y < pixelsH; y++) {
        for(let x = 0; x < pixelsW; x++) {
            ret += pixelArray[y][x]
        }
        ret += "<br>"
    }
    return ret;
}

// https://stackoverflow.com/a/21015393
function getTextWidthHeight(text, font) {
    // re-use canvas object for better performance
    const canvas = getTextWidthHeight.canvas || (getTextWidthHeight.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    const txtH = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
    return [metrics.width, txtH];
  }
  
  function getCssStyle(element, prop) {
      return window.getComputedStyle(element, null).getPropertyValue(prop);
  }
  
  function getCanvasFont(el = document.body) {
    const fontWeight = getCssStyle(el, 'font-weight') || 'normal';
    const fontSize = getCssStyle(el, 'font-size') || '16px';
    const fontFamily = getCssStyle(el, 'font-family') || 'Times New Roman';
    
    return `${fontWeight} ${fontSize} ${fontFamily}`;
  }