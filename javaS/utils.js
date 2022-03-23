'use strict'

function createMat() {}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[i].length; j++) {
            var currCell = board[i][j];
            var type = (currCell.type === SKY) ? ' sky' : ' earth';
            var gameElement = (!currCell.gameObject) ? ' ' : currCell.gameObject;
            var className = `cell ${type} cell-${i}-${j}`;
            strHTML += `<td class="${className}">
            ${gameElement}</td>`;
        }
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}