import Board from "./graphics/Board.js";

import "./Chess.css";
import { useState } from "react";

let default_board = [];

default_board.push([5, 3, 4, 9, 15, 4, 3, 5]);
default_board.push([1, 1, 1, 1, 1, 1, 1, 1]);
for (let i = 0; i < 4; i++) {
  default_board.push([0, 0, 0, 0, 0, 0, 0, 0]);
}
default_board.push([-1, -1, -1, -1, -1, -1, -1, -1]);
default_board.push([-5, -3, -4, -9, -15, -4, -3, -5]);

function Chess() {
    const [grid, changeGrid] = useState(default_board);
    function movePiece(pos1, pos2) {
      let temp = grid;
      temp[pos2[0]][pos2[1]] = grid[pos1[0]][pos1[1]];
      temp[pos1[0]][pos1[1]] = 0;
      changeGrid(temp);
    }

    return (
      <div className="center">
          <Board  board={grid} invert={false} movePiece={movePiece}></Board>
      </div>
    );
  }

  export default Chess;
