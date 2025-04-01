export default function GameOver({ winner }) {
	return (
		<div id="game-over">
			<h2>Game Over</h2>
			<p>Congratulations, {winner} won!</p>
			<p>
				<button onClick={() => window.location.reload()}>Play Again</button>
			</p>
		</div>
	);
}