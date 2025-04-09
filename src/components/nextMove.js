
const nextMove = (allPiecePositions, check, piecesShieldingKing, cellsInterceptingCheck, checkingPiece) => {

    let codeRan = window.sessionStorage.getItem('codeRan')

    let width = 8

    if (codeRan === 'false') {

        let shieldedCells = []

        let shieldedPieces = []

        const checkShieldingPiece = (loopValue, direction, mainPiece, currentCellPosition) => {
            const interceptingPieces = []
            for (let i = 1; i <= loopValue; i++) {
                let nextValue
                switch (direction) {
                    case 'right': nextValue = currentCellPosition - i;
                        break;
                    case 'left': nextValue = currentCellPosition + i;
                        break;
                    case 'up': nextValue = currentCellPosition + (i * width);
                        break;
                    case 'down right': nextValue = currentCellPosition - (width * i + i);
                        break;
                    case 'down left': nextValue = currentCellPosition - (width * i - i);
                        break;
                    case 'up right': nextValue = currentCellPosition + (width * i - i);
                        break;
                    case 'up left': nextValue = currentCellPosition + (width * i + i);
                        break;
                    default: nextValue = currentCellPosition - (i * width);
                }
                if (Object.values(allPiecePositions).includes(nextValue)) {
                    const currentPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(nextValue))[0][0]
                    interceptingPieces.push(currentPiece)
                }
            }

            if (interceptingPieces.length === 1) {
                if (mainPiece.split('-')[1] !== 'black') {
                    if (!Object.values(allPiecePositions).includes(currentCellPosition) && !shieldedCells.includes(currentCellPosition)) {
                        shieldedCells.push(currentCellPosition)
                    }
                    if (Object.values(allPiecePositions).includes(currentCellPosition)) {
                        const shieldedPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentCellPosition))[0][0]
                        if (shieldedPiece.split('-')[0] !== 'king') {
                            let notIncluded = true
                            for (let i = 0; i < shieldedPieces.length; i++) {
                                if (Object.values(shieldedPieces[i]).includes(shieldedPiece)) notIncluded = false
                            }
                            if (notIncluded) {
                                shieldedPieces.push({
                                    piece: shieldedPiece,
                                    shieldedBy: interceptingPieces[0]
                                })
                            }
                        }
                    }
                }
            }
        }

        const pawnMovement = (color, currentPiecePosition, row, column) => {
            const result = {
                threatenedPieces: [],
                threatenedCells: [],
                suitableCells: [],
                protectedPieces: []
            }
            const targetSimple = color === 'black' ? currentPiecePosition + 8 : currentPiecePosition - 8
            const targetDouble = color === 'black' ? currentPiecePosition + 16 : currentPiecePosition - 16
            const targetDiagonal = color === 'black' ? currentPiecePosition + 7 : currentPiecePosition - 9
            const targetDiagonal2 = color === 'black' ? currentPiecePosition + 9 : currentPiecePosition - 7
            const rowCheck = color === 'black' ? 2 : 7
            // simple move forward
            if (!Object.values(allPiecePositions).includes(targetSimple)) result.suitableCells.push(targetSimple)
            // double move forward
            if (rowCheck === row && !Object.values(allPiecePositions).includes(targetSimple) && !Object.values(allPiecePositions).includes(targetDouble)) result.suitableCells.push(targetDouble)
            // diagonal attack
            if (Object.values(allPiecePositions).includes(targetDiagonal)) {
                const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(targetDiagonal))[0][0]
                if (targetPiece.indexOf(color) === -1 && column > 1) {
                    result.threatenedPieces.push(targetPiece)
                }
                if (targetPiece.indexOf(color) !== -1 && column > 1) result.protectedPieces.push(targetPiece)
            } else {
                if (column > 1) result.threatenedCells.push(targetDiagonal)
            }
            if (Object.values(allPiecePositions).includes(targetDiagonal2)) {
                const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(targetDiagonal2))[0][0]
                if (targetPiece.indexOf(color) === -1 && column < 8) {
                    result.threatenedPieces.push(targetPiece)
                }
                if (targetPiece.indexOf(color) !== -1 && column < 8) result.protectedPieces.push(targetPiece)
            } else {
                if (column < 8) result.threatenedCells.push(targetDiagonal2)
            }
            return result
        }

        const rookBishopBaseMoves = (result, i, color, currentPiece, currentPiecePosition, moveForward, direction, column, row) => {
            let clear = true
            let column2 = ((moveForward) % 8) + 1
            let row2 = (((moveForward) - ((moveForward) % 8)) / 8) + 1
            let loopValue
            if (direction === 'down right') {
                if (column2 >= row2) loopValue = row2 - 1 - (row - 1)
                if (column2 < row2) loopValue = row2 - row
            } else if (direction === 'down left') {
                if (row2 <= width - column2) loopValue = row2 - 1 - (row - 1)
                if (row2 > width - column2) loopValue = width - column2 - (width - column)
            } else if (direction === 'up right') {
                if (column2 <= width - row2) loopValue = column2 - 1 - (column - 1)
                if (column2 > width - row2) loopValue = width - row2 - (width - row)
            } else if (direction === 'right') {
                loopValue = column2 - column
            } else if (direction === 'left') {
                loopValue = 7 - ((moveForward) % 8) - (width - column)
            } else if (direction === 'up') {
                loopValue = (7 - (((moveForward) - ((moveForward) % 8)) / 8)) - (width - row)
            } else if (direction === 'down') {
                loopValue = row2 - row;
            } else {
                if (column2 >= row2) loopValue = width - column2 - (width - column)
                if (column2 < row2) loopValue = width - row2 - (width - row)
            }
            for (let j = 0; j < loopValue; j++) {
                let moveBackward
                switch (direction) {
                    case 'right': moveBackward = moveForward - j;
                        break;
                    case 'left': moveBackward = moveForward + j;
                        break;
                    case 'up': moveBackward = moveForward + (j * 8);
                        break;
                    case 'down right': moveBackward = moveForward - (width * j + j);
                        break;
                    case 'down left': moveBackward = moveForward - (width * j - j);
                        break;
                    case 'up right': moveBackward = moveForward + (width * j - j);
                        break;
                    case 'up left': moveBackward = moveForward + (width * j + j);
                        break;
                    default: moveBackward = moveForward - (j * 8);
                }
                if (Object.values(allPiecePositions).includes(moveBackward) && moveBackward !== currentPiecePosition) {
                    if (Object.entries(allPiecePositions).filter(piece => piece.includes(moveBackward))[0][0].indexOf(color) === -1) {
                        checkShieldingPiece(loopValue - 1, direction, currentPiece, moveForward)
                    }
                    if (moveBackward !== moveForward) {
                        clear = false
                        break
                    }
                }
            }

            if (Object.values(allPiecePositions).includes(moveForward)) {
                const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(moveForward))[0][0]
                if (clear && targetPiece.indexOf(color) === -1) {
                    result.threatenedPieces.push(targetPiece)
                }
                if (clear && targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
            } else {
                if (clear || i === 1) result.suitableCells.push(moveForward)
            }
            return result
        }

        const rookMovement = (color, currentPiece, currentPiecePosition, width, row, column) => {
            let result = {
                threatenedPieces: [],
                suitableCells: [],
                protectedPieces: []
            }

            // right
            for (let i = 1; i <= width - column; i++) {
                result = rookBishopBaseMoves(result, i, color, currentPiece, currentPiecePosition, currentPiecePosition + i, 'right', column, row)
            }
            // left
            for (let i = 1; i < column; i++) {
                result = rookBishopBaseMoves(result, i, color, currentPiece, currentPiecePosition, currentPiecePosition - i, 'left', column, row)
            }
            // down
            for (let i = 1; i <= width - row; i++) {
                result = rookBishopBaseMoves(result, i, color, currentPiece, currentPiecePosition, currentPiecePosition + (i * width), 'down', column, row)
            }
            // up
            for (let i = 1; i < row; i++) {
                result = rookBishopBaseMoves(result, i, color, currentPiece, currentPiecePosition, currentPiecePosition - (i * width), 'up', column, row)
            }
            return result
        }

        const knightMovement = (color, currentPiecePosition, row, column) => {
            const result = {
                threatenedPieces: [],
                suitableCells: [],
                protectedPieces: []
            }

            const knightBaseMove = (color, currentPiecePosition, currentMove) => {
                if (!Object.values(allPiecePositions).includes(currentMove)) {
                    result.suitableCells.push(currentMove)
                } else {
                    const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentMove))[0][0]
                    if (targetPiece.indexOf(color) === -1) {
                        result.threatenedPieces.push(targetPiece)
                    }
                    if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
                }
            }

            if (column < 7 && row < 8) {
                knightBaseMove(color, currentPiecePosition, currentPiecePosition + 10)
            }
            if (column < 8 && row < 7) {
                knightBaseMove(color, currentPiecePosition, currentPiecePosition + 17)
            }
            if (column < 7 && row > 1) {
                knightBaseMove(color, currentPiecePosition, currentPiecePosition - 6)
            }
            if (column > 1 && row < 7) {
                knightBaseMove(color, currentPiecePosition, currentPiecePosition + 15)
            }
            if (column > 1 && row > 2) {
                knightBaseMove(color, currentPiecePosition, currentPiecePosition - 17)
            }
            if (column > 2 && row > 1) {
                knightBaseMove(color, currentPiecePosition, currentPiecePosition - 10)
            }
            if (column > 2 && row < 8) {
                knightBaseMove(color, currentPiecePosition, currentPiecePosition + 6)
            }
            if (column < 8 && row > 2) {
                knightBaseMove(color, currentPiecePosition, currentPiecePosition - 15)
            }
            return result
        }

        const bishopMovement = (color, currentPiece, currentPiecePosition, width, row, column) => {
            let result = {
                threatenedPieces: [],
                suitableCells: [],
                protectedPieces: []
            }

            let loopSize
            // down right
            if (column >= row) loopSize = width - column
            if (column < row) loopSize = width - row
            for (let i = 1; i <= loopSize; i++) {
                result = rookBishopBaseMoves(result, i, color, currentPiece, currentPiecePosition, currentPiecePosition + width * i + i, 'down right', column, row)
            }
            // down left
            if (column <= width - row) loopSize = column - 1
            if (column > width - row) loopSize = width - row
            for (let i = 1; i <= loopSize; i++) {
                result = rookBishopBaseMoves(result, i, color, currentPiece, currentPiecePosition, currentPiecePosition + width * i - i, 'down left', column, row)
            }
            // up right
            if (row <= width - column) loopSize = row - 1
            if (row > width - column) loopSize = width - column
            for (let i = 1; i <= loopSize; i++) {
                result = rookBishopBaseMoves(result, i, color, currentPiece, currentPiecePosition, currentPiecePosition - width * i + i, 'up right', column, row)
            }
            // up left
            if (column >= row) loopSize = row - 1
            if (column < row) loopSize = column - 1
            for (let i = 1; i <= loopSize; i++) {
                result = rookBishopBaseMoves(result, i, color, currentPiece, currentPiecePosition, currentPiecePosition - width * i - i, 'up left', column, row)
            }
            return result
        }

        const kingMovement = (color, currentPiece, currentPiecePosition, width, row, column) => {
            const result = {
                threatenedPieces: [],
                suitableCells: [],
                protectedPieces: []
            }

            const kingBaseMove = (color, move) => {
                if (!Object.values(allPiecePositions).includes(move)) {
                    result.suitableCells.push(move)
                } else {
                    const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(move))[0][0]
                    if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
                    if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
                }
            }

            if (column > 1 && row > 1) {
                kingBaseMove(color, currentPiecePosition - width - 1)
            }
            if (row > 1) {
                kingBaseMove(color, currentPiecePosition - width)
            }
            if (column < 8 && row > 1) {
                kingBaseMove(color, currentPiecePosition - width + 1)
            }
            if (column > 1) {
                kingBaseMove(color, currentPiecePosition - 1)
            }
            if (column < 8) {
                kingBaseMove(color, currentPiecePosition + 1)
            }
            if (row < 8 && column > 1) {
                kingBaseMove(color, currentPiecePosition + width - 1)
            }
            if (row < 8) {
                kingBaseMove(color, currentPiecePosition + width)
            }
            if (row < 8 && column < 8) {
                kingBaseMove(color, currentPiecePosition + width + 1)
            }
            // Castling
            const positionCheck = color === 'black' ? 4 : 60
            const pieceCheck = color === 'black' ? 'rook-black' : 'rook-white'
            //const currentPiece = Object.entries(allPiecePositions).filter(piece3 => piece3.includes(currentPiecePosition))[0][0]
            if (!check && allPiecePositions[currentPiece] === positionCheck && !Object.values(allPiecePositions).includes(positionCheck + 1) && !Object.values(allPiecePositions).includes(positionCheck + 2) && Object.values(allPiecePositions).includes(positionCheck + 3) && Object.entries(allPiecePositions).filter(piece => piece.includes(positionCheck + 3))[0][0].indexOf(pieceCheck) !== -1) {
                result.suitableCells.push(positionCheck + 2)
            }
            if (!check && allPiecePositions[currentPiece] === positionCheck && !Object.values(allPiecePositions).includes(positionCheck - 1) && !Object.values(allPiecePositions).includes(positionCheck - 2) && !Object.values(allPiecePositions).includes(positionCheck - 3) && Object.values(allPiecePositions).includes(positionCheck - 4) && Object.entries(allPiecePositions).filter(piece => piece.includes(positionCheck - 4))[0][0].indexOf(pieceCheck) !== -1) {
                result.suitableCells.push(positionCheck - 2)
            }
            return result
        }

        let allThreatenedCells = {
            'rook-black-1': [],
            'rook-black-2': [],
            'knight-black-1': [],
            'knight-black-2': [],
            'bishop-black-1': [],
            'bishop-black-2': [],
            'queen-black': [],
            'king-black': [],
            'pawn-black-1': [],
            'pawn-black-2': [],
            'pawn-black-3': [],
            'pawn-black-4': [],
            'pawn-black-5': [],
            'pawn-black-6': [],
            'pawn-black-7': [],
            'pawn-black-8': [],
            'pawn-white-1': [],
            'pawn-white-2': [],
            'pawn-white-3': [],
            'pawn-white-4': [],
            'pawn-white-5': [],
            'pawn-white-6': [],
            'pawn-white-7': [],
            'pawn-white-8': [],
            'rook-white-1': [],
            'rook-white-2': [],
            'knight-white-1': [],
            'knight-white-2': [],
            'bishop-white-1': [],
            'bishop-white-2': [],
            'queen-white': [],
            'king-white': []
        }

        const checkThreatVerify = (currentPiece, pieceMoves) => {
            for (let j = 0; j < pieceMoves.threatenedPieces.length; j++) {
                if (!allThreatenedCells[currentPiece].includes(allPiecePositions[pieceMoves.threatenedPieces[j]])) {
                    allThreatenedCells[currentPiece].push(allPiecePositions[pieceMoves.threatenedPieces[j]])
                }
            }
            for (let j = 0; j < pieceMoves.protectedPieces.length; j++) {
                if (!allThreatenedCells[currentPiece].includes(allPiecePositions[pieceMoves.protectedPieces[j]])) {
                    allThreatenedCells[currentPiece].push(allPiecePositions[pieceMoves.protectedPieces[j]])
                }
            }
            if (currentPiece.indexOf('pawn') !== -1) {
                for (let j = 0; j < pieceMoves.threatenedCells.length; j++) {
                    if (!allThreatenedCells[currentPiece].includes(pieceMoves.threatenedCells[j])) {
                        allThreatenedCells[currentPiece].push(pieceMoves.threatenedCells[j])
                    }
                }
            }
            if (currentPiece.indexOf('pawn') === -1) {
                for (let j = 0; j < pieceMoves.suitableCells.length; j++) {
                    if (!allThreatenedCells[currentPiece].includes(pieceMoves.suitableCells[j])) {
                        allThreatenedCells[currentPiece].push(pieceMoves.suitableCells[j])
                    }
                }
            }
        }
        for (let i = 0; i < Object.values(allPiecePositions).length; i++) {
            const currentPiece = Object.entries(allPiecePositions)[i][0]
            //console.log(currentPiece)
            const currentPosition = Object.entries(allPiecePositions)[i][1]
            if (currentPosition !== -1) {
                let column = (currentPosition % width) + 1
                let row = ((currentPosition - (currentPosition % width)) / width) + 1
                if (currentPiece.indexOf('pawn') !== -1) {
                    let pawnMoves = pawnMovement(currentPiece.split('-')[1], currentPosition, row, column)
                    checkThreatVerify(currentPiece, pawnMoves)
                }
                if (currentPiece.indexOf('rook') !== -1 || currentPiece.indexOf('queen') !== -1) {
                    let rookMoves = rookMovement(currentPiece.split('-')[1], currentPiece, currentPosition, width, row, column)
                    checkThreatVerify(currentPiece, rookMoves)
                }
                if (currentPiece.indexOf('knight') !== -1) {
                    let knightMoves = knightMovement(currentPiece.split('-')[1], currentPosition, row, column)
                    checkThreatVerify(currentPiece, knightMoves)
                }
                if (currentPiece.indexOf('bishop') !== -1 || currentPiece.indexOf('queen') !== -1) {
                    let bishopMoves = bishopMovement(currentPiece.split('-')[1], currentPiece, currentPosition, width, row, column)
                    checkThreatVerify(currentPiece, bishopMoves)
                }
                if (currentPiece.indexOf('king') !== -1) {
                    let kingMoves = kingMovement(currentPiece.split('-')[1], currentPiece, currentPosition, width, row, column)
                    checkThreatVerify(currentPiece, kingMoves)
                }
            }
        }

        let allPossibleMoves = {
            'king-black': [],
            'queen-black': [],
            'rook-black-1': [],
            'rook-black-2': [],
            'knight-black-1': [],
            'knight-black-2': [],
            'bishop-black-1': [],
            'bishop-black-2': [],
            'pawn-black-1': [],
            'pawn-black-2': [],
            'pawn-black-3': [],
            'pawn-black-4': [],
            'pawn-black-5': [],
            'pawn-black-6': [],
            'pawn-black-7': [],
            'pawn-black-8': []
        }

        //console.log('allThreatenedCells', allThreatenedCells)

        const pieceMoveLogic = (currentPiece, pieceMoves, column, row, indexOfThreateningPiece) => {
            let result = []
            for (let i = 0; i < pieceMoves.threatenedPieces.length; i++) {
                let clearedCell = false
                const shieldingFromColumn = (allPiecePositions[piecesShieldingKing['black'][indexOfThreateningPiece]?.shieldingFrom] % width) + 1
                const shieldingFromRow = ((allPiecePositions[piecesShieldingKing['black'][indexOfThreateningPiece]?.shieldingFrom] - (allPiecePositions[piecesShieldingKing['black'][indexOfThreateningPiece]?.shieldingFrom] % width)) / width) + 1
                const suitableCellColumn = (allPiecePositions[pieceMoves.threatenedPieces[i]] % width) + 1
                const suitableCellRow = ((allPiecePositions[pieceMoves.threatenedPieces[i]] - (allPiecePositions[pieceMoves.threatenedPieces[i]] % width)) / width) + 1
                if ((shieldingFromColumn === column && shieldingFromColumn === suitableCellColumn) || (shieldingFromRow === row && shieldingFromRow === suitableCellRow)) {
                    clearedCell = true
                } else {
                    if ((allPiecePositions[piecesShieldingKing['black'][indexOfThreateningPiece]?.shieldingFrom] % 7 === allPiecePositions[pieceMoves.threatenedPieces[i]] % 7 && allPiecePositions[piecesShieldingKing['black'][indexOfThreateningPiece]?.shieldingFrom] % 7 === allPiecePositions[currentPiece] % 7) || (allPiecePositions[piecesShieldingKing['black'][indexOfThreateningPiece]?.shieldingFrom] % 9 === allPiecePositions[pieceMoves.threatenedPieces[i]] % 9 && allPiecePositions[piecesShieldingKing['black'][indexOfThreateningPiece]?.shieldingFrom] % 9 === allPiecePositions[currentPiece] % 9)) {
                        clearedCell = true
                    }
                }
                if (clearedCell) result.push(allPiecePositions[pieceMoves.threatenedPieces[i]])
            }
            for (let i = 0; i < pieceMoves.suitableCells.length; i++) {
                let clearedCell = false
                const shieldingFromColumn = (allPiecePositions[piecesShieldingKing['black'][indexOfThreateningPiece]?.shieldingFrom] % width) + 1
                const shieldingFromRow = ((allPiecePositions[piecesShieldingKing['black'][indexOfThreateningPiece]?.shieldingFrom] - (allPiecePositions[piecesShieldingKing['black'][indexOfThreateningPiece]?.shieldingFrom] % width)) / width) + 1
                const suitableCellColumn = (pieceMoves.suitableCells[i] % width) + 1
                const suitableCellRow = ((pieceMoves.suitableCells[i] - (pieceMoves.suitableCells[i] % width)) / width) + 1
                if ((shieldingFromColumn === column && shieldingFromColumn === suitableCellColumn) || (shieldingFromRow === row && shieldingFromRow === suitableCellRow)) {
                    clearedCell = true
                } else {
                    if ((allPiecePositions[piecesShieldingKing['black'][indexOfThreateningPiece]?.shieldingFrom] % 7 === pieceMoves.suitableCells[i] % 7 && allPiecePositions[piecesShieldingKing['black'][indexOfThreateningPiece]?.shieldingFrom] % 7 === allPiecePositions[currentPiece] % 7) || (allPiecePositions[piecesShieldingKing['black'][indexOfThreateningPiece]?.shieldingFrom] % 9 === pieceMoves.suitableCells[i] % 9 && allPiecePositions[piecesShieldingKing['black'][indexOfThreateningPiece]?.shieldingFrom] % 9 === allPiecePositions[currentPiece] % 9)) {
                        clearedCell = true
                    }
                }
                if (clearedCell) result.push(pieceMoves.suitableCells[i])
            }
            return result
        }
        for (const piece in allThreatenedCells) {
            if (piece.split('-')[1] === 'black') {
                const currentPosition = allPiecePositions[piece]
                if (currentPosition !== -1) {
                    let column = (currentPosition % width) + 1
                    let row = ((currentPosition - (currentPosition % width)) / width) + 1
                    if (piece.split('-')[0] !== 'king') {
                        let pieceMoves
                        if (piece.split('-')[0] === 'pawn') {
                            pieceMoves = pawnMovement('black', currentPosition, row, column)
                        }
                        if (piece.split('-')[0] === 'rook' || piece.split('-')[0] === 'queen') {
                            pieceMoves = rookMovement('black', piece, currentPosition, width, row, column)
                        }
                        if (piece.split('-')[0] === 'knight') {
                            pieceMoves = knightMovement('black', currentPosition, row, column)
                        }
                        if (piece.split('-')[0] === 'bishop') {
                            pieceMoves = bishopMovement('black', piece, currentPosition, width, row, column)
                        }
                        if (piece.split('-')[0] === 'queen') {
                            let pieceMoves2 = bishopMovement('black', piece, currentPosition, width, row, column)
                            for (let j = 0; j < pieceMoves2.threatenedPieces.length; j++) {
                                if (!pieceMoves.threatenedPieces.includes(pieceMoves2.threatenedPieces[j])) pieceMoves.threatenedPieces.push(pieceMoves2.threatenedPieces[j])
                            }
                            for (let j = 0; j < pieceMoves2.protectedPieces.length; j++) {
                                if (!pieceMoves.protectedPieces.includes(pieceMoves2.protectedPieces[j])) pieceMoves.protectedPieces.push(pieceMoves2.protectedPieces[j])
                            }
                            for (let j = 0; j < pieceMoves2.suitableCells.length; j++) {
                                if (!pieceMoves.suitableCells.includes(pieceMoves2.suitableCells[j])) pieceMoves.suitableCells.push(pieceMoves2.suitableCells[j])
                            }
                        }
                        let notShielding = true
                        let indexOfThreateningPiece = -1
                        for (let i = 0; i < piecesShieldingKing['black'].length; i++) {
                            if (piecesShieldingKing['black'][i]?.piece === piece) {
                                indexOfThreateningPiece = i
                                notShielding = false
                                break
                            }
                        }
                        if (!notShielding && indexOfThreateningPiece !== -1) {
                            let allowedCells = pieceMoveLogic(piece, pieceMoves, column, row, indexOfThreateningPiece)
                            for (let j = 0; j < allowedCells.length; j++) {
                                allPossibleMoves[piece].push(allowedCells[j])
                            }
                        } else {
                            for (let i = 0; i < pieceMoves.suitableCells.length; i++) {
                                if (!Object.values(allPiecePositions).includes(pieceMoves.suitableCells[i])) allPossibleMoves[piece].push(pieceMoves.suitableCells[i])
                            }
                            for (let i = 0; i < pieceMoves.threatenedPieces.length; i++) {
                                allPossibleMoves[piece].push(allPiecePositions[pieceMoves.threatenedPieces[i]])
                            }
                        }
                    } else {
                        const kingMoves = kingMovement('black', piece, currentPosition, width, row, column)
                        const allThreatenedByOpponent = []
                        for (let i = 0; i < Object.entries(allThreatenedCells).length; i++) {
                            if (Object.entries(allThreatenedCells)[i][0].indexOf('black') === -1) allThreatenedByOpponent.push(Object.entries(allThreatenedCells)[i][1])
                        }
                        for (let i = 0; i < kingMoves.threatenedPieces.length; i++) {
                            if (!allThreatenedByOpponent.flat().includes(allPiecePositions[kingMoves.threatenedPieces[i]])) allPossibleMoves[piece].push(allPiecePositions[kingMoves.threatenedPieces[i]])
                        }
                        for (let i = 0; i < kingMoves.suitableCells.length; i++) {
                            if (!allThreatenedByOpponent.flat().includes(kingMoves.suitableCells[i])) allPossibleMoves[piece].push(kingMoves.suitableCells[i])
                        }
                    }
                }
            }
        }

        console.log('allPossibleMoves', allPossibleMoves)
        //console.log('piecesShieldingKing', piecesShieldingKing)

        console.log('shieldedCells', shieldedCells)
        console.log('shieldedPieces', shieldedPieces)
        console.log('piecesShieldingKing', piecesShieldingKing)

        let currentBestMove = {
            piece: '',
            cell: -1,
            cellValue: -50
        }

        const pawnValue = 1
        const bishopValue = 4
        const knightValue = 6
        const rookValue = 8
        const queenValue = 10
        const kingValue = 20

        for (const blackPiece in allPossibleMoves) {
            let pieceValue = 0
            if (blackPiece.split('-')[0] === 'pawn') pieceValue -= pawnValue * 1
            if (blackPiece.split('-')[0] === 'bishop') pieceValue -= bishopValue * 1
            if (blackPiece.split('-')[0] === 'knight') pieceValue -= knightValue * 1
            if (blackPiece.split('-')[0] === 'rook') pieceValue -= rookValue * 1
            if (blackPiece.split('-')[0] === 'queen') pieceValue -= queenValue * 1
            if (blackPiece.split('-')[0] === 'king') pieceValue -= kingValue * 1
            const currentBlackPiecePosition = allPiecePositions[blackPiece]
            // if the current piece is threatened (pieceValue + piece value * 3)
            if (Object.values(allThreatenedCells).flat().includes(currentBlackPiecePosition)) {
                const currentThreateningPiece = Object.entries(allThreatenedCells).filter(piece => piece.flat().includes(currentBlackPiecePosition)).filter(piece => piece[0].split('-')[1] !== 'black')
                if (currentThreateningPiece.length) {
                    if (blackPiece.split('-')[0] === 'pawn') pieceValue += pawnValue * 3
                    if (blackPiece.split('-')[0] === 'bishop') pieceValue += bishopValue * 3
                    if (blackPiece.split('-')[0] === 'knight') pieceValue += knightValue * 3
                    if (blackPiece.split('-')[0] === 'rook') pieceValue += rookValue * 3
                    if (blackPiece.split('-')[0] === 'queen') pieceValue += queenValue * 3
                    if (blackPiece.split('-')[0] === 'king') pieceValue += kingValue * 3
                }
                // CHECK IF THE PIECE IS CLOSE TO THE KING AND THREATENED BY MORE THAN ONE ENEMY PIECE (POSSIBLE CHECKMATE)
                if (true) { }
            }
            for (let i = 0; i < allPossibleMoves[blackPiece].length; i++) {
                let currentCellValue = pieceValue
                const currentCell = allPossibleMoves[blackPiece][i]
                let trueConditions = [ `currentCell: ${currentCell}`, `pieceValue: ${pieceValue}`]
                // if the target cell contains an enemy piece (currentValue + enemy piece value * 2)
                if (Object.values(allPiecePositions).includes(currentCell)) {
                    const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentCell))[0][0]
                    if (targetPiece.split('-')[1] !== 'black') {
                        if (targetPiece.split('-')[0] === 'pawn') currentCellValue += pawnValue * 3
                        if (targetPiece.split('-')[0] === 'bishop') currentCellValue += bishopValue * 3
                        if (targetPiece.split('-')[0] === 'knight') currentCellValue += knightValue * 3
                        if (targetPiece.split('-')[0] === 'rook') currentCellValue += rookValue * 3
                        if (targetPiece.split('-')[0] === 'queen') currentCellValue += queenValue * 3
                        if (targetPiece.split('-')[0] === 'king') currentCellValue += kingValue * 3
                        trueConditions.push('target cell contains an enemy piece (currentCellValue + enemy piece value * 2)', `currentCellValue: ${currentCellValue}`)
                    }
                    // if the enemy piece in the target cell is threatening a friendly piece (currentValue + friendly piece value * 2)
                    if (targetPiece) {
                        for (let j = 0; j < allThreatenedCells[targetPiece].length; j++) {
                            if (Object.values(allPiecePositions).includes(allThreatenedCells[targetPiece][j])) {
                                const threatenedPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(allThreatenedCells[targetPiece][j]))[0][0]
                                if (threatenedPiece !== blackPiece && threatenedPiece.split('-')[1] === 'black') {
                                    if (targetPiece.split('-')[0] === 'pawn') currentCellValue += pawnValue * 2
                                    if (targetPiece.split('-')[0] === 'bishop') currentCellValue += bishopValue * 2
                                    if (targetPiece.split('-')[0] === 'knight') currentCellValue += knightValue * 2
                                    if (targetPiece.split('-')[0] === 'rook') currentCellValue += rookValue * 2
                                    if (targetPiece.split('-')[0] === 'queen') currentCellValue += queenValue * 2
                                    if (targetPiece.split('-')[0] === 'king') currentCellValue += kingValue * 2
                                    trueConditions.push('target piece is threatening friendly piece (currentCellValue + friendly piece value * 2)', `currentCellValue: ${currentCellValue}`)
                                }
                            }
                        }
                    }
                }
                // if the target cell is threateaned (currentCellValue - piece value * 3)
                if (Object.values(allThreatenedCells).flat().includes(currentCell)) {
                    const threateningPiece = Object.entries(allThreatenedCells).filter(piece => piece.flat().includes(currentCell)).filter(piece => piece[0].split('-')[1] !== 'black')
                    if (threateningPiece.length) {
                        if (blackPiece.split('-')[0] === 'pawn') currentCellValue -= pawnValue * 3
                        if (blackPiece.split('-')[0] === 'bishop') currentCellValue -= bishopValue * 3
                        if (blackPiece.split('-')[0] === 'knight') currentCellValue -= knightValue * 3
                        if (blackPiece.split('-')[0] === 'rook') currentCellValue -= rookValue * 3
                        if (blackPiece.split('-')[0] === 'queen') currentCellValue -= queenValue * 3
                        if (blackPiece.split('-')[0] === 'king') currentCellValue -= kingValue * 3
                        trueConditions.push('target cell is threatened (currentCellValue - piece value * 4)', 'by', threateningPiece, `currentCellValue: ${currentCellValue}`)
                    } else { // if the cells behind the current piece are also threatened
                        const threateningPiece2 = Object.entries(allThreatenedCells).filter(piece => piece.flat().includes(allPiecePositions[blackPiece])).filter(piece => piece[0].split('-')[1] !== 'black')
                        let notThreatened = true
                        for (let j = 0; j < threateningPiece2.length; j++) {
                            let trueThreat = false
                            if (Object.values(allPiecePositions).includes(currentCell)) {
                                if (threateningPiece2[j][0] !== Object.entries(allPiecePositions).filter(piece => piece.includes(currentCell))[0][0]) {
                                    trueThreat = true
                                }
                            }
                            if (trueThreat || !Object.values(allPiecePositions).includes(currentCell)) {
                                const threateningPiecePosition = allPiecePositions[threateningPiece2[j][0]]
                                const currentPieceColumn = (allPiecePositions[blackPiece] % width) + 1
                                const currentPieceRow = ((allPiecePositions[blackPiece] - (allPiecePositions[blackPiece] % width)) / width) + 1
                                const threateningPieceColumn = (threateningPiecePosition % width) + 1
                                const threateningPieceRow = ((threateningPiecePosition - (threateningPiecePosition % width)) / width) + 1
                                const currentCellColumn = (currentCell % width) + 1
                                const currentCellRow = ((currentCell - (currentCell % width)) / width) + 1
                                if ((threateningPieceColumn === currentPieceColumn && threateningPieceColumn === currentCellColumn) || (threateningPieceRow === currentPieceRow && threateningPieceRow === currentCellRow)) {
                                    notThreatened = false
                                } else {
                                    if ((threateningPiecePosition % 7 === currentCell % 7 && threateningPiecePosition % 7 === allPiecePositions[blackPiece] % 7) || (threateningPiecePosition % 9 === currentCell % 9 && threateningPiecePosition % 9 === allPiecePositions[blackPiece] % 9)) {
                                        notThreatened = false
                                    }
                                }
                            }
                        }
                        if (notThreatened) {
                            // if the target cell contains an enemy piece (currentValue + enemy piece value * 3)
                            if (Object.values(allPiecePositions).includes(currentCell)) {
                                const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentCell))[0][0]
                                if (targetPiece.split('-')[1] !== 'black') {
                                    if (targetPiece.split('-')[0] === 'pawn') currentCellValue += pawnValue * 3
                                    if (targetPiece.split('-')[0] === 'bishop') currentCellValue += bishopValue * 3
                                    if (targetPiece.split('-')[0] === 'knight') currentCellValue += knightValue * 3
                                    if (targetPiece.split('-')[0] === 'rook') currentCellValue += rookValue * 3
                                    if (targetPiece.split('-')[0] === 'queen') currentCellValue += queenValue * 3
                                    if (targetPiece.split('-')[0] === 'king') currentCellValue += kingValue * 3
                                    trueConditions.push('target cell is not threatened (currentCellValue + enemy piece value * 3)', `currentCellValue: ${currentCellValue}`)
                                }
                            } else {
                                currentCellValue += 1
                                trueConditions.push('target cell is not threatened (currentCellValue + 1)', 'by', threateningPiece2, `currentCellValue: ${currentCellValue}`)
                            }
                        } else {
                            if (blackPiece.split('-')[0] === 'pawn') currentCellValue -= pawnValue * 2
                            if (blackPiece.split('-')[0] === 'bishop') currentCellValue -= bishopValue * 2
                            if (blackPiece.split('-')[0] === 'knight') currentCellValue -= knightValue * 2
                            if (blackPiece.split('-')[0] === 'rook') currentCellValue -= rookValue * 2
                            if (blackPiece.split('-')[0] === 'queen') currentCellValue -= queenValue * 2
                            if (blackPiece.split('-')[0] === 'king') currentCellValue -= kingValue * 2
                            trueConditions.push('target cell is threatened (currentCellValue - piece value * 2)', 'by', threateningPiece2, `currentCellValue: ${currentCellValue}`)
                        }
                    }
                    // if the target cell is defended by friendly piece
                    const defendingPieces = Object.entries(allThreatenedCells).filter(piece => piece.flat().includes(currentCell)).filter(piece => piece[0].split('-')[1] === 'black').filter(piece => piece[0] !== blackPiece)
                    if (defendingPieces.length) {
                        currentCellValue += 1
                        trueConditions.push('target cell defended (currentCellValue + 1)', 'by', defendingPieces, `currentCellValue: ${currentCellValue}`)
                    }
                }

                // All cells threatened from the target cell
                const allCellsThreatenedFromCurrentCell = []
                let blackPieceMoves
                let column = (currentCell % width) + 1
                let row = ((currentCell - (currentCell % width)) / width) + 1
                if (blackPiece.indexOf('pawn') !== -1) {
                    blackPieceMoves = pawnMovement('black', currentCell, row, column)
                    for (let j = 0; j < blackPieceMoves.threatenedPieces.length; j++) {
                        if (!allCellsThreatenedFromCurrentCell.includes(allPiecePositions[blackPieceMoves.threatenedPieces[j]])) {
                            allCellsThreatenedFromCurrentCell.push(allPiecePositions[blackPieceMoves.threatenedPieces[j]])
                        }
                    }
                    for (let j = 0; j < blackPieceMoves.protectedPieces.length; j++) {
                        if (!allCellsThreatenedFromCurrentCell.includes(allPiecePositions[blackPieceMoves.protectedPieces[j]])) {
                            allCellsThreatenedFromCurrentCell.push(allPiecePositions[blackPieceMoves.protectedPieces[j]])
                        }
                    }
                    for (let j = 0; j < blackPieceMoves.threatenedCells.length; j++) {
                        if (!allCellsThreatenedFromCurrentCell.includes(blackPieceMoves.threatenedCells[j])) {
                            allCellsThreatenedFromCurrentCell.push(blackPieceMoves.threatenedCells[j])
                        }
                    }
                }
                if (blackPiece.indexOf('rook') !== -1 || blackPiece.indexOf('queen') !== -1) {
                    blackPieceMoves = rookMovement('black', blackPiece, currentCell, width, row, column)
                    for (let j = 0; j < blackPieceMoves.threatenedPieces.length; j++) {
                        if (!allCellsThreatenedFromCurrentCell.includes(allPiecePositions[blackPieceMoves.threatenedPieces[j]])) {
                            allCellsThreatenedFromCurrentCell.push(allPiecePositions[blackPieceMoves.threatenedPieces[j]])
                        }
                    }
                    for (let j = 0; j < blackPieceMoves.protectedPieces.length; j++) {
                        if (!allCellsThreatenedFromCurrentCell.includes(allPiecePositions[blackPieceMoves.protectedPieces[j]])) {
                            allCellsThreatenedFromCurrentCell.push(allPiecePositions[blackPieceMoves.protectedPieces[j]])
                        }
                    }
                    for (let j = 0; j < blackPieceMoves.suitableCells.length; j++) {
                        if (!allCellsThreatenedFromCurrentCell.includes(blackPieceMoves.suitableCells[j])) {
                            allCellsThreatenedFromCurrentCell.push(blackPieceMoves.suitableCells[j])
                        }
                    }
                }
                if (blackPiece.indexOf('knight') !== -1) {
                    blackPieceMoves = knightMovement('black', currentCell, row, column)
                    for (let j = 0; j < blackPieceMoves.threatenedPieces.length; j++) {
                        if (!allCellsThreatenedFromCurrentCell.includes(allPiecePositions[blackPieceMoves.threatenedPieces[j]])) {
                            allCellsThreatenedFromCurrentCell.push(allPiecePositions[blackPieceMoves.threatenedPieces[j]])
                        }
                    }
                    for (let j = 0; j < blackPieceMoves.protectedPieces.length; j++) {
                        if (!allCellsThreatenedFromCurrentCell.includes(allPiecePositions[blackPieceMoves.protectedPieces[j]])) {
                            allCellsThreatenedFromCurrentCell.push(allPiecePositions[blackPieceMoves.protectedPieces[j]])
                        }
                    }
                    for (let j = 0; j < blackPieceMoves.suitableCells.length; j++) {
                        if (!allCellsThreatenedFromCurrentCell.includes(blackPieceMoves.suitableCells[j])) {
                            allCellsThreatenedFromCurrentCell.push(blackPieceMoves.suitableCells[j])
                        }
                    }
                }
                if (blackPiece.indexOf('bishop') !== -1 || blackPiece.indexOf('queen') !== -1) {
                    blackPieceMoves = bishopMovement('black', blackPiece, currentCell, width, row, column)
                    for (let j = 0; j < blackPieceMoves.threatenedPieces.length; j++) {
                        if (!allCellsThreatenedFromCurrentCell.includes(allPiecePositions[blackPieceMoves.threatenedPieces[j]])) {
                            allCellsThreatenedFromCurrentCell.push(allPiecePositions[blackPieceMoves.threatenedPieces[j]])
                        }
                    }
                    for (let j = 0; j < blackPieceMoves.protectedPieces.length; j++) {
                        if (!allCellsThreatenedFromCurrentCell.includes(allPiecePositions[blackPieceMoves.protectedPieces[j]])) {
                            allCellsThreatenedFromCurrentCell.push(allPiecePositions[blackPieceMoves.protectedPieces[j]])
                        }
                    }
                    for (let j = 0; j < blackPieceMoves.suitableCells.length; j++) {
                        if (!allCellsThreatenedFromCurrentCell.includes(blackPieceMoves.suitableCells[j])) {
                            allCellsThreatenedFromCurrentCell.push(blackPieceMoves.suitableCells[j])
                        }
                    }
                }
                if (blackPiece.indexOf('king') !== -1) {
                    blackPieceMoves = kingMovement('black', currentCell, width, row, column)
                    for (let j = 0; j < blackPieceMoves.threatenedPieces.length; j++) {
                        if (!allCellsThreatenedFromCurrentCell.includes(allPiecePositions[blackPieceMoves.threatenedPieces[j]])) {
                            allCellsThreatenedFromCurrentCell.push(allPiecePositions[blackPieceMoves.threatenedPieces[j]])
                        }
                    }
                    for (let j = 0; j < blackPieceMoves.protectedPieces.length; j++) {
                        if (!allCellsThreatenedFromCurrentCell.includes(allPiecePositions[blackPieceMoves.protectedPieces[j]])) {
                            allCellsThreatenedFromCurrentCell.push(allPiecePositions[blackPieceMoves.protectedPieces[j]])
                        }
                    }
                    for (let j = 0; j < blackPieceMoves.suitableCells.length; j++) {
                        if (!allCellsThreatenedFromCurrentCell.includes(blackPieceMoves.suitableCells[j])) {
                            allCellsThreatenedFromCurrentCell.push(blackPieceMoves.suitableCells[j])
                        }
                    }
                }
                // if a friendly piece can be defended from the target cell
                for (let j = 0; j < blackPieceMoves.protectedPieces.length; j++) {
                    if (Object.values(allThreatenedCells).includes(allPiecePositions[blackPieceMoves.protectedPieces[j]])) {
                        //if the friendly piece to be defended is already being defended by another friendly piece
                        const defendingPieces = Object.entries(allThreatenedCells).filter(piece => piece.flat().includes(allPiecePositions[blackPieceMoves.protectedPieces[j]])).filter(piece => piece[0].split('-')[1] === 'black').filter(piece => piece[0] !== blackPiece)
                        if (!defendingPieces.length) { //(currentCellValue + value of piece to be defended)
                            if (blackPieceMoves.protectedPieces[j].split('-')[0] === 'pawn') currentCellValue += pawnValue
                            if (blackPieceMoves.protectedPieces[j].split('-')[0] === 'bishop') currentCellValue += bishopValue
                            if (blackPieceMoves.protectedPieces[j].split('-')[0] === 'knight') currentCellValue += knightValue
                            if (blackPieceMoves.protectedPieces[j].split('-')[0] === 'rook') currentCellValue += rookValue
                            if (blackPieceMoves.protectedPieces[j].split('-')[0] === 'queen') currentCellValue += queenValue
                            if (blackPieceMoves.protectedPieces[j].split('-')[0] === 'king') currentCellValue += kingValue
                            trueConditions.push('friendly piece is not defended (currentCellValue + value of piece to be defended)', `currentCellValue: ${currentCellValue}`)
                        } else {
                            currentCellValue += 1
                            trueConditions.push('friendly piece is already defended (currentCellValue + 1)', `currentCellValue: ${currentCellValue}`)
                        }
                        const threateningPieces = Object.entries(allThreatenedCells).filter(piece => piece.flat().includes(allPiecePositions[blackPieceMoves.protectedPieces[j]])).filter(piece => piece[0].split('-')[1] !== 'black')
                        if (threateningPieces.length) { //(currentCellValue + value of piece to be defended)
                            if (blackPieceMoves.protectedPieces[j].split('-')[0] === 'pawn') currentCellValue += pawnValue
                            if (blackPieceMoves.protectedPieces[j].split('-')[0] === 'bishop') currentCellValue += bishopValue
                            if (blackPieceMoves.protectedPieces[j].split('-')[0] === 'knight') currentCellValue += knightValue
                            if (blackPieceMoves.protectedPieces[j].split('-')[0] === 'rook') currentCellValue += rookValue
                            if (blackPieceMoves.protectedPieces[j].split('-')[0] === 'queen') currentCellValue += queenValue
                            if (blackPieceMoves.protectedPieces[j].split('-')[0] === 'king') currentCellValue += kingValue
                            trueConditions.push('friendly piece is threatened (currentCellValue + value of piece to be defended)', `currentCellValue: ${currentCellValue}`)
                        } else { // if the friendly piece to be defended is being threatened by one or more enemy pieces
                            currentCellValue += 1
                            trueConditions.push('friendly piece is not threatened (currentCellValue + 1)', `currentCellValue: ${currentCellValue}`)
                        }
                    }
                }
                //if the piece to be moved can threaten an enemy piece from the target cell
                for (let j = 0; j < blackPieceMoves.threatenedPieces.length; j++) {
                    //if the enemy piece to be threatened is also being threatened by another friendly piece  (currentCellValue + 1)
                    const threateningPieces = Object.entries(allThreatenedCells).filter(piece => piece.flat().includes(blackPieceMoves.threatenedPieces[j]))
                    if (threateningPieces.length >= 2) {
                        currentCellValue += 1
                        trueConditions.push('enemy piece is already threatened (currentCellValue + 1)', `currentCellValue: ${currentCellValue}`)
                    } else { // (currentCellValue + enemy piece value)
                        if (blackPieceMoves.threatenedPieces[j].split('-')[0] === 'pawn') currentCellValue += pawnValue
                        if (blackPieceMoves.threatenedPieces[j].split('-')[0] === 'bishop') currentCellValue += bishopValue
                        if (blackPieceMoves.threatenedPieces[j].split('-')[0] === 'knight') currentCellValue += knightValue
                        if (blackPieceMoves.threatenedPieces[j].split('-')[0] === 'rook') currentCellValue += rookValue
                        if (blackPieceMoves.threatenedPieces[j].split('-')[0] === 'queen') currentCellValue += queenValue
                        if (blackPieceMoves.threatenedPieces[j].split('-')[0] === 'king') currentCellValue += kingValue
                        trueConditions.push('enemy piece can be threatened (currentCellValue + enemy piece value)', `currentCellValue: ${currentCellValue}`)
                    }
                }

                // if the target cell is being shielded by a friendly piece (currentCellValue - 3)
                if (shieldedCells.includes(currentCell)) {
                    currentCellValue -= 3
                    trueConditions.push('target cell is shielded (currentCellValue - 3)', `currentCellValue: ${currentCellValue}`)
                }

                // if the movement will leave a friendly piece exposed (currentCellValue - friendly piece value * 2)
                for (let j = 0; j < shieldedPieces.length; j++ ) {
                    if (shieldedPieces[j].shieldedBy === blackPiece) {
                        if (shieldedPieces[j].piece.split('-')[0] === 'pawn') currentCellValue -= pawnValue * 2
                        if (shieldedPieces[j].piece.split('-')[0] === 'bishop') currentCellValue -= bishopValue * 2
                        if (shieldedPieces[j].piece.split('-')[0] === 'knight') currentCellValue -= knightValue * 2
                        if (shieldedPieces[j].piece.split('-')[0] === 'rook') currentCellValue -= rookValue * 2
                        if (shieldedPieces[j].piece.split('-')[0] === 'queen') currentCellValue -= queenValue * 2
                        trueConditions.push('piece is shielding a friendly piece (currentCellValue - friendly piece value * 2)', `currentCellValue: ${currentCellValue}`)
                    }
                }
                //if the friendly piece is defended (currentCellValue - 1)
                if (true) { }

                // if a friendly piece can be shielded from the target cell
                if (true) { }

                if (currentCellValue > currentBestMove.cellValue) {
                    currentBestMove = {
                        piece: blackPiece,
                        cell: currentCell,
                        cellValue: currentCellValue
                    }
                }
                if (blackPiece === 'pawn-black-7') console.log('trueConditions', trueConditions)
            }
        }

        console.log('currentBestMove', currentBestMove)

        var bestMove = {
            selectedPiece: currentBestMove.piece,
            selectedPosition: currentBestMove.cell
        }

        window.sessionStorage.setItem('codeRan', true)
    }

    return bestMove
}

export default nextMove