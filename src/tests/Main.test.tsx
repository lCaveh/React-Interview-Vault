import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Main } from '@components/Main';

describe('Main Component', () => {
    it('should render main header with title', () => {
        render(<Main />);

        const title = screen.getByText('React Interview Vault');
        expect(title).toBeInTheDocument();
    });

    it('should render subtitle', () => {
        render(<Main />);

        const subtitle = screen.getByText('A collection of minimal, working React solutions for common frontend interview questions.');
        expect(subtitle).toBeInTheDocument();
    });

    it('should render search input', () => {
        render(<Main />);

        const searchInput = screen.getByTestId('search-input');
        expect(searchInput).toBeInTheDocument();
    });

    it('should render cards grid', () => {
        render(<Main />);

        const cardsGrid = screen.getByTestId('cards-grid');
        expect(cardsGrid).toBeInTheDocument();
    });

    it('should display all cards initially', () => {
        render(<Main />);

        const cards = screen.getAllByTestId(/^card-/);
        expect(cards.length).toBeGreaterThan(0);
    });

    it('should filter cards based on search query', async () => {
        const user = userEvent.setup();
        render(<Main />);

        const searchInput = screen.getByTestId('search-input');
        await user.type(searchInput, 'Hooks');

        expect(screen.getByText('React Hooks')).toBeInTheDocument();
    });

    it('should show no results message when no cards match search', async () => {
        const user = userEvent.setup();
        render(<Main />);

        const searchInput = screen.getByTestId('search-input');
        await user.type(searchInput, 'NonexistentProject');

        const noResults = screen.getByTestId('no-results');
        expect(noResults).toBeInTheDocument();
        expect(screen.getByText(/No cards found matching/)).toBeInTheDocument();
    });

    it('should reset to showing all cards when search is cleared', async () => {
        const user = userEvent.setup();
        render(<Main />);

        const searchInput = screen.getByTestId('search-input') as HTMLInputElement;

        await user.type(searchInput, 'Hooks');
        expect(searchInput.value).toBe('Hooks');

        await user.clear(searchInput);
        expect(searchInput.value).toBe('');

        const cardsGrid = screen.getByTestId('cards-grid');
        expect(cardsGrid.children.length).toBeGreaterThan(0);
    });

    it('should perform case-insensitive search', async () => {
        const user = userEvent.setup();
        render(<Main />);

        const searchInput = screen.getByTestId('search-input');
        await user.type(searchInput, 'HOOKS');

        expect(screen.getByText('React Hooks')).toBeInTheDocument();
    });

    it('should filter cards with partial match', async () => {
        const user = userEvent.setup();
        render(<Main />);

        const searchInput = screen.getByTestId('search-input');
        await user.type(searchInput, 'React');

        const cards = screen.getAllByTestId(/^card-/);
        expect(cards.length).toBeGreaterThan(0);
    });
});
