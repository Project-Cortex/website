import Board from "./graphics/Board.js";

import "./Chess.css";

let default_board = [];
default_board.push([-5, -3, -4, -9, -15, -4, -3, -5]);
default_board.push([-1, -1, -1, -1, -1, -1, -1, -1]);
for (let i = 0; i < 4; i++) {
  default_board.push([0, 0, 0, 0, 0, 0, 0, 0]);
}
default_board.push([1, 1, 1, 1, 1, 1, 1, 1]);
default_board.push([5, 3, 4, 9, 15, 4, 3, 5]);
function Chess() {
    let grid = [];
    grid = default_board;
    return (
      <div className="center">
          <Board  board={grid}></Board>
      </div>
    );
  }

  export default Chess;
