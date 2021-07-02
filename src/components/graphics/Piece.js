import React from 'react';

import "./Board.css";

export default function Piece(props) {
    if (props.src === "") {
        return (
            <div className="tile"  onClick={() => props.clickPiece(props.pos[0], props.pos[1])}></div>
        );
    } else {
        return (
            <img alt="oop" className="tile" src={props.src} onClick={() => props.clickPiece(props.pos[0], props.pos[1])}></img>
        );
    }
}