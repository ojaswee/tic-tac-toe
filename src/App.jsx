import { useState } from 'react';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
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

function findWinner(gameBoard, players) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstCell = gameBoard[combination[0].row][combination[0].column];
    const secondCell = gameBoard[combination[1].row][combination[1].column];
    const thirdCell = gameBoard[combination[2].row][combination[2].column];

    if (firstCell !== null && firstCell === secondCell && secondCell === thirdCell) {
      winner = players[firstCell];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  const gameBoard = [...initialGameBoard.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState({
    'X': 'Player 1',
    'O': 'Player 2'
  });
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  let winner = findWinner(gameBoard, players);

  if (gameTurns.length === 9 && winner === null) {
    winner = 'Draw';
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

  function handleResatrtGame() {
    setGameTurns([]);
  }

  function handleEditPlayerName(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
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
            symbol="X" isActive={activePlayer === 'X'}
            onchangeName={handleEditPlayerName} />
          <Player initialName="Player 2"
            symbol="O" isActive={activePlayer === 'O'}
            onchangeName={handleEditPlayerName} />
        </ol>
        {winner && <GameOver winner={winner} onRestart={handleResatrtGame} />}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;