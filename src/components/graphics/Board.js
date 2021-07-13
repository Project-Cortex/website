import React, { useState } from 'react';
import Game from "../Game/Game.js";

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
let hasPiece = false;
let highlightedSquares = [];
export default function Board(props) {
    const [flip, doFlip] = useState(true);
    let game = new Game(props.board);
    function clickPiece(x, y) {
        if (hasPiece) {
            console.log("something");
            props.movePiece([currentPiece[0],currentPiece[1]], [x,y]);
            highlightedSquares = [];
            doFlip(!flip);
            hasPiece = false;
        } else if (props.board[x][y] != 0) {
            doFlip(!flip);
            hasPiece = true;
        } else {
            doFlip(!flip);
            hasPiece = false;
        }
        currentPiece = [x, y]
    }

    function findPotentialMoves (x, y) {
        let possibleMoves = game.getMove(x,y);
        console.log(possibleMoves);
        highlightedSquares = [];
        for (let i = 0; i < possibleMoves.length; i++) {
            for (let j = 0; j < possibleMoves[i].length; j++) {
                if (possibleMoves[i][j] != 0) {
                    highlightedSquares.push([i, j])
                }
            }
        }
    }

    function inBounds(x, y) {
        if (x < 0 || x > 7 || y < 0 || y > 7) {
            return false;
        } 
        return true;
    }

    let board = [];
    if (hasPiece) {
        findPotentialMoves(currentPiece[0], currentPiece[1]);
        let length = highlightedSquares.length;
        for (let i = 0; i < highlightedSquares.length; i++) {
            if (props.board[highlightedSquares[i][0]][highlightedSquares[i][1]] != 0) {
                highlightedSquares.splice(i, 1);
                i--;
            }
        }
    } 


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
            let color = "tile black-tile";
            if (number % 2 === 0) {
                color = "tile white-tile";
            }

            for (let o = 0; o < highlightedSquares.length; o++) {
                if (j === highlightedSquares[o][0] && i === highlightedSquares[o][1]) {
                    color = "tile highlighted-tile";
                }
            }

            if (piece_exist) { 
                board.push(
                    <div className={color} key={VERTICAL_AXIS[i] + HORIZONTAL_AXIS[j]}> 
                        <Piece src={src} clickPiece={clickPiece} pos={[j, i]}>
                        </Piece>
                        </div>
                );
            } else {
                board.push(
                    <div className={color} key={VERTICAL_AXIS[i] + HORIZONTAL_AXIS[j]}>
                        <Piece src={""} clickPiece={clickPiece} pos={[j, i]}>
                        </Piece>
                    </div>
                );
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