'use strict'

const ALIENS_ROW_LENGTH = 8;
const ALIENS_ROW_COUNT = 3;

const ALIEN = '🐔';

var gAliens;
var gDirection = 'right';
var gAliensFirstCol = 1;
var gMovement = {
    direction: 'right',
    aliensFirstCol: 1,
    aliensFirstRow: 0
}


function createAliens(board) {
    var aliens = [];
    for (var i = 0; i < board.length; i++) {
        if (i >= 0 && i < ALIENS_ROW_COUNT) aliens[i] = [];
        else continue;
        for (var j = 0; j < board[i].length; j++) {
            if (j > 0 && j <= ALIENS_ROW_LENGTH) {
                board[i][j].gameObject = ALIEN;
                aliens[i].push({ pos: { i: i, j: j }, value: ALIEN });
            } else continue;
        }
    }
    return aliens;
}


function moveAliensHorizontal() {
    var drctnVal = (gMovement.direction === 'right') ? 1 : -1;
    for (var i = 0; i < gAliens.length; i++) {
        for (var j = 0; j < gAliens[i].length; j++) {
            if (gAliens[i][j].pos.j === gMovement.aliensFirstCol) updateCell(gAliens[i][j].pos);

            gAliens[i][j].pos.j += drctnVal;
            updateCell(gAliens[i][j].pos, gAliens[i][j].value);
        }
    }
    gMovement.aliensFirstCol += drctnVal;
    if (isEdge()) changeDirection();
}

function changeDirection() {
    if (gMovement.direction === 'right') {
        gMovement.direction = 'left';
        gMovement.aliensFirstCol = gBoard.length - 1;
        MoveAliensDown();
        gMovement.aliensFirstRow++;
    } else {
        gMovement.direction = 'right';
        gMovement.aliensFirstCol = 0;
        MoveAliensDown();
        gMovement.aliensFirstRow++;
    }
}

function isEdge() {
    var edgeAliens = 0;
    for (var i = 0; i < gAliens.length; i++) {
        for (var j = 0; j < gAliens[i].length; j++) {
            if (gAliens[i][j].pos.j === 0 || gAliens[i][j].pos.j === gBoard.length - 1) edgeAliens++;
            if (gAliens[i][j].pos.i === gHero.pos.i) {
                gGame.isOn = false;
                return gameOver('Game Over');
            }
        }
    }
    if (edgeAliens > 0) return true;
    return false;
}

function MoveAliensDown() {
    for (var i = 0; i < gAliens.length; i++) {
        for (var j = 0; j < gAliens[i].length; j++) {
            if (gAliens[i][j].pos.i === gMovement.aliensFirstRow) updateCell(gAliens[i][j].pos);

            gAliens[i][j].pos.i++;
            updateCell(gAliens[i][j].pos, gAliens[i][j].value);
        }
    }
}

function removeAlien(pos) {
    for (var i = 0; i < gAliens.length; i++) {
        for (var j = 0; j < gAliens[i].length; j++) {
            var alien = gAliens[i][j];
            if (alien.pos.i === pos.i && alien.pos.j === pos.j) {
                alien.value = ' ';
                updateCell(pos);
                gScore++;
                break;
            }
        }
    }
}