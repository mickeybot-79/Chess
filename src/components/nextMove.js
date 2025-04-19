
const nextMove = (allPiecePositions, check, piecesShieldingKing, cellsInterceptingCheck, checkingPiece) => {

    let codeRan = window.sessionStorage.getItem('codeRan')

    let width = 8

    if (codeRan === 'false') {

        let shieldedCells = []

        let shieldedPieces = []

        const checkShieldingPiece = (loopValue, direction, mainPiece, currentCellPosition) => {
            const interceptingPieces = []
            let currentPiece
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
                    currentPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(nextValue))[0][0]
                    interceptingPieces.push(currentPiece)
                }
            }

            if (interceptingPieces.length === 1 && interceptingPieces[0].split('-')[1] === 'black') {
                if (mainPiece.split('-')[1] !== 'black') {
                    if (!Object.values(allPiecePositions).includes(currentCellPosition) && !shieldedCells.includes(currentCellPosition)) {
                        shieldedCells.push(currentCellPosition)
                    }
                    if (Object.values(allPiecePositions).includes(currentCellPosition)) {
                        const shieldedPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentCellPosition))[0][0]
                        //if (shieldedPiece.split('-')[0] !== 'king') {
                        if (shieldedPiece.split('-')[0] !== 'king' && shieldedPiece.split('-')[1] === 'black') {
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
                        for (let i = 0; i < allPossibleMoves[piece].length; i++) {
                            if (check) {
                                let threatened = false

                                const checkingPiecePosition = allPiecePositions[checkingPiece]
                                const checkingPieceColumn = (checkingPiecePosition % width) + 1
                                const checkingPieceRow = ((checkingPiecePosition - (checkingPiecePosition % width)) / width) + 1
                                const currentCellColumn = (allPossibleMoves[piece][i] % width) + 1
                                const currentCellRow = ((allPossibleMoves[piece][i] - (allPossibleMoves[piece][i] % width)) / width) + 1
                                if ((checkingPieceColumn === column && checkingPieceColumn === currentCellColumn) || (checkingPieceRow === row && checkingPieceRow === currentCellRow)) {
                                    threatened = true
                                } else {
                                    if ((checkingPiecePosition % 7 === allPossibleMoves[piece][i] % 7 && checkingPiecePosition % 7 === allPiecePositions[piece] % 7) || (checkingPiecePosition % 9 === allPossibleMoves[piece][i] % 9 && checkingPiecePosition % 9 === allPiecePositions[piece] % 9)) {
                                        threatened = true
                                    }
                                }

                                if (threatened) {
                                    allPossibleMoves[piece].splice(i, 1)
                                }
                            }
                        }
                    }
                }
            }
        }

        //console.log('allPossibleMoves', allPossibleMoves)
        //console.log('piecesShieldingKing', piecesShieldingKing)

        // console.log('shieldedCells', shieldedCells)
        // console.log('shieldedPieces', shieldedPieces)
        // console.log('piecesShieldingKing', piecesShieldingKing)

        let currentBestMove = {
            piece: '',
            cell: -1,
            cellValue: -50
        }

        const pawnValue = 1
        const bishopValue = 5
        const knightValue = 10
        const rookValue = 15
        const queenValue = 20
        const kingValue = 30

        /*
            SCORE LOGIC: 
            piece threatened: piece value * 2
            piece defended: piece value
            piece shielded: piece value
            threatening a cell adjacent to the king: if not already threatened, +10, if already threatened, +20
        */

        const piecesAdjacentToTheKing = []
        for (let i = 0; i < allThreatenedCells['king-black'].length; i++) {
            if (Object.values(allPiecePositions).includes(allThreatenedCells['king-black'][i])) {
                const currentAdjacentPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(allThreatenedCells['king-black'][i]))[0][0]
                if (currentAdjacentPiece.split('-')[1] === 'black' && !piecesAdjacentToTheKing.includes(currentAdjacentPiece)) piecesAdjacentToTheKing.push(currentAdjacentPiece)
            }
        }

        let possibleCheckMate = false
        let possibleChecMatePieces = []
        const allCellsThreatenedByEnemy = []
        for (const piece in allPiecePositions) {
            if (piece[0].split('-')[1] !== 'black') {
                for (let i = 0; i < allThreatenedCells[piece].length; i++) {
                    if (!allCellsThreatenedByEnemy.includes(allCellsThreatenedByEnemy)) allCellsThreatenedByEnemy.push(allThreatenedCells[piece][i])
                }
            }
        }

        for (let i = 0; i < allThreatenedCells['king-black'].length; i++) {
            const enemyPiecesThreateningCurrentCell = Object.entries(allThreatenedCells).filter(piece => piece[0].split('-')[1] !== 'black').filter(piece => piece.flat().includes(allThreatenedCells['king-black'][i]))
            if (enemyPiecesThreateningCurrentCell.length > 1) {
                possibleCheckMate = true
                for (let j = 0; j < enemyPiecesThreateningCurrentCell.length; j++) {
                    if (!possibleChecMatePieces.includes(enemyPiecesThreateningCurrentCell[j])) possibleChecMatePieces.push(enemyPiecesThreateningCurrentCell[j])
                }
            }
        }

        for (const blackPiece in allPossibleMoves) {

            if (!check) {

                let pieceValue = 0
                // (piece value is counted negatively, lower pieces should be moved first)
                if (blackPiece.split('-')[0] === 'pawn') pieceValue -= pawnValue * 1
                if (blackPiece.split('-')[0] === 'bishop') pieceValue -= bishopValue * 1
                if (blackPiece.split('-')[0] === 'knight') pieceValue -= knightValue * 1
                if (blackPiece.split('-')[0] === 'rook') pieceValue -= rookValue * 1
                if (blackPiece.split('-')[0] === 'queen') pieceValue -= queenValue * 1
                if (blackPiece.split('-')[0] === 'king') pieceValue -= kingValue * 1

                const blackPiecePosition = allPiecePositions[blackPiece]

                // CURRENT PIECE STATE:

                for (let i = 0; i < allThreatenedCells[blackPiece].length; i++) {
                    if (Object.values(allPiecePositions).includes(allThreatenedCells[blackPiece][i])) {
                        const currentThreatenedPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(allThreatenedCells[blackPiece][i]))[0][0]
                        const currentThreatenedPiecePosition = allPiecePositions[currentThreatenedPiece]
                        if (currentThreatenedPiece.split('-')[1] !== 'black') {
                            const friendlyPiecesThreateningCurrentPiece = Object.entries(allThreatenedCells).filter(piece => piece.flat().includes(currentThreatenedPiecePosition)).filter(piece => piece[0].split('-')[1] === 'black')
                            if (friendlyPiecesThreateningCurrentPiece.length === 1) { // enemy piece being threatened by only current blackPiece
                                // is threatening - (+ enemy piece value * 2)
                                if (currentThreatenedPiece.split('-')[0] === 'pawn') pieceValue += pawnValue * 2
                                if (currentThreatenedPiece.split('-')[0] === 'bishop') pieceValue += bishopValue * 2
                                if (currentThreatenedPiece.split('-')[0] === 'knight') pieceValue += knightValue * 2
                                if (currentThreatenedPiece.split('-')[0] === 'rook') pieceValue += rookValue * 2
                                if (currentThreatenedPiece.split('-')[0] === 'queen') pieceValue += queenValue * 2
                                if (currentThreatenedPiece.split('-')[0] === 'king') pieceValue += kingValue * 2
                            }
                        } else {
                            const friendlyPiecesProtectingCurrentFriendlyPiece = Object.entries(allThreatenedCells).filter(piece => piece.flat().includes(currentThreatenedPiecePosition)).filter(piece => piece[0].split('-')[1] === 'black')
                            if (friendlyPiecesProtectingCurrentFriendlyPiece.length === 1) { // friendly piece being protected only by current blackPiece
                                const threateningPieces = Object.entries(allThreatenedCells).filter(piece => piece.flat().includes(currentThreatenedPiece)).filter(piece => piece[0].split('-')[1] !== 'black')
                                // is protecting - (- friendly piece value)
                                for (let j = 0; j < threateningPieces.length; j++) { // the piece value is counted for every piece threatening the current friendly piece (the more threats, the lower the incentive to move the current blackPiece)
                                    if (currentThreatenedPiece.split('-')[0] === 'pawn') pieceValue -= pawnValue
                                    if (currentThreatenedPiece.split('-')[0] === 'bishop') pieceValue -= bishopValue
                                    if (currentThreatenedPiece.split('-')[0] === 'knight') pieceValue -= knightValue
                                    if (currentThreatenedPiece.split('-')[0] === 'rook') pieceValue -= rookValue
                                    if (currentThreatenedPiece.split('-')[0] === 'queen') pieceValue -= queenValue
                                    if (currentThreatenedPiece.split('-')[0] === 'king') pieceValue -= kingValue
                                }
                            }
                        }
                    }
                }

                for (let i = 0; i < shieldedPieces.length; i++) {
                    if (shieldedPieces[i].shieldedBy === blackPiece) {
                        // is shielding - (- friendly piece value)
                        if (shieldedPieces[i].piece.split('-')[0] === 'pawn') pieceValue -= pawnValue
                        if (shieldedPieces[i].piece.split('-')[0] === 'bishop') pieceValue -= bishopValue
                        if (shieldedPieces[i].piece.split('-')[0] === 'knight') pieceValue -= knightValue
                        if (shieldedPieces[i].piece.split('-')[0] === 'rook') pieceValue -= rookValue
                        if (shieldedPieces[i].piece.split('-')[0] === 'queen') pieceValue -= queenValue
                        if (shieldedPieces[i].piece.split('-')[0] === 'king') pieceValue -= kingValue

                        if (allThreatenedCells[shieldedPieces[i].piece].includes(blackPiecePosition)) {
                            const friendlyPiecesProtectingCurrentBlackPiece = Object.entries(allThreatenedCells).filter(piece => piece.flat().includes(blackPiecePosition)).filter(piece => piece[0].split('-')[1] === 'black')
                            if (friendlyPiecesProtectingCurrentBlackPiece.length === 1) { // is being protected only by piece being shielded - (- piece value)
                                if (blackPiece.split('-')[0] === 'pawn') pieceValue -= pawnValue
                                if (blackPiece.split('-')[0] === 'bishop') pieceValue -= bishopValue
                                if (blackPiece.split('-')[0] === 'knight') pieceValue -= knightValue
                                if (blackPiece.split('-')[0] === 'rook') pieceValue -= rookValue
                                if (blackPiece.split('-')[0] === 'queen') pieceValue -= queenValue
                                if (blackPiece.split('-')[0] === 'king') pieceValue -= kingValue
                            }
                        }
                    }

                    if (shieldedPieces[i].piece === blackPiece) {
                        // is being shielded - (+ piece value)
                        if (blackPiece.split('-')[0] === 'pawn') pieceValue += pawnValue
                        if (blackPiece.split('-')[0] === 'bishop') pieceValue += bishopValue
                        if (blackPiece.split('-')[0] === 'knight') pieceValue += knightValue
                        if (blackPiece.split('-')[0] === 'rook') pieceValue += rookValue
                        if (blackPiece.split('-')[0] === 'queen') pieceValue += queenValue
                        if (blackPiece.split('-')[0] === 'king') pieceValue += kingValue

                        const currentShieldingPiecePosition = allPiecePositions[shieldedPieces[i].shieldedBy]

                        if (allThreatenedCells[blackPiece].includes(currentShieldingPiecePosition)) {
                            const friendlyPiecesProtectingCurrentShieldingPiece = Object.entries(allThreatenedCells).filter(piece => piece.flat().includes(currentShieldingPiecePosition)).filter(piece => piece[0].split('-')[1] === 'black')
                            if (friendlyPiecesProtectingCurrentShieldingPiece.length === 1) { // shielding piece is being protected only by current blackPiece - (- friendlly piece value)
                                if (shieldedPieces[i].shieldedBy.split('-')[0] === 'pawn') pieceValue -= pawnValue
                                if (shieldedPieces[i].shieldedBy.split('-')[0] === 'bishop') pieceValue -= bishopValue
                                if (shieldedPieces[i].shieldedBy.split('-')[0] === 'knight') pieceValue -= knightValue
                                if (shieldedPieces[i].shieldedBy.split('-')[0] === 'rook') pieceValue -= rookValue
                                if (shieldedPieces[i].shieldedBy.split('-')[0] === 'queen') pieceValue -= queenValue
                                if (shieldedPieces[i].shieldedBy.split('-')[0] === 'king') pieceValue -= kingValue
                            }
                        }
                    }
                }

                let isThreatened = false

                const threateningPieces = Object.entries(allThreatenedCells).filter(piece => piece.flat().includes(blackPiecePosition)).filter(piece => piece[0].split('-')[1] !== 'black')
                if (threateningPieces.length) {
                    // is being threatened - (+ piece value * 2)
                    isThreatened = true
                    if (blackPiece.split('-')[0] === 'pawn') pieceValue += pawnValue * 2
                    if (blackPiece.split('-')[0] === 'bishop') pieceValue += bishopValue * 2
                    if (blackPiece.split('-')[0] === 'knight') pieceValue += knightValue * 2
                    if (blackPiece.split('-')[0] === 'rook') pieceValue += rookValue * 2
                    if (blackPiece.split('-')[0] === 'queen') pieceValue += queenValue * 2
                    if (blackPiece.split('-')[0] === 'king') pieceValue += kingValue * 2

                    if (piecesAdjacentToTheKing.includes(blackPiece)) {
                        pieceValue += kingValue
                    }
                }

                let isTrapped = true
                const allCellsThreatenedByEnemy = Object.entries(allThreatenedCells).filter(piece => piece[0].split('-')[1] !== 'black')
                const allCellsThreatenedByCurrentBlackPiece = allThreatenedCells[blackPiece]
                for (let i = 0; i < allCellsThreatenedByCurrentBlackPiece.length; i++) {
                    if (!allCellsThreatenedByEnemy.flat().includes(allCellsThreatenedByCurrentBlackPiece[i])) {
                        isTrapped = false
                        break
                    }
                }

                if (possibleCheckMate && blackPiece === 'king-black') pieceValue += kingValue

                // NEXT PIECE STATE:

                for (let i = 0; i < allPossibleMoves[blackPiece].length; i++) {

                    const currentCell = allPossibleMoves[blackPiece][i]
                    let currentCellValue = pieceValue

                    if (!isTrapped) {

                        let trueConditions = [`current piece: ${blackPiece}`, `currentCell: ${currentCell}`, `pieceValue: ${pieceValue}`]

                        // takes out enemy piece - (+ enemy piece value * 2)
                        if (Object.values(allPiecePositions).includes(currentCell)) {
                            const currentThreatenedPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentCell))[0][0]
                            if (currentThreatenedPiece.split('-')[0] === 'pawn') currentCellValue += pawnValue * 2
                            if (currentThreatenedPiece.split('-')[0] === 'bishop') currentCellValue += bishopValue * 2
                            if (currentThreatenedPiece.split('-')[0] === 'knight') currentCellValue += knightValue * 2
                            if (currentThreatenedPiece.split('-')[0] === 'rook') currentCellValue += rookValue * 2
                            if (currentThreatenedPiece.split('-')[0] === 'queen') currentCellValue += queenValue * 2
                            if (currentThreatenedPiece.split('-')[0] === 'king') currentCellValue += kingValue * 2
                            trueConditions.push('target cell contains an enemy piece (currentCellValue + enemy piece value * 2)', `currentCellValue: ${currentCellValue}`)

                            for (const piece in allPiecePositions) {
                                if (piece[0].split('-')[1] === 'black' && piece[0] !== blackPiece) {
                                    if (allThreatenedCells[currentThreatenedPiece].includes(allPiecePositions[piece])) { // enemy piece is threatening friendly piece
                                        if (piece.split('-')[0] === 'pawn') currentCellValue += pawnValue
                                        if (piece.split('-')[0] === 'bishop') currentCellValue += bishopValue
                                        if (piece.split('-')[0] === 'knight') currentCellValue += knightValue
                                        if (piece.split('-')[0] === 'rook') currentCellValue += rookValue
                                        if (piece.split('-')[0] === 'queen') currentCellValue += queenValue
                                        if (piece.split('-')[0] === 'king') currentCellValue += kingValue * 2
                                        trueConditions.push(`saves friendly piece ${piece} (currentCellValue + friendly piece value)`, `currentCellValue: ${currentCellValue}`)
                                    }
                                }
                            }
                        }

                        // stops threatening (enemy piece still threatened by another friendly piece?) - (no: - enemy piece value, yes: neutral)
                        const allEnemyPositionsThreatenedByCurrentBlackPiece = allPossibleMoves[blackPiece].filter(cell => Object.values(allPiecePositions).includes(cell))
                        if (allEnemyPositionsThreatenedByCurrentBlackPiece.length && !allEnemyPositionsThreatenedByCurrentBlackPiece.includes(currentCell)) {
                            // currentCell does not contain any of the pieces being threatened by the current blackPiece
                            for (let j = 0; j < allEnemyPositionsThreatenedByCurrentBlackPiece.length; j++) {
                                const currentThreatenedPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(allEnemyPositionsThreatenedByCurrentBlackPiece[j]))[0][0]
                                const currentThreatenedPiecePosition = allPiecePositions[currentThreatenedPiece]
                                const friendlyPiecesThreateningCurrentEnemyPiece = Object.entries(allThreatenedCells).filter(piece => piece.flat().includes(currentThreatenedPiecePosition)).filter(piece => piece[0].split('-')[1] === 'black')
                                if (friendlyPiecesThreateningCurrentEnemyPiece.length === 1) { // current blackPiece is the only piece threatening the current enemy piece
                                    if (currentThreatenedPiece.split('-')[0] === 'pawn') currentCellValue -= pawnValue
                                    if (currentThreatenedPiece.split('-')[0] === 'bishop') currentCellValue -= bishopValue
                                    if (currentThreatenedPiece.split('-')[0] === 'knight') currentCellValue -= knightValue
                                    if (currentThreatenedPiece.split('-')[0] === 'rook') currentCellValue -= rookValue
                                    if (currentThreatenedPiece.split('-')[0] === 'queen') currentCellValue -= queenValue
                                    if (currentThreatenedPiece.split('-')[0] === 'king') currentCellValue -= kingValue
                                    trueConditions.push(`piece stops threatening ${Object.entries(allPiecePositions).filter(piece => piece.includes(allEnemyPositionsThreatenedByCurrentBlackPiece[j]))[0][0]} (currentCellValue - enemy piece value)`, `currentCellValue: ${currentCellValue}`)
                                }
                            }
                        }

                        // stops protecting (friendly piece still protected by another friendly piece?) - (no: - friendly piece value, yes: neutral)
                        const protectedPiecesPositions = allThreatenedCells[blackPiece].filter(cell => Object.values(allPiecePositions).includes(cell)).filter(piece => Object.entries(allPiecePositions).filter(piece2 => piece2.includes(piece))[0][0].split('-')[1] === 'black')
                        for (let j = 0; j < protectedPiecesPositions.length; j++) {
                            const enemyPiecesThreateningPiece = Object.entries(allThreatenedCells).filter(piece => piece.flat().includes(protectedPiecesPositions[j])).filter(piece2 => piece2[0].split('-')[1] !== 'black')
                            if (enemyPiecesThreateningPiece.length) { // friendly piece is threatened
                                const allPiecesProtectingCurrentPiece = Object.entries(allThreatenedCells).filter(piece => piece.flat().includes(protectedPiecesPositions[j]))
                                if (allPiecesProtectingCurrentPiece.length === 1) { // current blackPiece is the only one protecting the current piece
                                    const currentProtectedPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(protectedPiecesPositions[j]))[0][0]
                                    if (currentProtectedPiece.split('-')[0] === 'pawn') currentCellValue -= pawnValue
                                    if (currentProtectedPiece.split('-')[0] === 'bishop') currentCellValue -= bishopValue
                                    if (currentProtectedPiece.split('-')[0] === 'knight') currentCellValue -= knightValue
                                    if (currentProtectedPiece.split('-')[0] === 'rook') currentCellValue -= rookValue
                                    if (currentProtectedPiece.split('-')[0] === 'queen') currentCellValue -= queenValue
                                    if (currentProtectedPiece.split('-')[0] === 'king') currentCellValue -= kingValue
                                    trueConditions.push(`piece leaves friendly piece unprotected (${currentProtectedPiece}) (currentCellValue - friendly piece value)`, `currentCellValue: ${currentCellValue}`)
                                }
                            }
                        }

                        // stops shielding (leaves unprotected) (friendly piece protected by another friendly piece?) - (no: - friendly piece value, yes: neutral)
                        const allPiecesShieldedByCurrentPiece = shieldedPieces.filter(item => item.shieldedBy === blackPiece)
                        for (let j = 0; j < allPiecesShieldedByCurrentPiece.length; j++) {
                            const currentShieldedPiece = allPiecesShieldedByCurrentPiece[j].piece
                            const currentShieldedPiecePosition = allPiecePositions[currentShieldedPiece]
                            const allPiecesProtectingCurrentPiece = Object.entries(allThreatenedCells).filter(piece => piece.flat().includes(currentShieldedPiecePosition)).filter(piece2 => piece2[0].split('-')[1] === 'black')
                            if (!allPiecesProtectingCurrentPiece.length) { // current shielded piece is not protected
                                let currentPieceValue
                                if (blackPiece.split('-')[0] === 'pawn') currentPieceValue = pawnValue
                                if (blackPiece.split('-')[0] === 'bishop') currentPieceValue = bishopValue
                                if (blackPiece.split('-')[0] === 'knight') currentPieceValue = knightValue
                                if (blackPiece.split('-')[0] === 'rook') currentPieceValue = rookValue
                                if (blackPiece.split('-')[0] === 'queen') currentPieceValue = queenValue

                                let shieldedPieceValue
                                if (currentShieldedPiece.split('-')[0] === 'pawn') shieldedPieceValue = pawnValue
                                if (currentShieldedPiece.split('-')[0] === 'bishop') shieldedPieceValue = bishopValue
                                if (currentShieldedPiece.split('-')[0] === 'knight') shieldedPieceValue = knightValue
                                if (currentShieldedPiece.split('-')[0] === 'rook') shieldedPieceValue = rookValue
                                if (currentShieldedPiece.split('-')[0] === 'queen') shieldedPieceValue = queenValue

                                if (currentPieceValue <= shieldedPieceValue) { // shielded piece is higher than or equal to the current shielding blackPiece
                                    if (currentShieldedPiece.split('-')[0] === 'pawn') currentCellValue -= pawnValue
                                    if (currentShieldedPiece.split('-')[0] === 'bishop') currentCellValue -= bishopValue
                                    if (currentShieldedPiece.split('-')[0] === 'knight') currentCellValue -= knightValue
                                    if (currentShieldedPiece.split('-')[0] === 'rook') currentCellValue -= rookValue
                                    if (currentShieldedPiece.split('-')[0] === 'queen') currentCellValue -= queenValue
                                    trueConditions.push('stops shielding higher friendly piece (currentCellValue - friendly piece value)', `currentCellValue: ${currentCellValue}`)
                                } else { // shielded piece is lower than the current shielding blackPiece
                                    if (blackPiece.split('-')[0] === 'pawn') currentCellValue += pawnValue
                                    if (blackPiece.split('-')[0] === 'bishop') currentCellValue += bishopValue
                                    if (blackPiece.split('-')[0] === 'knight') currentCellValue += knightValue
                                    if (blackPiece.split('-')[0] === 'rook') currentCellValue += rookValue
                                    if (blackPiece.split('-')[0] === 'queen') currentCellValue += queenValue
                                    trueConditions.push('stops shielding lower friendly piece (currentCellValue + piece value)', `currentCellValue: ${currentCellValue}`)
                                }
                            }
                        }

                        // stops being threatened - (+ piece value)
                        const enemyPiecesThreateningCurrentCell = Object.entries(allThreatenedCells).filter(piece => piece.flat().includes(currentCell)).filter(piece2 => piece2[0].split('-')[1] !== 'black')
                        if (isThreatened && !enemyPiecesThreateningCurrentCell.length) { // current blackPiece is threatened and currentCell is not threatened
                            if (blackPiece.split('-')[0] === 'pawn') currentCellValue += pawnValue
                            if (blackPiece.split('-')[0] === 'bishop') currentCellValue += bishopValue
                            if (blackPiece.split('-')[0] === 'knight') currentCellValue += knightValue
                            if (blackPiece.split('-')[0] === 'rook') currentCellValue += rookValue
                            if (blackPiece.split('-')[0] === 'queen') currentCellValue += queenValue
                            trueConditions.push('stops being threatened (currentCellValue + piece value)', `currentCellValue: ${currentCellValue}`)
                        }
                        if (enemyPiecesThreateningCurrentCell.length) { // currentCell is threatened
                            // stops being protected (becomes threatened?) - (no: neutral, yes: - piece value)
                            // becomes threatened - (- piece value)
                            for (let j = 0; j < enemyPiecesThreateningCurrentCell.length; j++) {
                                if (blackPiece.split('-')[0] === 'pawn') currentCellValue -= pawnValue * 2
                                if (blackPiece.split('-')[0] === 'bishop') currentCellValue -= bishopValue * 2
                                if (blackPiece.split('-')[0] === 'knight') currentCellValue -= knightValue * 2
                                if (blackPiece.split('-')[0] === 'rook') currentCellValue -= rookValue * 2
                                if (blackPiece.split('-')[0] === 'queen') currentCellValue -= queenValue * 2
                                trueConditions.push(`target cell is threatened by ${enemyPiecesThreateningCurrentCell[j][0]} (currentCellValue - piece value * 2)`, `currentCellValue: ${currentCellValue}`)
                            }

                            const friendlyPiecesThreateningTargetCell = Object.entries(allThreatenedCells).filter(piece => piece.flat().includes(currentCell)).filter(piece2 => piece2[0].split('-')[1] === 'black')
                            if ((blackPiece.split('-')[0] === 'pawn' && !friendlyPiecesThreateningTargetCell.length) || (blackPiece.split('-')[0] !== 'pawn' && friendlyPiecesThreateningTargetCell.length === 1)) { // target cell is unprotected
                                if (blackPiece.split('-')[0] === 'pawn') currentCellValue -= pawnValue
                                if (blackPiece.split('-')[0] === 'bishop') currentCellValue -= bishopValue
                                if (blackPiece.split('-')[0] === 'knight') currentCellValue -= knightValue
                                if (blackPiece.split('-')[0] === 'rook') currentCellValue -= rookValue
                                if (blackPiece.split('-')[0] === 'queen') currentCellValue -= queenValue
                                trueConditions.push('target cell is unprotected (currentCellValue - piece value)', `currentCellValue: ${currentCellValue}`)
                            }
                        }

                        // stops being shielded - (+ piece value)
                        const allPiecesShieldingCurrentPiece = shieldedPieces.filter(item => item.piece === blackPiece)
                        for (let j = 0; j < allPiecesShieldingCurrentPiece.length; j++) {
                            const currentShieldingPiece = allPiecesShieldingCurrentPiece[j].shieldedBy

                            let currentPieceValue
                            if (blackPiece.split('-')[0] === 'pawn') currentPieceValue = pawnValue
                            if (blackPiece.split('-')[0] === 'bishop') currentPieceValue = bishopValue
                            if (blackPiece.split('-')[0] === 'knight') currentPieceValue = knightValue
                            if (blackPiece.split('-')[0] === 'rook') currentPieceValue = rookValue
                            if (blackPiece.split('-')[0] === 'queen') currentPieceValue = queenValue

                            let shieldingPieceValue
                            if (currentShieldingPiece.split('-')[0] === 'pawn') shieldingPieceValue = pawnValue
                            if (currentShieldingPiece.split('-')[0] === 'bishop') shieldingPieceValue = bishopValue
                            if (currentShieldingPiece.split('-')[0] === 'knight') shieldingPieceValue = knightValue
                            if (currentShieldingPiece.split('-')[0] === 'rook') shieldingPieceValue = rookValue
                            if (currentShieldingPiece.split('-')[0] === 'queen') shieldingPieceValue = queenValue

                            if (currentPieceValue > shieldingPieceValue) { // current blackPiece is higher than shielding piece
                                if (blackPiece.split('-')[0] === 'pawn') currentCellValue += pawnValue
                                if (blackPiece.split('-')[0] === 'bishop') currentCellValue += bishopValue
                                if (blackPiece.split('-')[0] === 'knight') currentCellValue += knightValue
                                if (blackPiece.split('-')[0] === 'rook') currentCellValue += rookValue
                                if (blackPiece.split('-')[0] === 'queen') currentCellValue += queenValue
                                trueConditions.push(`stops being shielded by lower friendly piece (${currentShieldingPiece}) (currentCellValue + piece value)`, `currentCellValue: ${currentCellValue}`)
                            }
                            // if the piece being shielded is lower than the shielding piece, it will not want to move
                            // this way, it will not interfere with the motivation of the higher piece to move (i.e, if current piece is shielded, then the higher piece is threatened) 
                        }

                        // All blackPiece moves from the target cell
                        let blackPieceMoves
                        let column = (currentCell % width) + 1
                        let row = ((currentCell - (currentCell % width)) / width) + 1
                        if (blackPiece.indexOf('pawn') !== -1) {
                            blackPieceMoves = pawnMovement('black', currentCell, row, column)
                        }
                        if (blackPiece.indexOf('rook') !== -1 || blackPiece.indexOf('queen') !== -1) {
                            blackPieceMoves = rookMovement('black', blackPiece, currentCell, width, row, column)
                        }
                        if (blackPiece.indexOf('knight') !== -1) {
                            blackPieceMoves = knightMovement('black', currentCell, row, column)
                        }
                        if (blackPiece.indexOf('bishop') !== -1) {
                            blackPieceMoves = bishopMovement('black', blackPiece, currentCell, width, row, column)
                        }
                        if (blackPiece.split('-')[0] === 'queen') {
                            let pieceMoves2 = bishopMovement('black', blackPiece, currentCell, width, row, column)
                            for (let j = 0; j < pieceMoves2.threatenedPieces.length; j++) {
                                if (!blackPieceMoves.threatenedPieces.includes(pieceMoves2.threatenedPieces[j])) blackPieceMoves.threatenedPieces.push(pieceMoves2.threatenedPieces[j])
                            }
                            for (let j = 0; j < pieceMoves2.protectedPieces.length; j++) {
                                if (!blackPieceMoves.protectedPieces.includes(pieceMoves2.protectedPieces[j])) blackPieceMoves.protectedPieces.push(pieceMoves2.protectedPieces[j])
                            }
                            for (let j = 0; j < pieceMoves2.suitableCells.length; j++) {
                                if (!blackPieceMoves.suitableCells.includes(pieceMoves2.suitableCells[j])) blackPieceMoves.suitableCells.push(pieceMoves2.suitableCells[j])
                            }
                        }
                        if (blackPiece.indexOf('king') !== -1) {
                            blackPieceMoves = kingMovement('black', currentCell, width, row, column)
                        }

                        // threatens - (+ enemy piece value)
                        for (let j = 0; j < blackPieceMoves.threatenedPieces.length; j++) {
                            if (!allThreatenedCells[blackPieceMoves.threatenedPieces[j]].includes(currentCell)) {
                                if (blackPieceMoves.threatenedPieces[j].split('-')[0] === 'pawn') currentCellValue += pawnValue
                                if (blackPieceMoves.threatenedPieces[j].split('-')[0] === 'bishop') currentCellValue += bishopValue
                                if (blackPieceMoves.threatenedPieces[j].split('-')[0] === 'knight') currentCellValue += knightValue
                                if (blackPieceMoves.threatenedPieces[j].split('-')[0] === 'rook') currentCellValue += rookValue
                                if (blackPieceMoves.threatenedPieces[j].split('-')[0] === 'queen') currentCellValue += queenValue
                                if (blackPieceMoves.threatenedPieces[j].split('-')[0] === 'king') currentCellValue += kingValue
                                trueConditions.push(`threatens enemy piece (${blackPieceMoves.threatenedPieces[j]}) from target cell, and is not threatened by it (currentCellValue + enemy piece value)`, `currentCellValue: ${currentCellValue}`)

                                if (possibleChecMatePieces.includes(blackPieceMoves.threatenedPieces[j])) currentCellValue += kingValue * 2
                            }
                        }

                        // protects (friendly piece threatened?) - (no: neutral, yes: + friendly piece value)
                        for (let j = 0; j < blackPieceMoves.protectedPieces.length; j++) {
                            const allEnemyPiecesThreateningFriendlyPiece = Object.entries(allThreatenedCells).filter(piece => piece.flat().includes(allPiecePositions[blackPieceMoves.protectedPieces[j]])).filter(piece2 => piece2[0].split('-')[1] !== 'black')
                            if (allEnemyPiecesThreateningFriendlyPiece.length && blackPiece !== blackPieceMoves.protectedPieces[j]) { // friendly piece is being threatened
                                if (blackPieceMoves.protectedPieces[j].split('-')[0] === 'pawn') currentCellValue += pawnValue
                                if (blackPieceMoves.protectedPieces[j].split('-')[0] === 'bishop') currentCellValue += bishopValue
                                if (blackPieceMoves.protectedPieces[j].split('-')[0] === 'knight') currentCellValue += knightValue
                                if (blackPieceMoves.protectedPieces[j].split('-')[0] === 'rook') currentCellValue += rookValue
                                if (blackPieceMoves.protectedPieces[j].split('-')[0] === 'queen') currentCellValue += queenValue
                                if (blackPieceMoves.protectedPieces[j].split('-')[0] === 'king') currentCellValue += kingValue
                                trueConditions.push(`protects friendly piece (${blackPieceMoves.protectedPieces[j]}) from target cell (currentCellValue + friendly piece value)`, `currentCellValue: ${currentCellValue}`)
                            }
                        }

                        // shields (is protected by piece being shielded?) - (no: + friendly piece value, yes: + friendly piece value + piece value)
                        const freindlyPiecesThreatened = Object.entries(allPiecePositions).filter(piece => piece[0].split('-')[1] === 'black').filter(piece => piece[1] !== -1).filter(piece => Object.values(allThreatenedCells).flat().includes(piece[1]))
                        //const freindlyPiecesThreatenedByEnemy = []
                        let currentPieceValue
                        if (blackPiece.split('-')[0] === 'pawn') currentPieceValue = pawnValue
                        if (blackPiece.split('-')[0] === 'bishop') currentPieceValue = bishopValue
                        if (blackPiece.split('-')[0] === 'knight') currentPieceValue = knightValue
                        if (blackPiece.split('-')[0] === 'rook') currentPieceValue = rookValue
                        if (blackPiece.split('-')[0] === 'queen') currentPieceValue = queenValue

                        for (let j = 0; j < freindlyPiecesThreatened.length; j++) {
                            const currentThreatenedPiecePosition = allPiecePositions[freindlyPiecesThreatened[j][0]]
                            const allPiecesThreateningCurrentPiece = Object.entries(allThreatenedCells).filter(piece => piece.flat().includes(currentThreatenedPiecePosition)).filter(piece => piece[0].split('-')[1] !== 'black')
                            for (let k = 0; k < allPiecesThreateningCurrentPiece.length; k++) {
                                //if (allPiecesThreateningCurrentPiece[k][0].split('-')[1] !== 'black') {
                                //if (!freindlyPiecesThreatenedByEnemy.includes(freindlyPiecesThreatened[j][0])) freindlyPiecesThreatenedByEnemy.push(freindlyPiecesThreatened[j][0])

                                let currentThreatenedPieceValue
                                if (freindlyPiecesThreatened[j][0].split('-')[0] === 'pawn') currentThreatenedPieceValue = pawnValue
                                if (freindlyPiecesThreatened[j][0].split('-')[0] === 'bishop') currentThreatenedPieceValue = bishopValue
                                if (freindlyPiecesThreatened[j][0].split('-')[0] === 'knight') currentThreatenedPieceValue = knightValue
                                if (freindlyPiecesThreatened[j][0].split('-')[0] === 'rook') currentThreatenedPieceValue = rookValue
                                if (freindlyPiecesThreatened[j][0].split('-')[0] === 'queen') currentThreatenedPieceValue = queenValue

                                if (currentThreatenedPieceValue > currentPieceValue) {
                                    const threateningPiecePosition = allPiecePositions[allPiecesThreateningCurrentPiece[k][0]]

                                    const enemyPieceColumn = (threateningPiecePosition % width) + 1
                                    const enemyPieceRow = ((threateningPiecePosition - (threateningPiecePosition % width)) / width) + 1

                                    const friendlyPieceColumn = (currentThreatenedPiecePosition % width) + 1
                                    const friendlyPieceRow = ((currentThreatenedPiecePosition - (currentThreatenedPiecePosition % width)) / width) + 1

                                    const currentCellColumn = (currentCell % width) + 1
                                    const currentCellRow = ((currentCell - (currentCell % width)) / width) + 1

                                    let shieldingCell = false

                                    if ((enemyPieceColumn === currentCellColumn && enemyPieceColumn === friendlyPieceColumn) || (enemyPieceRow === currentCellRow && enemyPieceRow === friendlyPieceRow)) {
                                        shieldingCell = true
                                    } else {
                                        if ((enemyPieceColumn !== friendlyPieceColumn && enemyPieceRow !== friendlyPieceRow) && ((threateningPiecePosition % 7 === currentThreatenedPiecePosition % 7 && threateningPiecePosition % 7 === currentCell % 7) || (threateningPiecePosition % 9 === currentThreatenedPiecePosition % 9 && threateningPiecePosition % 9 === currentCell % 9))) {
                                            shieldingCell = true
                                            // console.log(blackPiece)
                                            // console.log('possible shielded piece:', freindlyPiecesThreatened[j][0])
                                            // console.log('currentCell', currentCell)
                                            // console.log('threateningPiecePosition', threateningPiecePosition)
                                            // console.log('currentThreatenedPiecePosition', currentThreatenedPiecePosition)
                                        }
                                    }

                                    if (shieldingCell) {
                                        if (freindlyPiecesThreatened[j][0].split('-')[0] === 'pawn') currentCellValue += pawnValue
                                        if (freindlyPiecesThreatened[j][0].split('-')[0] === 'bishop') currentCellValue += bishopValue
                                        if (freindlyPiecesThreatened[j][0].split('-')[0] === 'knight') currentCellValue += knightValue
                                        if (freindlyPiecesThreatened[j][0].split('-')[0] === 'rook') currentCellValue += rookValue
                                        if (freindlyPiecesThreatened[j][0].split('-')[0] === 'queen') currentCellValue += queenValue
                                        trueConditions.push(`shields friendly piece (${freindlyPiecesThreatened[j][0]}) from target cell (currentCellValue + friendly piece value)`, `currentCellValue: ${currentCellValue}`)
                                    }
                                }
                                //}
                            }
                        }

                        // target cell is being shielded by a friendly piece (currentCellValue - piece value)
                        if (shieldedCells.includes(currentCell)) {
                            if (blackPiece.split('-')[0] === 'pawn') currentCellValue -= pawnValue
                            if (blackPiece.split('-')[0] === 'bishop') currentCellValue -= bishopValue
                            if (blackPiece.split('-')[0] === 'knight') currentCellValue -= knightValue
                            if (blackPiece.split('-')[0] === 'rook') currentCellValue -= rookValue
                            if (blackPiece.split('-')[0] === 'queen') currentCellValue -= queenValue
                            trueConditions.push(`target cell is shielded (currentCellValue - piece value)`, `currentCellValue: ${currentCellValue}`)
                        }

                        if (currentCellValue > currentBestMove.cellValue) {
                            currentBestMove = {
                                piece: blackPiece,
                                cell: currentCell,
                                cellValue: currentCellValue
                            }
                        }
                        //if (blackPiece === 'rook-black-1') {
                        //console.log('trueConditions', trueConditions)
                        //console.log('blackPieceMoves', blackPieceMoves)
                        //}

                    } else { // piece is trapped
                        let blackPieceMoves
                        let column = (blackPiecePosition % width) + 1
                        let row = ((blackPiecePosition - (blackPiecePosition % width)) / width) + 1
                        if (blackPiece.indexOf('pawn') !== -1) {
                            blackPieceMoves = pawnMovement('black', blackPiecePosition, row, column)
                        }
                        if (blackPiece.indexOf('rook') !== -1 || blackPiece.indexOf('queen') !== -1) {
                            blackPieceMoves = rookMovement('black', blackPiece, blackPiecePosition, width, row, column)
                        }
                        if (blackPiece.indexOf('knight') !== -1) {
                            blackPieceMoves = knightMovement('black', blackPiecePosition, row, column)
                        }
                        if (blackPiece.indexOf('bishop') !== -1) {
                            blackPieceMoves = bishopMovement('black', blackPiece, blackPiecePosition, width, row, column)
                        }
                        if (blackPiece.split('-')[0] === 'queen') {
                            let pieceMoves2 = bishopMovement('black', blackPiece, blackPiecePosition, width, row, column)
                            for (let j = 0; j < pieceMoves2.threatenedPieces.length; j++) {
                                if (!blackPieceMoves.threatenedPieces.includes(pieceMoves2.threatenedPieces[j])) blackPieceMoves.threatenedPieces.push(pieceMoves2.threatenedPieces[j])
                            }
                            for (let j = 0; j < pieceMoves2.protectedPieces.length; j++) {
                                if (!blackPieceMoves.protectedPieces.includes(pieceMoves2.protectedPieces[j])) blackPieceMoves.protectedPieces.push(pieceMoves2.protectedPieces[j])
                            }
                            for (let j = 0; j < pieceMoves2.suitableCells.length; j++) {
                                if (!blackPieceMoves.suitableCells.includes(pieceMoves2.suitableCells[j])) blackPieceMoves.suitableCells.push(pieceMoves2.suitableCells[j])
                            }
                        }

                        if (blackPieceMoves.threatenedPieces.length) {
                            for (let j = 0; j < blackPieceMoves.threatenedPieces.length; j++) {
                                let currentThreatenedPieceScore
                                if (blackPieceMoves.threatenedPieces[j].split('-')[0] === 'pawn') currentThreatenedPieceScore = pawnValue
                                if (blackPieceMoves.threatenedPieces[j].split('-')[0] === 'bishop') currentThreatenedPieceScore = bishopValue
                                if (blackPieceMoves.threatenedPieces[j].split('-')[0] === 'knight') currentThreatenedPieceScore = knightValue
                                if (blackPieceMoves.threatenedPieces[j].split('-')[0] === 'rook') currentThreatenedPieceScore = rookValue
                                if (blackPieceMoves.threatenedPieces[j].split('-')[0] === 'queen') currentThreatenedPieceScore = queenValue

                                if (currentThreatenedPieceScore > currentBestMove.cellValue) {
                                    currentBestMove = {
                                        piece: blackPieceMoves.threatenedPieces[j],
                                        cell: allPiecePositions[blackPieceMoves.threatenedPieces[j]],
                                        cellValue: currentThreatenedPieceScore
                                    }
                                }
                            }
                        } else {
                            currentCellValue = 0
                        }
                    }
                }

            } else { // check

                let currentCellValue = 0
                const checkingPiecePosition = allPiecePositions[checkingPiece]

                let currentPieceValue
                if (blackPiece.split('-')[0] === 'pawn') currentPieceValue = pawnValue
                if (blackPiece.split('-')[0] === 'bishop') currentPieceValue = bishopValue
                if (blackPiece.split('-')[0] === 'knight') currentPieceValue = knightValue
                if (blackPiece.split('-')[0] === 'rook') currentPieceValue = rookValue
                if (blackPiece.split('-')[0] === 'queen') currentPieceValue = queenValue

                let trueConditions = [`current piece: ${blackPiece}`, `pieceValue: ${currentCellValue}`]

                let friendlyPiecesThreateningCheckingPiece = []
                let friendlyPiecesThreateningCurrentInterceptingCell = []

                if (blackPiece !== 'king-black' && allPiecePositions[blackPiece] !== -1) {
    
                    friendlyPiecesThreateningCheckingPiece = Object.entries(allThreatenedCells).filter(piece => piece[0].split('-')[1] === 'black').filter(piece => piece.flat().includes(checkingPiecePosition))
    
                    //console.log('friendlyPiecesThreateningCheckingPiece', friendlyPiecesThreateningCheckingPiece.length)
    
                    let checkingPieceThreatenedByCurrentPiece = false
    
                    if (friendlyPiecesThreateningCheckingPiece.length) {
                        for (let i = 0; i < friendlyPiecesThreateningCheckingPiece.length; i++) {
                            if (blackPiece === friendlyPiecesThreateningCheckingPiece[i][0]) {
                                checkingPieceThreatenedByCurrentPiece = true
                                break
                            }
                        }
    
                        if (checkingPieceThreatenedByCurrentPiece && !trueConditions.includes(`checking piece threatened by ${blackPiece} (currentCellValue + kingValue * 10)`, `currentCell: ${checkingPiecePosition}`, `currentCellValue: ${currentCellValue}`) && blackPiece !== 'king-black') {
                            const shieldingPieces = []
                            for (let i = 0; i < piecesShieldingKing.black.length; i++) {
                                shieldingPieces.push(piecesShieldingKing.black[i].piece)
                            }
                            if (!shieldingPieces.includes(blackPiece)) {
                                currentCellValue += kingValue * 10 - currentPieceValue
                                trueConditions.push(`checking piece threatened by ${blackPiece} (currentCellValue + kingValue * 10)`, `currentCell: ${checkingPiecePosition}`, `currentCellValue: ${currentCellValue}`)
                            }
                        }
    
                        if (currentCellValue > currentBestMove.cellValue && allPossibleMoves[blackPiece].includes(checkingPiecePosition)) {
                            currentBestMove = {
                                piece: blackPiece,
                                cell: checkingPiecePosition,
                                cellValue: currentCellValue
                            }
                        }
                    } else { // checking piece not threatened
                        currentCellValue += kingValue
                        if (blackPiece.split('-')[0] !== 'pawn' && allPiecePositions[blackPiece] !== -1) {
                            for (let i = 0; i < cellsInterceptingCheck.length; i++) {
                                friendlyPiecesThreateningCurrentInterceptingCell = Object.entries(allThreatenedCells).filter(piece => piece[0].split('-')[1] === 'black').filter(piece => piece.flat().includes(cellsInterceptingCheck[i])).filter(piece => piece[0].split('-')[0] !== 'pawn').filter(piece => piece[0] !== 'king-black')
    
                                let interceptingCellThreatenedByCurrentPiece = false

                                //console.log('friendlyPiecesThreateningCurrentInterceptingCell', friendlyPiecesThreateningCurrentInterceptingCell.length)
    
                                if (friendlyPiecesThreateningCurrentInterceptingCell.length) {
                                    for (let i = 0; i < friendlyPiecesThreateningCurrentInterceptingCell.length; i++) {
                                        if (blackPiece === friendlyPiecesThreateningCurrentInterceptingCell[i][0]) {
                                            interceptingCellThreatenedByCurrentPiece = true
                                        }
                                    }
                                }
    
                                if (interceptingCellThreatenedByCurrentPiece === true && !trueConditions.includes(`${blackPiece} is threatening an intercepting cell (currentCellValue + kingValue * 10)`, `currentCell: ${cellsInterceptingCheck[i]}`, `currentCellValue: ${currentCellValue}`) && blackPiece !== 'king-black' ) {
                                    const shieldingPieces = []
                                    for (let i = 0; i < piecesShieldingKing.black.length; i++) {
                                        shieldingPieces.push(piecesShieldingKing.black[i].piece)
                                    }
                                    if (!shieldingPieces.includes(blackPiece)) {
                                        currentCellValue += kingValue * 10 - currentPieceValue
                                        trueConditions.push(`${blackPiece} is threatening an intercepting cell (currentCellValue + kingValue * 10)`, `currentCell: ${cellsInterceptingCheck[i]}`, `currentCellValue: ${currentCellValue}`)
                                    }
                                }
    
                                if (currentCellValue > currentBestMove.cellValue && allPossibleMoves[blackPiece].includes(cellsInterceptingCheck[i])) {
                                    currentBestMove = {
                                        piece: blackPiece,
                                        cell: cellsInterceptingCheck[i],
                                        cellValue: currentCellValue
                                    }
                                }
                            }
                        } else if (allPiecePositions[blackPiece] !== -1) { // pawn
                            let currentCell = 0
                            let currentPawnPosition = allPiecePositions[blackPiece]
                            let pawnColumn = (currentPawnPosition % width) + 1
                            let pawnRow = ((currentPawnPosition - (currentPawnPosition % width)) / width) + 1
                            let pawnMoves = pawnMovement('black', currentPawnPosition, pawnRow, pawnColumn)
    
                            let interceptingCellThreatenedByCurrentPiece = false
    
                            for (let i = 0; i < pawnMoves.suitableCells.length; i++) {
                                if (cellsInterceptingCheck.includes(pawnMoves.suitableCells[i])) {
                                    currentCell = pawnMoves.suitableCells[i]
                                    interceptingCellThreatenedByCurrentPiece = true
                                }
                            }
    
                            if (interceptingCellThreatenedByCurrentPiece && !trueConditions.includes(`${blackPiece} is threatening an intercepting cell (currentCellValue + kingValue * 10)`, `currentCell: ${currentCell}`, `currentCellValue: ${currentCellValue}`)) {
                                const shieldingPieces = []
                                for (let i = 0; i < piecesShieldingKing.black.length; i++) {
                                    shieldingPieces.push(piecesShieldingKing.black[i].piece)
                                }
                                if (!shieldingPieces.includes(blackPiece)) {
                                    currentCellValue += kingValue * 10 - currentPieceValue
                                    trueConditions.push(`${blackPiece} is threatening an intercepting cell (currentCellValue + kingValue * 10)`, `currentCell: ${currentCell}`, `currentCellValue: ${currentCellValue}`)
                                }
                            }
    
                            if (currentCellValue > currentBestMove.cellValue && allPossibleMoves[blackPiece].includes(currentCell)) {
                                currentBestMove = {
                                    piece: blackPiece,
                                    cell: currentCell,
                                    cellValue: currentCellValue
                                }
                            }
    
                        }
                    }
                } else { // king
                    //if (!friendlyPiecesThreateningCheckingPiece.length && !friendlyPiecesThreateningCurrentInterceptingCell.length) {
                        for (let i = 0; i < allPossibleMoves['king-black'].length; i++) {
                            const currentCell = allPossibleMoves['king-black'][i]
                            if (Object.values(allPiecePositions).includes(currentCell)) {
                                const currentThreatenedPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentCell))[0][0]
                                if (currentThreatenedPiece.split('-')[0] === 'pawn') currentCellValue += pawnValue * 2
                                if (currentThreatenedPiece.split('-')[0] === 'bishop') currentCellValue += bishopValue * 2
                                if (currentThreatenedPiece.split('-')[0] === 'knight') currentCellValue += knightValue * 2
                                if (currentThreatenedPiece.split('-')[0] === 'rook') currentCellValue += rookValue * 2
                                if (currentThreatenedPiece.split('-')[0] === 'queen') currentCellValue += queenValue * 2
                                // trueConditions.push(`king is threatening ${currentThreatenedPiece} (currentCellValue + enemy piece value * 2)`, `currentCell: ${allPossibleMoves['king-black'][i]}`, `currentCellValue: ${currentCellValue}`)
                                // console.log(`king is threatening ${currentThreatenedPiece} (currentCellValue + enemy piece value * 2)`, `currentCell: ${allPossibleMoves['king-black'][i]}`, `currentCellValue: ${currentCellValue}`)

                                for (const piece in allPiecePositions) {
                                    if (piece[0].split('-')[1] === 'black' && piece[0] !== blackPiece) {
                                        if (allThreatenedCells[currentThreatenedPiece].includes(allPiecePositions[piece])) { // enemy piece is threatening friendly piece
                                            if (piece.split('-')[0] === 'pawn') currentCellValue += pawnValue
                                            if (piece.split('-')[0] === 'bishop') currentCellValue += bishopValue
                                            if (piece.split('-')[0] === 'knight') currentCellValue += knightValue
                                            if (piece.split('-')[0] === 'rook') currentCellValue += rookValue
                                            if (piece.split('-')[0] === 'queen') currentCellValue += queenValue
                                            // trueConditions.push(`${currentThreatenedPiece} is threateining friendly piece ${piece} (currentCellValue + friendly piece value)`, `currentCell: ${allPossibleMoves['king-black'][i]}`, `currentCellValue: ${currentCellValue}`)
                                            // console.log(`${currentThreatenedPiece} is threateining friendly piece ${piece} (currentCellValue + friendly piece value)`, `currentCell: ${allPossibleMoves['king-black'][i]}`, `currentCellValue: ${currentCellValue}`)
                                        }
                                    }
                                }
                            } else {
                                currentCellValue += kingValue
                            }
                            if (currentCellValue > currentBestMove.cellValue) {
                                currentBestMove = {
                                    piece: blackPiece,
                                    cell: allPossibleMoves['king-black'][i],
                                    cellValue: currentCellValue
                                }
                            }

                            let column = (allPossibleMoves['king-black'][i] % width) + 1
                            let row = ((allPossibleMoves['king-black'][i] - (allPossibleMoves['king-black'][i] % width)) / width) + 1

                            let kingMoves = kingMovement('black', 'king-black', allPossibleMoves['king-black'][i], width, row, column)

                            for (let j = 0; j < kingMoves.threatenedPieces.length; j++) {
                                //if (allPossibleMoves['king-black'].includes(allPiecePositions[kingMoves.threatenedPieces[j]])) {
                                if (kingMoves.threatenedPieces[j].split('-')[0] === 'pawn') currentCellValue += pawnValue
                                if (kingMoves.threatenedPieces[j].split('-')[0] === 'bishop') currentCellValue += bishopValue
                                if (kingMoves.threatenedPieces[j].split('-')[0] === 'knight') currentCellValue += knightValue
                                if (kingMoves.threatenedPieces[j].split('-')[0] === 'rook') currentCellValue += rookValue
                                if (kingMoves.threatenedPieces[j].split('-')[0] === 'queen') currentCellValue += queenValue
                                // trueConditions.push(`king can threaten ${kingMoves.threatenedPieces[j]} from the target cell (currentCellValue + friendly piece value)`, `currentCell: ${allPossibleMoves['king-black'][i]}`, `currentCellValue: ${currentCellValue}`)
                                // console.log(`king can threaten ${kingMoves.threatenedPieces[j]} from the target cell (currentCellValue + friendly piece value)`, `currentCell: ${allPossibleMoves['king-black'][i]}`, `currentCellValue: ${currentCellValue}`)
                                if (currentCellValue > currentBestMove.cellValue) {
                                    currentBestMove = {
                                        piece: blackPiece,
                                        cell: allPossibleMoves['king-black'][i],
                                        cellValue: currentCellValue
                                    }
                                }
                                //}
                            }

                            for (let j = 0; j < kingMoves.protectedPieces.length; j++) {
                                if (kingMoves.protectedPieces[j] !== 'king-black') {
                                    //if (allPossibleMoves['king-black'].includes(allPiecePositions[kingMoves.protectedPieces[j]])) {
                                    if (kingMoves.protectedPieces[j].split('-')[0] === 'pawn') currentCellValue += pawnValue
                                    if (kingMoves.protectedPieces[j].split('-')[0] === 'bishop') currentCellValue += bishopValue
                                    if (kingMoves.protectedPieces[j].split('-')[0] === 'knight') currentCellValue += knightValue
                                    if (kingMoves.protectedPieces[j].split('-')[0] === 'rook') currentCellValue += rookValue
                                    if (kingMoves.protectedPieces[j].split('-')[0] === 'queen') currentCellValue += queenValue
                                    // trueConditions.push(`king can protect ${kingMoves.protectedPieces[j]} from the target cell (currentCellValue + friendly piece value)`, `currentCell: ${allPossibleMoves['king-black'][i]}`, `currentCellValue: ${currentCellValue}`)
                                    // console.log(`king can protect ${kingMoves.protectedPieces[j]} from the target cell (currentCellValue + friendly piece value)`, `currentCell: ${allPossibleMoves['king-black'][i]}`, `currentCellValue: ${currentCellValue}`)
                                    if (currentCellValue > currentBestMove.cellValue) {
                                        currentBestMove = {
                                            piece: blackPiece,
                                            cell: allPossibleMoves['king-black'][i],
                                            cellValue: currentCellValue
                                        }
                                    }
                                    //}
                                }
                            }

                            for (let j = 0; j < kingMoves.suitableCells.length; j++) {
                                if (allPossibleMoves['king-black'].includes(kingMoves.suitableCells[j])) {
                                    currentCellValue += kingValue
                                    // trueConditions.push(`cell ${kingMoves.suitableCells[j]} is not threatened (currentCellValue + friendly piece value)`, `currentCell: ${allPossibleMoves['king-black'][i]}`, `currentCellValue: ${currentCellValue}`)
                                    // console.log(`cell ${kingMoves.suitableCells[j]} is not threatened (currentCellValue + friendly piece value)`, `currentCell: ${allPossibleMoves['king-black'][i]}`, `currentCellValue: ${currentCellValue}`)
                                    if (currentCellValue > currentBestMove.cellValue) {
                                        currentBestMove = {
                                            piece: blackPiece,
                                            cell: allPossibleMoves['king-black'][i],
                                            cellValue: currentCellValue
                                        }
                                    }
                                }
                            }
                        }
                    //}
                }

                //console.log('trueConditions', trueConditions)
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