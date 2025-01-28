import './style.css'
import { Player } from './battleship-app'
import { createGrid, renderGameboard, declareWinner } from './battleship-DOM'

const player1 = new Player()
const player2 = new Player()
let currentTarget = player2
let twoPlayerMode = false

/*
player1.gameboard.place([
    [1, 1],
    [1, 2],
])
player1.gameboard.place([
    [3, 4],
    [4, 4],
    [5, 4],
])

player2.gameboard.place([
    [5, 5],
    [6, 5],
    [7, 5],
])

player2.gameboard.place([
    [3, 7],
    [3, 8],
])
    */

player2.gameboard.place([[1, 1]])

const firstBoard = document.querySelector('.left-board')
const secondBoard = document.querySelector('.right-board')

function startGame() {
    createGrid(firstBoard)
    createGrid(secondBoard)
    const allTiles = document.querySelectorAll('.tile')
    allTiles.forEach((tile) => {
        tile.addEventListener('click', () => {
            const coord = tile.getAttribute('id')
            tile.classList.add('clicked')
            currentTarget.gameboard.receiveAttack(coord)
            if (checkWinCondition()) {
                handleGameEnd()
            } else if (!twoPlayerMode) {
                computerTurn()
            } else {
                switchPlayers()
            }
            renderGameboard(player1, player2)
        })
    })
}

function computerTurn() {
    const randomRow = getRandomInt()
    const randomCol = getRandomInt()
    console.log([randomRow, randomCol])
    if (
        player1.gameboard.board[randomRow][randomCol].occupied != 'missedShot'
    ) {
        const tile = document.getElementById('' + randomRow + randomCol)
        tile.classList.add('clicked')
        player1.gameboard.receiveAttack([randomRow, randomCol])
    } else {
        computerTurn()
    }
}

function getRandomInt() {
    return Math.floor(Math.random() * 10)
}

function switchPlayers() {
    if (currentTarget === player1) {
        currentTarget = player2
    } else {
        currentTarget = player1
    }
}

function checkWinCondition() {
    return currentTarget.gameboard.allShipsSunk()
}

function handleGameEnd() {
    if (currentTarget === player1) {
        declareWinner('player2')
    } else if (currentTarget === player2) {
        declareWinner('player1')
    }
}

startGame()
