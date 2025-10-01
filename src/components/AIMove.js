
const nextMove = (allPiecePositions) => {

    let board = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""]
    ];

    for (const piece in allPiecePositions) {
        const row = (allPiecePositions[piece] - (allPiecePositions[piece] % 8)) / 8
        const column = allPiecePositions[piece] % 8
        let pieceName
        if (piece.indexOf('rook-black') !== -1) pieceName = 'bR'
        if (piece.indexOf('knight-black') !== -1) pieceName = 'bN'
        if (piece.indexOf('bishop-black') !== -1) pieceName = 'bB'
        if (piece.indexOf('queen-black') !== -1) pieceName = 'bQ'
        if (piece.indexOf('king-black') !== -1) pieceName = 'bK'
        if (piece.indexOf('pawn-black') !== -1) pieceName = 'bP'
        if (piece.indexOf('rook-white') !== -1) pieceName = 'wR'
        if (piece.indexOf('knight-white') !== -1) pieceName = 'wN'
        if (piece.indexOf('bishop-white') !== -1) pieceName = 'wB'
        if (piece.indexOf('queen-white') !== -1) pieceName = 'wQ'
        if (piece.indexOf('king-white') !== -1) pieceName = 'wK'
        if (piece.indexOf('pawn-white') !== -1) pieceName = 'wP'
        board[row][column] = pieceName
    }
    const pieceValues = {
        'P': 1,
        'N': 3,
        'B': 3,
        'R': 5,
        'Q': 9,
        'K': 1000
    };
    let turn = 'b';
    let aiColor = 'b';
    let opponentColor = 'w'
    let gameOver = false;
    let kingMoved = { 'w': false, 'b': false };
    let rookMoved = {
        'w0': false, // white rook on a1
        'w1': false, // white rook on h1
        'b0': false, // black rook on a8
        'b1': false  // black rook on h8
    };
    let enPassantSquare = null;

    function isValidMove(piece, fromRow, fromCol, toRow, toCol, castling, enPassantCapture) {
        const pieceType = piece[1];
        const color = piece[0];
        const dir = color === 'w' ? -1 : 1;
        const destinationPiece = board[toRow][toCol];
        if (destinationPiece && destinationPiece[0] === color) {
            return false;
        }
        let valid = false;
        switch (pieceType) {
            case 'P':
                // Pawn move
                if (fromCol === toCol) {
                    // Move forward
                    if (board[toRow][toCol] === "") {
                        if (toRow - fromRow === dir) {
                            valid = true;
                        }
                        // Initial double move
                        else if ((color === 'w' && fromRow === 6 && toRow === 4 && board[5][fromCol] === "") ||
                            (color === 'b' && fromRow === 1 && toRow === 3 && board[2][fromCol] === "")) {
                            valid = true;
                        }
                    }
                } else if (Math.abs(fromCol - toCol) === 1 && toRow - fromRow === dir) {
                    // Capture
                    if (board[toRow][toCol] && board[toRow][toCol][0] !== color) {
                        valid = true;
                    }
                    // En passant
                    else if (enPassantSquare &&
                        enPassantSquare.row === toRow &&
                        enPassantSquare.col === toCol &&
                        enPassantSquare.color !== color) {
                        valid = true;
                        enPassantCapture = true; // Indicate en passant capture
                    }
                }
                break;
            case 'R':
                // Rook move
                if (fromRow === toRow || fromCol === toCol) {
                    if (isPathClear(fromRow, fromCol, toRow, toCol)) {
                        valid = true;
                    }
                }
                break;
            case 'N':
                // Knight move
                if ((Math.abs(fromRow - toRow) === 2 && Math.abs(fromCol - toCol) === 1) ||
                    (Math.abs(fromRow - toRow) === 1 && Math.abs(fromCol - toCol) === 2)) {
                    valid = true;
                }
                break;
            case 'B':
                // Bishop move
                if (Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)) {
                    if (isPathClear(fromRow, fromCol, toRow, toCol)) {
                        valid = true;
                    }
                }
                break;
            case 'Q':
                // Queen move (rook + bishop)
                if ((fromRow === toRow || fromCol === toCol ||
                    Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)) &&
                    isPathClear(fromRow, fromCol, toRow, toCol)) {
                    valid = true;
                }
                break;
            case 'K':
                // King move
                if (Math.abs(fromRow - toRow) <= 1 && Math.abs(fromCol - toCol) <= 1) {
                    valid = true;
                }
                // Castling
                else if (!kingMoved[color] && fromRow === toRow && Math.abs(fromCol - toCol) === 2) {
                    if (canCastle(color, fromRow, fromCol, toRow, toCol)) {
                        valid = true;
                        castling = true; // Indicate castling move
                    }
                }
                break;
        }
        if (valid) {
            // Temporarily make the move
            const originalFromPiece = board[fromRow][fromCol];
            const originalToPiece = board[toRow][toCol];
            const capturedEnPassantPiece = enPassantCapture ? board[fromRow][toCol] : null;
            board[toRow][toCol] = piece;
            board[fromRow][fromCol] = "";
            if (enPassantCapture) {
                board[fromRow][toCol] = ""; // Remove the captured pawn
            }
            // Check if own king is in check
            const inCheck = isKingInCheck(color);
            // Undo the move
            board[fromRow][fromCol] = originalFromPiece;
            board[toRow][toCol] = originalToPiece;
            if (enPassantCapture) {
                board[fromRow][toCol] = capturedEnPassantPiece;
            }
            if (inCheck) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    }
    function canCastle(color, fromRow, fromCol, toRow, toCol) {
        // Determine which side the king is castling to
        let kingSide = toCol > fromCol;
        let rookCol = kingSide ? 7 : 0;
        let rookKey = color + (rookCol === 0 ? '0' : '1');
        if (kingMoved[color] || rookMoved[rookKey]) {
            return false;
        }
        // Check if squares between king and rook are empty
        let colStep = kingSide ? 1 : -1;
        for (let col = fromCol + colStep; col !== rookCol; col += colStep) {
            if (board[fromRow][col] !== '') {
                return false;
            }
        }
        // Check that the king is not in check, and does not pass through or end in check
        let tempFromCol = fromCol;
        for (let i = 0; i <= 2; i++) {
            tempFromCol += colStep;
            if (i > 0) { // We already know the king is not in check at fromCol
                // Temporarily move the king
                let originalPiece = board[fromRow][tempFromCol];
                board[fromRow][tempFromCol] = color + 'K';
                board[fromRow][fromCol] = '';
                if (isKingInCheck(color)) {
                    // Undo the move
                    board[fromRow][fromCol] = color + 'K';
                    board[fromRow][tempFromCol] = originalPiece;
                    return false;
                }
                // Undo the move
                board[fromRow][fromCol] = color + 'K';
                board[fromRow][tempFromCol] = originalPiece;
            }
            if (tempFromCol === toCol) break;
        }
        return true;
    }
    function isPathClear(fromRow, fromCol, toRow, toCol) {
        const rowStep = toRow - fromRow === 0 ? 0 : (toRow - fromRow) / Math.abs(toRow - fromRow);
        const colStep = toCol - fromCol === 0 ? 0 : (toCol - fromCol) / Math.abs(toCol - fromCol);
        let currentRow = fromRow + rowStep;
        let currentCol = fromCol + colStep;
        while (currentRow !== toRow || currentCol !== toCol) {
            if (board[currentRow][currentCol] !== "") {
                return false;
            }
            currentRow += rowStep;
            currentCol += colStep;
        }
        return true;
    }
    function isSquareAttacked(row, col, byColor) {
        for (let fromRow = 0; fromRow < 8; fromRow++) {
            for (let fromCol = 0; fromCol < 8; fromCol++) {
                const piece = board[fromRow][fromCol];
                if (piece && piece[0] === byColor) {
                    if (isValidMoveForAttack(piece, fromRow, fromCol, row, col)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    function isValidMoveForAttack(piece, fromRow, fromCol, toRow, toCol) {
        const pieceType = piece[1];
        const color = piece[0];
        const dir = color === 'w' ? -1 : 1; // Direction for pawns
        switch (pieceType) {
            case 'P':
                // Pawn attack move (diagonal capture)
                if (Math.abs(fromCol - toCol) === 1 && toRow - fromRow === dir) {
                    return true;
                }
                break;
            case 'R':
                // Rook move
                if (fromRow === toRow || fromCol === toCol) {
                    if (isPathClear(fromRow, fromCol, toRow, toCol)) {
                        return true;
                    }
                }
                break;
            case 'N':
                // Knight move
                if ((Math.abs(fromRow - toRow) === 2 && Math.abs(fromCol - toCol) === 1) ||
                    (Math.abs(fromRow - toRow) === 1 && Math.abs(fromCol - toCol) === 2)) {
                    return true;
                }
                break;
            case 'B':
                // Bishop move
                if (Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)) {
                    if (isPathClear(fromRow, fromCol, toRow, toCol)) {
                        return true;
                    }
                }
                break;
            case 'Q':
                // Queen move (rook + bishop)
                if ((fromRow === toRow || fromCol === toCol ||
                    Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)) &&
                    isPathClear(fromRow, fromCol, toRow, toCol)) {
                    return true;
                }
                break;
            case 'K':
                // King move
                if (Math.abs(fromRow - toRow) <= 1 && Math.abs(fromCol - toCol) <= 1) {
                    return true;
                }
                break;
        }
        return false;
    }
    function isKingInCheck(color) {
        let kingRow, kingCol;
        // Find the king
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece === color + 'K') {
                    kingRow = row;
                    kingCol = col;
                    break;
                }
            }
        }
        if (kingRow === undefined) {
            // King not found (should not happen in normal play)
            return true;
        }
        const opponentColor = color === 'w' ? 'b' : 'w';
        // Check if any opponent piece can attack the king
        return isSquareAttacked(kingRow, kingCol, opponentColor);
    }
    function evaluateBoard() {
        let score = 0;
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece) {
                    const color = piece[0];
                    const pieceType = piece[1];
                    const value = pieceValues[pieceType];
                    if (color === aiColor) {
                        score += value;
                    } else {
                        score -= value;
                    }
                }
            }
        }
        return score;
    }
    function generateAllMoves(color) {
        const moves = [];
        for (let fromRow = 0; fromRow < 8; fromRow++) {
            for (let fromCol = 0; fromCol < 8; fromCol++) {
                const piece = board[fromRow][fromCol];
                if (piece && piece[0] === color) {
                    for (let toRow = 0; toRow < 8; toRow++) {
                        for (let toCol = 0; toCol < 8; toCol++) {
                            let castling = false;
                            let enPassantCapture = false;
                            if (isValidMove(piece, fromRow, fromCol, toRow, toCol, castling, enPassantCapture)) {
                                moves.push({
                                    piece: piece,
                                    fromRow: fromRow,
                                    fromCol: fromCol,
                                    toRow: toRow,
                                    toCol: toCol,
                                    castling: castling,
                                    enPassantCapture: enPassantCapture
                                });
                            }
                        }
                    }
                }
            }
        }
        return moves;
    }
    function makeTemporaryMove(move) {
        move.capturedPiece = board[move.toRow][move.toCol];
        board[move.toRow][move.toCol] = move.piece;
        board[move.fromRow][move.fromCol] = "";
    }
    function undoTemporaryMove(move) {
        board[move.fromRow][move.fromCol] = move.piece;
        board[move.toRow][move.toCol] = move.capturedPiece;
    }
    function makeAIMove() {
        const depth = 4;
        const bestMove = minimaxRoot(depth, aiColor);
        if (!bestMove) {
            gameOver = true;
            return 'AI has no valid moves. Game over.'
        }
        console.log('bestMove', bestMove)
        return bestMove
    }
    function minimaxRoot(depth, color) {
        const moves = generateAllMoves(color);
        let bestMove = null;
        let bestValue = -Infinity;
        for (let move of moves) {
            makeTemporaryMove(move);
            let value = minimax(depth - 1, false, -Infinity, Infinity);
            undoTemporaryMove(move);
            if (value > bestValue) {
                bestValue = value;
                bestMove = move;
            }
        }
        return bestMove;
    }
    function minimax(depth, isMaximizingPlayer, alpha, beta) {
        if (depth === 0 || isGameOver()) {
            return evaluateBoard();
        }
        const color = isMaximizingPlayer ? aiColor : opponentColor;
        const moves = generateAllMoves(color);
        if (isMaximizingPlayer) {
            let maxEval = -Infinity;
            for (let move of moves) {
                makeTemporaryMove(move);
                let evaluated = minimax(depth - 1, false, alpha, beta);
                undoTemporaryMove(move);
                maxEval = Math.max(maxEval, evaluated);
                alpha = Math.max(alpha, evaluated);
                if (beta <= alpha) {
                    break;
                }
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (let move of moves) {
                makeTemporaryMove(move);
                let evaluated = minimax(depth - 1, true, alpha, beta);
                undoTemporaryMove(move);
                minEval = Math.min(minEval, evaluated);
                beta = Math.min(beta, evaluated);
                if (beta <= alpha) {
                    break;
                }
            }
            return minEval;
        }
    }
    function isGameOver() {
        const moves = generateAllMoves(turn);
        if (moves.length > 0) {
            return false;
        }
        return true;
    }
    let codeRan = window.sessionStorage.getItem('codeRan')

    if (codeRan === 'false') {
        const bestPossibleMove = makeAIMove()
        let initialPositon = (bestPossibleMove.fromRow * 8) + (bestPossibleMove.fromCol)
        let positionToMove = (bestPossibleMove.toRow * 8) + (bestPossibleMove.toCol)
        let pieceToMove
        for (const piece in allPiecePositions) {
            if (allPiecePositions[piece] === initialPositon) pieceToMove = piece
        }
        window.sessionStorage.setItem('codeRan', true)
        var bestFinalMove = {
            selectedPiece: pieceToMove,
            selectedPosition: positionToMove
        }
    }

    return bestFinalMove
}

export default nextMove