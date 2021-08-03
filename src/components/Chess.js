import Board from "./graphics/Board.js";

import "./Chess.css";
import { useState } from "react";
import Piece from "./graphics/Piece.js";

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

    function changePiece(pos,  newValue) {
      let temp = grid;
      console.log(pos);
      temp[pos[0]][pos[1]] = newValue;
      changeGrid(temp);
    }

    function promotePiece(position, value, isWhite) {
      if (value === "2") {
        if (isWhite) {
          changePiece(position, 5);
        } else {
          changePiece(position, -5);
        }
      } else if (value === "3") {
        if (isWhite) {
          changePiece(position, 4);
        } else {
          changePiece(position, -4);
        }
      } else if (value === "4") {
        if (isWhite) {
          changePiece(position, 3);
        } else {
          changePiece(position, -3);
        }
      } else {
        if (isWhite) {
          changePiece(position, 9);
        } else {
          changePiece(position, -9);
        }
      }
    }

    return (
      <div className="center">
          <Board  board={grid} invert={false} movePiece={movePiece} promotePiece={promotePiece}></Board>
      </div>
    );
  }

  export default Chess;
