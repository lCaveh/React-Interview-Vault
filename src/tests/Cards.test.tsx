import React from 'react';
import { render, screen } from '@testing-library/react';
import { Cards } from '@components/Cards';
import type { CardData } from '@components/Cards';

describe('Cards Component', () => {
    const mockCards: CardData[] = [
        {
            id: 1,
            title: 'React Hooks',
            description: 'Learn about React Hooks',
            image: 'https://via.placeholder.com/300x200?text=React+Hooks',
        },
        {
            id: 2,
            title: 'State Management',
            description: 'Master state management patterns',
            image: 'https://via.placeholder.com/300x200?text=State+Management',
        },
        {
            id: 3,
            title: 'Component Patterns',
            description: 'Explore common React component patterns',
            image: 'https://via.placeholder.com/300x200?text=Component+Patterns',
        },
    ];

    it('should render cards grid', () => {
        render(<Cards cards={mockCards} />);

        const grid = screen.getByTestId('cards-grid');
        expect(grid).toBeInTheDocument();
    });

    it('should render all cards', () => {
        render(<Cards cards={mockCards} />);

        const cards = screen.getAllByTestId(/^card-/);
        expect(cards).toHaveLength(3);
    });

    it('should render card with correct content', () => {
        render(<Cards cards={mockCards} />);

        expect(screen.getByText('React Hooks')).toBeInTheDocument();
        expect(screen.getByText('State Management')).toBeInTheDocument();
        expect(screen.getByText('Component Patterns')).toBeInTheDocument();
    });

    it('should render cards with descriptions', () => {
        render(<Cards cards={mockCards} />);

        expect(screen.getByText('Learn about React Hooks')).toBeInTheDocument();
        expect(screen.getByText('Master state management patterns')).toBeInTheDocument();
    });

    it('should render empty grid when no cards provided', () => {
        render(<Cards cards={[]} />);

        const grid = screen.getByTestId('cards-grid');
        expect(grid).toBeInTheDocument();
        expect(grid.children).toHaveLength(0);
    });

    it('should render cards with correct data-testid', () => {
        render(<Cards cards={mockCards} />);

        expect(screen.getByTestId('card-1')).toBeInTheDocument();
        expect(screen.getByTestId('card-2')).toBeInTheDocument();
        expect(screen.getByTestId('card-3')).toBeInTheDocument();
    });

    it('should handle single card', () => {
        render(<Cards cards={[mockCards[0]]} />);

        const cards = screen.getAllByTestId(/^card-/);
        expect(cards).toHaveLength(1);
        expect(screen.getByText('React Hooks')).toBeInTheDocument();
    });
});
