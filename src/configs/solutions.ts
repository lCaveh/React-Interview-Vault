import { TicTacToe } from '@components/Solutions';

export interface SolutionConfig {
    id: number;
    name: string;
    component: React.ComponentType<any>;
    code: string;
    css: string;
}

const ticTacToeCode = `const TicTacToe = () => {
  const { useState } = React;
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameHistory, setGameHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const currentPlayer = isXNext ? 'X' : 'O';
  const currentBoard = gameHistory[currentMove];

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const gameWinner = calculateWinner(currentBoard);
  const isBoardFull = currentBoard.every((square) => square !== null);

  const handleSquareClick = (index) => {
    if (currentBoard[index] || gameWinner) {
      return;
    }

    const newBoard = [...currentBoard];
    newBoard[index] = currentPlayer;

    const newHistory = gameHistory.slice(0, currentMove + 1);
    newHistory.push(newBoard);

    setGameHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setGameHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  const goToMove = (moveNumber) => {
    setCurrentMove(moveNumber);
    setIsXNext(moveNumber % 2 === 0);
  };

  const status = gameWinner
    ? \`Winner: \${gameWinner}\`
    : isBoardFull
      ? "It's a Draw!"
      : \`Next Player: \${currentPlayer}\`;

  return (
    <div className="tic-tac-toe-container">
      <h1>Tic Tac Toe</h1>
      <div className="game-info">
        <p className="status">{status}</p>
      </div>

      <div className="board">
        {currentBoard.map((value, index) => (
          <button
            key={index}
            className="square"
            onClick={() => handleSquareClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="controls">
        <button className="reset-btn" onClick={resetGame}>
          Reset Game
        </button>
      </div>

      <div className="history">
        <h3>Move History</h3>
        <div className="history-buttons">
          {gameHistory.map((_, moveNumber) => (
            <button
              key={moveNumber}
              className={\`history-btn \${moveNumber === currentMove ? 'active' : ''}\`}
              onClick={() => goToMove(moveNumber)}
            >
              {moveNumber === 0 ? 'Start' : \`Move \${moveNumber}\`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}`;

const ticTacToeCss = `.tic-tac-toe-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  gap: 20px;
}

.tic-tac-toe-container h1 {
  font-size: 2.5rem;
  margin: 0;
  color: #333;
}

.game-info {
  text-align: center;
  width: 100%;
}

.status {
  font-size: 1.25rem;
  font-weight: bold;
  color: #0066cc;
  margin: 0;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 8px;
  width: 300px;
  height: 300px;
  padding: 10px;
  background: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.square {
  width: 100%;
  height: 100%;
  font-size: 2rem;
  font-weight: bold;
  border: 2px solid #333;
  background: white;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
  color: #333;
}

.square:hover {
  background: #f9f9f9;
  transform: scale(0.98);
}

.square:active {
  transform: scale(0.95);
}

.controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  width: 100%;
}

.reset-btn {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  background: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  background: #0052a3;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 102, 204, 0.3);
}

.reset-btn:active {
  transform: translateY(0);
}

.history {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}

.history h3 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 1.25rem;
}

.history-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.history-btn {
  padding: 8px 16px;
  font-size: 0.9rem;
  background: #e8e8e8;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.history-btn:hover {
  background: #d8d8d8;
}

.history-btn.active {
  background: #0066cc;
  color: white;
  border-color: #0066cc;
}`;

const solutions: Record<number, SolutionConfig> = {
    1: {
        id: 1,
        name: 'TicTacToe',
        component: TicTacToe,
        code: ticTacToeCode,
        css: ticTacToeCss,
    },
};

export default solutions;
