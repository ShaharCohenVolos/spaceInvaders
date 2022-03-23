'use strict'

const HERO = '🐱‍👓';



var gHero = {
    pos: { i: 12, j: 6 },
    isShoot: false,
    isSuper: false
}

function createHero(board) {
    board[gHero.pos.i][gHero.pos.j].gameObject = HERO;
}

function moveHero(nextJ) {
    if (nextJ < 0 || nextJ >= gBoard.length) return;
    if (gameOver()) return;

    updateCell(gHero.pos);

    gHero.pos.j = nextJ;
    updateCell(gHero.pos, HERO);
    if (!gHero.isShoot) gLaserPos.j = gHero.pos.j;
}

function superMode() {
    gLaser = '🎇';
    gHero.isSuper = true;
}