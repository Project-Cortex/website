//[num in Y dir, num in X dir, num in all diag]
//8 = max, all 0's = knight, [0, 1, 0] = pawn
const pawn = [1, 0, 0];// pIdent = +/- 1
const rook = [8, 8, 0];// 5
const knight = [0, 0, 0];// 3
const bishop = [0, 0, 8];// 4
const king = [1, 1, 1];// 15
const queen = [8, 8, 8];// 9

//determines which rooks and kings have moved. bottom rook = 0, 1; bottom king = 2, etc.
const rookAndKingMoves = [0, 0, 0, 0, 0, 0]

function getPiecefromPIdent(pIdent){
    pIdent = Math.abs(pIdent);
    if(pIdent === 1) return pawn;
    else if (pIdent === 5) return rook;
    else if (pIdent === 3) return knight;
    else if (pIdent === 4) return bishop;
    else if (pIdent === 15) return king;
    else if (pIdent === 9) return queen;
}

//side = - if black, + if white
function checkCheck(board, moveBoard, pIdent){
    
    let valid = true;

    let tempBoard = copyBoard(board);

    let movePositions = getAllPos(moveBoard, 1);

    let current_pos = getAllPos(moveBoard, 3)[0];

    movePositions.forEach(pos => {
        tempBoard[pos[0]][pos[1]] = 3;
        tempBoard[current_pos[0]][current_pos[1]] = 0;

        if(isInCheck(tempBoard, pIdent)){
            moveBoard[pos[0]][pos[1]] = 0;
        }

        tempBoard = copyBoard(board);
    });

    return moveBoard;
}



//side = -1 if black, 1 if white
function isInCheck(board, side){

    let inCheck = false;

    for(let x = 0; x < 8; x++){
        for(let y = 0; y < 8; y++){
            let pos = [y, x];

            let piece = board[pos[0]][pos[1]];
            
            if(piece === 0) continue;

            if(!sameSign(side, piece)){

                let moveBoard = getMoveTiles(board, pos);
                
                for(let x1 = 0; x1 < 8; x1++){
                    for(let y1 = 0; y1 < 8; y1++){

                        let pos1 = [y1, x1];

                        if(getPIdentAtPosition(moveBoard, pos1) !== 2) continue;

                        if(Math.abs(getPIdentAtPosition(board, pos1) === 15)){
                            inCheck = true;
                        }
                    }
                }

            }
        }
    }

    return inCheck;
}

//returns an array of all positions containing targetNum
function getAllPos(board, targetNum){

    let positions = [];

    for(let x = 0; x < 8; x++){
        for(let y = 0; y < 8; y++){
            if(board[y][x] == targetNum){
                positions.push([y, x]);
            }
        }
    }

    return positions;
}

function copyBoard(board){
    let tempBoard = [];

    for(let i = 0; i < 8; i++){
        tempBoard.push([0, 0, 0, 0, 0, 0, 0, 0]);
    }

    for(let x = 0; x < 8; x++){
        for(let y = 0; y < 8; y++){
            tempBoard[y][x] = board[y][x];
        }
    }

    return tempBoard;
}

function getPIdentAtPosition(board, pos){
    return board[pos[0]][pos[1]];
}

function checkCastle(board, moveBoard, side){

    let kingPos  = getAllPos(board, 15 * side)[0];

    let clearLeft = false;
    let clearRight = false;

    //1. is the way to the rooks clear
    
    //1a. check right
    
    if(board[kingPos[0]][kingPos[1] + 1] === 0 && board[kingPos[0]][kingPos[1] + 2] === 0 && board[kingPos[0]][kingPos[1] + 3] === 5){
        clearRight = true;
    }

    //1b. check left

    if(board[kingPos[0]][kingPos[1] - 1] === 0 && board[kingPos[0]][kingPos[1] - 2] === 0 && board[kingPos[0]][kingPos[1] - 3] === 0 && board[kingPos[0]][kingPos[1] - 4] === 5){
        clearLeft = true;
    }

    //moveBoard[kingPos[0]][kingPos[1] + 2] = 1;
    //moveBoard[kingPos[0]][kingPos[1] - 3] = 1;



    return moveBoard;
}

function checkKingRookMoves(board){
    let rookOne = board[0][0];
    let rookTwo = board[0][7];
    let kingOne = board[0][4];
    let rookThree = board[7][0];
    let rookFour = board[7][7];
    let kingTwo = board[7][4];

    //this is annoying
    if(Math.abs(rookOne) !== 5){
        rookAndKingMoves[0] = 1;
    }

    if(Math.abs(rookTwo) !== 5){
        rookAndKingMoves[1] = 1;
    }

    if(Math.abs(kingOne) !== 15){
        rookAndKingMoves[2] = 1;
    }

    if(Math.abs(rookThree) !== 5){
        rookAndKingMoves[3] = 1;
    }

    if(Math.abs(rookFour) !== 5){
        rookAndKingMoves[4] = 1;
    }

    if(Math.abs(kingTwo) !== 15){
        rookAndKingMoves[5] = 1;
    }
}


//pIdent = piece identity, board = current board = [8][8], pos = [y, x]
export default function getValidMoveTiles(board, pos){

    checkKingRookMoves(board);
    
    let moveBoard = getMoveTiles(board, pos);

    moveBoard = checkCheck(board, moveBoard, board[pos[0]][pos[1]]);

    if(Math.abs(board[pos[0]][pos[1]]) == 15){
        moveBoard = checkCastle(board, moveBoard, Math.sign(getPIdentAtPosition(board, pos)));
    }

    return moveBoard;
}

//gets all basic movement from a piece at a position. Does not account for any special gamerules.
function getMoveTiles(board, pos){
    //all the good stuff here later
    
    let pIdent = board[pos[0]][pos[1]];
    let moveBoard = [];
    for(let i = 0; i < 8; i++){
        moveBoard.push([0, 0, 0, 0, 0, 0, 0, 0]);
    }

    pos = [pos[0], pos[1]];
    if(board[pos[0]][pos[1]] === 0) {
        console.warn("ATTEMPTED TO GET VALID MOVE OF EMPTY SQUARE");
        return moveBoard; //returns empty board
    }

    moveBoard[pos[0]][pos[1]] = 3;

    let absP = Math.abs(pIdent);
    //case for knight
    if(absP === 3){
        moveBoard = getValidKnightMoves(board, moveBoard, pos, pIdent);
    }
    //case for pawn
    if(absP === 1){
        moveBoard = getValidPawnMoves(board, moveBoard, pos, pIdent);
        
    }

    //case for sliding
    
    if(absP === 4 || absP === 5 || absP === 9 || absP === 15){
        moveBoard = getValidSlidingMoves(board, moveBoard, pos, pIdent);
    }

    return moveBoard;
}



function getValidPawnMoves(board, moveBoard, pos, pIdent){
    //1. movement
    //since the abs(pIdent) === 1, pIdent will represent direction of potential travel
    let travelDirection = pIdent;

    let moves = [];

    moves.push([pos[0] + travelDirection, pos[1]]);

    if(pos[0] === 6 || pos[0] === 1){
        moves.push([pos[0] + travelDirection + travelDirection, pos[1]]);
    }

    let canMove = true;
    moves.forEach(move => {
        if(move[0] > -1 && move[0] < 8 && move[1] > -1 && move[0] < 8){
            let Bedit = board[move[0]][move[1]];

            //collided with piece
            if(Bedit !== 0 && canMove){
                canMove = false;
            }else{
                moveBoard[move[0]][move[1]] = 1;
            }
        }
    });

    //2. Capture
    let captureMoves = [];
    captureMoves.push([pos[0] + travelDirection, pos[1] + travelDirection]);
    captureMoves.push([pos[0] + travelDirection, pos[1] - travelDirection]);

    captureMoves.forEach(move => {
        
        if(move[0] > -1 && move[0] < 8 && move[1] > -1 && move[0] < 8){
            let Bedit = board[move[0]][move[1]];

            //collided with piece
            if(Bedit !== 0){
                if(!sameSign(Bedit, pIdent)){
                    moveBoard[move[0]][move[1]] = 2;
                }
            }//no else, only move if capture
        }
    });

    return moveBoard;
}

function getValidKnightMoves(board, moveBoard, pos, pIdent){
    let moves = [
                    [pos[0] + 2, pos[1] + 1], 
                    [pos[0] + 2, pos[1] - 1], 
                    [pos[0] - 2, pos[1] + 1],
                    [pos[0] - 2, pos[1] - 1],
                    [pos[0] + 1, pos[1] + 2],
                    [pos[0] - 1, pos[1] + 2],
                    [pos[0] + 1, pos[1] - 2],
                    [pos[0] - 1, pos[1] - 2]
                ]
    moves.forEach(move => {
        
        if(move[0] > -1 && move[0] < 8 && move[1] > -1 && move[0] < 8){
            let Bedit = board[move[0]][move[1]];

            //collided with piece
            if(Bedit !== 0){
                if(!sameSign(Bedit, pIdent)){
                    moveBoard[move[0]][move[1]] = 2;
                }
            }else{
                moveBoard[move[0]][move[1]] = 1;
            }
        }
    });

    return moveBoard;
}

function getValidSlidingMoves(board, moveBoard, pos, pIdent){
    let moveBounds = getPiecefromPIdent(pIdent);

    let allowUp = true;
    let allowDown = true;
    let allowLeft = true;
    let allowRight = true;
    let allowLeftUp = true;
    let allowLeftDown = true;
    let allowRightUp = true;
    let allowRightDown = true;
    //y axis movement
    for(let y = 1; y <= moveBounds[0]; y++){
        let up = pos[0] + y;
        let down = pos[0] - y;

        if(down > -1 && allowDown){
            
            let Bedit = board[down][pos[1]];
            //collided with piece
            if(Bedit !== 0){
                //true = ally, false = enemy
                if(!sameSign(pIdent, Bedit)){
                    moveBoard[down][pos[1]] = 2;
                }
                allowDown = false;
            }else{
                moveBoard[down][pos[1]] = 1;
            }
        }

        if(up < 8 && allowUp){
            
            let Bedit = board[up][pos[1]];
            //collided with piece
            if(Bedit !== 0){
                if(!sameSign(pIdent, Bedit)){
                    moveBoard[up][pos[1]] = 2;
                }
                allowUp = false;
            }else{
                moveBoard[up][pos[1]] = 1;
            }
        }
    }

    //x axis movement
    for(let x = 1; x <= moveBounds[1]; x++){
        let right = pos[1] + x;
        let left = pos[1] - x;

        if(left > -1 && allowLeft){
            
            let Bedit = board[pos[0]][left];
            //collided with piece
            if(Bedit !== 0){
                if(!sameSign(pIdent, Bedit)){
                    moveBoard[pos[0]][left] = 2;
                }
                allowLeft = false;
            }else{
                moveBoard[pos[0]][left] = 1;
            }
        }

        if(right < 8 && allowRight){
            
            let Bedit = board[pos[0]][right];
            //collided with piece
            if(Bedit !== 0){
                if(!sameSign(pIdent, Bedit)){
                    moveBoard[pos[0]][right] = 2;
                }
                allowRight = false;
            }else{
                moveBoard[pos[0]][right] = 1;
            }
        }
    }
    //diagonal movement
    for(let z = 1; z <= moveBounds[2]; z++){
        let leftUp = [pos[0] + z, pos[1] - z];
        let leftDown = [pos[0] - z, pos[1] - z];
        let rightUp = [pos[0] + z, pos[1] + z];
        let rightDown = [pos[0] - z, pos[1] + z];

        if(leftUp[0] < 8 && leftUp[1] > -1 && allowLeftUp){
            let Bedit = board[leftUp[0]][leftUp[1]];

            //collided with piece
            if(Bedit !== 0){
                if(!sameSign(pIdent, Bedit)){
                    moveBoard[leftUp[0]][leftUp[1]] = 2;
                }
                allowLeftUp = false;
            }else{
                moveBoard[leftUp[0]][leftUp[1]] = 1;
            }
        }

        if(leftDown[0] > -1 && leftDown[1] > -1 && allowLeftDown){
            let Bedit = board[leftDown[0]][leftDown[1]];

            //collided with piece
            if(Bedit !== 0){
                if(!sameSign(pIdent, Bedit)){
                    moveBoard[leftDown[0]][leftDown[1]] = 2
                }
                allowLeftDown = false;
            }else{
                moveBoard[leftDown[0]][leftDown[1]] = 1;
            }
            
        }

        if(rightUp[0] < 8 && rightUp[1] < 8 && allowRightUp){
            let Bedit = board[rightUp[0]][rightUp[1]];

            //collided with piece
            if(Bedit !== 0){
                if(!sameSign(pIdent, Bedit)){
                    moveBoard[rightUp[0]][rightUp[1]] = 2;
                }
                allowRightUp = false;
            }else{
                moveBoard[rightUp[0]][rightUp[1]] = 1;
            }
            
        }

        if(rightDown[0] > -1 && rightDown[1] < 8 && allowRightDown){
            let Bedit = board[rightDown[0]][rightDown[1]];

            //collided with piece
            if(Bedit !== 0){
                if(!sameSign(pIdent, Bedit)){
                    moveBoard[rightDown[0]][rightDown[1]] = 2;
                }
                allowRightDown = false;
            }else{
                moveBoard[rightDown[0]][rightDown[1]] = 1;
            }
            
        }
    }

    return moveBoard;
}

function sameSign(num1, num2){
    return (Math.sign(num1) === Math.sign(num2));
}