import { useEffect, useState } from "react"

const Board = () => {

    const [allCells, setAllCells] = useState([])

    const [allRows, setAllRows] = useState([])

    const [selectedPiece, setSelectedPiece] = useState('')

    const [allPiecePositions, setAllPiecePositions] = useState({
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
    })

    const [nextTurn, setNextTurn] = useState('white')

    const [suitableCells, setSuitableCells] = useState([])

    //create cells
    useEffect(() => {
        setAllCells(() => {
            const allCellElements = []

            for (let i = 0; i < 64; i++) {
                let imageElement = <></>
                let cellClass = ''
                if (i === 0) {
                    imageElement = <img src="../Images/rook-black.png" alt="rook-black" id="rook-black-1" onClick={() => setSelectedPiece('rook-black-1')} />
                } else if (i === 7) {
                    imageElement = <img src="../Images/rook-black.png" alt="rook-black" id="rook-black-2" onClick={() => setSelectedPiece('rook-black-2')} />
                } else if (i === 1) {
                    imageElement = <img src="../Images/knight-black.png" alt="knight-black" id="knight-black-1" onClick={() => setSelectedPiece('knight-black-1')} />
                } else if (i === 6) {
                    imageElement = <img src="../Images/knight-black.png" alt="knight-black" id="knight-black-2" onClick={() => setSelectedPiece('knight-black-2')} />
                } else if (i === 2) {
                    imageElement = <img src="../Images/bishop-black.png" alt="bishop-black" id="bishop-black-1" onClick={() => setSelectedPiece('bishop-black-1')} />
                } else if (i === 5) {
                    imageElement = <img src="../Images/bishop-black.png" alt="bishop-black" id="bishop-black-2" onClick={() => setSelectedPiece('bishop-black-2')} />
                } else if (i === 3) {
                    imageElement = <img src="../Images/queen-black.png" alt="queen-black" id="queen-black" onClick={() => setSelectedPiece('queen-black')} />
                } else if (i === 4) {
                    imageElement = <img src="../Images/king-black.png" alt="king-black" id="king-black" onClick={() => setSelectedPiece('king-black')} />
                } else if (i === 8) {
                    imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-1" onClick={() => setSelectedPiece('pawn-black-1')} />
                } else if (i === 9) {
                    imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-2" onClick={() => setSelectedPiece('pawn-black-2')} />
                } else if (i === 10) {
                    imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-3" onClick={() => setSelectedPiece('pawn-black-3')} />
                } else if (i === 11) {
                    imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-4" onClick={() => setSelectedPiece('pawn-black-4')} />
                } else if (i === 12) {
                    imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-5" onClick={() => setSelectedPiece('pawn-black-5')} />
                } else if (i === 13) {
                    imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-6" onClick={() => setSelectedPiece('pawn-black-6')} />
                } else if (i === 14) {
                    imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-7" onClick={() => setSelectedPiece('pawn-black-7')} />
                } else if (i === 15) {
                    imageElement = <img src="../Images/pawn-black.png" alt="pawn-black" id="pawn-black-8" onClick={() => setSelectedPiece('pawn-black-8')} />
                } else if (i === 48) {
                    imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-1" onClick={() => setSelectedPiece('pawn-white-1')} />
                } else if (i === 49) {
                    imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-2" onClick={() => setSelectedPiece('pawn-white-2')} />
                } else if (i === 50) {
                    imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-3" onClick={() => setSelectedPiece('pawn-white-3')} />
                } else if (i === 51) {
                    imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-4" onClick={() => setSelectedPiece('pawn-white-4')} />
                } else if (i === 52) {
                    imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-5" onClick={() => setSelectedPiece('pawn-white-5')} />
                } else if (i === 53) {
                    imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-6" onClick={() => setSelectedPiece('pawn-white-6')} />
                } else if (i === 54) {
                    imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-7" onClick={() => setSelectedPiece('pawn-white-7')} />
                } else if (i === 55) {
                    imageElement = <img src="../Images/pawn-white.png" alt="pawn-white" id="pawn-white-8" onClick={() => setSelectedPiece('pawn-white-8')} />
                } else if (i === 56) {
                    imageElement = <img src="../Images/rook-white.png" alt="rook-white" id="rook-white-1" onClick={() => setSelectedPiece('rook-white-1')} />
                } else if (i === 63) {
                    imageElement = <img src="../Images/rook-white.png" alt="rook-white" id="rook-white-2" onClick={() => setSelectedPiece('rook-white-2')} />
                } else if (i === 57) {
                    imageElement = <img src="../Images/knight-white.png" alt="knight-white" id="knight-white-1" onClick={() => setSelectedPiece('knight-white-1')} />
                } else if (i === 62) {
                    imageElement = <img src="../Images/knight-white.png" alt="knight-white" id="knight-white-2" onClick={() => setSelectedPiece('knight-white-2')} />
                } else if (i === 58) {
                    imageElement = <img src="../Images/bishop-white.png" alt="bishop-white" id="bishop-white-1" onClick={() => setSelectedPiece('bishop-white-1')} />
                } else if (i === 61) {
                    imageElement = <img src="../Images/bishop-white.png" alt="bishop-white" id="bishop-white-2" onClick={() => setSelectedPiece('bishop-white-2')} />
                } else if (i === 59) {
                    imageElement = <img src="../Images/queen-white.png" alt="queen-white" id="queen-white" onClick={() => setSelectedPiece('queen-white')} />
                } else if (i === 60) {
                    imageElement = <img src="../Images/king-white.png" alt="king-white" id="king-white" onClick={() => setSelectedPiece('king-white')} />
                }

                const rowNumber = (i - (i % 8)) / 8

                if (rowNumber % 2 === 0) {
                    cellClass = i % 2 === 1 ? 'cell-even' : 'cell-uneven'
                } else {
                    cellClass = i % 2 === 0 ? 'cell-even' : 'cell-uneven'
                }

                allCellElements.push(<div id={i} key={i} className={cellClass}>{imageElement}</div>)
            }

            return allCellElements
        })
        // eslint-disable-next-line
    }, [])

    //create rows
    useEffect(() => {
        setAllRows(() => {
            const allRowElements = []

            for (let j = 0; j < 8; j++) {
                const currentRow = allCells.slice((j * 8), (j * 8) + 8)
                allRowElements.push(<div key={j} className="row">{currentRow}</div>)
            }

            return allRowElements
        })
    }, [allCells])

    //piece movement
    useEffect(() => {
        const movePiece = (selectedPosition, currentPiecePosition) => {
            for (let i = 0; i < suitableCells.length ; i++) {
                let newClass
                const rowNumber = (suitableCells[i] - (suitableCells[i] % 8)) / 8
                if (rowNumber % 2 === 0) {
                    newClass = suitableCells[i] % 2 === 1 ? 'cell-even' : 'cell-uneven'
                } else {
                    newClass = suitableCells[i] % 2 === 0 ? 'cell-even' : 'cell-uneven'
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

            let occupiedCellClass
            const rowNumber = (selectedPosition - (selectedPosition % 8)) / 8
            if (rowNumber % 2 === 0) {
                occupiedCellClass = selectedPosition % 2 === 1 ? 'cell-even' : 'cell-uneven'
            } else {
                occupiedCellClass = selectedPosition % 2 === 0 ? 'cell-even' : 'cell-uneven'
            }
            let vacatedCellClass
            const rowNumber2 = (currentPiecePosition - (currentPiecePosition % 8)) / 8
            if (rowNumber2 % 2 === 0) {
                vacatedCellClass = currentPiecePosition % 2 === 1 ? 'cell-even' : 'cell-uneven'
            } else {
                vacatedCellClass = currentPiecePosition % 2 === 0 ? 'cell-even' : 'cell-uneven'
            }
            const PieceId = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition))[0][0]
            const occupiedCell = (
                <div id={selectedPosition} key={selectedPosition} className={occupiedCellClass}><img src={`../Images/${PieceId.split('-')[0]}-${PieceId.split('-')[1]}.png`} alt={`${PieceId.split('-')[0]}-${PieceId.split('-')[1]}`} id={PieceId} onClick={() => setSelectedPiece(PieceId)}/></div>
            )
            const vacatedCell = (
                <div id={currentPiecePosition} key={currentPiecePosition} className={vacatedCellClass}></div>
            )
            setAllPiecePositions(prev => {
                let newState = {
                    ...prev,
                    [selectedPiece]: selectedPosition,
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
            setAllCells(prevCells => {
                const updatedCells = prevCells
                updatedCells.splice(selectedPosition, 1, occupiedCell)
                updatedCells.splice(currentPiecePosition, 1, vacatedCell)
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
            setNextTurn(prev => prev === 'white' ? 'black' : 'white')
        }

        const setNewSuitableThreat = (currentPosition, targetPosition, targetPiece) => {
            const updatedCell = (
                <div id={targetPosition} key={targetPosition} className='suitable' onClick={() => movePiece(targetPosition, currentPosition)}><img src={`../Images/${targetPiece.split('-')[0]}-${targetPiece.split('-')[1]}.png`} alt={`${targetPiece.split('-')[0]}-${targetPiece.split('-')[1]}`} id={targetPiece} onClick={() => setSelectedPiece('')} /></div>
            )
            setAllCells(prevCells => {
                const updatedCells = prevCells
                updatedCells.splice(targetPosition, 1, updatedCell)
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
            setSuitableCells((prev) => {
                const newSuitableCells = prev
                if (!newSuitableCells.includes(targetPosition)) newSuitableCells.push(targetPosition)
                return newSuitableCells
            })
        }

        const setNewSuitable = (currentPosition, targetPosition) => {
            const updatedCell = (
                <div id={targetPosition} key={targetPosition} className='suitable' onClick={() => movePiece(targetPosition, currentPosition)}></div>
            )
            setAllCells(prevCells => {
                const updatedCells = prevCells
                updatedCells.splice(targetPosition, 1, updatedCell)
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
            setSuitableCells((prev) => {
                const newSuitableCells = prev
                if (!newSuitableCells.includes(targetPosition)) newSuitableCells.push(targetPosition)
                return newSuitableCells
            })
        }

        const touchPiece = () => {
            if (selectedPiece && allPiecePositions[selectedPiece] !== -1) {
                // remove previous suitable cells
                for (let i = 0; i < suitableCells.length ; i++) {
                    let newClass
                    const rowNumber = (suitableCells[i] - (suitableCells[i] % 8)) / 8
                    if (rowNumber % 2 === 0) {
                        newClass = suitableCells[i] % 2 === 1 ? 'cell-even' : 'cell-uneven'
                    } else {
                        newClass = suitableCells[i] % 2 === 0 ? 'cell-even' : 'cell-uneven'
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

                // set new suitable cells
                const currentPiecePosition = allPiecePositions[selectedPiece]
                let width = 8
                let column = (currentPiecePosition % width) + 1
                let row = ((currentPiecePosition - (currentPiecePosition % width)) / width) + 1
                // black pawn
                if (selectedPiece.indexOf('pawn-black') !== -1 && nextTurn === 'black') {
                    // simple move forward
                    if (!Object.values(allPiecePositions).includes(currentPiecePosition + 8)) {
                        setNewSuitable(currentPiecePosition, currentPiecePosition + 8)
                    }
                    // double move forward
                    if (currentPiecePosition > 7 && currentPiecePosition < 16 && !Object.values(allPiecePositions).includes(currentPiecePosition + 8) && !Object.values(allPiecePositions).includes(currentPiecePosition + 16)) {
                        setNewSuitable(currentPiecePosition, currentPiecePosition + 16)
                    }
                    // diagonal attack
                    if (Object.values(allPiecePositions).includes(currentPiecePosition + 7)) {
                        const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 7))[0][0]
                        if (targetPiece.indexOf('white') !== -1 && ((((currentPiecePosition + 7) - ((currentPiecePosition + 7) % 8)) / 8) + 1) - row === 1) {
                            setNewSuitableThreat(currentPiecePosition, currentPiecePosition + 7, targetPiece)
                        }
                    }
                    if (Object.values(allPiecePositions).includes(currentPiecePosition + 9)) {
                        const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 9))[0][0]
                        if (targetPiece.indexOf('white') !== -1 && ((((currentPiecePosition + 9) - ((currentPiecePosition + 9) % 8)) / 8) + 1 ) - row === 1) {
                            setNewSuitableThreat(currentPiecePosition, currentPiecePosition + 9, targetPiece)
                        }
                    }
                }
                // white pawn
                if (selectedPiece.indexOf('pawn-white') !== -1 && nextTurn === 'white') {
                    // simple move forward
                    if (!Object.values(allPiecePositions).includes(currentPiecePosition - 8)) {
                        setNewSuitable(currentPiecePosition, currentPiecePosition - 8)
                    }
                    // double move forward
                    if (currentPiecePosition > 47 && currentPiecePosition < 56 && !Object.values(allPiecePositions).includes(currentPiecePosition - 8) && !Object.values(allPiecePositions).includes(currentPiecePosition - 16)) {
                        setNewSuitable(currentPiecePosition, currentPiecePosition - 16)
                    }
                    // diagonal attack
                    if (Object.values(allPiecePositions).includes(currentPiecePosition - 7)) {
                        const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - 7))[0][0]
                        if (targetPiece.indexOf('black') !== -1 && row - ((((currentPiecePosition - 7) - ((currentPiecePosition - 7) % 8)) / 8) + 1) === 1) {
                            setNewSuitableThreat(currentPiecePosition, currentPiecePosition - 7, targetPiece)
                        }
                    }
                    if (Object.values(allPiecePositions).includes(currentPiecePosition - 9)) {
                        const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - 9))[0][0]
                        if (targetPiece.indexOf('black') !== -1 && row - ((((currentPiecePosition - 9) - ((currentPiecePosition - 9) % 8)) / 8) + 1) === 1) {
                            setNewSuitableThreat(currentPiecePosition, currentPiecePosition - 9, targetPiece)
                        }
                    }
                }
                // black rook / black queen
                if ((selectedPiece.indexOf('rook-black') !== -1 || selectedPiece.indexOf('queen-black') !== -1) && nextTurn === 'black') {
                    // horizontal movement right
                    for (let i = 1; i <= width - column; i++) {
                        let clear = true
                        for (let j = 1; j < (((currentPiecePosition + i) % 8) + 1) - column; j++) {
                            if (Object.values(allPiecePositions).includes(currentPiecePosition + i - j) && currentPiecePosition + i - j !== currentPiecePosition) {
                                clear = false
                                break
                            }
                        }
                        if (Object.values(allPiecePositions).includes(currentPiecePosition + i)) {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + i))[0][0]
                            if (clear && targetPiece.indexOf('white') !== -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + i, targetPiece)
                            }
                        } else {
                            if (clear || i === 1) {
                                setNewSuitable(currentPiecePosition, currentPiecePosition + i)
                            }
                        }
                    }
                    // horizontal movement left
                    for (let i = 1; i < column; i++) {
                        let clear = true
                        for (let j = 1; j < 7 - ((currentPiecePosition - i) % 8) - (width - column); j++) {
                            if (Object.values(allPiecePositions).includes(currentPiecePosition - i + j) && currentPiecePosition - i + j !== currentPiecePosition) {
                                clear = false
                                break
                            }
                        }
                        if (Object.values(allPiecePositions).includes(currentPiecePosition - i)) {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - i))[0][0]
                            if (clear && targetPiece.indexOf('white') !== -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - i, targetPiece)
                            }
                        } else {
                            if (clear || i === 1) {
                                setNewSuitable(currentPiecePosition, currentPiecePosition - i)
                            }
                        }
                    }
                    // vertical movement down
                    for (let i = 1; i <= width - row ; i++) {
                        let clear = true
                        for (let j = 1; j < (((currentPiecePosition + (i * 8)) - ((currentPiecePosition + (i * 8)) % 8)) / 8 + 1) - row; j++) {
                            if (Object.values(allPiecePositions).includes(currentPiecePosition + (i * 8) - (j * 8)) && currentPiecePosition + (i * 8) - (j * 8) !== currentPiecePosition) {
                                clear = false
                                break
                            }
                        }
                        if (Object.values(allPiecePositions).includes(currentPiecePosition + (i * 8))) {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + (i * 8)))[0][0]
                            if (clear && targetPiece.indexOf('white') !== -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + (i * 8), targetPiece)
                            }
                        } else {
                            if (clear || i === 1) {
                                setNewSuitable(currentPiecePosition, currentPiecePosition + (i * 8))
                            }
                        }
                    }
                    // vertical movement up
                    for (let i = 1; i < row; i++) {
                        let clear = true
                        for (let j = 1; j < (7 - (((currentPiecePosition - (i * 8)) - ((currentPiecePosition - (i * 8)) % 8)) / 8)) - (width - row); j++) {
                            if (clear && Object.values(allPiecePositions).includes(currentPiecePosition - (i * 8) + (j * 8)) && currentPiecePosition - (i * 8) + (j * 8) !== currentPiecePosition) {
                                clear = false
                                break
                            }
                        }
                        if (Object.values(allPiecePositions).includes(currentPiecePosition - (i * 8))) {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - (i * 8)))[0][0]
                            if (clear && targetPiece.indexOf('white') !== -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - (i * 8), targetPiece)
                            }
                        } else {
                            if (clear || i === 1) {
                                setNewSuitable(currentPiecePosition, currentPiecePosition - (i * 8))
                            }
                        }
                    }
                }
                // white rook / white queen
                if ((selectedPiece.indexOf('rook-white') !== -1 || selectedPiece.indexOf('queen-white') !== -1) && nextTurn === 'white') {
                    // horizontal movement right
                    for (let i = 1; i <= 7 - (currentPiecePosition % 8); i++) {
                        let clear = true
                        for (let j = 1; j < (((currentPiecePosition + i) % 8) + 1) - ((currentPiecePosition % 8) + 1); j++) {
                            if (Object.values(allPiecePositions).includes(currentPiecePosition + i - j) && currentPiecePosition + i - j !== currentPiecePosition) {
                                clear = false
                                break
                            }
                        }
                        if (Object.values(allPiecePositions).includes(currentPiecePosition + i)) {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + i))[0][0]
                            if (clear && targetPiece.indexOf('black') !== -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + i, targetPiece)
                            }
                        } else {
                            if (clear || i === 1) {
                                setNewSuitable(currentPiecePosition, currentPiecePosition + i)
                            }
                        }
                    }
                    // horizontal movement left
                    for (let i = 1; i < (currentPiecePosition % 8) + 1; i++) {
                        let clear = true
                        for (let j = 1; j < 7 - ((currentPiecePosition - i) % 8) - (8 - ((currentPiecePosition % 8) + 1)); j++) {
                            if (Object.values(allPiecePositions).includes(currentPiecePosition - i + j) && currentPiecePosition - i + j !== currentPiecePosition) {
                                clear = false
                                break
                            }
                        }
                        if (Object.values(allPiecePositions).includes(currentPiecePosition - i)) {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - i))[0][0]
                            if (clear && targetPiece.indexOf('black') !== -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - i, targetPiece)
                            }
                        } else {
                            if (clear || i === 1) {
                                setNewSuitable(currentPiecePosition, currentPiecePosition - i)
                            }
                        }
                    }
                    // vertical movement down
                    for (let i = 1; i <= 7 - ((currentPiecePosition - (currentPiecePosition % 8)) / 8) ; i++) {
                        let clear = true
                        for (let j = 1; j < (((currentPiecePosition + (i * 8)) - ((currentPiecePosition + (i * 8)) % 8)) / 8 + 1) - (((currentPiecePosition - (currentPiecePosition % 8)) / 8) + 1); j++) {
                            if (Object.values(allPiecePositions).includes(currentPiecePosition + (i * 8) - (j * 8)) && currentPiecePosition + (i * 8) - (j * 8) !== currentPiecePosition) {
                                clear = false
                                break
                            }
                        }
                        if (Object.values(allPiecePositions).includes(currentPiecePosition + (i * 8))) {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + (i * 8)))[0][0]
                            if (clear && targetPiece.indexOf('black') !== -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + (i * 8), targetPiece)
                            }
                        } else {
                            if (clear || i === 1) {
                                setNewSuitable(currentPiecePosition, currentPiecePosition + (i * 8))
                            }
                        }
                    }
                    // vertical movement up
                    for (let i = 1; i < ((currentPiecePosition - (currentPiecePosition % 8)) / 8) + 1; i++) {
                        let clear = true
                        for (let j = 1; j < (7 - (((currentPiecePosition - (i * 8)) - ((currentPiecePosition - (i * 8)) % 8)) / 8)) - (8 - ((((currentPiecePosition - (currentPiecePosition % 8)) / 8) + 1))); j++) {
                            if (clear && Object.values(allPiecePositions).includes(currentPiecePosition - (i * 8) + (j * 8)) && currentPiecePosition - (i * 8) + (j * 8) !== currentPiecePosition) {
                                clear = false
                                break
                            }
                        }
                        if (Object.values(allPiecePositions).includes(currentPiecePosition - (i * 8))) {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - (i * 8)))[0][0]
                            if (clear && targetPiece.indexOf('black') !== -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - (i * 8), targetPiece)
                            }
                        } else {
                            if (clear || i === 1) {
                                setNewSuitable(currentPiecePosition, currentPiecePosition - (i * 8))
                            }
                        }
                    }
                }
                // black knight
                if (selectedPiece.indexOf('knight-black') !== -1 && nextTurn === 'black') {
                    if (column < 7 && row < 8) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition + 10)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition + 10)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 10))[0][0]
                            if (targetPiece.indexOf('black') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + 10, targetPiece)
                            }
                        }
                    }
                    if (column < 8 && row < 7) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition + 17)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition + 17)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 17))[0][0]
                            if (targetPiece.indexOf('black') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + 17, targetPiece)
                            }
                        }
                    }
                    if (column < 7 && row > 1) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition - 6)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition - 6)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - 6))[0][0]
                            if (targetPiece.indexOf('black') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - 6, targetPiece)
                            }
                        }
                    }
                    if (column < 8 && row > 2) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition + 15)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition + 15)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 15))[0][0]
                            if (targetPiece.indexOf('black') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + 15, targetPiece)
                            }
                        }
                    }
                    if (column > 1 && row < 7) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition + 15)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition + 15)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 15))[0][0]
                            if (targetPiece.indexOf('black') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + 15, targetPiece)
                            }
                        }
                    }
                    if (column > 1 && row > 2) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition - 17)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition - 17)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - 17))[0][0]
                            if (targetPiece.indexOf('black') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - 17, targetPiece)
                            }
                        }
                    }
                    if (column > 2 && row > 1) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition - 10)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition - 10)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - 10))[0][0]
                            if (targetPiece.indexOf('black') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - 10, targetPiece)
                            }
                        }
                    }
                    if (column > 2 && row < 8) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition + 6)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition + 6)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 6))[0][0]
                            if (targetPiece.indexOf('black') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + 6, targetPiece)
                            }
                        }
                    }
                    if (column < 8 && row < 7) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition + 17)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition + 17)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 17))[0][0]
                            if (targetPiece.indexOf('black') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + 17, targetPiece)
                            }
                        }
                    }
                    if (column < 8 && row > 2) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition - 15)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition - 15)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - 15))[0][0]
                            if (targetPiece.indexOf('black') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - 15, targetPiece)
                            }
                        }
                    }
                }
                // white knight
                if (selectedPiece.indexOf('knight-white') !== -1 && nextTurn === 'white') {
                    if (column < 7 && row < 8) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition + 10)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition + 10)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 10))[0][0]
                            if (targetPiece.indexOf('white') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + 10, targetPiece)
                            }
                        }
                    }
                    if (column < 8 && row < 7) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition + 17)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition + 17)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 17))[0][0]
                            if (targetPiece.indexOf('white') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + 17, targetPiece)
                            }
                        }
                    }
                    if (column < 7 && row > 1) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition - 6)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition - 6)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - 6))[0][0]
                            if (targetPiece.indexOf('white') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - 6, targetPiece)
                            }
                        }
                    }
                    if (column < 8 && row > 2) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition + 15)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition + 15)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 15))[0][0]
                            if (targetPiece.indexOf('white') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + 15, targetPiece)
                            }
                        }
                    }
                    if (column > 1 && row < 7) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition + 15)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition + 15)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 15))[0][0]
                            if (targetPiece.indexOf('white') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + 15, targetPiece)
                            }
                        }
                    }
                    if (column > 1 && row > 2) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition - 17)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition - 17)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - 17))[0][0]
                            if (targetPiece.indexOf('white') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - 17, targetPiece)
                            }
                        }
                    }
                    if (column > 2 && row > 1) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition - 10)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition - 10)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - 10))[0][0]
                            if (targetPiece.indexOf('white') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - 10, targetPiece)
                            }
                        }
                    }
                    if (column > 2 && row < 8) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition + 6)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition + 6)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 6))[0][0]
                            if (targetPiece.indexOf('white') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + 6, targetPiece)
                            }
                        }
                    }
                    if (column < 8 && row < 7) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition + 17)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition + 17)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 17))[0][0]
                            if (targetPiece.indexOf('white') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + 17, targetPiece)
                            }
                        }
                    }
                    if (column < 8 && row > 2) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition - 15)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition - 15)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - 15))[0][0]
                            if (targetPiece.indexOf('white') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - 15, targetPiece)
                            }
                        }
                    }
                }
                // black bishop / black queen
                if ((selectedPiece.indexOf('bishop-black') !== -1 || selectedPiece.indexOf('queen-black') !== -1) && nextTurn === 'black') {
                    let loopSize
                    // down right
                    if (column >= row) loopSize = width - column
                    if (column < row) loopSize = width - row
                    for (let i = 1; i <= loopSize; i++) {
                        let clear = true
                        let column2 = ((currentPiecePosition + width * i + i) % 8) + 1
                        let row2 = (((currentPiecePosition + width * i + i) - ((currentPiecePosition + width * i + i) % 8)) / 8) + 1
                        let loopSize2
                        if (column2 >= row2) loopSize2 = row2 - 1 - (row - 1)
                        if (column2 < row2) loopSize2 = column2 - 1
                        for (let j = 1; j < loopSize2; j++) {
                            if (Object.values(allPiecePositions).includes((currentPiecePosition + width * i + i) - (width * j + j)) && (currentPiecePosition + width * i + i) - (width * j + j) !== currentPiecePosition) {
                                clear = false
                                break
                            }
                        }
                        if (Object.values(allPiecePositions).includes(currentPiecePosition + width * i + i)) {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + width * i + i))[0][0]
                            if (clear && targetPiece.indexOf('white') !== -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + width * i + i, targetPiece)
                            }
                        } else {
                            if (clear || i === 1) {
                                setNewSuitable(currentPiecePosition, currentPiecePosition + width * i + i)
                            }
                        }
                    }
                    // down left
                    if (column <= width - row) loopSize = column - 1
                    if (column > width - row) loopSize = width - row
                    for (let i = 1; i <= loopSize; i++) {
                        let clear = true
                        let column2 = ((currentPiecePosition + width * i - i) % 8) + 1
                        let row2 = (((currentPiecePosition + width * i - i) - ((currentPiecePosition + width * i - i) % 8)) / 8) + 1
                        let loopSize2
                        if (row2 <= width - column2) loopSize2 = row2 - 1 - (row - 1)
                        if (row2 > width - column2) loopSize2 = width - column2 - (width - column)
                        for (let j = 1; j < loopSize2; j++) {
                            if (Object.values(allPiecePositions).includes((currentPiecePosition + width * i - i) - (width * j - j)) && (currentPiecePosition + width * i - i) - (width * j - j) !== currentPiecePosition) {
                                clear = false
                                break
                            }
                        }
                        if (Object.values(allPiecePositions).includes(currentPiecePosition + width * i - i)) {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + width * i - i))[0][0]
                            if (clear && targetPiece.indexOf('white') !== -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + width * i - i, targetPiece)
                            }
                        } else {
                            if (clear || i === 1) {
                                setNewSuitable(currentPiecePosition, currentPiecePosition + width * i - i)
                            }
                        }
                    }
                    // up right
                    if (row <= width - column) loopSize = row - 1
                    if (row > width - column) loopSize = width - column
                    for (let i = 1; i <= loopSize; i++) {
                        let clear = true
                        let column2 = ((currentPiecePosition - width * i + i) % 8) + 1
                        let row2 = (((currentPiecePosition - width * i + i) - ((currentPiecePosition - width * i + i) % 8)) / 8) + 1
                        let loopSize2
                        if (column2 <= width - row2) loopSize2 = column2 - 1 - (column - 1)
                        if (column2 > width - row2) loopSize2 = width - row2 - (width - row)
                        for (let j = 1; j < loopSize2; j++) {
                            if (Object.values(allPiecePositions).includes((currentPiecePosition - width * i + i) + (width * j - j)) && (currentPiecePosition - width * i + i) + (width * j - j) !== currentPiecePosition) {
                                console.log()
                                clear = false
                                break
                            }
                        }
                        if (Object.values(allPiecePositions).includes(currentPiecePosition - width * i + i)) {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - width * i + i))[0][0]
                            if (clear && targetPiece.indexOf('white') !== -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - width * i + i, targetPiece)
                            }
                        } else {
                            if (clear || i === 1) {
                                setNewSuitable(currentPiecePosition, currentPiecePosition - width * i + i)
                            }
                        }
                    }
                    // up left
                    if (column >= row) loopSize = row - 1
                    if (column < row) loopSize = column - 1
                    for (let i = 1; i <= loopSize; i++) {
                        let clear = true
                        let column2 = ((currentPiecePosition - width * i - i) % 8) + 1
                        let row2 = (((currentPiecePosition - width * i - i) - ((currentPiecePosition - width * i - i) % 8)) / 8) + 1
                        let loopSize2
                        if (column2 >= row2) loopSize2 = width - column2 - (width - column)
                        if (column2 < row2) loopSize2 = width - row2 - (width - row)
                        for (let j = 1; j < loopSize2; j++) {
                            if (Object.values(allPiecePositions).includes((currentPiecePosition - width * i - i) + (width * j + j)) && (currentPiecePosition - width * i - i) + (width * j + j) !== currentPiecePosition) {
                                clear = false
                                break
                            }
                        }
                        if (Object.values(allPiecePositions).includes(currentPiecePosition - width * i - i)) {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - width * i - i))[0][0]
                            if (clear && targetPiece.indexOf('white') !== -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - width * i - i, targetPiece)
                            }
                        } else {
                            if (clear || i === 1) {
                                setNewSuitable(currentPiecePosition, currentPiecePosition - width * i - i)
                            }
                        }
                    }
                }
                // white bishop / white queen
                if ((selectedPiece.indexOf('bishop-white') !== -1 || selectedPiece.indexOf('queen-white') !== -1) && nextTurn === 'white') {
                    let loopSize
                    // down right
                    if (column >= row) loopSize = width - column
                    if (column < row) loopSize = width - row
                    for (let i = 1; i <= loopSize; i++) {
                        let clear = true
                        let column2 = ((currentPiecePosition + width * i + i) % 8) + 1
                        let row2 = (((currentPiecePosition + width * i + i) - ((currentPiecePosition + width * i + i) % 8)) / 8) + 1
                        let loopSize2
                        if (column2 >= row2) loopSize2 = row2 - 1 - (row - 1)
                        if (column2 < row2) loopSize2 = column2 - 1
                        for (let j = 1; j < loopSize2; j++) {
                            if (Object.values(allPiecePositions).includes((currentPiecePosition + width * i + i) - (width * j + j)) && (currentPiecePosition + width * i + i) - (width * j + j) !== currentPiecePosition) {
                                clear = false
                                break
                            }
                        }
                        if (Object.values(allPiecePositions).includes(currentPiecePosition + width * i + i)) {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + width * i + i))[0][0]
                            if (clear && targetPiece.indexOf('black') !== -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + width * i + i, targetPiece)
                            }
                        } else {
                            if (clear || i === 1) {
                                setNewSuitable(currentPiecePosition, currentPiecePosition + width * i + i)
                            }
                        }
                    }
                    // down left
                    if (column <= width - row) loopSize = column - 1
                    if (column > width - row) loopSize = width - row
                    for (let i = 1; i <= loopSize; i++) {
                        let clear = true
                        let column2 = ((currentPiecePosition + width * i - i) % 8) + 1
                        let row2 = (((currentPiecePosition + width * i - i) - ((currentPiecePosition + width * i - i) % 8)) / 8) + 1
                        let loopSize2
                        if (row2 <= width - column2) loopSize2 = row2 - 1 - (row - 1)
                        if (row2 > width - column2) loopSize2 = width - column2 - (width - column)
                        for (let j = 1; j < loopSize2; j++) {
                            if (Object.values(allPiecePositions).includes((currentPiecePosition + width * i - i) - (width * j - j)) && (currentPiecePosition + width * i - i) - (width * j - j) !== currentPiecePosition) {
                                clear = false
                                break
                            }
                        }
                        if (Object.values(allPiecePositions).includes(currentPiecePosition + width * i - i)) {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + width * i - i))[0][0]
                            if (clear && targetPiece.indexOf('black') !== -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + width * i - i, targetPiece)
                            }
                        } else {
                            if (clear || i === 1) {
                                setNewSuitable(currentPiecePosition, currentPiecePosition + width * i - i)
                            }
                        }
                    }
                    // up right
                    if (row <= width - column) loopSize = row - 1
                    if (row > width - column) loopSize = width - column
                    for (let i = 1; i <= loopSize; i++) {
                        let clear = true
                        let column2 = ((currentPiecePosition - width * i + i) % 8) + 1
                        let row2 = (((currentPiecePosition - width * i + i) - ((currentPiecePosition - width * i + i) % 8)) / 8) + 1
                        let loopSize2
                        if (column2 <= width - row2) loopSize2 = column2 - 1 - (column - 1)
                        if (column2 > width - row2) loopSize2 = width - row2 - (width - row)
                        for (let j = 1; j < loopSize2; j++) {
                            if (Object.values(allPiecePositions).includes((currentPiecePosition - width * i + i) + (width * j - j)) && (currentPiecePosition - width * i + i) + (width * j - j) !== currentPiecePosition) {
                                console.log()
                                clear = false
                                break
                            }
                        }
                        if (Object.values(allPiecePositions).includes(currentPiecePosition - width * i + i)) {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - width * i + i))[0][0]
                            if (clear && targetPiece.indexOf('black') !== -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - width * i + i, targetPiece)
                            }
                        } else {
                            if (clear || i === 1) {
                                setNewSuitable(currentPiecePosition, currentPiecePosition - width * i + i)
                            }
                        }
                    }
                    // up left
                    if (column >= row) loopSize = row - 1
                    if (column < row) loopSize = column - 1
                    for (let i = 1; i <= loopSize; i++) {
                        let clear = true
                        let column2 = ((currentPiecePosition - width * i - i) % 8) + 1
                        let row2 = (((currentPiecePosition - width * i - i) - ((currentPiecePosition - width * i - i) % 8)) / 8) + 1
                        let loopSize2
                        if (column2 >= row2) loopSize2 = width - column2 - (width - column)
                        if (column2 < row2) loopSize2 = width - row2 - (width - row)
                        for (let j = 1; j < loopSize2; j++) {
                            if (Object.values(allPiecePositions).includes((currentPiecePosition - width * i - i) + (width * j + j)) && (currentPiecePosition - width * i - i) + (width * j + j) !== currentPiecePosition) {
                                clear = false
                                break
                            }
                        }
                        if (Object.values(allPiecePositions).includes(currentPiecePosition - width * i - i)) {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - width * i - i))[0][0]
                            if (clear && targetPiece.indexOf('black') !== -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - width * i - i, targetPiece)
                            }
                        } else {
                            if (clear || i === 1) {
                                setNewSuitable(currentPiecePosition, currentPiecePosition - width * i - i)
                            }
                        }
                    }
                }
                // black king
                if (selectedPiece.indexOf('king-black') !== -1 && nextTurn === 'black') {
                    if (column > 1 && row > 1) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition - width - 1)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition - width - 1)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - width - 1))[0][0]
                            if (targetPiece.indexOf('black') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - width - 1, targetPiece)
                            }
                        }
                    }
                    if (row > 1) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition - width)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition - width)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - width))[0][0]
                            if (targetPiece.indexOf('black') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - width, targetPiece)
                            }
                        }
                    }
                    if (column < 8 && row > 1) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition - width + 1)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition - width + 1)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - width + 1))[0][0]
                            if (targetPiece.indexOf('black') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - width + 1, targetPiece)
                            }
                        }
                    }
                    if (column > 1) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition - 1)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition - 1)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - 1))[0][0]
                            if (targetPiece.indexOf('black') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - 1, targetPiece)
                            }
                        }
                    }
                    if (column < 8) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition + 1)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition + 1)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 1))[0][0]
                            if (targetPiece.indexOf('black') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + 1, targetPiece)
                            }
                        }
                    }
                    if (row < 8 && column > 1) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition + width - 1)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition + width - 1)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + width - 1))[0][0]
                            if (targetPiece.indexOf('black') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + width - 1, targetPiece)
                            }
                        }
                    }
                    if (row < 8) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition + width)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition + width)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + width))[0][0]
                            if (targetPiece.indexOf('black') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + width, targetPiece)
                            }
                        }
                    }
                    if (row < 8 && column < 8) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition + width + 1)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition + width + 1)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + width + 1))[0][0]
                            if (targetPiece.indexOf('black') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + width + 1, targetPiece)
                            }
                        }
                    }
                    // Castling
                    if (currentPiecePosition === 4 && !Object.values(allPiecePositions).includes(5) && !Object.values(allPiecePositions).includes(6) && Object.values(allPiecePositions).includes(7) && Object.entries(allPiecePositions).filter(piece => piece.includes(7))[0][0].indexOf('rook-black') !== -1) {
                        setNewSuitable(currentPiecePosition, 6)
                    }
                }
                // white king
                if (selectedPiece.indexOf('king-white') !== -1 && nextTurn === 'white') {
                    if (column > 1 && row > 1) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition - width - 1)) {
                            console.log(currentPiecePosition - width - 1)
                            setNewSuitable(currentPiecePosition, currentPiecePosition - width - 1)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - width - 1))[0][0]
                            if (targetPiece.indexOf('white') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - width - 1, targetPiece)
                            }
                        }
                    }
                    if (row > 1) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition - width)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition - width)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - width))[0][0]
                            if (targetPiece.indexOf('white') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - width, targetPiece)
                            }
                        }
                    }
                    if (column < 8 && row > 1) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition - width + 1)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition - width + 1)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - width + 1))[0][0]
                            if (targetPiece.indexOf('white') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - width + 1, targetPiece)
                            }
                        }
                    }
                    if (column > 1) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition - 1)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition - 1)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition - 1))[0][0]
                            if (targetPiece.indexOf('white') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition - 1, targetPiece)
                            }
                        }
                    }
                    if (column < 8) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition + 1)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition + 1)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + 1))[0][0]
                            if (targetPiece.indexOf('white') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + 1, targetPiece)
                            }
                        }
                    }
                    if (row < 8 && column > 1) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition + width - 1)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition + width - 1)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + width - 1))[0][0]
                            if (targetPiece.indexOf('white') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + width - 1, targetPiece)
                            }
                        }
                    }
                    if (row < 8) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition + width)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition + width)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + width))[0][0]
                            if (targetPiece.indexOf('white') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + width, targetPiece)
                            }
                        }
                    }
                    if (row < 8 && column < 8) {
                        if (!Object.values(allPiecePositions).includes(currentPiecePosition + width + 1)) {
                            setNewSuitable(currentPiecePosition, currentPiecePosition + width + 1)
                        } else {
                            const targetPiece = Object.entries(allPiecePositions).filter(piece => piece.includes(currentPiecePosition + width + 1))[0][0]
                            if (targetPiece.indexOf('white') === -1) {
                                setNewSuitableThreat(currentPiecePosition, currentPiecePosition + width + 1, targetPiece)
                            }
                        }
                    }
                    // Castling
                    if (currentPiecePosition === 60 && !Object.values(allPiecePositions).includes(61) && !Object.values(allPiecePositions).includes(62) && Object.values(allPiecePositions).includes(63) && Object.entries(allPiecePositions).filter(piece => piece.includes(63))[0][0].indexOf('rook-white') !== -1) {
                        setNewSuitable(currentPiecePosition, 62)
                    }
                }
            }
        }
        touchPiece()
        // eslint-disable-next-line
    }, [selectedPiece])

    return (
        <div id="board">
            {allRows}
        </div>
    )
}

export default Board
