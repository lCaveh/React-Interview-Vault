import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Card } from '@components/Card';

describe('Card Component', () => {
    const mockCardProps = {
        id: 1,
        title: 'React Hooks',
        description: 'Learn about React Hooks',
        image: 'https://via.placeholder.com/300x200?text=React+Hooks',
    };

    it('should render card with title', () => {
        render(
            <BrowserRouter>
                <Card {...mockCardProps} />
            </BrowserRouter>
        );

        const title = screen.getByText('React Hooks');
        expect(title).toBeInTheDocument();
    });

    it('should render card with description', () => {
        render(
            <BrowserRouter>
                <Card {...mockCardProps} />
            </BrowserRouter>
        );

        const description = screen.getByText('Learn about React Hooks');
        expect(description).toBeInTheDocument();
    });

    it('should render card image', () => {
        render(
            <BrowserRouter>
                <Card {...mockCardProps} />
            </BrowserRouter>
        );

        const image = screen.getByAltText('React Hooks') as HTMLImageElement;
        expect(image).toBeInTheDocument();
        expect(image.src).toBe(mockCardProps.image);
    });

    it('should have correct data-testid', () => {
        render(
            <BrowserRouter>
                <Card {...mockCardProps} />
            </BrowserRouter>
        );

        const card = screen.getByTestId('card-1');
        expect(card).toBeInTheDocument();
    });

    it('should render without id prop', () => {
        const { id, ...propsWithoutId } = mockCardProps;
        render(
            <BrowserRouter>
                <Card {...propsWithoutId} />
            </BrowserRouter>
        );

        const title = screen.getByText('React Hooks');
        expect(title).toBeInTheDocument();
    });

    it('should display placeholder image on image load error', () => {
        render(
            <BrowserRouter>
                <Card {...mockCardProps} />
            </BrowserRouter>
        );

        const image = screen.getByAltText('React Hooks') as HTMLImageElement;
        expect(image).toBeInTheDocument();

        expect(image).toHaveAttribute('src', mockCardProps.image);
    });
});
