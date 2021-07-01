import Board from "./graphics/Board.js";

import "./Chess.css";



function Chess() {
    let grid = [];
    for (let i = 0; i < 8; i ++) {
      grid.push([0, 0, 0, 0, 0, 0, 0, 0]);
    };
    return (
      <div className="center">
          <Board  board={grid}></Board>
      </div>
    );
  }

  export default Chess;
