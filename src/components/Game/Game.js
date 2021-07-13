import getValidMoveTiles from "./GameRules"


export default class Game{
    constructor(board){
        this.board = board;
    }

    getMove(x, y) {
        return getValidMoveTiles(this.board, [x, y]);
    }
}