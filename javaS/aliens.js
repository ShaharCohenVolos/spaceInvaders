'use strict'

const ALIENS_ROW_LENGTH = 8;
const ALIENS_ROW_COUNT = 3;

const ALIEN = '🐔';

var gAliens;
var gDirection = 'right';
var gAliensFirstCol = 1;
var gAlienMovement;


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
    var drctnVal = (gAlienMovement.direction === 'right') ? 1 : -1;
    for (var i = 0; i < gAliens.length; i++) {
        for (var j = 0; j < gAliens[i].length; j++) {
            if (gAliens[i][j].pos.j === gAlienMovement.aliensFirstCol) updateCell(gAliens[i][j].pos);

            gAliens[i][j].pos.j += drctnVal;
            updateCell(gAliens[i][j].pos, gAliens[i][j].value);
        }
    }
    gAlienMovement.aliensFirstCol += drctnVal;
    if (isEdge()) changeDirection();
}

function changeDirection() {
    if (gAlienMovement.direction === 'right') {
        gAlienMovement.direction = 'left';
        gAlienMovement.aliensFirstCol = gBoard.length - 1;
        MoveAliensDown();
        gAlienMovement.aliensFirstRow++;
    } else {
        gAlienMovement.direction = 'right';
        gAlienMovement.aliensFirstCol = 0;
        MoveAliensDown();
        gAlienMovement.aliensFirstRow++;
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
            if (gAliens[i][j].pos.i === gAlienMovement.aliensFirstRow) updateCell(gAliens[i][j].pos);

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