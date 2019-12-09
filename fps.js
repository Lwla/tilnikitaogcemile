// 4 på stribe
let canvas = document.getElementById("fpscanvas").getContext('2d');
let gameBoard = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
];
let player1 = 1;
let player2 = 2;
let currentPlayer = player1;
let currentP = document.getElementById("aktivSpiller");
let x = 35;
let y = 30;
let d = 24;

function drawBoard() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < gameBoard.length; col++) {
            canvas.beginPath();
            canvas.arc(x, y, d, 0, Math.PI * 2);
            canvas.strokeStyle = '#6D6D6D';
            canvas.stroke();
            canvas.fillStyle = '#e2e2e2';
            canvas.fill();
            x = x + 74;
            canvas.moveTo(x, y);
        }
        y = y + 60;
        x = 35;
        canvas.moveTo(x, y);
    }
}
drawBoard();


/**
 * TEGN BRIK
 */
function drawPiece() {
    for (i = 0; i < gameBoard.length; i++) {
        for (j = 0; j < gameBoard[i].length; j++) {
            if (gameBoard[i][j] == 1) {
                canvas.beginPath();
                canvas.arc((35 + ((i) * 74)), (30 + ((5 - j) * 60)), d, 0, Math.PI * 2);
                canvas.strokeStyle = '#944a0f';
                canvas.stroke();
                canvas.fillStyle = '#ff861a';
                canvas.fill()
            }
            else if (gameBoard[i][j] == 2) {
                canvas.beginPath();
                canvas.arc((35 + ((i) * 74)), (30 + ((5 - j) * 60)), d, 0, Math.PI * 2);
                canvas.strokeStyle = '#3c807f';
                canvas.stroke();
                canvas.fillStyle = '#60d3d2';
                canvas.fill()
            }
        }
    }
}
//Funktion til at skifte spiller:
function setCurrentPlayer () {
    if (currentPlayer == player1) {
        currentPlayer = player2;
        currentP.innerHTML = "Aktiv spiller 2";
    }
    else {
        currentPlayer = player1;
        currentP.innerHTML = "Aktiv spiller 1";
    }
}


//Tjek vinder vandret:
function checkWinHor () {
    for (i = 1; i <= 2; i++) {
        for (col = 0; col <= 3; col++) {
            for (row = 0; row < 6; row++) {
                if (gameBoard[col][row] == i) {
                    if ((gameBoard[col + 1][row] == i) && (gameBoard[col + 2][row] == i) && (gameBoard[col + 3][row] == i)) {
                        alert("Player " + i + " har vundet!");
                        return;
                    }
                }
            }
        }
    }
}

//Tjek vinder lodret:
function checkWinVer (){
    for (i = 1; i<=2; i++) {
        for (row = 0; row <= 2; row++) {
            for (col = 0; col < 7; col++) {
                if (gameBoard[col][row] == i){
                    if ((gameBoard[col][row + 1] == i) && (gameBoard[col][row + 2] == i) && (gameBoard[col][row + 3] == i)) {
                        alert("Player " + i + " har vundet!");
                        return;
                    }
                }
            }
        }
    }
}

//Tjek vinder diagonalt op:
function checkWinDiaUp() {
    for (i = 1; i <= 2; i++) {
        for (row = 3; row<=5; row++){
            for (col = 0; col < gameBoard.length; col++) {
                if (gameBoard[col][row] == i) {
                    if ((gameBoard[col + 1][row - 1] == i) && (gameBoard[col + 2][row - 2] == i) &&(gameBoard[col + 3][row - 3] == i)) {
                        alert("Player " + i + " har vundet!");
                        return;
                    }
                }
            }
        }
    }
}

//Tjek vinder diagonalt ned:
function checkWinDiaDown() {
    for (i = 1; i <= 2; i++) {
        for (row = 0; row<=3; row++){
            for (col = 0; col<=6; col++) {
                if (gameBoard[col][row] == i) {
                    if ((gameBoard[col + 1][row + 1] == i) && (gameBoard[col + 2][row + 2] == i) &&(gameBoard[col + 3][row + 3] == i)) {
                        alert("Player " + i + " har vundet!");
                        return;
                    }
                }
            }
        }
    }
}

//Start nyt spil (rydder pladen og aktiv spiller).
function startSpil() {
    for (i = 0; i < gameBoard.length; i++){
        for (j = 0; j < gameBoard[i].length; j++) {
            gameBoard [i][j] = 0};
    };
    currentPlayer = player1;
    currentP.innerHTML = "Aktiv spiller 1";
    x = 35;
    y = 30;
    drawBoard();
};

/**
 * dfsdfsd
 *
 * @param column kolonne hvor der skal droppes en brik
 */
function setPiece(column) {
    for (i = 0; i < gameBoard.length; i++) {
        for (j = 0; j < gameBoard[i].length; j++) {
            if (gameBoard[column][j] == 0) {
                gameBoard[column][j] = currentPlayer;
                break;
            };
        };
        break;
    };
    drawPiece(i, j);
    setTimeout(function () {
        checkWinHor ();
        checkWinVer ();
        checkWinDiaUp();
        checkWinDiaDown();
    }, 0);
    setCurrentPlayer();

}