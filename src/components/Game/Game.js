import getValidMoveTiles from "./GameRules"


export default class Game{
    constructor(board){
        this.board = board;
        this.board[5][5] = 9;
        getValidMoveTiles(this.board, [6, 6]);
    }
}