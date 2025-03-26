import { useState } from "react";

//create 3 nested arrays to represent the 3 rows of the game board
const initalGameBorad = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
];


export default function GameBoard() {
	const [gameBoard, setGameBoard] = useState(initalGameBorad);

	function handleSquareClick(rowIndex, colIndex) {
		setGameBoard((prevGameBoard) => {
			const updatedGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
			updatedGameBoard[rowIndex][colIndex] = 'X';
			return updatedGameBoard;
		});
	}

	return (
		<ol id="game-board">
			{gameBoard.map((row, rowIndex) => (
				<li key={rowIndex}>
					<ol>
						{row.map((playerSymbol, colIndex) => <li key={colIndex}>
							<button onClick={() => handleSquareClick(rowIndex, colIndex)}>{playerSymbol}</button>
						</li>)}
					</ol>
				</li>
			)
			)}
		</ol>
	);
}