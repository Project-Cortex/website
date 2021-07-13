//[num in Y dir, num in X dir, num in all diag]
//8 = max, all 0's = knight, [0, 1, 0] = pawn
const pawn = [1, 0, 0];// pIdent = +/- 1
const rook = [8, 8, 0];// 5
const knight = [0, 0, 0];// 3
const bishop = [0, 0, 8];// 4
const king = [1, 1, 1];// 15
const queen = [8, 8, 8];// 9

function getPiecefromPIdent(pIdent){
    pIdent = Math.abs(pIdent);
    if(pIdent === 1) return pawn;
    else if (pIdent === 5) return rook;
    else if (pIdent === 3) return knight;
    else if (pIdent === 4) return bishop;
    else if (pIdent === 15) return king;
    else if (pIdent === 9) return queen;
}
//pIdent = piece identity, board = current board = [8][8], pos = [x, y]
export default function getValidMoveTiles(board, pos){
    //all the good stuff here later
    
    pos = [pos[0], pos[1]];
    if(board[pos[0]][pos[1]] === 0) {
        console.warn("ATTEMPTED TO GET VALID MOVE OF EMPTY SQUARE");
        return -1;
    }


    let pIdent = board[pos[0]][pos[1]];
    let moveBoard = [];
    for(let i = 0; i < 8; i++){
        moveBoard.push([0, 0, 0, 0, 0, 0, 0, 0]);
    }
    
    moveBoard[pos[0]][pos[1]] = 0;

    let absP = Math.abs(pIdent);
    //case for knight
    if(absP === 3){
        return(getValidKnightMoves(board, moveBoard, pos, pIdent));
    }
    //case for pawn
    if(absP === 1){
        let result = getValidPawnMoves(board, moveBoard, pos, pIdent);
        return(result);
    }

    //case for sliding
    
    if(absP === 4 || absP === 5 || absP === 9 || absP === 15){
        return(getValidSlidingMoves(board, moveBoard, pos, pIdent));
    }
}



function getValidPawnMoves(board, moveBoard, pos, pIdent){
    //1. movement
    //since the abs(pIdent) == 1, pIdent will represent direction of potential travel
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