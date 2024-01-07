import { useState } from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log'
import { WINNING_COMBINATIONS } from './winning-combinations'
import GameOver from './components/GameOver'

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
}

const deriveActivePlayer = (gameTurns) => {
  let activePlayer = 'X'

  if (gameTurns.length && gameTurns[0].player === 'X') activePlayer = 'O'
  return activePlayer
}

const deriveGameWinner = (gameBoard) => {
  let winner = null
  for (const combination of WINNING_COMBINATIONS) {
    const box1 = combination[0]
    const box2 = combination[1]
    const box3 = combination[2]

    if (
      gameBoard[box1.row][box1.column] === gameBoard[box2.row][box2.column] &&
      gameBoard[box2.row][box2.column] === gameBoard[box3.row][box3.column]
    ) {
      if (!gameBoard[box1.row][box1.column]) continue
      console.log('Won')
      winner = gameBoard[box1.row][box1.column]
      break
      // alert(`Player ${gameTurns[0].player} Won!`);
    }
  }
  console.log(winner)
  return winner
}

const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray])]

  for (const turn of gameTurns) {
    const {
      square: { row, col },
      player,
    } = turn
    gameBoard[row][col] = player
  }

  return gameBoard
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  const [players, setPlayers] = useState(PLAYERS)

  const gameBoard = deriveGameBoard(gameTurns)

  const activePlayer = deriveActivePlayer(gameTurns)

  const winner = deriveGameWinner(gameBoard)

  let hasDraw = gameTurns.length === 9 && !winner

  const restartGame = () => {
    setGameTurns([])
  }

  const handleSelectSquare = (rowIndex, colIndex) => {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "0" : "X"));
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ]

      return updatedTurns
    })
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [symbol]: newName,
    }))
  }
  return (
    <main>
      <header>
        <img src="game-logo.png" alt="Game board" />
        <h1>Tic-Tac-Toe</h1>
      </header>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={players.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            changeName={handlePlayerNameChange}
          />
          <Player
            name={players.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            changeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={players[winner]} onClick={restartGame} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
