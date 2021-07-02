import React from 'react';

import "./Board.css";

import white_pawn from "../../assets/white_pawn.svg";
import white_knight from "../../assets/white_knight.svg";
import white_bishop from "../../assets/white_bishop.svg";
import white_rook from "../../assets/white_rook.svg";
import white_queen from "../../assets/white_queen.svg";
import white_king from "../../assets/white_king.svg";
import black_pawn from "../../assets/black_pawn.svg";
import black_knight from "../../assets/black_knight.svg";
import black_bishop from "../../assets/black_bishop.svg";
import black_rook from "../../assets/black_rook.svg";
import black_queen from "../../assets/black_queen.svg";
import black_king from "../../assets/black_king.svg";

import Piece from './Piece';

let VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];
let HORIZONTAL_AXIS = ["A", "B", "C", "D", "E", "F", "G", "H"];
let currentPiece = [-1, -1];
export default function Board(props) {

    function clickPiece(x, y) {
        currentPiece = [x, y]
        console.log(currentPiece);
    }


    let board = [];
    for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
        for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
            let number = j + i + 1;
            let src = "";
            let piece_exist = true;
            let current_pos = props.board[j][i];
            if (current_pos === 0) {
                piece_exist = false;
            } else if (current_pos === 1) {
                src = white_pawn;
            } else if (current_pos === 3) {
                src = white_knight;
            } else if (current_pos === 4) {
                src = white_bishop;
            } else if (current_pos === 5) {
                src = white_rook;
            } else if (current_pos === 9) {
                src = white_queen;
            } else if (current_pos === 15) {
                src = white_king;
            } else if (current_pos === -1) {
                src = black_pawn;
            } else if (current_pos === -3) {
                src = black_knight;
            } else if (current_pos === -4) {
                src = black_bishop;
            } else if (current_pos === -5) {
                src = black_rook;
            } else if (current_pos === -9) {
                src = black_queen;
            } else if (current_pos === -15) {
                src = black_king;
            }

            if (piece_exist) { 
                if (number % 2 === 0) {
                    board.push(
                        <div className="tile white-tile" key={VERTICAL_AXIS[i] + HORIZONTAL_AXIS[j]}> 
                            <Piece src={src} clickPiece={clickPiece} pos={[j, i]}>
                            </Piece> 
                        </div>
                    );
                } else {
                    board.push(
                        <div className="tile black-tile" key={VERTICAL_AXIS[i] + HORIZONTAL_AXIS[j]}> 
                            <Piece src={src} clickPiece={clickPiece} pos={[j, i]}>
                            </Piece>
                         </div>
                    );
                }
            } else {
                if (number % 2 === 0) {
                    board.push(
                        <div className="tile white-tile" key={VERTICAL_AXIS[i] + HORIZONTAL_AXIS[j]}> </div>
                    );
                } else {
                    board.push(
                        <div className="tile black-tile" key={VERTICAL_AXIS[i] + HORIZONTAL_AXIS[j]}> </div>
                    );
                }
            }
        
        }
      }
      if (props.invert) {
          let newBoard = [];
          for (let i = 0; i < board.length; i++) {
              newBoard.push(board[board.length - 1 - i]);
          }
          board = newBoard;
      }
    return (
    <div id="Board">
        {board}
    </div>
    );
}