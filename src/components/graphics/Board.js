import React from 'react';

import "./Board.css";

let VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];
let HORIZONTAL_AXIS = ["A", "B", "C", "D", "E", "F", "G", "H"];
export default function Board() {
    let board = [];
    for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
        for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
            let number  = j + i + 2;

            if (number % 2 === 0) {
                board.push(
                    <div className="tile white-tile"></div>
                );
            } else {
                board.push(
                    <div className="tile black-tile"></div>
                );
            }
        }
      }
    return (
    <div id="Board">
        {board}
    </div>
    );
}