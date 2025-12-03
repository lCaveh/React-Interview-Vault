import React, { useState } from 'react';
import './TicTacToe.css';

type Player = 'X' | 'O' | null;

export const TicTacToe: React.FC = () => {
    const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState<Player>(null);
    const [gameHistory, setGameHistory] = useState<Player[][]>([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);

    const currentPlayer = isXNext ? 'X' : 'O';
    const currentBoard = gameHistory[currentMove];

    const calculateWinner = (squares: Player[]): Player => {
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

    const handleSquareClick = (index: number) => {
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

    const goToMove = (moveNumber: number) => {
        setCurrentMove(moveNumber);
        setIsXNext(moveNumber % 2 === 0);
    };

    const status = gameWinner
        ? `Winner: ${gameWinner}`
        : isBoardFull
            ? "It's a Draw!"
            : `Next Player: ${currentPlayer}`;

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
                        data-testid={`square-${index}`}
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
                            className={`history-btn ${moveNumber === currentMove ? 'active' : ''}`}
                            onClick={() => goToMove(moveNumber)}
                            data-testid={`history-${moveNumber}`}
                        >
                            {moveNumber === 0 ? 'Start' : `Move ${moveNumber}`}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TicTacToe;
