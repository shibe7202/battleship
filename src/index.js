import './style.css'
import { Gameboard, Player } from './battleship-app'
import { createGrid, renderGameboard, declareWinner } from './battleship-DOM'

let player1 = new Player()
let player2 = new Player()
let currentTarget = player2
let twoPlayerMode = false

const firstBoard = document.querySelector('.left-board')
const secondBoard = document.querySelector('.right-board')

function startGame() {
    createGrid(firstBoard, 'player1')
    createGrid(secondBoard, 'player2')
    const allTiles = document.querySelectorAll('.tile')
    allTiles.forEach((tile) => {
        tile.addEventListener('click', () => {
            if (tile.classList.contains('player1')) {
                return
            }
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

const placeButton = document.querySelector('.place-button')
placeButton.addEventListener('click', () => {
    createPlacements(player1)
    createPlacements(player2)
    renderGameboard(player1, player2)
})

function createPlacements(player) {
    player.gameboard = new Gameboard()
    for (let i = 0; i < 2; i++) {
        placeShipHorizontally(player)
    }
    for (let i = 0; i < 2; i++) {
        placeShipVertically(player)
    }
}

function placeShipHorizontally(player) {
    let coord1 = [getRandomInt(), getRandomInt()]
    let coord2
    let coord3
    if (coord1[1] + 1 < 10) {
        coord2 = [coord1[0], coord1[1] + 1]
        if (coord2[1] + 1 < 10) {
            coord3 = [coord1[0], coord2[1] + 1]
        } else {
            coord3 = [coord1[0], coord1[1] - 1]
        }
    } else {
        coord2 = [coord1[0], coord1[1] - 1]
        coord3 = [coord1[0], coord2[1] - 1]
    }
    if (
        player.gameboard.board[coord1[0]][coord1[1]].occupied ||
        player.gameboard.board[coord2[0]][coord2[1]].occupied ||
        player.gameboard.board[coord3[0]][coord3[1]].occupied
    ) {
        placeShipHorizontally(player)
    } else {
        player.gameboard.place([coord1, coord2, coord3])
    }
}

function placeShipVertically(player) {
    let coord1 = [getRandomInt(), getRandomInt()]
    let coord2
    let coord3
    if (coord1[0] + 1 < 10) {
        coord2 = [coord1[0] + 1, coord1[1]]
        if (coord2[0] + 1 < 10) {
            coord3 = [coord2[0] + 1, coord1[1]]
        } else {
            coord3 = [coord1[0] - 1, coord1[1]]
        }
    } else {
        coord2 = [coord1[0] - 1, coord1[1]]
        coord3 = [coord2[0] - 1, coord1[1]]
    }
    if (
        player.gameboard.board[coord1[0]][coord1[1]].occupied ||
        player.gameboard.board[coord2[0]][coord2[1]].occupied ||
        player.gameboard.board[coord3[0]][coord3[1]].occupied
    ) {
        placeShipVertically(player)
    } else {
        player.gameboard.place([coord1, coord2, coord3])
    }
}

function computerTurn() {
    const randomRow = getRandomInt()
    const randomCol = getRandomInt()
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
