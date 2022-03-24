'use strict'

const ALIENS_ROW_LENGTH = 8;
const ALIENS_ROW_COUNT = 3;

const ALIEN = '🐔';

function createAliens(board) {
    for (var i = 0; i < ALIENS_ROW_COUNT; i++) {
        for (var j = 0; j < ALIENS_ROW_LENGTH; j++) {
            board[i][j].gameObject = ALIEN;
        }
    }
}

function shiftBoardRight(board, fromJ, toJ) {
    for (var i = 0; i < ALIENS_ROW_COUNT; i++) {
        for (var j = 0; j < ALIENS_ROW_LENGTH; j++) {
            board[i][fromJ].gameObject = null;
            board[i][toJ].gameObject = ALIEN;
        }
    }
}

function shiftBoardLeft(board, fromJ, toJ) {
    for (var i = 0; i < ALIENS_ROW_COUNT; i++) {
        for (var j = 0; j < ALIENS_ROW_LENGTH; j++) {
            board[i][fromJ].gameObject = null;
            board[i][toJ].gameObject = ALIEN;
        }
    }
}

function shiftBoardDown(board, fromI, toI) {
    for (var i = 0; i < ALIENS_ROW_COUNT; i++) {
        for (var j = 0; j < ALIENS_ROW_LENGTH; j++) {
            board[fromI][j].gameObject = null;
            board[toI][j].gameObject = ALIEN;
        }
    }
}