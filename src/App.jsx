import { useState } from 'react';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {

  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  let winner = null;

  let gameBoard = initialGameBoard;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstCell = gameBoard[combination[0].row][combination[0].column];
    const secondCell = gameBoard[combination[1].row][combination[1].column];
    const thirdCell = gameBoard[combination[2].row][combination[2].column];

    if (firstCell !== null && firstCell === secondCell && secondCell === thirdCell) {
      winner = firstCell;
    }
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{
        square: {
          row: rowIndex,
          col: colIndex
        }, player: currentPlayer
      },
      ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <header>
        <img src="game-logo.png" alt="logo" />
        <h1>Tic Tac Toe</h1>
      </header>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1"
            symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="Player 2"
            symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        {winner && <p>You won, {winner} </p>}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;