function createGrid(grid) {
    grid.innerHTML = ''
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const tile = document.createElement('div')
            tile.classList.add('tile')
            tile.setAttribute('id', i.toString() + j.toString())
            grid.appendChild(tile)
        }
    }
}

function renderGameboard(player1, player2) {
    const player1Tiles = document.querySelectorAll('.left-board .tile')
    const player2Tiles = document.querySelectorAll('.right-board .tile')
    player1Tiles.forEach((tile) => {
        const coord = tile.getAttribute('id')
        const ship = player1.gameboard.board[coord[0]][coord[1]]
        if (ship.occupied.hits > 0 && tile.classList.contains('clicked')) {
            tile.innerHTML = 'Hit!'
        } else if (ship.occupied === 'missedShot') {
            tile.innerHTML = '-'
        }
    })
    player2Tiles.forEach((tile) => {
        const coord = tile.getAttribute('id')
        const ship = player2.gameboard.board[coord[0]][coord[1]]
        if (ship.occupied.hits > 0 && tile.classList.contains('clicked')) {
            tile.innerHTML = 'Hit!'
        } else if (ship.occupied === 'missedShot') {
            tile.innerHTML = '-'
        }
    })
}

function declareWinner(target) {
    const header = document.querySelector('.winner-header')
    if (target === 'player1') {
        header.innerHTML = 'Player 1 Wins'
    } else if (target === 'player2') {
        header.innerHTML = 'Player 2 Wins'
    }
}

export { createGrid, renderGameboard, declareWinner }
