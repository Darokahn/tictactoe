function switchTo(square, type) {
    if (!(type === 'x' || type === 'o' || type === 'n')) {
        console.log("argument must be either \"x\" \"o\" or \"n\"")
        return;
    }
    square.classList.remove("x");
    square.classList.remove("o");
    square.classList.remove("n");
    square.classList.add(type);
    square.innerHTML = type;

}

function switchTurn() {
    if (turnTracker === 'x') {
        turnTracker = 'o';
    }
    else {
        turnTracker = 'x';
    }
}

function doTurn(event) {
    let button = event.srcElement;
    switchTo(button, turnTracker);
    button.disabled = true;

    let condition = getCondition();

    console.log(condition);

    switchTurn();

    if (condition === 'x' || condition === 'o' || condition === 'tie') {
        let buttons = document.querySelectorAll('.square');
        Array.from(buttons).forEach(function(button) {button.disabled = true;})
        if (condition != 'tie') outputText.innerHTML = `${condition.toUpperCase()} wins!`;
        else outputText.innerHTML = 'Tie!';
    }

    else outputText.innerHTML = `It's your turn, ${turnTracker.toUpperCase()}!`;

}


function compileLines() {
    let gridobj = document.getElementById("grid");
    let squares = Array.from(gridobj.children);
    let rowcount = 3;
    let colcount = 3;

    let grid = [];

    for (let i = 0; i < rowcount; i++) {
        let startSlice = colcount * i;
        grid.push(squares.slice(startSlice, startSlice+3));
    }

    function bruteForce(grid) {
        row1 = grid[0];
        row2 = grid[1];
        row3 = grid[2];
        col1 = [grid[0][0], grid[1][0], grid[2][0]];
        col2 = [grid[0][1], grid[1][1], grid[2][1]];
        col3 = [grid[0][2], grid[1][2], grid[2][2]];
        diag1 = [grid[0][0], grid[1][1], grid[2][2]];
        diag2 = [grid[0][2], grid[1][1], grid[2][0]];

        return [row1, row2, row3, col1, col2, col3, diag1, diag2];
    }

    return bruteForce(grid);
}

function getCondition() {
    let lines = compileLines();
    var fullRows = 0;
    for (var i = 0; i < lines.length; i++) {
        let line = lines[i];
        var x = 0;
        var o = 0;
        for (let i = 0; i < 3; i++) {
            let item = line[i];
            if (Array.from(item.classList).includes('x')) x++;
            else if (Array.from(item.classList).includes('o')) o++;
        }
        console.log(`x: ${x}, o: ${o}`);
        if (x === 3) 
            return 'x'
        else if (o === 3) 
            return 'o';
        else if (x + o === 3) 
            fullRows ++;
    }
    console.log(fullRows);
    if (fullRows === 8) 
        return 'tie';
    return 'continue';
}

var outputText = document.getElementById("output-text");

var turnTracker = 'x';
let buttons = document.getElementsByClassName('square');
for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    button.onclick = doTurn;
}
