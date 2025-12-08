import { TicTacToe } from '@components/Solutions';
import ticTacToeCode from '@components/Solutions/TicTacToe.tsx?raw';
import ticTacToeCss from '@components/Solutions/TicTacToe.css?raw';

export interface SolutionConfig {
  id: number;
  title: string;
  description: string;
  image: string;
  component: React.ComponentType;
  code: string;
  css: string;
}

const solutions: Record<number, SolutionConfig> = {
  1: {
    id: 1,
    title: 'Tic Tac Toe',
    description: 'Build a classic Tic Tac Toe game with game logic, win detection, move history, and player turn management.',
    image: 'https://via.placeholder.com/300x200?text=Tic+Tac+Toe',
    component: TicTacToe,
    code: ticTacToeCode,
    css: ticTacToeCss,
  },
};

export default solutions;
