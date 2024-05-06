

function getById(id) {
    return document.getElementById(id);
}

function populateMatrices() {
    const numMatrices = getById('nummatrices').value;
    let nm = parseInt(numMatrices);
    const matrixDiv = getById('matrices');
    console.log(nm);
    if(nm < matrixDiv.childElementCount) {
        for(i = matrixDiv.childElementCount; i >= nm; i--) {
            const r = getById("matrix"+i);
            matrixDiv.removeChild(r)
        }
    }
    for(let i = matrixDiv.childElementCount+1; i <= nm; i++) {
        const newMatrixDiv = document.createElement('div');
        newMatrixDiv.id = "matrix" + i;
        newMatrixDiv.style.display = "grid";
        newMatrixDiv.style.float = "left";
        newMatrixDiv.style.margin = "10px";
        newMatrixDiv.style.width = "100px";
        for(let r = 1; r < 4; r++) {
            for(let c = 1; c < 4; c++) {
                const newMatrixEntry = document.createElement('div');
                newMatrixEntry.id = "matrixEntry" + r + "" + c;
                newMatrixEntry.style.backgroundColor = "rgb(" + 255/(r*c) + ",155,155)";
                newMatrixEntry.style.gridRow = r+"/3"
                newMatrixEntry.style.gridColumn = c+"/3"
                newMatrixDiv.appendChild(newMatrixEntry);
                const inp = document.createElement('input');
                inp.style.width = "30px";
                newMatrixDiv.appendChild(inp);
            }
        }
        matrixDiv.appendChild(newMatrixDiv);
        const numRows = document.createElement('input');
        numRows.id = "matrix"+i+"rows";
        const numCols = document.createElement('input');
        numCols.id = "matrix"+i+"cols";
        x.innerHTML = 'x';
        numCols.style.marginTop = "10px";
        numRows.style.marginTop = "10px";
        numCols.style.width = "30px";
        numRows.style.width = "30px";
        numCols.value = "3";
        numRows.value = "3";
        newMatrixDiv.appendChild(numRows);
        newMatrixDiv.appendChild(numCols);
    }
}
