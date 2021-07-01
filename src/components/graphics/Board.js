import React from 'react';

import "./Board.css";

import white_pawn from "../../assets/white_pawn.svg";

let VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];
let HORIZONTAL_AXIS = ["A", "B", "C", "D", "E", "F", "G", "H"];
export default function Board(props) {
    let board = [];
    console.log(props.board)
    for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
        for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
            let number  = j + i + 2;
            let src = "";
            if (props.board[i][j] == 0) {
                src = white_pawn;
            } else if (props.board[i][j] == 1) {
                src = "./../../assets/white_pawn.svg";
            } else if (props.board[i][j] == 3) {

            } else if (props.board[i][j] == 4) {

            } else if (props.board[i][j] == 5) {

            } else if (props.board[i][j] == 9) {

            } else if (props.board[i][j] == 15) {

            }

            if (number % 2 === 0) {
                board.push(
                    <div className="tile white-tile" key={VERTICAL_AXIS[i] + HORIZONTAL_AXIS[j]}> <img src={src}></img> </div>
                );
            } else {
                board.push(
                    <div className="tile black-tile" key={VERTICAL_AXIS[i] + HORIZONTAL_AXIS[j]}> <img src={src}></img> </div>
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