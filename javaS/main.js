'use strict'

const BOARD_SIZE = 14;


const SKY = 'SKY';
const EARTH = 'EARTH';

var gLaser = '🎆';
var gBoard;
var gGame;
var gLaserPos;
var gAliensIntervalId;
var gLaserIntervalId;
var gScore = 0;
var gSuperCount;
var gBombCount;


function init() {

    gGame = {
        isOn: false,
        aliensCount: ALIENS_ROW_COUNT * ALIENS_ROW_LENGTH
    }

    gBoard = createBoard(BOARD_SIZE);

    gSuperCount = ['🦸🏽‍♂️', '🦸🏽‍♂️', '🦸🏽‍♂️'];
    gBombCount = ['💥', '💥', '💥'];
    gAlienMovement = {
        direction: 'right',
        aliensFirstCol: 1,
        aliensFirstRow: 0
    };

    var elStart = document.querySelector('h1');
    elStart.style.animation = 'animate 1.5s linear infinite';


    renderBoard(gBoard);
}

function startGame() {
    if (gGame.isOn) return;
    gLaserPos = {
        i: gHero.pos.i - 1,
        j: gHero.pos.j
    }
    renderScore()
    renderBoostsCount();

    gGame.isOn = true;

    var elStart = document.querySelector('h1');
    elStart.style.animation = 'none';

    gAliensIntervalId = setInterval(moveAliensHorizontal, 1000);
}


function createBoard(size) {
    var board = [];
    for (var i = 0; i < size; i++) {
        board[i] = [];
        for (var j = 0; j < size; j++) {
            board[i][j] = createCell();
            if (i === size - 1) board[i][j].type = EARTH;
        }
    }
    createHero(board);
    gAliens = createAliens(board);
    return board;
}

function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}

function updateCell(pos, gameObject = null) {
    gBoard[pos.i][pos.j].gameObject = gameObject;
    var elCell = getElCell(pos);
    elCell.innerHTML = gameObject || ' ';
}

function handleKey(ev) {
    var j = gHero.pos.j;
    // console.log(ev);
    if (!gGame.isOn) return;
    if (isVictory()) return;


    switch (ev.code) {
        //Hero movement
        case 'ArrowLeft':
            moveHero(j - 1);
            break;
        case 'ArrowRight':
            moveHero(j + 1);
            break;
            //Laser Keys
        case 'Space':
            if (gHero.isShoot) return;
            if (gHero.isSuper) {
                gHero.isSuper = false;
                gLaserIntervalId = setInterval(shootLaser, 20);
            } else {
                gLaser = '🎆';
                gLaserIntervalId = setInterval(shootLaser, 80);
            }
            break;
        case 'KeyX':
            if (gSuperCount.length > 0 && !gHero.isShoot && !gHero.isSuper) {
                superMode();
                gSuperCount.pop();
                renderBoostsCount();
            }
            break;
        case 'KeyN':
            if (gBombCount.length > 0 && !gHero.isShoot && !gHero.isSuper) {
                gLaser = '✨';
                gHero.isBomb = true;
                gLaserIntervalId = setInterval(shootLaser, 80);
                gBombCount.pop();
                renderBoostsCount();
            }
            break;
        default:
            break;
    }
}

function getElCell(pos) {
    return document.querySelector(`.cell-${pos.i}-${pos.j}`);
}

function gameOver(strHTML) {
    if (gGame.isOn) return false;
    clearInterval(gAliensIntervalId);
    clearInterval(gLaserIntervalId);

    var elGameOver = document.querySelector('.game-over');
    elGameOver.innerHTML = strHTML + ' ' + elGameOver.innerHTML;
    elGameOver.style.display = 'block';

    return true;
}

function shootLaser() {
    gHero.isShoot = true;


    updateCell(gLaserPos);
    gLaserPos.i--;

    if (gLaserPos.i < 0) {
        gHero.isShoot = false;

        gLaserPos.i = gHero.pos.i - 1;
        clearInterval(gLaserIntervalId);
        gLaserPos.j = gHero.pos.j;
        gHero.isBomb = false;
        return;
    }
    var nextCell = gBoard[gLaserPos.i][gLaserPos.j];
    if (nextCell.gameObject === ALIEN) {
        gHero.isShoot = false;

        renderScore();

        clearInterval(gLaserIntervalId);
        if (gHero.isBomb) blowUpNegs(gLaserPos);
        else removeAlien(gLaserPos);

        gLaserPos.i = gHero.pos.i - 1;
        gLaserPos.j = gHero.pos.j;
    } else updateCell(gLaserPos, gLaser);
}

function isVictory() {
    var deadAliensCount = 0;
    for (var i = 0; i < gAliens.length; i++) {
        for (var j = 0; j < gAliens[i].length; j++) {
            if (gAliens[i][j].value === ALIEN_DEAD) deadAliensCount++;
        }
    }
    console.log(deadAliensCount, gGame.aliensCount)
    if (gGame.aliensCount <= deadAliensCount) {
        gGame.isOn = false;
        gameOver('Victory!');
        return true;
    }
    return false;
}

function renderScore() {
    var elScore = document.querySelector('.score');
    elScore.innerText = 'Score: ' + gScore;
}

function resetGame() {
    gGame.isOn = false;
    var elGameOver = document.querySelector('.game-over');
    elGameOver.style.display = 'none';
    gScore = 0;
    init();
}

function renderBoostsCount() {
    var elBomb = document.querySelector('.bomb');
    elBomb.innerText = gBombCount.join('');

    var elSuper = document.querySelector('.super');
    elSuper.innerText = gSuperCount.join('');
}

function blowUpNegs(pos) {
    for (var i = pos.i - 1; i <= pos.j + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue;
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (j < 0 || j > gBoard[i].length - 1) continue;
            removeAlien({ i: i, j: j });
        }
    }
    gHero.isBomb = false;
}