// import { useEffect, useState } from "react"

// const Board = () => {

//     //console.log('running test')

//     let width = 8

//     const [allCells, setAllCells] = useState([])

//     const [allRows, setAllRows] = useState([])

//     //const [selectedPiece, touchPiece] = useState('')

//     const [allPiecePositions, setAllPiecePositions] = useState({
//         'rook-black-1': 0,
//         'rook-black-2': 7,
//         'knight-black-1': 1,
//         'knight-black-2': 6,
//         'bishop-black-1': 2,
//         'bishop-black-2': 5,
//         'queen-black': 3,
//         'king-black': 4,
//         'pawn-black-1': 8,
//         'pawn-black-2': 9,
//         'pawn-black-3': 10,
//         'pawn-black-4': 11,
//         'pawn-black-5': 12,
//         'pawn-black-6': 13,
//         'pawn-black-7': 14,
//         'pawn-black-8': 15,
//         'pawn-white-1': 48,
//         'pawn-white-2': 49,
//         'pawn-white-3': 50,
//         'pawn-white-4': 51,
//         'pawn-white-5': 52,
//         'pawn-white-6': 53,
//         'pawn-white-7': 54,
//         'pawn-white-8': 55,
//         'rook-white-1': 56,
//         'rook-white-2': 63,
//         'knight-white-1': 57,
//         'knight-white-2': 62,
//         'bishop-white-1': 58,
//         'bishop-white-2': 61,
//         'queen-white': 59,
//         'king-white': 60,
//     })

//     const [nextTurn, setNextTurn] = useState('white')

//     const [suitableCells, setSuitableCells] = useState([])

//     const [previousSelected, setPreviousSelected] = useState(-1)

//     const [check, setCheck] = useState(false)

//     const [checkingPiece, setCheckingPiece] = useState('')

//     const [allThreatenedCells, setAllThreatenedCells] = useState({
//         black: [],
//         white: []
//     })

//     // const [checkMate, setCheckMate] = useState(false)

//     //create cells
//     useEffect(() => {
//         const pawnMovement = (color, currentPiecePosition, row) => {
//             const result = {
//                 threatenedPieces: [],
//                 suitableCells: [],
//                 protectedPieces: []
//             }
//             const targetSimple = color === 'black' ? currentPiecePosition + 8 : currentPiecePosition - 8
//             const targetDouble = color === 'black' ? currentPiecePosition + 16 : currentPiecePosition - 16
//             const targetDiagonal = color === 'black' ? currentPiecePosition + 7 : currentPiecePosition - 7
//             const targetDiagonal2 = color === 'black' ? currentPiecePosition + 9 : currentPiecePosition - 9
//             const rowCheck = color === 'black' ? 2 : 7
//             const threatCheck = color === 'black' ? ((((targetDiagonal) - ((targetDiagonal) % 8)) / 8) + 1) - row : row - ((((targetDiagonal) - ((targetDiagonal) % 8)) / 8) + 1)
//             const threatCheck2 = color === 'black' ? ((((targetDiagonal2) - ((targetDiagonal2) % 8)) / 8) + 1) - row : row - ((((targetDiagonal2) - ((targetDiagonal2) % 8)) / 8) + 1)
//             // simple move forward
//             if (!Object.values(allPiecePositions).includes(targetSimple)) result.suitableCells.push(targetSimple)
//             // double move forward
//             if (rowCheck === row && !Object.values(allPiecePositions).includes(targetSimple) && !Object.values(allPiecePositions).includes(targetDouble)) result.suitableCells.push(targetDouble)
//             // diagonal attack
//             if (Object.values(allPiecePositions).includes(targetDiagonal)) {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(targetDiagonal))[0][0]
//                 if (targetPiece.indexOf(color) === -1 && threatCheck === 1) result.threatenedPieces.push(targetPiece)
//                 if (targetPiece.indexOf(color) !== -1 && threatCheck === 1) result.protectedPieces.push(targetPiece)
//             }
//             if (Object.values(allPiecePositions).includes(targetDiagonal2)) {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(targetDiagonal2))[0][0]
//                 if (targetPiece.indexOf(color) === -1 && threatCheck2 === 1) result.threatenedPieces.push(targetPiece)
//             }
//             return result
//         }

//         const rookMovement = (color, currentPiecePosition, width, row, column) => {
//             const result = {
//                 threatenedPieces: [],
//                 suitableCells: [],
//                 protectedPieces: []
//             }
//             // right
//             for (let i = 1; i <= width - column; i++) {
//                 let clear = true
//                 for (let j = 1; j < (((currentPiecePosition + i) % 8) + 1) - column; j++) {
//                     if (Object.values(allPiecePositions).includes(currentPiecePosition + i - j) && currentPiecePosition + i - j !== currentPiecePosition) {
//                         clear = false
//                         break
//                     }
//                 }
//                 if (Object.values(allPiecePositions).includes(currentPiecePosition + i)) {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + i))[0][0]
//                     if (clear && targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (clear && targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 } else {
//                     if (clear || i === 1) result.suitableCells.push(currentPiecePosition + i)
//                 }
//             }
//             // left
//             for (let i = 1; i < column; i++) {
//                 let clear = true
//                 for (let j = 1; j < 7 - ((currentPiecePosition - i) % 8) - (width - column); j++) {
//                     if (Object.values(allPiecePositions).includes(currentPiecePosition - i + j) && currentPiecePosition - i + j !== currentPiecePosition) {
//                         clear = false
//                         break
//                     }
//                 }
//                 if (Object.values(allPiecePositions).includes(currentPiecePosition - i)) {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - i))[0][0]
//                     if (clear && targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (clear && targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 } else {
//                     if (clear || i === 1) result.suitableCells.push(currentPiecePosition - i)
//                 }
//             }
//             // down
//             for (let i = 1; i <= width - row; i++) {
//                 let clear = true
//                 for (let j = 1; j < (((currentPiecePosition + (i * width)) - ((currentPiecePosition + (i * width)) % 8)) / 8 + 1) - row; j++) {
//                     if (Object.values(allPiecePositions).includes(currentPiecePosition + (i * width) - (j * 8)) && currentPiecePosition + (i * width) - (j * 8) !== currentPiecePosition) {
//                         clear = false
//                         break
//                     }
//                 }
//                 if (Object.values(allPiecePositions).includes(currentPiecePosition + (i * width))) {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + (i * width)))[0][0]
//                     if (clear && targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (clear && targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 } else {
//                     if (clear || i === 1) result.suitableCells.push(currentPiecePosition + (i * width))
//                 }
//             }
//             // up
//             for (let i = 1; i < row; i++) {
//                 let clear = true
//                 for (let j = 1; j < (7 - (((currentPiecePosition - (i * width)) - ((currentPiecePosition - (i * width)) % 8)) / 8)) - (width - row); j++) {
//                     if (clear && Object.values(allPiecePositions).includes(currentPiecePosition - (i * width) + (j * 8)) && currentPiecePosition - (i * width) + (j * 8) !== currentPiecePosition) {
//                         clear = false
//                         break
//                     }
//                 }
//                 if (Object.values(allPiecePositions).includes(currentPiecePosition - (i * width))) {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - (i * width)))[0][0]
//                     if (clear && targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (clear && targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 } else {
//                     if (clear || i === 1) result.suitableCells.push(currentPiecePosition - (i * width))
//                 }
//             }
//             return result
//         }

//         const knightMovement = (color, currentPiecePosition, row, column) => {
//             const result = {
//                 threatenedPieces: [],
//                 suitableCells: [],
//                 protectedPieces: []
//             }
//             if (column < 7 && row < 8) {
//                 if (!Object.values(allPiecePositions).includes(currentPiecePosition + 10)) {
//                     result.suitableCells.push(currentPiecePosition + 10)
//                 } else {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 10))[0][0]
//                     if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 }
//             }
//             if (column < 8 && row < 7) {
//                 if (!Object.values(allPiecePositions).includes(currentPiecePosition + 17)) {
//                     result.suitableCells.push(currentPiecePosition + 17)
//                 } else {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 17))[0][0]
//                     if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 }
//             }
//             if (column < 7 && row > 1) {
//                 if (!Object.values(allPiecePositions).includes(currentPiecePosition - 6)) {
//                     result.suitableCells.push(currentPiecePosition - 6)
//                 } else {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - 6))[0][0]
//                     if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 }
//             }
//             if (column > 1 && row < 7) {
//                 if (!Object.values(allPiecePositions).includes(currentPiecePosition + 15)) {
//                     result.suitableCells.push(currentPiecePosition + 15)
//                 } else {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 15))[0][0]
//                     if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 }
//             }
//             if (column > 1 && row > 2) {
//                 if (!Object.values(allPiecePositions).includes(currentPiecePosition - 17)) {
//                     result.suitableCells.push(currentPiecePosition - 17)
//                 } else {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - 17))[0][0]
//                     if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 }
//             }
//             if (column > 2 && row > 1) {
//                 if (!Object.values(allPiecePositions).includes(currentPiecePosition - 10)) {
//                     result.suitableCells.push(currentPiecePosition - 10)
//                 } else {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - 10))[0][0]
//                     if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 }
//             }
//             if (column > 2 && row < 8) {
//                 if (!Object.values(allPiecePositions).includes(currentPiecePosition + 6)) {
//                     result.suitableCells.push(currentPiecePosition + 6)
//                 } else {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 6))[0][0]
//                     if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 }
//             }
//             if (column < 8 && row > 2) {
//                 if (!Object.values(allPiecePositions).includes(currentPiecePosition - 15)) {
//                     result.suitableCells.push(currentPiecePosition - 15)
//                 } else {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - 15))[0][0]
//                     if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 }
//             }
//             return result
//         }

//         const bishopMovement = (color, currentPiecePosition, width, row, column) => {
//             const result = {
//                 threatenedPieces: [],
//                 suitableCells: [],
//                 protectedPieces: []
//             }
//             let loopSize
//             // down right
//             if (column >= row) loopSize = width - column
//             if (column < row) loopSize = width - row
//             for (let i = 1; i <= loopSize; i++) {
//                 let clear = true
//                 let column2 = ((currentPiecePosition + width * i + i) % 8) + 1
//                 let row2 = (((currentPiecePosition + width * i + i) - ((currentPiecePosition + width * i + i) % 8)) / 8) + 1
//                 let loopSize2
//                 if (column2 >= row2) loopSize2 = row2 - 1 - (row - 1)
//                 if (column2 < row2) loopSize2 = column2 - 1
//                 for (let j = 1; j < loopSize2; j++) {
//                     if (Object.values(allPiecePositions).includes((currentPiecePosition + width * i + i) - (width * j + j)) && (currentPiecePosition + width * i + i) - (width * j + j) !== currentPiecePosition) {
//                         clear = false
//                         break
//                     }
//                 }
//                 if (Object.values(allPiecePositions).includes(currentPiecePosition + width * i + i)) {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + width * i + i))[0][0]
//                     if (clear && targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (clear && targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 } else {
//                     if (clear || i === 1) result.suitableCells.push(currentPiecePosition + width * i + i)
//                 }
//             }
//             // down left
//             if (column <= width - row) loopSize = column - 1
//             if (column > width - row) loopSize = width - row
//             for (let i = 1; i <= loopSize; i++) {
//                 let clear = true
//                 let column2 = ((currentPiecePosition + width * i - i) % 8) + 1
//                 let row2 = (((currentPiecePosition + width * i - i) - ((currentPiecePosition + width * i - i) % 8)) / 8) + 1
//                 let loopSize2
//                 if (row2 <= width - column2) loopSize2 = row2 - 1 - (row - 1)
//                 if (row2 > width - column2) loopSize2 = width - column2 - (width - column)
//                 for (let j = 1; j < loopSize2; j++) {
//                     if (Object.values(allPiecePositions).includes((currentPiecePosition + width * i - i) - (width * j - j)) && (currentPiecePosition + width * i - i) - (width * j - j) !== currentPiecePosition) {
//                         clear = false
//                         break
//                     }
//                 }
//                 if (Object.values(allPiecePositions).includes(currentPiecePosition + width * i - i)) {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + width * i - i))[0][0]
//                     if (clear && targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (clear && targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 } else {
//                     if (clear || i === 1) result.suitableCells.push(currentPiecePosition + width * i - i)
//                 }
//             }
//             // up right
//             if (row <= width - column) loopSize = row - 1
//             if (row > width - column) loopSize = width - column
//             for (let i = 1; i <= loopSize; i++) {
//                 let clear = true
//                 let column2 = ((currentPiecePosition - width * i + i) % 8) + 1
//                 let row2 = (((currentPiecePosition - width * i + i) - ((currentPiecePosition - width * i + i) % 8)) / 8) + 1
//                 let loopSize2
//                 if (column2 <= width - row2) loopSize2 = column2 - 1 - (column - 1)
//                 if (column2 > width - row2) loopSize2 = width - row2 - (width - row)
//                 for (let j = 1; j < loopSize2; j++) {
//                     if (Object.values(allPiecePositions).includes((currentPiecePosition - width * i + i) + (width * j - j)) && (currentPiecePosition - width * i + i) + (width * j - j) !== currentPiecePosition) {
//                         console.log()
//                         clear = false
//                         break
//                     }
//                 }
//                 if (Object.values(allPiecePositions).includes(currentPiecePosition - width * i + i)) {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - width * i + i))[0][0]
//                     if (clear && targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (clear && targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 } else {
//                     if (clear || i === 1) result.suitableCells.push(currentPiecePosition - width * i + i)
//                 }
//             }
//             // up left
//             if (column >= row) loopSize = row - 1
//             if (column < row) loopSize = column - 1
//             for (let i = 1; i <= loopSize; i++) {
//                 let clear = true
//                 let column2 = ((currentPiecePosition - width * i - i) % 8) + 1
//                 let row2 = (((currentPiecePosition - width * i - i) - ((currentPiecePosition - width * i - i) % 8)) / 8) + 1
//                 let loopSize2
//                 if (column2 >= row2) loopSize2 = width - column2 - (width - column)
//                 if (column2 < row2) loopSize2 = width - row2 - (width - row)
//                 for (let j = 1; j < loopSize2; j++) {
//                     if (Object.values(allPiecePositions).includes((currentPiecePosition - width * i - i) + (width * j + j)) && (currentPiecePosition - width * i - i) + (width * j + j) !== currentPiecePosition) {
//                         clear = false
//                         break
//                     }
//                 }
//                 if (Object.values(allPiecePositions).includes(currentPiecePosition - width * i - i)) {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - width * i - i))[0][0]
//                     if (clear && targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (clear && targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 } else {
//                     if (clear || i === 1) result.suitableCells.push(currentPiecePosition - width * i - i)
//                 }
//             }
//             return result
//         }

//         const kingMovement = (selectedPiece, color, currentPiecePosition, width, row, column) => {
//             const result = {
//                 threatenedPieces: [],
//                 suitableCells: [],
//                 protectedPieces: []
//             }
//             if (column > 1 && row > 1) {
//                 if (!Object.values(allPiecePositions).includes(currentPiecePosition - width - 1)) {
//                     result.suitableCells.push(currentPiecePosition - width - 1)
//                 } else {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - width - 1))[0][0]
//                     if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 }
//             }
//             if (row > 1) {
//                 if (!Object.values(allPiecePositions).includes(currentPiecePosition - width)) {
//                     result.suitableCells.push(currentPiecePosition - width)
//                 } else {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - width))[0][0]
//                     if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 }
//             }
//             if (column < 8 && row > 1) {
//                 if (!Object.values(allPiecePositions).includes(currentPiecePosition - width + 1)) {
//                     result.suitableCells.push(currentPiecePosition - width + 1)
//                 } else {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - width + 1))[0][0]
//                     if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 }
//             }
//             if (column > 1) {
//                 if (!Object.values(allPiecePositions).includes(currentPiecePosition - 1)) {
//                     result.suitableCells.push(currentPiecePosition - 1)
//                 } else {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - 1))[0][0]
//                     if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 }
//             }
//             if (column < 8) {
//                 if (!Object.values(allPiecePositions).includes(currentPiecePosition + 1)) {
//                     result.suitableCells.push(currentPiecePosition + 1)
//                 } else {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 1))[0][0]
//                     if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 }
//             }
//             if (row < 8 && column > 1) {
//                 if (!Object.values(allPiecePositions).includes(currentPiecePosition + width - 1)) {
//                     result.suitableCells.push(currentPiecePosition + width - 1)
//                 } else {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + width - 1))[0][0]
//                     if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 }
//             }
//             if (row < 8) {
//                 if (!Object.values(allPiecePositions).includes(currentPiecePosition + width)) {
//                     result.suitableCells.push(currentPiecePosition + width)
//                 } else {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + width))[0][0]
//                     if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 }
//             }
//             if (row < 8 && column < 8) {
//                 if (!Object.values(allPiecePositions).includes(currentPiecePosition + width + 1)) {
//                     result.suitableCells.push(currentPiecePosition + width + 1)
//                 } else {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + width + 1))[0][0]
//                     if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                     if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//                 }
//             }
//             // Castling
//             const positionCheck = color === 'black' ? 4 : 60
//             const pieceCheck = color === 'black' ? 'rook-black' : 'rook-white'
//             if (!check && allPiecePositions[selectedPiece] === positionCheck && !Object.values(allPiecePositions).includes(positionCheck + 1) && !Object.values(allPiecePositions).includes(positionCheck + 2) && Object.values(allPiecePositions).includes(positionCheck + 3) && Object.entries(allPiecePositions).filter(piece => piece.includes(positionCheck + 3))[0][0].indexOf(pieceCheck) !== -1) {
//                 result.suitableCells.push(positionCheck + 2)
//             }
//             if (!check && allPiecePositions[selectedPiece] === positionCheck && !Object.values(allPiecePositions).includes(positionCheck - 1) && !Object.values(allPiecePositions).includes(positionCheck - 2) && !Object.values(allPiecePositions).includes(positionCheck - 3) && Object.values(allPiecePositions).includes(positionCheck - 4) && Object.entries(allPiecePositions).filter(piece => piece.includes(positionCheck - 4))[0][0].indexOf(pieceCheck) !== -1) {
//                 result.suitableCells.push(positionCheck - 2)
//             }
//             return result
//         }

//         const movePiece = (selectedPiece, selectedPosition, currentPiecePosition) => {
//             console.log(allThreatenedCells)
//             for (let i = 0; i < suitableCells.length; i++) {
//                 let newClass
//                 const rowNumber = (suitableCells[i] - (suitableCells[i] % 8)) / 8
//                 if (rowNumber % 2 === 0) {
//                     newClass = suitableCells[i] % 2 === 1 ? 'cell-even' : 'cell-uneven'
//                 } else {
//                     newClass = suitableCells[i] % 2 === 0 ? 'cell-even' : 'cell-uneven'
//                 }
//                 let updatedCell
//                 if (Object.values(allPiecePositions).includes(suitableCells[i])) {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(suitableCells[i]))[0][0]
//                     updatedCell = (
//                         <div id={suitableCells[i]} key={suitableCells[i]} className={newClass}><img src={`../Images/${targetPiece.split('-')[0]}-${targetPiece.split('-')[1]}.png`} alt={`${targetPiece.split('-')[0]}-${targetPiece.split('-')[1]}`} id={targetPiece} onClick={() => touchPiece(targetPiece)} /></div>
//                     )
//                 } else {
//                     updatedCell = (
//                         <div id={suitableCells[i]} key={suitableCells[i]} className={newClass}></div>
//                     )
//                 }
//                 setAllCells(prevCells => {
//                     const updatedCells = prevCells
//                     updatedCells.splice(suitableCells[i], 1, updatedCell)
//                     return updatedCells
//                 })
//                 setAllRows(() => {
//                     const allRowElements = []
//                     for (let j = 0; j < 8; j++) {
//                         const currentRow = allCells.slice((j * 8), (j * 8) + 8)
//                         allRowElements.push(<div key={j} className="row">{currentRow}</div>)
//                     }
//                     return allRowElements
//                 })
//             }
//             setSuitableCells(() => [])

//             let occupiedCellClass
//             const rowNumber = (selectedPosition - (selectedPosition % 8)) / 8
//             if (rowNumber % 2 === 0) {
//                 occupiedCellClass = selectedPosition % 2 === 1 ? 'cell-even' : 'cell-uneven'
//             } else {
//                 occupiedCellClass = selectedPosition % 2 === 0 ? 'cell-even' : 'cell-uneven'
//             }
//             let vacatedCellClass
//             const rowNumber2 = (currentPiecePosition - (currentPiecePosition % 8)) / 8
//             if (rowNumber2 % 2 === 0) {
//                 vacatedCellClass = currentPiecePosition % 2 === 1 ? 'cell-even' : 'cell-uneven'
//             } else {
//                 vacatedCellClass = currentPiecePosition % 2 === 0 ? 'cell-even' : 'cell-uneven'
//             }
//             const occupiedCell = (
//                 <div id={selectedPosition} key={selectedPosition} className={occupiedCellClass}><img src={`../Images/${selectedPiece.split('-')[0]}-${selectedPiece.split('-')[1]}.png`} alt={`${selectedPiece.split('-')[0]}-${selectedPiece.split('-')[1]}`} id={selectedPiece} onClick={() => touchPiece(selectedPiece)} /></div>
//             )
//             const vacatedCell = (
//                 <div id={currentPiecePosition} key={currentPiecePosition} className={vacatedCellClass}></div>
//             )
//             setAllPiecePositions(prev => {
//                 let newState = {
//                     ...prev,
//                     [selectedPiece]: selectedPosition,
//                 }
//                 if (Object.values(prev).includes(selectedPosition)) {
//                     const takenOutPiece = Object.entries(prev).filter(piece => piece.includes(selectedPosition))[0][0]
//                     newState = {
//                         ...newState,
//                         [takenOutPiece]: -1
//                     }
//                 }
//                 return newState
//             })
//             setAllCells(prevCells => {
//                 const updatedCells = prevCells
//                 updatedCells.splice(selectedPosition, 1, occupiedCell)
//                 updatedCells.splice(currentPiecePosition, 1, vacatedCell)
//                 return updatedCells
//             })
//             setAllRows(() => {
//                 const allRowElements = []
//                 for (let j = 0; j < 8; j++) {
//                     const currentRow = allCells.slice((j * 8), (j * 8) + 8)
//                     allRowElements.push(<div key={j} className="row">{currentRow}</div>)
//                 }
//                 return allRowElements
//             })
//             // Castling
//             if (selectedPiece.indexOf('king') !== -1 && ((selectedPosition - currentPiecePosition === 2) || (selectedPosition - currentPiecePosition === -2))) {
//                 let occupiedCell
//                 let vacatedCell
//                 let pieceToMove
//                 let positionToMove
//                 let vacatedPosition
//                 if (selectedPiece.indexOf('white') !== -1) {
//                     if (selectedPosition - currentPiecePosition === 2) {
//                         pieceToMove = 'rook-white-2'
//                         positionToMove = 61
//                         vacatedPosition = 63
//                         occupiedCell = (
//                             <div id={61} key={61} className='cell-uneven'><img src='../Images/rook-white.png' alt='rook-white' id='rook-white-2' onClick={() => touchPiece('rook-white-2')} /></div>
//                         )
//                         vacatedCell = (
//                             <div id={63} key={63} className='cell-uneven'></div>
//                         )
//                     } else {
//                         pieceToMove = 'rook-white-1'
//                         positionToMove = 59
//                         vacatedPosition = 56
//                         occupiedCell = (
//                             <div id={59} key={59} className='cell-uneven'><img src='../Images/rook-white.png' alt='rook-white' id='rook-white-1' onClick={() => touchPiece('rook-white-1')} /></div>
//                         )
//                         vacatedCell = (
//                             <div id={56} key={56} className='cell-even'></div>
//                         )
//                     }
//                 } else {
//                     pieceToMove = 'rook-black-2'
//                     positionToMove = 5
//                     vacatedPosition = 7
//                     if (selectedPosition - currentPiecePosition === 2) {
//                         occupiedCell = (
//                             <div id={5} key={5} className='cell-even'><img src='../Images/rook-black.png' alt='rook-black' id='rook-black-2' onClick={() => touchPiece('rook-black-2')} /></div>
//                         )
//                         vacatedCell = (
//                             <div id={7} key={7} className='cell-even'></div>
//                         )
//                     } else {
//                         pieceToMove = 'rook-black-1'
//                         positionToMove = 3
//                         vacatedPosition = 0
//                         occupiedCell = (
//                             <div id={3} key={3} className='cell-even'><img src='../Images/rook-black.png' alt='rook-black' id='rook-black-1' onClick={() => touchPiece('rook-black-1')} /></div>
//                         )
//                         vacatedCell = (
//                             <div id={0} key={0} className='cell-uneven'></div>
//                         )
//                     }
//                 }
//                 setAllPiecePositions(prev => {
//                     let newState = {
//                         ...prev,
//                         [pieceToMove]: positionToMove,
//                     }
//                     return newState
//                 })
//                 setAllCells(prevCells => {
//                     const updatedCells = prevCells
//                     updatedCells.splice(positionToMove, 1, occupiedCell)
//                     updatedCells.splice(vacatedPosition, 1, vacatedCell)
//                     return updatedCells
//                 })
//                 setAllRows(() => {
//                     const allRowElements = []
//                     for (let j = 0; j < 8; j++) {
//                         const currentRow = allCells.slice((j * 8), (j * 8) + 8)
//                         allRowElements.push(<div key={j} className="row">{currentRow}</div>)
//                     }
//                     return allRowElements
//                 })
//             }

//             setPreviousSelected(-1)
//             touchPiece('')
//             setNextTurn(prev => prev === 'white' ? 'black' : 'white')
//         }

//         const setNewSuitableThreat = (currentPosition, targetPosition, targetPiece) => {
//             const updatedCell = (
//                 <div id={targetPosition} key={targetPosition} className='suitable' onClick={() => movePiece(targetPosition, currentPosition)}><img src={`../Images/${targetPiece.split('-')[0]}-${targetPiece.split('-')[1]}.png`} alt={`${targetPiece.split('-')[0]}-${targetPiece.split('-')[1]}`} id={targetPiece} /></div>
//             )
//             setAllCells(prevCells => {
//                 const updatedCells = prevCells
//                 updatedCells.splice(targetPosition, 1, updatedCell)
//                 return updatedCells
//             })
//             setAllRows(() => {
//                 const allRowElements = []
//                 for (let j = 0; j < 8; j++) {
//                     const currentRow = allCells.slice((j * 8), (j * 8) + 8)
//                     allRowElements.push(<div key={j} className="row">{currentRow}</div>)
//                 }
//                 return allRowElements
//             })
//             setSuitableCells((prev) => {
//                 const newSuitableCells = prev
//                 if (!newSuitableCells.includes(targetPosition)) newSuitableCells.push(targetPosition)
//                 return newSuitableCells
//             })
//         }

//         const setNewSuitable = (currentPosition, targetPosition) => {
//             const updatedCell = (
//                 <div id={targetPosition} key={targetPosition} className='suitable' onClick={() => movePiece(targetPosition, currentPosition)}></div>
//             )
//             setAllCells(prevCells => {
//                 const updatedCells = prevCells
//                 updatedCells.splice(targetPosition, 1, updatedCell)
//                 return updatedCells
//             })
//             setAllRows(() => {
//                 const allRowElements = []
//                 for (let j = 0; j < 8; j++) {
//                     const currentRow = allCells.slice((j * 8), (j * 8) + 8)
//                     allRowElements.push(<div key={j} className="row">{currentRow}</div>)
//                 }
//                 return allRowElements
//             })
//             setSuitableCells((prev) => {
//                 const newSuitableCells = prev
//                 if (!newSuitableCells.includes(targetPosition)) newSuitableCells.push(targetPosition)
//                 return newSuitableCells
//             })
//         }

//         const touchPiece = (selectedPiece) => {
//             // remove previous suitable cells
//             for (let i = 0; i < suitableCells.length; i++) {
//                 let newClass
//                 const rowNumber = (suitableCells[i] - (suitableCells[i] % 8)) / 8
//                 if (rowNumber % 2 === 0) {
//                     newClass = suitableCells[i] % 2 === 1 ? 'cell-even' : 'cell-uneven'
//                 } else {
//                     newClass = suitableCells[i] % 2 === 0 ? 'cell-even' : 'cell-uneven'
//                 }
//                 let updatedCell
//                 if (Object.values(allPiecePositions).includes(suitableCells[i])) {
//                     const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(suitableCells[i]))[0][0]
//                     updatedCell = (
//                         <div id={suitableCells[i]} key={suitableCells[i]} className={newClass}><img src={`../Images/${targetPiece.split('-')[0]}-${targetPiece.split('-')[1]}.png`} alt={`${targetPiece.split('-')[0]}-${targetPiece.split('-')[1]}`} id={targetPiece} onClick={() => touchPiece(targetPiece)} /></div>
//                     )
//                 } else {
//                     updatedCell = (
//                         <div id={suitableCells[i]} key={suitableCells[i]} className={newClass}></div>
//                     )
//                 }
//                 setAllCells(prevCells => {
//                     const updatedCells = prevCells
//                     updatedCells.splice(suitableCells[i], 1, updatedCell)
//                     return updatedCells
//                 })
//                 setAllRows(() => {
//                     const allRowElements = []
//                     for (let j = 0; j < 8; j++) {
//                         const currentRow = allCells.slice((j * 8), (j * 8) + 8)
//                         allRowElements.push(<div key={j} className="row">{currentRow}</div>)
//                     }
//                     return allRowElements
//                 })
//             }

//             // remove previous selected cell class
//             if (previousSelected !== -1) {
//                 let newSelectedClass
//                 const rowNumber = (previousSelected - (previousSelected % 8)) / 8
//                 if (rowNumber % 2 === 0) {
//                     newSelectedClass = previousSelected % 2 === 1 ? 'cell-even' : 'cell-uneven'
//                 } else {
//                     newSelectedClass = previousSelected % 2 === 0 ? 'cell-even' : 'cell-uneven'
//                 }
//                 const previousSelectedPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(previousSelected))[0][0]
//                 const previousSelectedCell = (
//                     <div id={previousSelected} key={previousSelected} className={newSelectedClass}><img src={`../Images/${previousSelectedPiece.split('-')[0]}-${previousSelectedPiece.split('-')[1]}.png`} alt={`${previousSelectedPiece.split('-')[0]}-${previousSelectedPiece.split('-')[1]}`} id={previousSelectedPiece} onClick={() => touchPiece(previousSelectedPiece)} /></div>
//                 )
//                 setAllCells(prevCells => {
//                     const updatedCells = prevCells
//                     updatedCells.splice(previousSelected, 1, previousSelectedCell)
//                     return updatedCells
//                 })
//                 setAllRows(() => {
//                     const allRowElements = []
//                     for (let j = 0; j < 8; j++) {
//                         const currentRow = allCells.slice((j * 8), (j * 8) + 8)
//                         allRowElements.push(<div key={j} className="row">{currentRow}</div>)
//                     }
//                     return allRowElements
//                 })
//             }

//             setPreviousSelected(() => selectedPiece.indexOf(nextTurn) !== -1 ? allPiecePositions[selectedPiece] : -1)

//             // set new selected class
//             if (selectedPiece.indexOf(nextTurn) !== -1) {
//                 const updatedCell = (
//                     <div id={allPiecePositions[selectedPiece]} key={allPiecePositions[selectedPiece]} className='selected'><img src={`../Images/${selectedPiece.split('-')[0]}-${selectedPiece.split('-')[1]}.png`} alt={`${selectedPiece.split('-')[0]}-${selectedPiece.split('-')[1]}`} id={selectedPiece} /></div>
//                 )
//                 setAllCells(prevCells => {
//                     const updatedCells = prevCells
//                     updatedCells.splice(allPiecePositions[selectedPiece], 1, updatedCell)
//                     return updatedCells
//                 })
//                 setAllRows(() => {
//                     const allRowElements = []
//                     for (let j = 0; j < 8; j++) {
//                         const currentRow = allCells.slice((j * 8), (j * 8) + 8)
//                         allRowElements.push(<div key={j} className="row">{currentRow}</div>)
//                     }
//                     return allRowElements
//                 })
//             }

//             // set new suitable cells
//             const currentPiecePosition = allPiecePositions[selectedPiece]
//             let column = (currentPiecePosition % width) + 1
//             let row = ((currentPiecePosition - (currentPiecePosition % width)) / width) + 1
//             if (!check) {
//                 // black pawn
//                 if (selectedPiece.indexOf('pawn-black') !== -1 && nextTurn === 'black') {
//                     const pawnMoves = pawnMovement('black', currentPiecePosition, row)
//                     for (let i = 0; i < pawnMoves.threatenedPieces.length; i++) {
//                         setNewSuitableThreat(currentPiecePosition, allPiecePositions[pawnMoves.threatenedPieces[i]], pawnMoves.threatenedPieces[i])
//                     }
//                     for (let i = 0; i < pawnMoves.suitableCells.length; i++) {
//                         setNewSuitable(currentPiecePosition, pawnMoves.suitableCells[i])
//                     }
//                 }
//                 // white pawn
//                 if (selectedPiece.indexOf('pawn-white') !== -1 && nextTurn === 'white') {
//                     const pawnMoves = pawnMovement('white', currentPiecePosition, row)
//                     for (let i = 0; i < pawnMoves.threatenedPieces.length; i++) {
//                         setNewSuitableThreat(currentPiecePosition, allPiecePositions[pawnMoves.threatenedPieces[i]], pawnMoves.threatenedPieces[i])
//                     }
//                     for (let i = 0; i < pawnMoves.suitableCells.length; i++) {
//                         setNewSuitable(currentPiecePosition, pawnMoves.suitableCells[i])
//                     }
//                 }
//                 // black rook / black queen
//                 if ((selectedPiece.indexOf('rook-black') !== -1 || selectedPiece.indexOf('queen-black') !== -1) && nextTurn === 'black') {
//                     const rookMoves = rookMovement('black', currentPiecePosition, width, row, column)
//                     for (let i = 0; i < rookMoves.threatenedPieces.length; i++) {
//                         setNewSuitableThreat(currentPiecePosition, allPiecePositions[rookMoves.threatenedPieces[i]], rookMoves.threatenedPieces[i])
//                     }
//                     for (let i = 0; i < rookMoves.suitableCells.length; i++) {
//                         setNewSuitable(currentPiecePosition, rookMoves.suitableCells[i])
//                     }
//                 }
//                 // white rook / white queen
//                 if ((selectedPiece.indexOf('rook-white') !== -1 || selectedPiece.indexOf('queen-white') !== -1) && nextTurn === 'white') {
//                     const rookMoves = rookMovement('white', currentPiecePosition, width, row, column)
//                     for (let i = 0; i < rookMoves.threatenedPieces.length; i++) {
//                         setNewSuitableThreat(currentPiecePosition, allPiecePositions[rookMoves.threatenedPieces[i]], rookMoves.threatenedPieces[i])
//                     }
//                     for (let i = 0; i < rookMoves.suitableCells.length; i++) {
//                         setNewSuitable(currentPiecePosition, rookMoves.suitableCells[i])
//                     }
//                 }
//                 // black knight
//                 if (selectedPiece.indexOf('knight-black') !== -1 && nextTurn === 'black') {
//                     const knightMoves = knightMovement('black', currentPiecePosition, row, column)
//                     for (let i = 0; i < knightMoves.threatenedPieces.length; i++) {
//                         setNewSuitableThreat(currentPiecePosition, allPiecePositions[knightMoves.threatenedPieces[i]], knightMoves.threatenedPieces[i])
//                     }
//                     for (let i = 0; i < knightMoves.suitableCells.length; i++) {
//                         setNewSuitable(currentPiecePosition, knightMoves.suitableCells[i])
//                     }
//                 }
//                 // white knight
//                 if (selectedPiece.indexOf('knight-white') !== -1 && nextTurn === 'white') {
//                     const knightMoves = knightMovement('white', currentPiecePosition, row, column)
//                     for (let i = 0; i < knightMoves.threatenedPieces.length; i++) {
//                         setNewSuitableThreat(currentPiecePosition, allPiecePositions[knightMoves.threatenedPieces[i]], knightMoves.threatenedPieces[i])
//                     }
//                     for (let i = 0; i < knightMoves.suitableCells.length; i++) {
//                         setNewSuitable(currentPiecePosition, knightMoves.suitableCells[i])
//                     }
//                 }
//                 // black bishop / black queen
//                 if ((selectedPiece.indexOf('bishop-black') !== -1 || selectedPiece.indexOf('queen-black') !== -1) && nextTurn === 'black') {
//                     const bishopMoves = bishopMovement('black', currentPiecePosition, width, row, column)
//                     for (let i = 0; i < bishopMoves.threatenedPieces.length; i++) {
//                         setNewSuitableThreat(currentPiecePosition, allPiecePositions[bishopMoves.threatenedPieces[i]], bishopMoves.threatenedPieces[i])
//                     }
//                     for (let i = 0; i < bishopMoves.suitableCells.length; i++) {
//                         setNewSuitable(currentPiecePosition, bishopMoves.suitableCells[i])
//                     }
//                 }
//                 // white bishop / white queen
//                 if ((selectedPiece.indexOf('bishop-white') !== -1 || selectedPiece.indexOf('queen-white') !== -1) && nextTurn === 'white') {
//                     const bishopMoves = bishopMovement('white', currentPiecePosition, width, row, column)
//                     for (let i = 0; i < bishopMoves.threatenedPieces.length; i++) {
//                         setNewSuitableThreat(currentPiecePosition, allPiecePositions[bishopMoves.threatenedPieces[i]], bishopMoves.threatenedPieces[i])
//                     }
//                     for (let i = 0; i < bishopMoves.suitableCells.length; i++) {
//                         setNewSuitable(currentPiecePosition, bishopMoves.suitableCells[i])
//                     }
//                 }
//                 // black king
//                 if (selectedPiece.indexOf('king-black') !== -1 && nextTurn === 'black') {
//                     const kingMoves = kingMovement('black', currentPiecePosition, width, row, column)
//                     for (let i = 0; i < kingMoves.threatenedPieces.length; i++) {
//                         if (!allThreatenedCells.white.includes(allPiecePositions[kingMoves.threatenedPieces[i]])) setNewSuitableThreat(currentPiecePosition, allPiecePositions[kingMoves.threatenedPieces[i]], kingMoves.threatenedPieces[i])
//                     }
//                     for (let i = 0; i < kingMoves.suitableCells.length; i++) {
//                         if (!allThreatenedCells.white.includes(kingMoves.suitableCells[i])) setNewSuitable(currentPiecePosition, kingMoves.suitableCells[i])
//                     }
//                 }
//                 // white king
//                 if (selectedPiece.indexOf('king-white') !== -1 && nextTurn === 'white') {
//                     const kingMoves = kingMovement('white', currentPiecePosition, width, row, column)
//                     for (let i = 0; i < kingMoves.threatenedPieces.length; i++) {
//                         if (!allThreatenedCells.black.includes(allPiecePositions[kingMoves.threatenedPieces[i]])) setNewSuitableThreat(currentPiecePosition, allPiecePositions[kingMoves.threatenedPieces[i]], kingMoves.threatenedPieces[i])
//                     }
//                     for (let i = 0; i < kingMoves.suitableCells.length; i++) {
//                         if (!allThreatenedCells.black.includes(kingMoves.suitableCells[i])) setNewSuitable(currentPiecePosition, kingMoves.suitableCells[i])
//                     }
//                 }
//             } else {
//                 // take out checking piece
//                 const colorToCheck = checkingPiece.split('-')[1] === 'black' ? 'white' : 'black'
//                 for (let i = 0; i < Object.entries(allPiecePositions).length; i++) {
//                     if (Object.entries(allPiecePositions)[i][0].indexOf('pawn') !== -1) {
//                         let pawnMoves
//                         let row = ((Object.entries(allPiecePositions)[i][1] - (Object.entries(allPiecePositions)[i][1] % width)) / width) + 1
//                         if (Object.entries(allPiecePositions)[i][0].indexOf(colorToCheck) !== -1) {
//                             pawnMoves = pawnMovement(colorToCheck, Object.entries(allPiecePositions)[i][1], row)
//                         }
//                         for (let j = 0; j < pawnMoves?.threatenedPieces?.length; j++) {
//                             if (pawnMoves.threatenedPieces[j] === checkingPiece && selectedPiece === Object.entries(allPiecePositions)[i][0]) {
//                                 setNewSuitableThreat(Object.entries(allPiecePositions)[i][1], allPiecePositions[checkingPiece], checkingPiece)
//                             }
//                         }
//                     }
//                     if (Object.entries(allPiecePositions)[i][0].indexOf('rook') !== -1) {
//                         let rookMoves
//                         let column = (Object.entries(allPiecePositions)[i][1] % width) + 1
//                         let row = ((Object.entries(allPiecePositions)[i][1] - (Object.entries(allPiecePositions)[i][1] % width)) / width) + 1
//                         if (Object.entries(allPiecePositions)[i][0].indexOf(colorToCheck) !== -1) {
//                             rookMoves = rookMovement(colorToCheck, Object.entries(allPiecePositions)[i][1], width, row, column)
//                         }
//                         for (let j = 0; j < rookMoves?.threatenedPieces?.length; j++) {
//                             if (rookMoves.threatenedPieces[j] === checkingPiece && selectedPiece === Object.entries(allPiecePositions)[i][0]) {
//                                 setNewSuitableThreat(Object.entries(allPiecePositions)[i][1], allPiecePositions[checkingPiece], checkingPiece)
//                             }
//                         }
//                     }
//                     if (Object.entries(allPiecePositions)[i][0].indexOf('knight') !== -1) {
//                         let knightMoves
//                         let column = (Object.entries(allPiecePositions)[i][1] % width) + 1
//                         let row = ((Object.entries(allPiecePositions)[i][1] - (Object.entries(allPiecePositions)[i][1] % width)) / width) + 1
//                         if (Object.entries(allPiecePositions)[i][0].indexOf(colorToCheck) !== -1) {
//                             knightMoves = knightMovement(colorToCheck, Object.entries(allPiecePositions)[i][1], row, column)
//                         }
//                         for (let j = 0; j < knightMoves?.threatenedPieces?.length; j++) {
//                             if (knightMoves.threatenedPieces[j] === checkingPiece && selectedPiece === Object.entries(allPiecePositions)[i][0]) {
//                                 setNewSuitableThreat(Object.entries(allPiecePositions)[i][1], allPiecePositions[checkingPiece], checkingPiece)
//                             }
//                         }
//                     }
//                     if (Object.entries(allPiecePositions)[i][0].indexOf('bishop') !== -1) {
//                         let bishopMoves
//                         let column = (Object.entries(allPiecePositions)[i][1] % width) + 1
//                         let row = ((Object.entries(allPiecePositions)[i][1] - (Object.entries(allPiecePositions)[i][1] % width)) / width) + 1
//                         if (Object.entries(allPiecePositions)[i][0].indexOf(colorToCheck) !== -1) {
//                             bishopMoves = bishopMovement(colorToCheck, Object.entries(allPiecePositions)[i][1], width, row, column)
//                         }
//                         for (let j = 0; j < bishopMoves?.threatenedPieces?.length; j++) {
//                             if (bishopMoves.threatenedPieces[j] === checkingPiece && selectedPiece === Object.entries(allPiecePositions)[i][0]) {
//                                 setNewSuitableThreat(Object.entries(allPiecePositions)[i][1], allPiecePositions[checkingPiece], checkingPiece)
//                             }
//                         }
//                     }
//                     if (Object.entries(allPiecePositions)[i][0].indexOf('queen') !== -1) {
//                         let rookMoves
//                         let bishopMoves
//                         let column = (Object.entries(allPiecePositions)[i][1] % width) + 1
//                         let row = ((Object.entries(allPiecePositions)[i][1] - (Object.entries(allPiecePositions)[i][1] % width)) / width) + 1
//                         if (Object.entries(allPiecePositions)[i][0].indexOf(colorToCheck) !== -1) {
//                             rookMoves = rookMovement(colorToCheck, Object.entries(allPiecePositions)[i][1], width, row, column)
//                             bishopMoves = bishopMovement(colorToCheck, Object.entries(allPiecePositions)[i][1], width, row, column)
//                         }
//                         for (let j = 0; j < rookMoves?.threatenedPieces?.length; j++) {
//                             if (rookMoves.threatenedPieces[j] === checkingPiece && selectedPiece === Object.entries(allPiecePositions)[i][0]) {
//                                 setNewSuitableThreat(Object.entries(allPiecePositions)[i][1], allPiecePositions[checkingPiece], checkingPiece)
//                             }
//                         }
//                         for (let j = 0; j < bishopMoves?.threatenedPieces?.length; j++) {
//                             if (bishopMoves.threatenedPieces[j] === checkingPiece && selectedPiece === Object.entries(allPiecePositions)[i][0]) {
//                                 setNewSuitableThreat(Object.entries(allPiecePositions)[i][1], allPiecePositions[checkingPiece], checkingPiece)
//                             }
//                         }
//                     }
//                     if (Object.entries(allPiecePositions)[i][0].indexOf('king') !== -1) {
//                         let kingMoves
//                         let column = (Object.entries(allPiecePositions)[i][1] % width) + 1
//                         let row = ((Object.entries(allPiecePositions)[i][1] - (Object.entries(allPiecePositions)[i][1] % width)) / width) + 1
//                         if (Object.entries(allPiecePositions)[i][0].indexOf(colorToCheck) !== -1) {
//                             kingMoves = kingMovement(colorToCheck, Object.entries(allPiecePositions)[i][1], width, row, column)
//                         }
//                         for (let j = 0; j < kingMoves?.threatenedPieces?.length; j++) {
//                             if (kingMoves.threatenedPieces[j] === checkingPiece && selectedPiece === Object.entries(allPiecePositions)[i][0]) {
//                                 setNewSuitableThreat(Object.entries(allPiecePositions)[i][1], allPiecePositions[checkingPiece], checkingPiece)
//                             }
//                         }
//                     }
//                 }
//                 // black king
//                 if (selectedPiece.indexOf('king-black') !== -1 && nextTurn === 'black') {
//                     const kingMoves = kingMovement('black', currentPiecePosition, width, row, column)
//                     for (let i = 0; i < kingMoves.threatenedPieces.length; i++) {
//                         if (!allThreatenedCells.white.includes(allPiecePositions[kingMoves.threatenedPieces[i]])) setNewSuitableThreat(currentPiecePosition, allPiecePositions[kingMoves.threatenedPieces[i]], kingMoves.threatenedPieces[i])
//                     }
//                     for (let i = 0; i < kingMoves.suitableCells.length; i++) {
//                         if (!allThreatenedCells.white.includes(kingMoves.suitableCells[i])) setNewSuitable(currentPiecePosition, kingMoves.suitableCells[i])
//                     }
//                 }
//                 // white king
//                 if (selectedPiece.indexOf('king-white') !== -1 && nextTurn === 'white') {
//                     const kingMoves = kingMovement('white', currentPiecePosition, width, row, column)
//                     for (let i = 0; i < kingMoves.threatenedPieces.length; i++) {
//                         if (!allThreatenedCells.black.includes(allPiecePositions[kingMoves.threatenedPieces[i]])) setNewSuitableThreat(currentPiecePosition, allPiecePositions[kingMoves.threatenedPieces[i]], kingMoves.threatenedPieces[i])
//                     }
//                     for (let i = 0; i < kingMoves.suitableCells.length; i++) {
//                         if (!allThreatenedCells.black.includes(kingMoves.suitableCells[i])) setNewSuitable(currentPiecePosition, kingMoves.suitableCells[i])
//                     }
//                 }
//                 // intercept checking piece

//             }
//         }

//         setAllCells(() => {
//             const allCellElements = []

//             for (let i = 0; i < 64; i++) {
//                 let imageElement = <></>
//                 let cellClass = ''
//                 if (i === allPiecePositions['rook-black-1']) {
//                     imageElement = <img src="../Images/rook-black.png" alt="rook-black" id="rook-black-1" onClick={() => touchPiece('rook-black-1')} />
//                 } else if (i === allPiecePositions['rook-black-2']) {
//                     imageElement = <img src="../Images/rook-black.png" alt="rook-black" id="rook-black-2" onClick={() => touchPiece('rook-black-2')} />
//                 } else if (i === allPiecePositions['knight-black-1']) {
//                     imageElement = <img src="../Images/knight-black.png" alt="knight-black" id="knight-black-1" onClick={() => touchPiece('knight-black-1')} />
//                 } else if (i === allPiecePositions['knight-black-2']) {
//                     imageElement = <img src="../Images/knight-black.png" alt="knight-black" id="knight-black-2" onClick={() => touchPiece('knight-black-2')} />
//                 } else if (i === allPiecePositions['bishop-black-1']) {
//                     imageElement = <img src="../Images/bishop-black.png" alt="bishop-black" id="bishop-black-1" onClick={() => touchPiece('bishop-black-1')} />
//                 } else if (i === allPiecePositions['bishop-black-2']) {
//                     imageElement = <img src="../Images/bishop-black.png" alt="bishop-black" id="bishop-black-2" onClick={() => touchPiece('bishop-black-2')} />
//                 } else if (i === allPiecePositions['queen-black']) {
//                     imageElement = <img src="../Images/queen-black.png" alt="queen-black" id="queen-black" onClick={() => touchPiece('queen-black')} />
//                 } else if (i === allPiecePositions['king-black']) {
//                     imageElement = <img src="../Images/king-black.png" alt="king-black" id="king-black" onClick={() => touchPiece('king-black')} />
//                 } else if (i === allPiecePositions['pawn-black-1']) {
//                     imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-1" onClick={() => touchPiece('pawn-black-1')} />
//                 } else if (i === allPiecePositions['pawn-black-2']) {
//                     imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-2" onClick={() => touchPiece('pawn-black-2')} />
//                 } else if (i === allPiecePositions['pawn-black-3']) {
//                     imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-3" onClick={() => touchPiece('pawn-black-3')} />
//                 } else if (i === allPiecePositions['pawn-black-4']) {
//                     imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-4" onClick={() => touchPiece('pawn-black-4')} />
//                 } else if (i === allPiecePositions['pawn-black-5']) {
//                     imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-5" onClick={() => touchPiece('pawn-black-5')} />
//                 } else if (i === allPiecePositions['pawn-black-6']) {
//                     imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-6" onClick={() => touchPiece('pawn-black-6')} />
//                 } else if (i === allPiecePositions['pawn-black-7']) {
//                     imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-7" onClick={() => touchPiece('pawn-black-7')} />
//                 } else if (i === allPiecePositions['pawn-black-8']) {
//                     imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-8" onClick={() => touchPiece('pawn-black-8')} />
//                 } else if (i === allPiecePositions['pawn-white-1']) {
//                     imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-1" onClick={() => touchPiece('pawn-white-1')} />
//                 } else if (i === allPiecePositions['pawn-white-2']) {
//                     imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-2" onClick={() => touchPiece('pawn-white-2')} />
//                 } else if (i === allPiecePositions['pawn-white-3']) {
//                     imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-3" onClick={() => touchPiece('pawn-white-3')} />
//                 } else if (i === allPiecePositions['pawn-white-4']) {
//                     imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-4" onClick={() => touchPiece('pawn-white-4')} />
//                 } else if (i === allPiecePositions['pawn-white-5']) {
//                     imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-5" onClick={() => touchPiece('pawn-white-5')} />
//                 } else if (i === allPiecePositions['pawn-white-6']) {
//                     imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-6" onClick={() => touchPiece('pawn-white-6')} />
//                 } else if (i === allPiecePositions['pawn-white-7']) {
//                     imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-7" onClick={() => touchPiece('pawn-white-7')} />
//                 } else if (i === allPiecePositions['pawn-white-8']) {
//                     imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-8" onClick={() => touchPiece('pawn-white-8')} />
//                 } else if (i === allPiecePositions['rook-white-1']) {
//                     imageElement = <img src="../Images/rook-white.png" alt="rook-white" id="rook-white-1" onClick={() => touchPiece('rook-white-1')} />
//                 } else if (i === allPiecePositions['rook-white-2']) {
//                     imageElement = <img src="../Images/rook-white.png" alt="rook-white" id="rook-white-2" onClick={() => touchPiece('rook-white-2')} />
//                 } else if (i === allPiecePositions['knight-white-1']) {
//                     imageElement = <img src="../Images/knight-white.png" alt="knight-white" id="knight-white-1" onClick={() => touchPiece('knight-white-1')} />
//                 } else if (i === allPiecePositions['knight-white-2']) {
//                     imageElement = <img src="../Images/knight-white.png" alt="knight-white" id="knight-white-2" onClick={() => touchPiece('knight-white-2')} />
//                 } else if (i === allPiecePositions['bishop-white-1']) {
//                     imageElement = <img src="../Images/bishop-white.png" alt="bishop-white" id="bishop-white-1" onClick={() => touchPiece('bishop-white-1')} />
//                 } else if (i === allPiecePositions['bishop-white-2']) {
//                     imageElement = <img src="../Images/bishop-white.png" alt="bishop-white" id="bishop-white-2" onClick={() => touchPiece('bishop-white-2')} />
//                 } else if (i === allPiecePositions['queen-white']) {
//                     imageElement = <img src="../Images/queen-white.png" alt="queen-white" id="queen-white" onClick={() => touchPiece('queen-white')} />
//                 } else if (i === allPiecePositions['king-white']) {
//                     imageElement = <img src="../Images/king-white.png" alt="king-white" id="king-white" onClick={() => touchPiece('king-white')} />
//                 }

//                 const rowNumber = (i - (i % 8)) / 8

//                 if (rowNumber % 2 === 0) {
//                     cellClass = i % 2 === 1 ? 'cell-even' : 'cell-uneven'
//                 } else {
//                     cellClass = i % 2 === 0 ? 'cell-even' : 'cell-uneven'
//                 }

//                 allCellElements.push(<div id={i} key={i} className={cellClass}>{imageElement}</div>)
//             }

//             setAllRows(() => {
//                 const allRowElements = []
//                 for (let j = 0; j < 8; j++) {
//                     const currentRow = allCellElements.slice((j * 8), (j * 8) + 8)
//                     allRowElements.push(<div key={j} className="row">{currentRow}</div>)
//                 }
//                 return allRowElements
//             })

//             return allCellElements
//         })
//         // eslint-disable-next-line
//     }, [])

//     //create rows
//     // useEffect(() => {
//     //     setAllRows(() => {
//     //         const allRowElements = []
//     //         for (let j = 0; j < 8; j++) {
//     //             const currentRow = allCells.slice((j * 8), (j * 8) + 8)
//     //             allRowElements.push(<div key={j} className="row">{currentRow}</div>)
//     //         }
//     //         return allRowElements
//     //     })
//     // }, [allCells])

//     return (
//         <>
//             <div id="board">
//                 {allRows}
//             </div>
//             <p id="check-display">{check ? 'check' : ''}</p>
//             <div id="taken-out-white-pieces">{ }</div>
//             <div id="taken-out-black-pieces">{ }</div>
//         </>
//     )
// }

// export default Board
