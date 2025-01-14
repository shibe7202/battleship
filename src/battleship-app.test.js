import { Ship, Gameboard } from './battleship-app.js'

const exampleBoard = new Gameboard()
exampleBoard.place([
    [1, 1],
    [1, 2],
])

test('gameboard places ship', () => {
    expect(exampleBoard.board[0][0].occupied).toBeTruthy()
    expect(exampleBoard.board[0][1].occupied).toBeTruthy()
    expect(exampleBoard.board[3][1].occupied).toBeFalsy()
})

test('receive attack', () => {
    exampleBoard.receiveAttack([1, 2])
    exampleBoard.receiveAttack([2, 2])
    expect(exampleBoard.board[0][1].occupied.hits).toBe(1)
    expect(exampleBoard.board[1][1].occupied).toBe('missedShot')
    exampleBoard.receiveAttack([1, 1])
    expect(exampleBoard.board[0][0].occupied.sunk).toBeTruthy
})
