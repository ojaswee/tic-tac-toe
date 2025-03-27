import { useState } from 'react';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleSquareClick(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      // Create a deep copy of the game board
      const updatedGameBoard = prevGameBoard.map((row) => [...row]);

      // Update the clicked square if it's empty
      if (!updatedGameBoard[rowIndex][colIndex]) {
        updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
        onSelectSquare(); // Switch the active player
      }

      return updatedGameBoard;
    });
  }

  return (
    <div id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <ol key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <button
              key={colIndex}
              className="board-cell"
              onClick={() => handleSquareClick(rowIndex, colIndex)}
            >
              {cell}
            </button>
          ))}
        </ol>
      ))}
    </div>
  );
}