import React from 'react';

import "./Board.css";

export default function Piece(props) {
    return (
        <img alt="oop" className="tile" src={props.src}></img>
    );
}