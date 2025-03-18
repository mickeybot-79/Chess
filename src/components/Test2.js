// import { useEffect, useState } from "react"

// const Board = () => {

//     let width = 8

//     const [allCells, setAllCells] = useState([
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-uneven',
//             onClick: () => {}
//         },
//         {
//             className: 'cell-even',
//             onClick: () => {}
//         }
//     ])

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

//     const [check, setCheck] = useState(false)

//     const pawnMovement = (color, currentPiecePosition, row) => {
//         const result = {
//             threatenedPieces: [],
//             suitableCells: [],
//             protectedPieces: []
//         }
//         const targetSimple = color === 'black' ? currentPiecePosition + 8 : currentPiecePosition - 8
//         const targetDouble = color === 'black' ? currentPiecePosition + 16 : currentPiecePosition - 16
//         const targetDiagonal = color === 'black' ? currentPiecePosition + 7 : currentPiecePosition - 7
//         const targetDiagonal2 = color === 'black' ? currentPiecePosition + 9 : currentPiecePosition - 9
//         const rowCheck = color === 'black' ? 2 : 7
//         const threatCheck = color === 'black' ? ((((targetDiagonal) - ((targetDiagonal) % 8)) / 8) + 1) - row : row - ((((targetDiagonal) - ((targetDiagonal) % 8)) / 8) + 1)
//         const threatCheck2 = color === 'black' ? ((((targetDiagonal2) - ((targetDiagonal2) % 8)) / 8) + 1) - row : row - ((((targetDiagonal2) - ((targetDiagonal2) % 8)) / 8) + 1)
//         // simple move forward
//         if (!Object.values(allPiecePositions).includes(targetSimple)) result.suitableCells.push(targetSimple)
//         // double move forward
//         if (rowCheck === row && !Object.values(allPiecePositions).includes(targetSimple) && !Object.values(allPiecePositions).includes(targetDouble)) result.suitableCells.push(targetDouble)
//         // diagonal attack
//         if (Object.values(allPiecePositions).includes(targetDiagonal)) {
//             const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(targetDiagonal))[0][0]
//             if (targetPiece.indexOf(color) === -1 && threatCheck === 1) result.threatenedPieces.push(targetPiece)
//             if (targetPiece.indexOf(color) !== -1 && threatCheck === 1) result.protectedPieces.push(targetPiece)
//         }
//         if (Object.values(allPiecePositions).includes(targetDiagonal2)) {
//             const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(targetDiagonal2))[0][0]
//             if (targetPiece.indexOf(color) === -1 && threatCheck2 === 1) result.threatenedPieces.push(targetPiece)
//         }
//         return result
//     }

//     const rookMovement = (color, currentPiecePosition, width, row, column) => {
//         const result = {
//             threatenedPieces: [],
//             suitableCells: [],
//             protectedPieces: []
//         }
//         // right
//         for (let i = 1; i <= width - column; i++) {
//             let clear = true
//             for (let j = 1; j < (((currentPiecePosition + i) % 8) + 1) - column; j++) {
//                 if (Object.values(allPiecePositions).includes(currentPiecePosition + i - j) && currentPiecePosition + i - j !== currentPiecePosition) {
//                     clear = false
//                     break
//                 }
//             }
//             if (Object.values(allPiecePositions).includes(currentPiecePosition + i)) {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + i))[0][0]
//                 if (clear && targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (clear && targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             } else {
//                 if (clear || i === 1) result.suitableCells.push(currentPiecePosition + i)
//             }
//         }
//         // left
//         for (let i = 1; i < column; i++) {
//             let clear = true
//             for (let j = 1; j < 7 - ((currentPiecePosition - i) % 8) - (width - column); j++) {
//                 if (Object.values(allPiecePositions).includes(currentPiecePosition - i + j) && currentPiecePosition - i + j !== currentPiecePosition) {
//                     clear = false
//                     break
//                 }
//             }
//             if (Object.values(allPiecePositions).includes(currentPiecePosition - i)) {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - i))[0][0]
//                 if (clear && targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (clear && targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             } else {
//                 if (clear || i === 1) result.suitableCells.push(currentPiecePosition - i)
//             }
//         }
//         // down
//         for (let i = 1; i <= width - row; i++) {
//             let clear = true
//             for (let j = 1; j < (((currentPiecePosition + (i * width)) - ((currentPiecePosition + (i * width)) % 8)) / 8 + 1) - row; j++) {
//                 if (Object.values(allPiecePositions).includes(currentPiecePosition + (i * width) - (j * 8)) && currentPiecePosition + (i * width) - (j * 8) !== currentPiecePosition) {
//                     clear = false
//                     break
//                 }
//             }
//             if (Object.values(allPiecePositions).includes(currentPiecePosition + (i * width))) {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + (i * width)))[0][0]
//                 if (clear && targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (clear && targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             } else {
//                 if (clear || i === 1) result.suitableCells.push(currentPiecePosition + (i * width))
//             }
//         }
//         // up
//         for (let i = 1; i < row; i++) {
//             let clear = true
//             for (let j = 1; j < (7 - (((currentPiecePosition - (i * width)) - ((currentPiecePosition - (i * width)) % 8)) / 8)) - (width - row); j++) {
//                 if (clear && Object.values(allPiecePositions).includes(currentPiecePosition - (i * width) + (j * 8)) && currentPiecePosition - (i * width) + (j * 8) !== currentPiecePosition) {
//                     clear = false
//                     break
//                 }
//             }
//             if (Object.values(allPiecePositions).includes(currentPiecePosition - (i * width))) {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - (i * width)))[0][0]
//                 if (clear && targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (clear && targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             } else {
//                 if (clear || i === 1) result.suitableCells.push(currentPiecePosition - (i * width))
//             }
//         }
//         return result
//     }

//     const knightMovement = (color, currentPiecePosition, row, column) => {
//         const result = {
//             threatenedPieces: [],
//             suitableCells: [],
//             protectedPieces: []
//         }
//         if (column < 7 && row < 8) {
//             if (!Object.values(allPiecePositions).includes(currentPiecePosition + 10)) {
//                 result.suitableCells.push(currentPiecePosition + 10)
//             } else {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 10))[0][0]
//                 if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             }
//         }
//         if (column < 8 && row < 7) {
//             if (!Object.values(allPiecePositions).includes(currentPiecePosition + 17)) {
//                 result.suitableCells.push(currentPiecePosition + 17)
//             } else {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 17))[0][0]
//                 if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             }
//         }
//         if (column < 7 && row > 1) {
//             if (!Object.values(allPiecePositions).includes(currentPiecePosition - 6)) {
//                 result.suitableCells.push(currentPiecePosition - 6)
//             } else {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - 6))[0][0]
//                 if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             }
//         }
//         if (column > 1 && row < 7) {
//             if (!Object.values(allPiecePositions).includes(currentPiecePosition + 15)) {
//                 result.suitableCells.push(currentPiecePosition + 15)
//             } else {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 15))[0][0]
//                 if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             }
//         }
//         if (column > 1 && row > 2) {
//             if (!Object.values(allPiecePositions).includes(currentPiecePosition - 17)) {
//                 result.suitableCells.push(currentPiecePosition - 17)
//             } else {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - 17))[0][0]
//                 if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             }
//         }
//         if (column > 2 && row > 1) {
//             if (!Object.values(allPiecePositions).includes(currentPiecePosition - 10)) {
//                 result.suitableCells.push(currentPiecePosition - 10)
//             } else {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - 10))[0][0]
//                 if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             }
//         }
//         if (column > 2 && row < 8) {
//             if (!Object.values(allPiecePositions).includes(currentPiecePosition + 6)) {
//                 result.suitableCells.push(currentPiecePosition + 6)
//             } else {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 6))[0][0]
//                 if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             }
//         }
//         if (column < 8 && row > 2) {
//             if (!Object.values(allPiecePositions).includes(currentPiecePosition - 15)) {
//                 result.suitableCells.push(currentPiecePosition - 15)
//             } else {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - 15))[0][0]
//                 if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             }
//         }
//         return result
//     }

//     const bishopMovement = (color, currentPiecePosition, width, row, column) => {
//         const result = {
//             threatenedPieces: [],
//             suitableCells: [],
//             protectedPieces: []
//         }
//         let loopSize
//         // down right
//         if (column >= row) loopSize = width - column
//         if (column < row) loopSize = width - row
//         for (let i = 1; i <= loopSize; i++) {
//             let clear = true
//             let column2 = ((currentPiecePosition + width * i + i) % 8) + 1
//             let row2 = (((currentPiecePosition + width * i + i) - ((currentPiecePosition + width * i + i) % 8)) / 8) + 1
//             let loopSize2
//             if (column2 >= row2) loopSize2 = row2 - 1 - (row - 1)
//             if (column2 < row2) loopSize2 = column2 - 1
//             for (let j = 1; j < loopSize2; j++) {
//                 if (Object.values(allPiecePositions).includes((currentPiecePosition + width * i + i) - (width * j + j)) && (currentPiecePosition + width * i + i) - (width * j + j) !== currentPiecePosition) {
//                     clear = false
//                     break
//                 }
//             }
//             if (Object.values(allPiecePositions).includes(currentPiecePosition + width * i + i)) {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + width * i + i))[0][0]
//                 if (clear && targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (clear && targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             } else {
//                 if (clear || i === 1) result.suitableCells.push(currentPiecePosition + width * i + i)
//             }
//         }
//         // down left
//         if (column <= width - row) loopSize = column - 1
//         if (column > width - row) loopSize = width - row
//         for (let i = 1; i <= loopSize; i++) {
//             let clear = true
//             let column2 = ((currentPiecePosition + width * i - i) % 8) + 1
//             let row2 = (((currentPiecePosition + width * i - i) - ((currentPiecePosition + width * i - i) % 8)) / 8) + 1
//             let loopSize2
//             if (row2 <= width - column2) loopSize2 = row2 - 1 - (row - 1)
//             if (row2 > width - column2) loopSize2 = width - column2 - (width - column)
//             for (let j = 1; j < loopSize2; j++) {
//                 if (Object.values(allPiecePositions).includes((currentPiecePosition + width * i - i) - (width * j - j)) && (currentPiecePosition + width * i - i) - (width * j - j) !== currentPiecePosition) {
//                     clear = false
//                     break
//                 }
//             }
//             if (Object.values(allPiecePositions).includes(currentPiecePosition + width * i - i)) {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + width * i - i))[0][0]
//                 if (clear && targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (clear && targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             } else {
//                 if (clear || i === 1) result.suitableCells.push(currentPiecePosition + width * i - i)
//             }
//         }
//         // up right
//         if (row <= width - column) loopSize = row - 1
//         if (row > width - column) loopSize = width - column
//         for (let i = 1; i <= loopSize; i++) {
//             let clear = true
//             let column2 = ((currentPiecePosition - width * i + i) % 8) + 1
//             let row2 = (((currentPiecePosition - width * i + i) - ((currentPiecePosition - width * i + i) % 8)) / 8) + 1
//             let loopSize2
//             if (column2 <= width - row2) loopSize2 = column2 - 1 - (column - 1)
//             if (column2 > width - row2) loopSize2 = width - row2 - (width - row)
//             for (let j = 1; j < loopSize2; j++) {
//                 if (Object.values(allPiecePositions).includes((currentPiecePosition - width * i + i) + (width * j - j)) && (currentPiecePosition - width * i + i) + (width * j - j) !== currentPiecePosition) {
//                     console.log()
//                     clear = false
//                     break
//                 }
//             }
//             if (Object.values(allPiecePositions).includes(currentPiecePosition - width * i + i)) {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - width * i + i))[0][0]
//                 if (clear && targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (clear && targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             } else {
//                 if (clear || i === 1) result.suitableCells.push(currentPiecePosition - width * i + i)
//             }
//         }
//         // up left
//         if (column >= row) loopSize = row - 1
//         if (column < row) loopSize = column - 1
//         for (let i = 1; i <= loopSize; i++) {
//             let clear = true
//             let column2 = ((currentPiecePosition - width * i - i) % 8) + 1
//             let row2 = (((currentPiecePosition - width * i - i) - ((currentPiecePosition - width * i - i) % 8)) / 8) + 1
//             let loopSize2
//             if (column2 >= row2) loopSize2 = width - column2 - (width - column)
//             if (column2 < row2) loopSize2 = width - row2 - (width - row)
//             for (let j = 1; j < loopSize2; j++) {
//                 if (Object.values(allPiecePositions).includes((currentPiecePosition - width * i - i) + (width * j + j)) && (currentPiecePosition - width * i - i) + (width * j + j) !== currentPiecePosition) {
//                     clear = false
//                     break
//                 }
//             }
//             if (Object.values(allPiecePositions).includes(currentPiecePosition - width * i - i)) {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - width * i - i))[0][0]
//                 if (clear && targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (clear && targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             } else {
//                 if (clear || i === 1) result.suitableCells.push(currentPiecePosition - width * i - i)
//             }
//         }
//         return result
//     }

//     const kingMovement = (selectedPiece, color, currentPiecePosition, width, row, column) => {
//         const result = {
//             threatenedPieces: [],
//             suitableCells: [],
//             protectedPieces: []
//         }
//         if (column > 1 && row > 1) {
//             if (!Object.values(allPiecePositions).includes(currentPiecePosition - width - 1)) {
//                 result.suitableCells.push(currentPiecePosition - width - 1)
//             } else {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - width - 1))[0][0]
//                 if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             }
//         }
//         if (row > 1) {
//             if (!Object.values(allPiecePositions).includes(currentPiecePosition - width)) {
//                 result.suitableCells.push(currentPiecePosition - width)
//             } else {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - width))[0][0]
//                 if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             }
//         }
//         if (column < 8 && row > 1) {
//             if (!Object.values(allPiecePositions).includes(currentPiecePosition - width + 1)) {
//                 result.suitableCells.push(currentPiecePosition - width + 1)
//             } else {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - width + 1))[0][0]
//                 if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             }
//         }
//         if (column > 1) {
//             if (!Object.values(allPiecePositions).includes(currentPiecePosition - 1)) {
//                 result.suitableCells.push(currentPiecePosition - 1)
//             } else {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - 1))[0][0]
//                 if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             }
//         }
//         if (column < 8) {
//             if (!Object.values(allPiecePositions).includes(currentPiecePosition + 1)) {
//                 result.suitableCells.push(currentPiecePosition + 1)
//             } else {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 1))[0][0]
//                 if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             }
//         }
//         if (row < 8 && column > 1) {
//             if (!Object.values(allPiecePositions).includes(currentPiecePosition + width - 1)) {
//                 result.suitableCells.push(currentPiecePosition + width - 1)
//             } else {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + width - 1))[0][0]
//                 if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             }
//         }
//         if (row < 8) {
//             if (!Object.values(allPiecePositions).includes(currentPiecePosition + width)) {
//                 result.suitableCells.push(currentPiecePosition + width)
//             } else {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + width))[0][0]
//                 if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             }
//         }
//         if (row < 8 && column < 8) {
//             if (!Object.values(allPiecePositions).includes(currentPiecePosition + width + 1)) {
//                 result.suitableCells.push(currentPiecePosition + width + 1)
//             } else {
//                 const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + width + 1))[0][0]
//                 if (targetPiece.indexOf(color) === -1) result.threatenedPieces.push(targetPiece)
//                 if (targetPiece.indexOf(color) !== -1) result.protectedPieces.push(targetPiece)
//             }
//         }
//         // Castling
//         const positionCheck = color === 'black' ? 4 : 60
//         const pieceCheck = color === 'black' ? 'rook-black' : 'rook-white'
//         if (!check && allPiecePositions[selectedPiece] === positionCheck && !Object.values(allPiecePositions).includes(positionCheck + 1) && !Object.values(allPiecePositions).includes(positionCheck + 2) && Object.values(allPiecePositions).includes(positionCheck + 3) && Object.entries(allPiecePositions).filter(piece => piece.includes(positionCheck + 3))[0][0].indexOf(pieceCheck) !== -1) {
//             result.suitableCells.push(positionCheck + 2)
//         }
//         if (!check && allPiecePositions[selectedPiece] === positionCheck && !Object.values(allPiecePositions).includes(positionCheck - 1) && !Object.values(allPiecePositions).includes(positionCheck - 2) && !Object.values(allPiecePositions).includes(positionCheck - 3) && Object.values(allPiecePositions).includes(positionCheck - 4) && Object.entries(allPiecePositions).filter(piece => piece.includes(positionCheck - 4))[0][0].indexOf(pieceCheck) !== -1) {
//             result.suitableCells.push(positionCheck - 2)
//         }
//         return result
//     }

//     const movePiece = (selectedPiece, selectedPosition, currentPiecePosition) => {

//     }

//     const setNewSuitableThreat = (currentPosition, targetPosition, targetPiece) => {
//         const updatedCell = (
//             <div id={targetPosition} key={targetPosition} className='suitable' onClick={() => movePiece(targetPosition, currentPosition)}><img src={`../Images/${targetPiece.split('-')[0]}-${targetPiece.split('-')[1]}.png`} alt={`${targetPiece.split('-')[0]}-${targetPiece.split('-')[1]}`} id={targetPiece} onClick={() => touchPiece('')} /></div>
//         )
//         setAllCells(prevCells => {
//             const updatedCells = prevCells
//             updatedCells.splice(targetPosition, 1, updatedCell)
//             return updatedCells
//         })
//         setSuitableCells((prev) => {
//             const newSuitableCells = prev
//             if (!newSuitableCells.includes(targetPosition)) newSuitableCells.push(targetPosition)
//             return newSuitableCells
//         })
//     }

//     const setNewSuitable = (currentPosition, targetPosition) => {
//         const updatedCell = (
//             <div id={targetPosition} key={targetPosition} className='suitable' onClick={() => movePiece(targetPosition, currentPosition)}></div>
//         )
//         setAllCells(prevCells => {
//             const updatedCells = prevCells
//             updatedCells.splice(targetPosition, 1, updatedCell)
//             return updatedCells
//         })
//         setSuitableCells((prev) => {
//             const newSuitableCells = prev
//             if (!newSuitableCells.includes(targetPosition)) newSuitableCells.push(targetPosition)
//             return newSuitableCells
//         })
//     }

//     const touchPiece = (selectedPiece) => {
//         const currentPiecePosition = allPiecePositions[selectedPiece]
//         let column = (currentPiecePosition % width) + 1
//         let row = ((currentPiecePosition - (currentPiecePosition % width)) / width) + 1
//         if (!check) {
//             // black pawn
//             if (selectedPiece.indexOf('pawn-black') !== -1 && nextTurn === 'black') {
//                 const pawnMoves = pawnMovement('black', currentPiecePosition, row)
//                 for (let i = 0; i < pawnMoves.threatenedPieces.length; i++) {
//                     setNewSuitableThreat(currentPiecePosition, allPiecePositions[pawnMoves.threatenedPieces[i]], pawnMoves.threatenedPieces[i])
//                 }
//                 for (let i = 0; i < pawnMoves.suitableCells.length; i++) {
//                     setNewSuitable(currentPiecePosition, pawnMoves.suitableCells[i])
//                 }
//             }
//         }
//     }

//     return (
//         <>
//             <div id="board">
//                 <div className="row">
//                     <div id='0' className={allCells[0].className} onClick={allCells[0].onClick}><img src="../Images/rook-black.png" alt="rook-black" id="rook-black-1" onClick={() => touchPiece('rook-black-1')} /></div>
//                     <div id='1' className={allCells[1].className}><img src="../Images/knight-black.png" alt="knight-black" id="knight-black-1" onClick={() => touchPiece('knight-black-1')} /></div>
//                     <div id='2' className={allCells[2].className}><img src="../Images/bishop-black.png" alt="bishop-black" id="bishop-black-1" onClick={() => touchPiece('bishop-black-1')} /></div>
//                     <div id='3' className={allCells[3].className}><img src="../Images/queen-black.png" alt="queen-black" id="queen-black" onClick={() => touchPiece('queen-black')} /></div>
//                     <div id='4' className={allCells[4].className}><img src="../Images/king-black.png" alt="king-black" id="king-black" onClick={() => touchPiece('king-black')} /></div>
//                     <div id='5' className={allCells[5].className}><img src="../Images/bishop-black.png" alt="bishop-black" id="bishop-black-2" onClick={() => touchPiece('bishop-black-2')} /></div>
//                     <div id='6' className={allCells[6].className}><img src="../Images/knight-black.png" alt="knight-black" id="knight-black-2" onClick={() => touchPiece('knight-black-2')} /></div>
//                     <div id='7' className={allCells[7].className}><img src="../Images/rook-black.png" alt="rook-black" id="rook-black-2" onClick={() => touchPiece('rook-black-2')} /></div>
//                 </div>
//                 <div className="row">
//                     <div id='8' className={allCells[8].className}><img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-1" onClick={() => touchPiece('pawn-black-1')} /></div>
//                     <div id='9' className={allCells[9].className}><img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-2" onClick={() => touchPiece('pawn-black-2')} /></div>
//                     <div id='10' className={allCells[10].className}><img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-3" onClick={() => touchPiece('pawn-black-3')} /></div>
//                     <div id='11' className={allCells[11].className}><img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-4" onClick={() => touchPiece('pawn-black-4')} /></div>
//                     <div id='12' className={allCells[12].className}><img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-5" onClick={() => touchPiece('pawn-black-5')} /></div>
//                     <div id='13' className={allCells[13].className}><img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-6" onClick={() => touchPiece('pawn-black-6')} /></div>
//                     <div id='14' className={allCells[14].className}><img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-7" onClick={() => touchPiece('pawn-black-7')} /></div>
//                     <div id='15' className={allCells[15].className}><img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-8" onClick={() => touchPiece('pawn-black-8')} /></div>
//                 </div>
//                 <div className="row">
//                     <div id='16' className={allCells[16].className}></div>
//                     <div id='17' className={allCells[17].className}></div>
//                     <div id='18' className={allCells[18].className}></div>
//                     <div id='19' className={allCells[19].className}></div>
//                     <div id='20' className={allCells[20].className}></div>
//                     <div id='21' className={allCells[21].className}></div>
//                     <div id='22' className={allCells[22].className}></div>
//                     <div id='23' className={allCells[23].className}></div>
//                 </div>
//                 <div className="row">
//                     <div id='24' className={allCells[24].className}></div>
//                     <div id='25' className={allCells[25].className}></div>
//                     <div id='26' className={allCells[26].className}></div>
//                     <div id='27' className={allCells[27].className}></div>
//                     <div id='28' className={allCells[28].className}></div>
//                     <div id='29' className={allCells[29].className}></div>
//                     <div id='30' className={allCells[30].className}></div>
//                     <div id='31' className={allCells[31].className}></div>
//                 </div>
//                 <div className="row">
//                     <div id='32' className={allCells[32].className}></div>
//                     <div id='33' className={allCells[33].className}></div>
//                     <div id='34' className={allCells[34].className}></div>
//                     <div id='35' className={allCells[35].className}></div>
//                     <div id='36' className={allCells[36].className}></div>
//                     <div id='37' className={allCells[37].className}></div>
//                     <div id='38' className={allCells[38].className}></div>
//                     <div id='39' className={allCells[39].className}></div>
//                 </div>
//                 <div className="row">
//                     <div id='40' className={allCells[40].className}></div>
//                     <div id='41' className={allCells[41].className}></div>
//                     <div id='42' className={allCells[42].className}></div>
//                     <div id='43' className={allCells[43].className}></div>
//                     <div id='44' className={allCells[44].className}></div>
//                     <div id='45' className={allCells[45].className}></div>
//                     <div id='46' className={allCells[46].className}></div>
//                     <div id='47' className={allCells[47].className}></div>
//                 </div>
//                 <div className="row">
//                     <div id='48' className={allCells[48].className}><img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-1" onClick={() => touchPiece('pawn-white-1')} /></div>
//                     <div id='49' className={allCells[49].className}><img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-2" onClick={() => touchPiece('pawn-white-2')} /></div>
//                     <div id='50' className={allCells[50].className}><img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-3" onClick={() => touchPiece('pawn-white-3')} /></div>
//                     <div id='51' className={allCells[51].className}><img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-4" onClick={() => touchPiece('pawn-white-4')} /></div>
//                     <div id='52' className={allCells[52].className}><img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-5" onClick={() => touchPiece('pawn-white-5')} /></div>
//                     <div id='53' className={allCells[53].className}><img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-6" onClick={() => touchPiece('pawn-white-6')} /></div>
//                     <div id='54' className={allCells[54].className}><img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-7" onClick={() => touchPiece('pawn-white-7')} /></div>
//                     <div id='55' className={allCells[55].className}><img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-8" onClick={() => touchPiece('pawn-white-8')} /></div>
//                 </div>
//                 <div className="row">
//                     <div id='56' className={allCells[56].className}><img src="../Images/rook-white.png" alt="rook-white" id="rook-white-1" onClick={() => touchPiece('rook-white-1')} /></div>
//                     <div id='57' className={allCells[57].className}><img src="../Images/knight-white.png" alt="knight-white" id="knight-white-1" onClick={() => touchPiece('knight-white-1')} /></div>
//                     <div id='58' className={allCells[58].className}><img src="../Images/bishop-white.png" alt="bishop-white" id="bishop-white-1" onClick={() => touchPiece('bishop-white-1')} /></div>
//                     <div id='59' className={allCells[59].className}><img src="../Images/queen-white.png" alt="queen-white" id="queen-white" onClick={() => touchPiece('queen-white')} /></div>
//                     <div id='60' className={allCells[60].className}><img src="../Images/king-white.png" alt="king-white" id="king-white" onClick={() => touchPiece('king-white')} /></div>
//                     <div id='61' className={allCells[61].className}><img src="../Images/bishop-white.png" alt="bishop-white" id="bishop-white-2" onClick={() => touchPiece('bishop-white-2')} /></div>
//                     <div id='62' className={allCells[62].className}><img src="../Images/knight-white.png" alt="knight-white" id="knight-white-2" onClick={() => touchPiece('knight-white-2')} /></div>
//                     <div id='63' className={allCells[63].className}><img src="../Images/rook-white.png" alt="rook-white" id="rook-white-2" onClick={() => touchPiece('rook-white-2')} /></div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Board