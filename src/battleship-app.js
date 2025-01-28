class Ship {
    constructor(length) {
        this.length = length
        this.hits = 0
        this.sunk = false
    }

    hit() {
        this.hits += 1
    }

    isSunk() {
        return this.hits >= this.length
    }
}

class Gameboard {
    constructor() {
        this.board = []
        for (let i = 0; i < 10; i++) {
            let row = []
            this.board.push(row)
            for (let j = 0; j < 10; j++) {
                let tile = { coord: [i, j], occupied: false }
                row.push(tile)
            }
        }
    }

    place(coords) {
        const newShip = new Ship(coords.length)
        coords.forEach((coord) => {
            const tile = this.board[coord[0]][coord[1]]
            tile.occupied = newShip
        })
    }

    receiveAttack(coord) {
        const tile = this.board[coord[0]][coord[1]]
        if (typeof tile.occupied === 'object') {
            tile.occupied.hit()
            if (tile.occupied.isSunk()) {
                tile.occupied.sunk = true
            }
        } else if (!tile.occupied) {
            tile.occupied = 'missedShot'
        }
    }

    allShipsSunk() {
        let result = true
        this.board.forEach((row) => {
            row.forEach((tile) => {
                if (typeof tile.occupied === 'object' && !tile.occupied.sunk) {
                    result = false
                }
            })
        })
        return result
    }
}

class Player {
    constructor(type = 'real') {
        this.gameboard = new Gameboard()
        this.type = type
    }
}

export { Ship, Gameboard, Player }
