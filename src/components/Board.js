import { useEffect, useState } from "react"
import nextMove from "../components/nextMove"

const Board = () => {

    let width = 8

    const [allCells, setAllCells] = useState([])

    const [allRows, setAllRows] = useState([])

    const [selectedPiece, setSelectedPiece] = useState('')

    const [selectedPosition, setSelectedPosition] = useState(-1)

    //const [currentPiecePosition, setCurrentPiecePosition] = useState(-1)

    /*
        'rook-black-1': 0,
        'rook-black-2': 7,
        'knight-black-1': 1,
        'knight-black-2': 6,
        'bishop-black-1': 2,
        'bishop-black-2': 5,
        'queen-black': 3,
        'king-black': 4,
        'pawn-black-1': 8,
        'pawn-black-2': 9,
        'pawn-black-3': 10,
        'pawn-black-4': 11,
        'pawn-black-5': 12,
        'pawn-black-6': 13,
        'pawn-black-7': 14,
        'pawn-black-8': 15,
        'pawn-white-1': 48,
        'pawn-white-2': 49,
        'pawn-white-3': 50,
        'pawn-white-4': 51,
        'pawn-white-5': 52,
        'pawn-white-6': 53,
        'pawn-white-7': 54,
        'pawn-white-8': 55,
        'rook-white-1': 56,
        'rook-white-2': 63,
        'knight-white-1': 57,
        'knight-white-2': 62,
        'bishop-white-1': 58,
        'bishop-white-2': 61,
        'queen-white': 59,
        'king-white': 60,
    */

    const [allPiecePositions, setAllPiecePositions] = useState({
        'rook-black-1': 0,
        'rook-black-2': 7,
        'knight-black-1': 1,
        'knight-black-2': 6,
        'bishop-black-1': 2,
        'bishop-black-2': 5,
        'queen-black': 3,
        'king-black': 4,
        'pawn-black-1':12,
        'pawn-black-2': 11,
        'pawn-black-3': 10,
        'pawn-black-4': 9,
        'pawn-black-5': 8,
        'pawn-black-6': 13,
        'pawn-black-7': 14,
        'pawn-black-8': 15,
        'pawn-white-1': 48,
        'pawn-white-2': 49,
        'pawn-white-3': 50,
        'pawn-white-4': 51,
        'pawn-white-5': 52,
        'pawn-white-6': 53,
        'pawn-white-7': 54,
        'pawn-white-8': 55,
        'rook-white-1': 56,
        'rook-white-2': 63,
        'knight-white-1': 57,
        'knight-white-2': 62,
        'bishop-white-1': 58,
        'bishop-white-2': 61,
        'queen-white': 59,
        'king-white': 60,
    })

    const [nextTurn, setNextTurn] = useState('white')

    const [suitableCells, setSuitableCells] = useState([])

    const [previousSelected, setPreviousSelected] = useState(-1)

    const [check, setCheck] = useState(false)

    const [checkingPiece, setCheckingPiece] = useState('')

    const [cellsInterceptingCheck, setCellsInterceptingCheck] = useState([])

    const [allThreatenedCells, setAllThreatenedCells] = useState({
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
    })

    const [piecesShieldingKing, setPiecesShieldingKing] = useState({
        black: [],
        white: []
    })

    const [takenOutBlack, setTakenOutBlack] = useState([])

    const [takenOutWhite, setTakenOutWhite] = useState([])

    const [checkMate, setCheckMate] = useState(false)

    //create cells
    useEffect(() => {
        setAllCells(() => {
            const allCellElements = []

            for (let i = 0; i < 64; i++) {
                let imageElement = <></>
                let cellClass = ''
                if (i === allPiecePositions['rook-black-1']) {
                    imageElement = <img src="../Images/rook-black.png" alt="rook-black" key="rook-black-1" id="rook-black-1" onClick={() => setSelectedPiece('rook-black-1')} />
                } else if (i === allPiecePositions['rook-black-2']) {
                    imageElement = <img src="../Images/rook-black.png" alt="rook-black" key="rook-black-2" id="rook-black-2" onClick={() => setSelectedPiece('rook-black-2')} />
                } else if (i === allPiecePositions['knight-black-1']) {
                    imageElement = <img src="../Images/knight-black.png" alt="knight-black" key="rook-black-2" id="knight-black-1" onClick={() => setSelectedPiece('knight-black-1')} />
                } else if (i === allPiecePositions['knight-black-2']) {
                    imageElement = <img src="../Images/knight-black.png" alt="knight-black" key="knight-black-2" id="knight-black-2" onClick={() => setSelectedPiece('knight-black-2')} />
                } else if (i === allPiecePositions['bishop-black-1']) {
                    imageElement = <img src="../Images/bishop-black.png" alt="bishop-black" key="bishop-black-1" id="bishop-black-1" onClick={() => setSelectedPiece('bishop-black-1')} />
                } else if (i === allPiecePositions['bishop-black-2']) {
                    imageElement = <img src="../Images/bishop-black.png" alt="bishop-black" key="bishop-black-2" id="bishop-black-2" onClick={() => setSelectedPiece('bishop-black-2')} />
                } else if (i === allPiecePositions['queen-black']) {
                    imageElement = <img src="../Images/queen-black.png" alt="queen-black" key="queen-black" id="queen-black" onClick={() => setSelectedPiece('queen-black')} />
                } else if (i === allPiecePositions['king-black']) {
                    imageElement = <img src="../Images/king-black.png" alt="king-black" key="king-black" id="king-black" onClick={() => setSelectedPiece('king-black')} />
                } else if (i === allPiecePositions['pawn-black-1']) {
                    imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" key="pawn-black-1" id="pawn-black-1" onClick={() => setSelectedPiece('pawn-black-1')} />
                } else if (i === allPiecePositions['pawn-black-2']) {
                    imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" key="pawn-black-2" id="pawn-black-2" onClick={() => setSelectedPiece('pawn-black-2')} />
                } else if (i === allPiecePositions['pawn-black-3']) {
                    imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" key="pawn-black-3" id="pawn-black-3" onClick={() => setSelectedPiece('pawn-black-3')} />
                } else if (i === allPiecePositions['pawn-black-4']) {
                    imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" key="pawn-black-4" id="pawn-black-4" onClick={() => setSelectedPiece('pawn-black-4')} />
                } else if (i === allPiecePositions['pawn-black-5']) {
                    imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" key="pawn-black-5" id="pawn-black-5" onClick={() => setSelectedPiece('pawn-black-5')} />
                } else if (i === allPiecePositions['pawn-black-6']) {
                    imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" key="pawn-black-6" id="pawn-black-6" onClick={() => setSelectedPiece('pawn-black-6')} />
                } else if (i === allPiecePositions['pawn-black-7']) {
                    imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" key="pawn-black-7" id="pawn-black-7" onClick={() => setSelectedPiece('pawn-black-7')} />
                } else if (i === allPiecePositions['pawn-black-8']) {
                    imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" key="pawn-black-8" id="pawn-black-8" onClick={() => setSelectedPiece('pawn-black-8')} />
                } else if (i === allPiecePositions['pawn-white-1']) {
                    imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" key="pawn-white-1" id="pawn-white-1" onClick={() => setSelectedPiece('pawn-white-1')} />
                } else if (i === allPiecePositions['pawn-white-2']) {
                    imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" key="pawn-white-2" id="pawn-white-2" onClick={() => setSelectedPiece('pawn-white-2')} />
                } else if (i === allPiecePositions['pawn-white-3']) {
                    imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" key="pawn-white-3" id="pawn-white-3" onClick={() => setSelectedPiece('pawn-white-3')} />
                } else if (i === allPiecePositions['pawn-white-4']) {
                    imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" key="pawn-white-4" id="pawn-white-4" onClick={() => setSelectedPiece('pawn-white-4')} />
                } else if (i === allPiecePositions['pawn-white-5']) {
                    imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" key="pawn-white-5" id="pawn-white-5" onClick={() => setSelectedPiece('pawn-white-5')} />
                } else if (i === allPiecePositions['pawn-white-6']) {
                    imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" key="pawn-white-6" id="pawn-white-6" onClick={() => setSelectedPiece('pawn-white-6')} />
                } else if (i === allPiecePositions['pawn-white-7']) {
                    imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" key="pawn-white-7" id="pawn-white-7" onClick={() => setSelectedPiece('pawn-white-7')} />
                } else if (i === allPiecePositions['pawn-white-8']) {
                    imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" key="pawn-white-8" id="pawn-white-8" onClick={() => setSelectedPiece('pawn-white-8')} />
                } else if (i === allPiecePositions['rook-white-1']) {
                    imageElement = <img src="../Images/rook-white.png" alt="rook-white" key="rook-white-1" id="rook-white-1" onClick={() => setSelectedPiece('rook-white-1')} />
                } else if (i === allPiecePositions['rook-white-2']) {
                    imageElement = <img src="../Images/rook-white.png" alt="rook-white" key="rook-white-2" id="rook-white-2" onClick={() => setSelectedPiece('rook-white-2')} />
                } else if (i === allPiecePositions['knight-white-1']) {
                    imageElement = <img src="../Images/knight-white.png" alt="knight-white" key="knight-white-1" id="knight-white-1" onClick={() => setSelectedPiece('knight-white-1')} />
                } else if (i === allPiecePositions['knight-white-2']) {
                    imageElement = <img src="../Images/knight-white.png" alt="knight-white" key="knight-white-2" id="knight-white-2" onClick={() => setSelectedPiece('knight-white-2')} />
                } else if (i === allPiecePositions['bishop-white-1']) {
                    imageElement = <img src="../Images/bishop-white.png" alt="bishop-white" key="bishop-white-1" id="bishop-white-1" onClick={() => setSelectedPiece('bishop-white-1')} />
                } else if (i === allPiecePositions['bishop-white-2']) {
                    imageElement = <img src="../Images/bishop-white.png" alt="bishop-white" key="bishop-white-2" id="bishop-white-2" onClick={() => setSelectedPiece('bishop-white-2')} />
                } else if (i === allPiecePositions['queen-white']) {
                    imageElement = <img src="../Images/queen-white.png" alt="queen-white" key="queen-white" id="queen-white" onClick={() => setSelectedPiece('queen-white')} />
                } else if (i === allPiecePositions['king-white']) {
                    imageElement = <img src="../Images/king-white.png" alt="king-white"key="king-white" id="king-white" onClick={() => setSelectedPiece('king-white')} />
                }

                const rowNumber = (i - (i % 8)) / 8

                rowNumber % 2 === 0 ? cellClass = i % 2 === 0 ? 'cell-even' : 'cell-uneven' : cellClass = i % 2 === 1 ? 'cell-even' : 'cell-uneven'

                allCellElements.push(<div id={i} key={i} className={cellClass}>{imageElement}</div>)
            }

            setAllRows(() => {
                const allRowElements = []
                for (let j = 0; j < 8; j++) {
                    const currentRow = allCellElements.slice((j * 8), (j * 8) + 8)
                    allRowElements.push(<div key={j} className="row">{currentRow}</div>)
                }
                return allRowElements
            })

            return allCellElements
        })
        // eslint-disable-next-line
    }, [])

    //piece movement
    useEffect(() => {
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
                    if (currentPiece.indexOf('king') === -1 && currentPiece.split('-')[1] !== mainPiece.split('-')[1]) interceptingPieces.push(Object.entries(allPiecePositions).filter(piece => piece.includes(nextValue))[0][0])
                }
            }

            if (interceptingPieces.length === 1) {
                setPiecesShieldingKing((prev) => {
                    let newState
                    if (interceptingPieces[0].indexOf('black') !== -1) {
                        const newBlackShield = prev.black
                        if (!newBlackShield.filter(piece => piece?.piece === interceptingPieces[0]).length) newBlackShield.push({
                            piece: interceptingPieces[0],
                            shieldingFrom: mainPiece
                        })
                        newState = {
                            ...prev,
                            black: newBlackShield
                        }
                    } else {
                        const newWhiteShield = prev.white
                        if (!newWhiteShield.filter(piece => piece?.piece === interceptingPieces[0]).length) newWhiteShield.push({
                            piece: interceptingPieces[0],
                            shieldingFrom: mainPiece
                        })
                        newState = {
                            ...prev,
                            white: newWhiteShield
                        }
                    }
                    return newState
                })
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
                    if (targetPiece.indexOf('king') !== -1) {
                        setCheck(true)
                        setCheckingPiece(Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition))[0][0])
                    }
                }
                if (targetPiece.indexOf(color) !== -1 && column > 1) result.protectedPieces.push(targetPiece)
            } else {
                if (column > 1) result.threatenedCells.push(targetDiagonal)
            }
            if (Object.values(allPiecePositions).includes(targetDiagonal2)) {
                const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(targetDiagonal2))[0][0]
                if (targetPiece.indexOf(color) === -1 && column < 8) {
                    result.threatenedPieces.push(targetPiece)
                    if (targetPiece.indexOf('king') !== -1) {
                        setCheck(true)
                        setCheckingPiece(Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition))[0][0])
                    }
                }
                if (targetPiece.indexOf(color) !== -1 && column < 8) result.protectedPieces.push(targetPiece)
            } else {
                if (column < 8) result.threatenedCells.push(targetDiagonal2)
            }
            return result
        }

        const rookBishopBaseMoves = (result, i, color, currentPiecePosition, moveForward, direction, column, row) => {
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
                    if (Object.entries(allPiecePositions).filter(piece => piece.includes(moveBackward))[0][0].indexOf(color) === -1 && Object.entries(allPiecePositions).filter(piece => piece.includes(moveBackward))[0][0].indexOf('king') !== -1) {
                        checkShieldingPiece(loopValue - 1, direction, Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition))[0][0], moveBackward)
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
                    const currentPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition))[0][0]
                    if (targetPiece.indexOf('king') !== -1 && targetPiece.indexOf(currentPiece.split('-')[1]) === -1) {
                        setCheck(true)
                        setCheckingPiece(currentPiece)
                        setCellsInterceptingCheck((prev) => {
                            const newState = prev
                            for (let j = 1; j < i; j++) {
                                let interceptingCell
                                switch (direction) {
                                    case 'right': interceptingCell = currentPiecePosition + j;
                                    break;
                                    case 'left': interceptingCell = currentPiecePosition - j;
                                    break;
                                    case 'up': interceptingCell = currentPiecePosition - (j * width);
                                    break;
                                    case 'down right': interceptingCell = currentPiecePosition + width * j + j;
                                    break;
                                    case 'down left': interceptingCell = currentPiecePosition + width * j - j;
                                    break;
                                    case 'up right': interceptingCell = currentPiecePosition - width * j + j;
                                    break;
                                    case 'up left': interceptingCell = currentPiecePosition - width * j - j;
                                    break;
                                    default: interceptingCell = currentPiecePosition + (j * width);
                                }
                                if (!newState.includes(interceptingCell)) newState.push(interceptingCell)
                            }
                            return newState
                        })
                        let threateningCellValue
                        switch (direction) {
                            case 'right': threateningCellValue = moveForward + 1;
                            break;
                            case 'left': threateningCellValue = moveForward - 1;
                            break;
                            case 'up': threateningCellValue = moveForward - width;
                            break;
                            case 'down right': threateningCellValue = moveForward + width + 1;
                            break;
                            case 'down left': threateningCellValue = moveForward + width - 1;
                            break;
                            case 'up right': threateningCellValue = moveForward - width + 1;
                            break;
                            case 'up left': threateningCellValue = moveForward - width - 1;
                            break;
                            default: threateningCellValue = moveForward + width;
                        }
                        if (((!Object.values(allPiecePositions).includes(threateningCellValue)) || (Object.entries(allPiecePositions).filter(piece => piece.includes(threateningCellValue))[0][0]).split('-')[1] === currentPiece.split('-')[1])) {
                            setAllThreatenedCells((prev) => {
                                let threateningCellValue2
                                switch (direction) {
                                    case 'right': threateningCellValue2 = allPiecePositions[targetPiece] + 1;
                                    break;
                                    case 'left': threateningCellValue2 = allPiecePositions[targetPiece] - 1;
                                    break;
                                    case 'up': threateningCellValue2 = allPiecePositions[targetPiece] - width;
                                    break;
                                    case 'down right': threateningCellValue2 = allPiecePositions[targetPiece] + width + 1;
                                    break;
                                    case 'down left': threateningCellValue2 = allPiecePositions[targetPiece] + width - 1;
                                    break;
                                    case 'up right': threateningCellValue2 = allPiecePositions[targetPiece] - width + 1;
                                    break;
                                    case 'up left': threateningCellValue2 = allPiecePositions[targetPiece] - width - 1;
                                    break;
                                    default: threateningCellValue2 = allPiecePositions[targetPiece] + width;
                                }
                                const newThreatenedCells = Object.entries(prev).filter(piece => piece.includes(currentPiece))[0][1]
                                if (((!Object.values(allPiecePositions).includes(threateningCellValue2)) || (Object.entries(allPiecePositions).filter(piece => piece.includes(threateningCellValue2))[0][0]).split('-')[1] === currentPiece.split('-')[1]) && !newThreatenedCells.includes(threateningCellValue2)) {
                                    newThreatenedCells.push(threateningCellValue2)
                                }
                                return {
                                    ...prev,
                                    [currentPiece]: newThreatenedCells
                                }
                            })
                        }
                    }
                }
                if (clear && targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
            } else {
                if (clear || i === 1) result.suitableCells.push(moveForward)
            }
            return result
        }

        const rookMovement = (color, currentPiecePosition, width, row, column) => {
            let result = {
                threatenedPieces: [],
                suitableCells: [],
                protectedPieces: []
            }

            // right
            for (let i = 1; i <= width - column; i++) {
                result = rookBishopBaseMoves(result, i, color, currentPiecePosition, currentPiecePosition + i, 'right', column, row)
            }
            // left
            for (let i = 1; i < column; i++) {
                result = rookBishopBaseMoves(result, i, color, currentPiecePosition, currentPiecePosition - i, 'left', column, row)
            }
            // down
            for (let i = 1; i <= width - row; i++) {
                result = rookBishopBaseMoves(result, i, color, currentPiecePosition, currentPiecePosition + (i * width), 'down', column, row)
            }
            // up
            for (let i = 1; i < row; i++) {
                result = rookBishopBaseMoves(result, i, color, currentPiecePosition, currentPiecePosition - (i * width), 'up', column, row)
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
                        if (targetPiece.indexOf('king') !== -1) {
                            setCheck(true)
                            setCheckingPiece(Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition))[0][0])
                        }
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

        const bishopMovement = (color, currentPiecePosition, width, row, column) => {
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
                result = rookBishopBaseMoves(result, i, color, currentPiecePosition, currentPiecePosition + width * i + i, 'down right', column, row)
            }
            // down left
            if (column <= width - row) loopSize = column - 1
            if (column > width - row) loopSize = width - row
            for (let i = 1; i <= loopSize; i++) {
                result = rookBishopBaseMoves(result, i, color, currentPiecePosition, currentPiecePosition + width * i - i, 'down left', column, row)
            }
            // up right
            if (row <= width - column) loopSize = row - 1
            if (row > width - column) loopSize = width - column
            for (let i = 1; i <= loopSize; i++) {
                result = rookBishopBaseMoves(result, i, color, currentPiecePosition, currentPiecePosition - width * i + i, 'up right', column, row)
            }
            // up left
            if (column >= row) loopSize = row - 1
            if (column < row) loopSize = column - 1
            for (let i = 1; i <= loopSize; i++) {
                result = rookBishopBaseMoves(result, i, color, currentPiecePosition, currentPiecePosition - width * i - i, 'up left', column, row)
            }
            return result
        }

        const kingMovement = (color, currentPiecePosition, width, row, column) => {
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
            if (!check && allPiecePositions[selectedPiece] === positionCheck && !Object.values(allPiecePositions).includes(positionCheck + 1) && !Object.values(allPiecePositions).includes(positionCheck + 2) && Object.values(allPiecePositions).includes(positionCheck + 3) && Object.entries(allPiecePositions).filter(piece => piece.includes(positionCheck + 3))[0][0].indexOf(pieceCheck) !== -1) {
                result.suitableCells.push(positionCheck + 2)
            }
            if (!check && allPiecePositions[selectedPiece] === positionCheck && !Object.values(allPiecePositions).includes(positionCheck - 1) && !Object.values(allPiecePositions).includes(positionCheck - 2) && !Object.values(allPiecePositions).includes(positionCheck - 3) && Object.values(allPiecePositions).includes(positionCheck - 4) && Object.entries(allPiecePositions).filter(piece => piece.includes(positionCheck - 4))[0][0].indexOf(pieceCheck) !== -1) {
                result.suitableCells.push(positionCheck - 2)
            }
            return result
        }

        const setNewSuitableThreat = (targetPosition, targetPiece) => {
        //const setNewSuitableThreat = (currentPosition, targetPosition, targetPiece) => {
            // const updatedCell = (
            //     <div id={targetPosition} key={targetPosition} className='suitable' onClick={() => movePiece(targetPosition, currentPosition)}><img src={`../Images/${targetPiece.split('-')[0]}-${targetPiece.split('-')[1]}.png`} alt={`${targetPiece.split('-')[0]}-${targetPiece.split('-')[1]}`} id={targetPiece} onClick={() => setSelectedPiece('')} /></div>
            // )
            const updatedCell = (
                <div id={targetPosition} key={targetPosition} className='suitable' onClick={() => {
                    setSelectedPosition(targetPosition)
                    //setCurrentPiecePosition(currentPosition)
                }}><img src={`../Images/${targetPiece.split('-')[0]}-${targetPiece.split('-')[1]}.png`} alt={`${targetPiece.split('-')[0]}-${targetPiece.split('-')[1]}`} key={targetPiece} id={targetPiece} /></div>
            )
            setAllCells(prevCells => {
                const updatedCells = prevCells
                updatedCells.splice(targetPosition, 1, updatedCell)
                return updatedCells
            })
            // setAllRows(() => {
            //     const allRowElements = []
            //     for (let j = 0; j < 8; j++) {
            //         const currentRow = allCells.slice((j * 8), (j * 8) + 8)
            //         allRowElements.push(<div key={j} className="row">{currentRow}</div>)
            //     }
            //     return allRowElements
            // })
            setSuitableCells((prev) => {
                const newSuitableCells = prev
                if (!newSuitableCells.includes(targetPosition)) newSuitableCells.push(targetPosition)
                return newSuitableCells
            })
        }

        const setNewSuitable = (targetPosition) => {
        //const setNewSuitable = (currentPosition, targetPosition) => {
            // const updatedCell = (
            //     <div id={targetPosition} key={targetPosition} className='suitable' onClick={() => movePiece(targetPosition, currentPosition)}></div>
            // )
            const updatedCell = (
                <div id={targetPosition} key={targetPosition} className='suitable' onClick={() => {
                    setSelectedPosition(targetPosition)
                    //setCurrentPiecePosition(currentPosition)
                }}></div>
            )
            setAllCells(prevCells => {
                const updatedCells = prevCells
                updatedCells.splice(targetPosition, 1, updatedCell)
                return updatedCells
            })
            // setAllRows(() => {
            //     const allRowElements = []
            //     for (let j = 0; j < 8; j++) {
            //         const currentRow = allCells.slice((j * 8), (j * 8) + 8)
            //         allRowElements.push(<div key={j} className="row">{currentRow}</div>)
            //     }
            //     return allRowElements
            // })
            setSuitableCells((prev) => {
                const newSuitableCells = prev
                if (!newSuitableCells.includes(targetPosition)) newSuitableCells.push(targetPosition)
                return newSuitableCells
            })
        }

        const touchPiece = () => {
            if (selectedPiece && allPiecePositions[selectedPiece] >= 0 && !checkMate) {
                // remove previous suitable cells
                for (let i = 0; i < suitableCells.length ; i++) {
                    let newClass
                    const rowNumber = (suitableCells[i] - (suitableCells[i] % 8)) / 8
                    if (rowNumber % 2 === 0) {
                        newClass = suitableCells[i] % 2 === 0 ? 'cell-even' : 'cell-uneven'
                    } else {
                        newClass = suitableCells[i] % 2 === 1 ? 'cell-even' : 'cell-uneven'
                    }
                    let updatedCell
                    if (Object.values(allPiecePositions).includes(suitableCells[i])) {
                        const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(suitableCells[i]))[0][0]
                        updatedCell = (
                            <div id={suitableCells[i]} key={suitableCells[i]} className={newClass}><img src={`../Images/${targetPiece.split('-')[0]}-${targetPiece.split('-')[1]}.png`} alt={`${targetPiece.split('-')[0]}-${targetPiece.split('-')[1]}`} id={targetPiece} onClick={() => setSelectedPiece(targetPiece)} /></div>
                        )
                    } else {
                        updatedCell = (
                            <div id={suitableCells[i]} key={suitableCells[i]} className={newClass}></div>
                        )
                    }
                    setAllCells(prevCells => {
                        const updatedCells = prevCells
                        updatedCells.splice(suitableCells[i], 1, updatedCell)
                        return updatedCells
                    })
                    setAllRows(() => {
                        const allRowElements = []
                        for (let j = 0; j < 8; j++) {
                            const currentRow = allCells.slice((j * 8), (j * 8) + 8)
                            allRowElements.push(<div key={j} className="row">{currentRow}</div>)
                        }
                        return allRowElements
                    })
                }

                // remove previous selected cell class
                if (previousSelected !== -1) {
                    let newSelectedClass
                    const rowNumber = (previousSelected - (previousSelected % 8)) / 8
                    if (rowNumber % 2 === 0) {
                        newSelectedClass = previousSelected % 2 === 0 ? 'cell-even' : 'cell-uneven'
                    } else {
                        newSelectedClass = previousSelected % 2 === 1 ? 'cell-even' : 'cell-uneven'
                    }
                    const previousSelectedPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(previousSelected))[0][0]
                    const previousSelectedCell = (
                        <div id={previousSelected} key={previousSelected} className={newSelectedClass}><img src={`../Images/${previousSelectedPiece.split('-')[0]}-${previousSelectedPiece.split('-')[1]}.png`} alt={`${previousSelectedPiece.split('-')[0]}-${previousSelectedPiece.split('-')[1]}`} id={previousSelectedPiece} onClick={() => setSelectedPiece(previousSelectedPiece)}/></div>
                    )
                    setAllCells(prevCells => {
                        const updatedCells = prevCells
                        updatedCells.splice(previousSelected, 1, previousSelectedCell)
                        return updatedCells
                    })
                    setAllRows(() => {
                        const allRowElements = []
                        for (let j = 0; j < 8; j++) {
                            const currentRow = allCells.slice((j * 8), (j * 8) + 8)
                            allRowElements.push(<div key={j} className="row">{currentRow}</div>)
                        }
                        return allRowElements
                    })
                }

                setPreviousSelected(() => selectedPiece.indexOf(nextTurn) !== -1 ? allPiecePositions[selectedPiece] : -1)

                // set new selected class
                if (selectedPiece.indexOf(nextTurn) !== -1) {
                    const updatedCell = (
                        <div id={allPiecePositions[selectedPiece]} key={allPiecePositions[selectedPiece]} className='selected'><img src={`../Images/${selectedPiece.split('-')[0]}-${selectedPiece.split('-')[1]}.png`} alt={`${selectedPiece.split('-')[0]}-${selectedPiece.split('-')[1]}`} key={selectedPiece} id={selectedPiece} /></div>
                    )
                    setAllCells(prevCells => {
                        const updatedCells = prevCells
                        updatedCells.splice(allPiecePositions[selectedPiece], 1, updatedCell)
                        return updatedCells
                    })
                    //setTimeout(() => {})
                    setAllRows(() => {
                        const allRowElements = []
                        for (let j = 0; j < 8; j++) {
                            const currentRow = allCells.slice((j * 8), (j * 8) + 8)
                            allRowElements.push(<div key={j} className="row">{currentRow}</div>)
                        }
                        return allRowElements
                    })
                }

                // set new suitable cells
                //const currentPiecePosition = allPiecePositions[selectedPiece]
                if (nextTurn === selectedPiece.split('-')[1]) {
                    let column = (allPiecePositions[selectedPiece] % width) + 1
                    let row = ((allPiecePositions[selectedPiece] - (allPiecePositions[selectedPiece] % width)) / width) + 1
                    // setCurrentPiecePosition(() => {
                    //     return allPiecePositions[selectedPiece]
                    // })
                    const pieceMoveLogic = (pieceMoves) => {
                        let notShielding = true
                        let indexOfThreateningPiece = -1
                        if (selectedPiece.split('-')[1] === 'black') {
                            for (let i = 0; i < piecesShieldingKing.black.length; i++) {
                                if (piecesShieldingKing.black[i]?.piece === selectedPiece) {
                                    indexOfThreateningPiece = i
                                    notShielding = false
                                    break
                                }
                            }
                            for (let i = 0; i < pieceMoves.threatenedPieces.length; i++) {
                                let clearedCell = false
                                if (!notShielding && indexOfThreateningPiece !== -1) {
                                    const shieldingFromColumn = (allPiecePositions[piecesShieldingKing.black[indexOfThreateningPiece]?.shieldingFrom] % width) + 1
                                    const shieldingFromRow = ((allPiecePositions[piecesShieldingKing.black[indexOfThreateningPiece]?.shieldingFrom] - (allPiecePositions[piecesShieldingKing.black[indexOfThreateningPiece]?.shieldingFrom] % width)) / width) + 1
                                    const suitableCellColumn = (allPiecePositions[pieceMoves.threatenedPieces[i]] % width) + 1
                                    const suitableCellRow = ((allPiecePositions[pieceMoves.threatenedPieces[i]] - (allPiecePositions[pieceMoves.threatenedPieces[i]] % width)) / width) + 1
                                    if ((shieldingFromColumn === column && shieldingFromColumn === suitableCellColumn) || (shieldingFromRow === row && shieldingFromRow === suitableCellRow)) {
                                        clearedCell = true
                                    } else {
                                        if ((allPiecePositions[piecesShieldingKing.black[indexOfThreateningPiece]?.shieldingFrom] % 7 === allPiecePositions[pieceMoves.threatenedPieces[i]] % 7 && allPiecePositions[piecesShieldingKing.black[indexOfThreateningPiece]?.shieldingFrom] % 7 === allPiecePositions[selectedPiece] % 7) || (allPiecePositions[piecesShieldingKing.black[indexOfThreateningPiece]?.shieldingFrom] % 9 === allPiecePositions[pieceMoves.threatenedPieces[i]] % 9 && allPiecePositions[piecesShieldingKing.black[indexOfThreateningPiece]?.shieldingFrom] % 9 === allPiecePositions[selectedPiece] % 9)) {
                                            clearedCell = true
                                        }
                                    }
                                }
                                if (notShielding || clearedCell) setNewSuitableThreat(allPiecePositions[pieceMoves.threatenedPieces[i]], pieceMoves.threatenedPieces[i])
                            }
                            for (let i = 0; i < pieceMoves.suitableCells.length; i++) {
                                let clearedCell = false
                                if (!notShielding && indexOfThreateningPiece !== -1) {
                                    const shieldingFromColumn = (allPiecePositions[piecesShieldingKing.black[indexOfThreateningPiece]?.shieldingFrom] % width) + 1
                                    const shieldingFromRow = ((allPiecePositions[piecesShieldingKing.black[indexOfThreateningPiece]?.shieldingFrom] - (allPiecePositions[piecesShieldingKing.black[indexOfThreateningPiece]?.shieldingFrom] % width)) / width) + 1
                                    const suitableCellColumn = (pieceMoves.suitableCells[i] % width) + 1
                                    const suitableCellRow = ((pieceMoves.suitableCells[i] - (pieceMoves.suitableCells[i] % width)) / width) + 1
                                    if ((shieldingFromColumn === column && shieldingFromColumn === suitableCellColumn) || (shieldingFromRow === row && shieldingFromRow === suitableCellRow)) {
                                        clearedCell = true
                                    } else {
                                        if ((allPiecePositions[piecesShieldingKing.black[indexOfThreateningPiece]?.shieldingFrom] % 7 === pieceMoves.suitableCells[i] % 7 && allPiecePositions[piecesShieldingKing.black[indexOfThreateningPiece]?.shieldingFrom] % 7 === allPiecePositions[selectedPiece] % 7) || (allPiecePositions[piecesShieldingKing.black[indexOfThreateningPiece]?.shieldingFrom] % 9 === pieceMoves.suitableCells[i] % 9 && allPiecePositions[piecesShieldingKing.black[indexOfThreateningPiece]?.shieldingFrom] % 9 === allPiecePositions[selectedPiece] % 9)) {
                                            clearedCell = true
                                        }
                                    }
                                }
                                if (notShielding || clearedCell) setNewSuitable(pieceMoves.suitableCells[i])
                            }
                        } else {
                            for (let i = 0; i < piecesShieldingKing.white.length; i++) {
                                if (piecesShieldingKing.white[i]?.piece === selectedPiece) {
                                    indexOfThreateningPiece = i
                                    notShielding = false
                                    break
                                }
                            }
                            for (let i = 0; i < pieceMoves.threatenedPieces.length; i++) {
                                let clearedCell = false
                                if (!notShielding && indexOfThreateningPiece !== -1) {
                                    const shieldingFromColumn = (allPiecePositions[piecesShieldingKing.white[indexOfThreateningPiece]?.shieldingFrom] % width) + 1
                                    const shieldingFromRow = ((allPiecePositions[piecesShieldingKing.white[indexOfThreateningPiece]?.shieldingFrom] - (allPiecePositions[piecesShieldingKing.white[indexOfThreateningPiece]?.shieldingFrom] % width)) / width) + 1
                                    const suitableCellColumn = (allPiecePositions[pieceMoves.threatenedPieces[i]] % width) + 1
                                    const suitableCellRow = ((allPiecePositions[pieceMoves.threatenedPieces[i]] - (allPiecePositions[pieceMoves.threatenedPieces[i]] % width)) / width) + 1
                                    if ((shieldingFromColumn === column && shieldingFromColumn === suitableCellColumn) || (shieldingFromRow === row && shieldingFromRow === suitableCellRow)) {
                                        clearedCell = true
                                    } else {
                                        if ((allPiecePositions[piecesShieldingKing.white[indexOfThreateningPiece]?.shieldingFrom] % 7 === allPiecePositions[pieceMoves.threatenedPieces[i]] % 7 && allPiecePositions[piecesShieldingKing.white[indexOfThreateningPiece]?.shieldingFrom] % 7 === allPiecePositions[selectedPiece] % 7) || (allPiecePositions[piecesShieldingKing.white[indexOfThreateningPiece]?.shieldingFrom] % 9 === allPiecePositions[pieceMoves.threatenedPieces[i]] % 9 && allPiecePositions[piecesShieldingKing.white[indexOfThreateningPiece]?.shieldingFrom] % 9 === allPiecePositions[selectedPiece] % 9)) {
                                            clearedCell = true
                                        }
                                    }
                                }
                                if (notShielding || clearedCell) setNewSuitableThreat(allPiecePositions[pieceMoves.threatenedPieces[i]], pieceMoves.threatenedPieces[i])
                            }
                            for (let i = 0; i < pieceMoves.suitableCells.length; i++) {
                                let clearedCell = false
                                if (!notShielding && indexOfThreateningPiece !== -1) {
                                    const shieldingFromColumn = (allPiecePositions[piecesShieldingKing.white[indexOfThreateningPiece]?.shieldingFrom] % width) + 1
                                    const shieldingFromRow = ((allPiecePositions[piecesShieldingKing.white[indexOfThreateningPiece]?.shieldingFrom] - (allPiecePositions[piecesShieldingKing.white[indexOfThreateningPiece]?.shieldingFrom] % width)) / width) + 1
                                    const suitableCellColumn = (pieceMoves.suitableCells[i] % width) + 1
                                    const suitableCellRow = ((pieceMoves.suitableCells[i] - (pieceMoves.suitableCells[i] % width)) / width) + 1
                                    if ((shieldingFromColumn === column && shieldingFromColumn === suitableCellColumn) || (shieldingFromRow === row && shieldingFromRow === suitableCellRow)) {
                                        clearedCell = true
                                    } else {
                                        if ((allPiecePositions[piecesShieldingKing.white[indexOfThreateningPiece]?.shieldingFrom] % 7 === pieceMoves.suitableCells[i] % 7 && allPiecePositions[piecesShieldingKing.white[indexOfThreateningPiece]?.shieldingFrom] % 7 === allPiecePositions[selectedPiece] % 7) || (allPiecePositions[piecesShieldingKing.white[indexOfThreateningPiece]?.shieldingFrom] % 9 === pieceMoves.suitableCells[i] % 9 && allPiecePositions[piecesShieldingKing.white[indexOfThreateningPiece]?.shieldingFrom] % 9 === allPiecePositions[selectedPiece] % 9)) {
                                            clearedCell = true
                                        }
                                    }
                                }
                                if (notShielding || clearedCell) setNewSuitable(pieceMoves.suitableCells[i])
                            }
                        }
                    }
    
                    const kingMoveLogic = (color) => {
                        const kingMoves = kingMovement(color, allPiecePositions[selectedPiece], width, row, column)
                        const allThreatenedByOpponent = []
                        for (let i = 0; i < Object.entries(allThreatenedCells).length; i++) {
                            if (Object.entries(allThreatenedCells)[i][0].indexOf(color) === -1) allThreatenedByOpponent.push(Object.entries(allThreatenedCells)[i][1])
                        }
                        for (let i = 0; i < kingMoves.threatenedPieces.length; i++) {
                            if (!allThreatenedByOpponent.flat().includes(allPiecePositions[kingMoves.threatenedPieces[i]])) setNewSuitableThreat(allPiecePositions[kingMoves.threatenedPieces[i]], kingMoves.threatenedPieces[i])
                        }
                        for (let i = 0; i < kingMoves.suitableCells.length; i++) {
                            if (!allThreatenedByOpponent.flat().includes(kingMoves.suitableCells[i])) setNewSuitable(kingMoves.suitableCells[i])
                        }
                    }
    
                    if (!check) {
                        // pawn
                        if (selectedPiece.indexOf('pawn') !== -1 && nextTurn === selectedPiece.split('-')[1]) {
                            const pawnMoves = pawnMovement(selectedPiece.split('-')[1], allPiecePositions[selectedPiece], row, column)
                            pieceMoveLogic(pawnMoves)
                        }
                        // rook / queen
                        if ((selectedPiece.indexOf('rook') !== -1 || selectedPiece.indexOf('queen') !== -1) && nextTurn === selectedPiece.split('-')[1]) {
                            const rookMoves = rookMovement(selectedPiece.split('-')[1], allPiecePositions[selectedPiece], width, row, column)
                            pieceMoveLogic(rookMoves)
                        }
                        // knight
                        if (selectedPiece.indexOf('knight') !== -1 && nextTurn === selectedPiece.split('-')[1]) {
                            const knightMoves = knightMovement(selectedPiece.split('-')[1], allPiecePositions[selectedPiece], row, column)
                            pieceMoveLogic(knightMoves)
                        }
                        // bishop / queen
                        if ((selectedPiece.indexOf('bishop') !== -1 || selectedPiece.indexOf('queen') !== -1) && nextTurn === selectedPiece.split('-')[1]) {
                            const bishopMoves = bishopMovement(selectedPiece.split('-')[1], allPiecePositions[selectedPiece], width, row, column)
                            pieceMoveLogic(bishopMoves)
                        }
                        // king
                        if (selectedPiece.indexOf('king') !== -1 && nextTurn === selectedPiece.split('-')[1]) kingMoveLogic(selectedPiece.split('-')[1])
                    } else {
                        let selectedPieceNotShielding = true
                        for (const piece in piecesShieldingKing) {
                            for (let i = 0; i < piecesShieldingKing[piece].length; i++) {
                                if (piecesShieldingKing[piece][i].piece === selectedPiece) selectedPieceNotShielding = false
                            }
                        }
                        if (selectedPieceNotShielding) {
                            // pawn
                            if (selectedPiece.indexOf('pawn') !== -1 && nextTurn === selectedPiece.split('-')[1]) {
                                const pawnMoves = pawnMovement(selectedPiece.split('-')[1], allPiecePositions[selectedPiece], row, column)
                                // take out checking piece
                                for (let j = 0; j < pawnMoves.threatenedPieces.length; j++) {
                                    if (pawnMoves.threatenedPieces[j] === checkingPiece) setNewSuitableThreat(allPiecePositions[checkingPiece], checkingPiece)
                                }
                                // intercept checking piece
                                for (let i = 0; i < pawnMoves.suitableCells.length; i++) {
                                    if (cellsInterceptingCheck.includes(pawnMoves.suitableCells[i])) setNewSuitable(pawnMoves.suitableCells[i])
                                }
                            }
                            // rook / queen
                            if ((selectedPiece.indexOf('rook') !== -1 || selectedPiece.indexOf('queen') !== -1) && nextTurn === selectedPiece.split('-')[1]) {
                                const rookMoves = rookMovement(selectedPiece.split('-')[1], allPiecePositions[selectedPiece], width, row, column)
                                // take out checking piece
                                for (let j = 0; j < rookMoves.threatenedPieces.length; j++) {
                                    if (rookMoves.threatenedPieces[j] === checkingPiece) setNewSuitableThreat(allPiecePositions[checkingPiece], checkingPiece)
                                }
                                // intercept checking piece
                                for (let i = 0; i < rookMoves.suitableCells.length; i++) {
                                    if (cellsInterceptingCheck.includes(rookMoves.suitableCells[i])) setNewSuitable(rookMoves.suitableCells[i])
                                }
                            }
                            // knight
                            if (selectedPiece.indexOf('knight') !== -1 && nextTurn === selectedPiece.split('-')[1]) {
                                const knightMoves = knightMovement(selectedPiece.split('-')[1], allPiecePositions[selectedPiece], row, column)
                                // take out checking piece
                                for (let j = 0; j < knightMoves.threatenedPieces.length; j++) {
                                    if (knightMoves.threatenedPieces[j] === checkingPiece) setNewSuitableThreat(allPiecePositions[checkingPiece], checkingPiece)
                                }
                                // intercept checking piece
                                for (let i = 0; i < knightMoves.suitableCells.length; i++) {
                                    if (cellsInterceptingCheck.includes(knightMoves.suitableCells[i])) setNewSuitable(knightMoves.suitableCells[i])
                                }
                            }
                            // bishop / queen
                            if ((selectedPiece.indexOf('bishop') !== -1 || selectedPiece.indexOf('queen') !== -1) && nextTurn === selectedPiece.split('-')[1]) {
                                const bishopMoves = bishopMovement(selectedPiece.split('-')[1], allPiecePositions[selectedPiece], width, row, column)
                                // take out checking piece
                                for (let j = 0; j < bishopMoves.threatenedPieces.length; j++) {
                                    if (bishopMoves.threatenedPieces[j] === checkingPiece) setNewSuitableThreat(allPiecePositions[checkingPiece], checkingPiece)
                                }
                                // intercept checking piece
                                for (let i = 0; i < bishopMoves.suitableCells.length; i++) {
                                    if (cellsInterceptingCheck.includes(bishopMoves.suitableCells[i])) setNewSuitable(bishopMoves.suitableCells[i])
                                }
                            }
                            // king
                            if (selectedPiece.indexOf('king') !== -1 && nextTurn === selectedPiece.split('-')[1]) kingMoveLogic(selectedPiece.split('-')[1])
                        }
                    }
                }
            }
        }

        setAllThreatenedCells(prev => {
            const newState = prev
            for (const piece in prev) {
                newState[piece] = []
            }
            return newState
        })

        // check verification, set all threatened cells
        let isCheck = false
        const checkThreatVerify = (currentPiece, pieceMoves) => {
            for (let j = 0; j < pieceMoves.threatenedPieces.length; j++) {
                setAllThreatenedCells((prev) => {
                    const newThreatenedCells = prev[currentPiece]
                    if (!newThreatenedCells.includes(allPiecePositions[pieceMoves.threatenedPieces[j]])) newThreatenedCells.push(allPiecePositions[pieceMoves.threatenedPieces[j]])
                    return {
                        ...prev,
                        [currentPiece]: newThreatenedCells
                    }
                })
                if (pieceMoves.threatenedPieces[j].indexOf('king') !== -1) {
                    setCheckingPiece(currentPiece)
                    isCheck = true
                }
            }
            for (let j = 0; j < pieceMoves.protectedPieces.length; j++) {
                setAllThreatenedCells((prev) => {
                    const newThreatenedCells = prev[currentPiece]
                    if (!newThreatenedCells.includes(allPiecePositions[pieceMoves.protectedPieces[j]])) newThreatenedCells.push(allPiecePositions[pieceMoves.protectedPieces[j]])
                    return {
                        ...prev,
                        [currentPiece]: newThreatenedCells
                    }
                })
            }
            if (currentPiece.indexOf('pawn') !== -1) {
                for (let j = 0; j < pieceMoves.threatenedCells.length; j++) {
                    setAllThreatenedCells((prev) => {
                        const newThreatenedCells = prev[currentPiece]
                        if (pieceMoves.threatenedCells[j] && !newThreatenedCells.includes(pieceMoves.threatenedCells[j])) newThreatenedCells.push(pieceMoves.threatenedCells[j])
                        return {
                            ...prev,
                            [currentPiece]: newThreatenedCells
                        }
                    })
                }
            }
            if (currentPiece.indexOf('pawn') === -1) {
                for (let j = 0; j < pieceMoves.suitableCells.length; j++) {
                    setAllThreatenedCells((prev) => {
                        const newThreatenedCells = prev[currentPiece]
                        if (!newThreatenedCells.includes(pieceMoves.suitableCells[j])) newThreatenedCells.push(pieceMoves.suitableCells[j])
                        return {
                            ...prev,
                            [currentPiece]: newThreatenedCells
                        }
                    })
                }
            }
        }
        for (let i = 0; i < Object.values(allPiecePositions).length; i++) {
            const currentPiece = Object.entries(allPiecePositions)[i][0]
            const currentPosition = Object.entries(allPiecePositions)[i][1]
            if (currentPosition !== -1) {
                let column = (currentPosition % width) + 1
                let row = ((currentPosition - (currentPosition % width)) / width) + 1
                if (currentPiece.indexOf('pawn') !== -1) {
                    let pawnMoves = pawnMovement(currentPiece.split('-')[1], currentPosition, row, column)
                    checkThreatVerify(currentPiece, pawnMoves)
                }
                if (currentPiece.indexOf('rook') !== -1 || currentPiece.indexOf('queen') !== -1) {
                    let rookMoves = rookMovement(currentPiece.split('-')[1], currentPosition, width, row, column)
                    checkThreatVerify(currentPiece, rookMoves)
                }
                if (currentPiece.indexOf('knight') !== -1) {
                    let knightMoves = knightMovement(currentPiece.split('-')[1], currentPosition, row, column)
                    checkThreatVerify(currentPiece, knightMoves)
                }
                if (currentPiece.indexOf('bishop') !== -1 || currentPiece.indexOf('queen') !== -1) {
                    let bishopMoves = bishopMovement(currentPiece.split('-')[1], currentPosition, width, row, column)
                    checkThreatVerify(currentPiece, bishopMoves)
                }
                if (currentPiece.indexOf('king') !== -1) {
                    let kingMoves = kingMovement(currentPiece.split('-')[1], currentPosition, width, row, column)
                    checkThreatVerify(currentPiece, kingMoves)
                }
            }
        }
        if (isCheck) {
            setCheck(true)
        } else {
            setCheck(false)
            setCheckingPiece('')
            setCellsInterceptingCheck([])
        }

        //checkmate verification
        if (check && checkingPiece) {
            let noThreat = true
            let noInterception = true
            let noKingMoves = true
            // check threat
            const checkingPiecePosition = Object.entries(allPiecePositions).filter(piece => piece.includes(checkingPiece))[0][1]
            const threatenedCells = []
            const blockedCells = []
            for (const piece in allThreatenedCells) {
                if (piece.split('-')[1] === nextTurn) {
                    if (piece.indexOf('king') === -1) threatenedCells.push(allThreatenedCells[piece])
                } else {
                    blockedCells.push(allThreatenedCells[piece])
                }
            }
            if (threatenedCells.flat().includes(checkingPiecePosition)) noThreat = false
            // check interception
            for (let i = 0; i < cellsInterceptingCheck.length; i++) {
                if (threatenedCells.flat().includes(cellsInterceptingCheck[i])) {
                    if (Object.entries(allThreatenedCells).filter(piece => piece.flat().includes(cellsInterceptingCheck[i]))[0][0].indexOf('pawn') === -1 && Object.entries(allThreatenedCells).filter(piece => piece.flat().includes(cellsInterceptingCheck[i]))[0][0].indexOf('king') === -1) {
                        noInterception = false
                        break
                    }
                }
            }
            // check king moves
            const currentKingPosition = Object.entries(allPiecePositions).filter(piece => piece.includes(`king-${nextTurn}`))[0][1]
            const column = (currentKingPosition % width) + 1
            const row = ((currentKingPosition - (currentKingPosition % width)) / width) + 1
            const kingMoves = kingMovement(nextTurn, currentKingPosition, width, row, column)
            for (let i = 0; i < kingMoves.threatenedPieces.length; i++) {
                if (!blockedCells.flat().includes(Object.entries(allPiecePositions).filter(piece => piece.includes(kingMoves.threatenedPieces[i]))[0][1])) {
                    noKingMoves = false
                    break
                }
            }
            for (let i = 0; i < kingMoves.suitableCells.length; i++) {
                if (!blockedCells.flat().includes(kingMoves.suitableCells[i])) {
                    noKingMoves = false
                    break
                }
            }
            if (noThreat && noInterception && noKingMoves) {
                setCheckMate(true)
            }
        }
        touchPiece()
        return () => setSelectedPiece(prev => prev)
        // eslint-disable-next-line
    }, [selectedPiece, checkingPiece, check])

    useEffect(() => {
        const movePiece = () => {
            // remove previous suitable cells
            for (let i = 0; i < suitableCells.length ; i++) {
                let newClass
                const rowNumber = (suitableCells[i] - (suitableCells[i] % 8)) / 8
                if (rowNumber % 2 === 0) {
                    newClass = suitableCells[i] % 2 === 0 ? 'cell-even' : 'cell-uneven'
                } else {
                    newClass = suitableCells[i] % 2 === 1 ? 'cell-even' : 'cell-uneven'
                }
                let updatedCell
                if (Object.values(allPiecePositions).includes(suitableCells[i])) {
                    const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(suitableCells[i]))[0][0]
                    updatedCell = (
                        <div id={suitableCells[i]} key={suitableCells[i]} className={newClass}><img src={`../Images/${targetPiece.split('-')[0]}-${targetPiece.split('-')[1]}.png`} alt={`${targetPiece.split('-')[0]}-${targetPiece.split('-')[1]}`} id={targetPiece} onClick={() => setSelectedPiece(targetPiece)} /></div>
                    )
                } else {
                    updatedCell = (
                        <div id={suitableCells[i]} key={suitableCells[i]} className={newClass}></div>
                    )
                }
                setAllCells(prevCells => {
                    const updatedCells = prevCells
                    updatedCells.splice(suitableCells[i], 1, updatedCell)
                    return updatedCells
                })
                setAllRows(() => {
                    const allRowElements = []
                    for (let j = 0; j < 8; j++) {
                        const currentRow = allCells.slice((j * 8), (j * 8) + 8)
                        allRowElements.push(<div key={j} className="row">{currentRow}</div>)
                    }
                    return allRowElements
                })
            }
            setSuitableCells(() => [])

            if (selectedPosition !== allPiecePositions[selectedPiece]) {
                let occupiedCellClass
                const rowNumber = (selectedPosition - (selectedPosition % 8)) / 8
                if (rowNumber % 2 === 0) {
                    occupiedCellClass = selectedPosition % 2 === 0 ? 'cell-even' : 'cell-uneven'
                } else {
                    occupiedCellClass = selectedPosition % 2 === 1 ? 'cell-even' : 'cell-uneven'
                }
                let vacatedCellClass
                const rowNumber2 = (allPiecePositions[selectedPiece] - (allPiecePositions[selectedPiece] % 8)) / 8
                if (rowNumber2 % 2 === 0) {
                    vacatedCellClass = allPiecePositions[selectedPiece] % 2 === 0 ? 'cell-even' : 'cell-uneven'
                } else {
                    vacatedCellClass = allPiecePositions[selectedPiece] % 2 === 1 ? 'cell-even' : 'cell-uneven'
                }
                let occupiedCell
                // pawn queening
                if (selectedPiece.indexOf('pawn-white') !== -1 && selectedPosition < 8 && selectedPosition >= 0) {
                    occupiedCell = (
                        <div id={selectedPosition} key={selectedPosition} className={occupiedCellClass}><img src="../Images/queen-white.png" alt="queen-white" key="queen-white-2" id="queen-white-2" onClick={() => setSelectedPiece('queen-white-2')}/></div>
                    )
                    setAllPiecePositions(prev => {
                        let newState = {
                            ...prev,
                            'queen-white-2': selectedPosition,
                            [selectedPiece]: -2,
                        }
                        if (Object.values(prev).includes(selectedPosition)) {
                            const takenOutPiece = Object.entries(prev).filter(piece => piece.includes(selectedPosition))[0][0]
                            newState = {
                                ...newState,
                                [takenOutPiece]: -1
                            }
                        }
                        return newState
                    })
                    setAllThreatenedCells((prev) => {
                        let newState = {
                            ...prev,
                            'queen-white-2': []
                        }
                        return newState
                    })
                } else if (selectedPiece.indexOf('pawn-black') !== -1 && selectedPosition <= 63 && selectedPosition > 55) {
                    occupiedCell = (
                        <div id={selectedPosition} key={selectedPosition} className={occupiedCellClass}><img src="../Images/queen-black.png" alt="queen-black" key="queen-black-2"  id="queen-black-2" onClick={() => setSelectedPiece('queen-black')}/></div>
                    )
                    setAllPiecePositions(prev => {
                        let newState = {
                            ...prev,
                            'queen-black-2': selectedPosition,
                            [selectedPiece]: -2,
                        }
                        if (Object.values(prev).includes(selectedPosition)) {
                            const takenOutPiece = Object.entries(prev).filter(piece => piece.includes(selectedPosition))[0][0]
                            newState = {
                                ...newState,
                                [takenOutPiece]: -1
                            }
                        }
                        return newState
                    })
                    setAllThreatenedCells((prev) => {
                        let newState = {
                            ...prev,
                            'queen-black-2': []
                        }
                        return newState
                    })
                } else {
                    occupiedCell = (
                        <div id={selectedPosition} key={selectedPosition} className={occupiedCellClass}><img src={`../Images/${selectedPiece.split('-')[0]}-${selectedPiece.split('-')[1]}.png`} alt={`${selectedPiece.split('-')[0]}-${selectedPiece.split('-')[1]}`} key={selectedPiece} id={selectedPiece} onClick={() => setSelectedPiece(selectedPiece)}/></div>
                    )
                    //console.log(occupiedCell)
                    setAllPiecePositions(prev => {
                        let newState
                        if (Object.values(prev).includes(selectedPosition)) {
                            const takenOutPiece = Object.entries(prev).filter(piece => piece.includes(selectedPosition))[0][0]
                            newState = {
                                ...prev,
                                [selectedPiece]: selectedPosition,
                                [takenOutPiece]: -1
                            }
                        } else {
                            newState = {
                                ...prev,
                                [selectedPiece]: selectedPosition,
                            }
                        }
                        return newState
                    })
                }
                const vacatedCell = (
                    <div id={allPiecePositions[selectedPiece]} key={allPiecePositions[selectedPiece]} className={vacatedCellClass}></div>
                )
                setAllCells(prevCells => {
                    const updatedCells = prevCells
                    updatedCells.splice(selectedPosition, 1, occupiedCell)
                    updatedCells.splice(allPiecePositions[selectedPiece], 1, vacatedCell)
                    return updatedCells
                })
                setAllRows(() => {
                    const allRowElements = []
                    for (let j = 0; j < 8; j++) {
                        const currentRow = allCells.slice((j * 8), (j * 8) + 8)
                        allRowElements.push(<div key={j} className="row">{currentRow}</div>)
                    }
                    return allRowElements
                })
                // Castling
                if (selectedPiece.indexOf('king') !== -1 && ((selectedPosition - allPiecePositions[selectedPiece] === 2) || (selectedPosition - allPiecePositions[selectedPiece] === -2))) {
                    let occupiedCell
                    let vacatedCell
                    let pieceToMove
                    let positionToMove
                    let vacatedPosition
                    if (selectedPiece.indexOf('white') !== -1) {
                        if (selectedPosition - allPiecePositions[selectedPiece] === 2) {
                            pieceToMove = 'rook-white-2'
                            positionToMove = 61
                            vacatedPosition = 63
                            occupiedCell = (
                                <div id={61} key={61} className='cell-even'><img src='../Images/rook-white.png' alt='rook-white' key='rook-white-2' id='rook-white-2' onClick={() => setSelectedPiece('rook-white-2')} /></div>
                            )
                            vacatedCell = (
                                <div id={63} key={63} className='cell-even'></div>
                            )
                        } else {
                            pieceToMove = 'rook-white-1'
                            positionToMove = 59
                            vacatedPosition = 56
                            occupiedCell = (
                                <div id={59} key={59} className='cell-even'><img src='../Images/rook-white.png' alt='rook-white' key='rook-white-1' id='rook-white-1' onClick={() => setSelectedPiece('rook-white-1')} /></div>
                            )
                            vacatedCell = (
                                <div id={56} key={56} className='cell-uneven'></div>
                            )
                        }
                    } else {
                        pieceToMove = 'rook-black-2'
                        positionToMove = 5
                        vacatedPosition = 7
                        if (selectedPosition - allPiecePositions[selectedPiece] === 2) {
                            occupiedCell = (
                                <div id={5} key={5} className='cell-uneven'><img src='../Images/rook-black.png' alt='rook-black' key='rook-black-2' id='rook-black-2' onClick={() => setSelectedPiece('rook-black-2')} /></div>
                            )
                            vacatedCell = (
                                <div id={7} key={7} className='cell-uneven'></div>
                            )
                        } else {
                            pieceToMove = 'rook-black-1'
                            positionToMove = 3
                            vacatedPosition = 0
                            occupiedCell = (
                                <div id={3} key={3} className='cell-uneven'><img src='../Images/rook-black.png' alt='rook-black' key='rook-black-1' id='rook-black-1' onClick={() => setSelectedPiece('rook-black-1')} /></div>
                            )
                            vacatedCell = (
                                <div id={0} key={0} className='cell-even'></div>
                            )
                        }
                    }
                    setAllPiecePositions(prev => {
                        let newState = {
                            ...prev,
                            [pieceToMove]: positionToMove,
                        }
                        return newState
                    })
                    setAllCells(prevCells => {
                        const updatedCells = prevCells
                        updatedCells.splice(positionToMove, 1, occupiedCell)
                        updatedCells.splice(vacatedPosition, 1, vacatedCell)
                        return updatedCells
                    })
                    setAllRows(() => {
                        const allRowElements = []
                        for (let j = 0; j < 8; j++) {
                            const currentRow = allCells.slice((j * 8), (j * 8) + 8)
                            allRowElements.push(<div key={j} className="row">{currentRow}</div>)
                        }
                        return allRowElements
                    })
                }
                setPiecesShieldingKing(() => {
                    return {
                        black: [],
                        white: []
                    }
                })
                setCellsInterceptingCheck([])
                setCheckingPiece('')
                setPreviousSelected(-1)
                setSelectedPiece('')
                setSelectedPosition(-1)
                //setTimeout(() => {
                    setNextTurn(prev => prev === 'white' ? 'black' : 'white')
                //})
            }
        }
        if (!checkMate && selectedPosition !== -1 && allPiecePositions[selectedPiece] !== -1) movePiece()
        return () => setSelectedPiece(prev => prev)
        // eslint-disable-next-line
    }, [selectedPosition, nextTurn])

    // auto move
    useEffect(() => {
        setTimeout(() => {
            if (nextTurn === 'black') {
                window.sessionStorage.setItem('codeRan', false)
                setAllPiecePositions((prev) => {
                    const move = nextMove(prev, check, piecesShieldingKing, cellsInterceptingCheck, checkingPiece)
                    setTimeout(() => {
                        setSelectedPiece((prev)=> {
                            if (move?.selectedPiece){
                                return move?.selectedPiece
                            } else {
                                return prev
                            }
                        })
                        setTimeout(() => {
                            setSelectedPosition(prev => {
                                if (move?.selectedPosition > -1){
                                    return move?.selectedPosition
                                } else {
                                    return prev
                                }
                            })
                        }, 500)
                    }, 500)
                    return prev
                })
            }
        }, 10)
        setSelectedPiece('')
        setSelectedPosition(-1)
    }, [nextTurn])

    // set taken out pieces
    useEffect(() => {
        for (let i = 0; i < 32; i++) {
            if (Object.entries(allPiecePositions)[i][1] === -1) {
                if (Object.entries(allPiecePositions)[i][0].indexOf('black') !== -1) {
                    setTakenOutBlack((prev) => {
                        const newState = prev
                        if (!newState.includes(Object.entries(allPiecePositions)[i][0])) newState.push(Object.entries(allPiecePositions)[i][0])
                        return newState
                    })
                } else {
                    setTakenOutWhite((prev) => {
                        const newState = prev
                        if (!newState.includes(Object.entries(allPiecePositions)[i][0])) newState.push(Object.entries(allPiecePositions)[i][0])
                        return newState
                    })
                }
            }
        }
    }, [allPiecePositions])

    const blackTakenOut = takenOutBlack.map(piece => {
        return (
            <img src={`../Images/${piece.split('-')[0]}-${piece.split('-')[1]}.png`} alt={`${piece.split('-')[0]}-${piece.split('-')[1]}`} id={piece} key={piece}/>
        )
    })
    const whiteTakenOut = takenOutWhite.map(piece => {
        return (
            <img src={`../Images/${piece.split('-')[0]}-${piece.split('-')[1]}.png`} alt={`${piece.split('-')[0]}-${piece.split('-')[1]}`} id={piece} key={piece}/>
        )
    })

    return (
        <div id="page">
            <div id="board-check">
            <p id="check-display" style={{color: check && nextTurn === 'white' ? 'black' : 'white', textShadow: check && nextTurn === 'white' ? '4px 4px gray' : '4px 4px gray'}}>{checkMate ? nextTurn === 'black' ? 'Checkmate, white wins' : 'Checkmate, black wins' : check ? 'Check!' : ''}</p>
                <div id="taken-out-white-pieces">{whiteTakenOut}</div>
                <div id="board">
                    {allRows}
                </div>
                <div id="taken-out-black-pieces">{blackTakenOut}</div>
            </div>
        </div>
    )
}

export default Board
